import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Button,
} from "@mui/material";
import DashboardHeader from "../Headers/DashboardHeader";
import { IoSearch } from "react-icons/io5";
import { BsCircleFill } from "react-icons/bs";
import ProfilePic from "../../assets/icons/messageprofilepic.svg";
import ProfilePic2 from "../../assets/icons/carolinaprofilepic.svg";
import ChatScreen from "../Messages/ChatScreen";
import { fetchConversations } from "../../api/conversationsApi";
import { useSocketEvent } from "../../context/SocketContext";
import { useAuth } from "../../context/Auth";

function MessagesSidebar() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { authData } = useAuth();
  const currentUserId = authData?.user?.id;

  // Helper function to get the other participant in a conversation
  const getOtherUser = (participants) => {
    if (!participants || participants.length === 0) return null;
    // Find the participant that is NOT the current user
    const otherUser =
      participants.find((p) => p._id !== currentUserId) || participants[0];
    return {
      _id: otherUser._id,
      id: otherUser._id,
      name:
        `${otherUser.name?.first || ""} ${otherUser.name?.last || ""}`.trim() ||
        "Unknown User",
      email: otherUser.email,
      avatar: otherUser.avatar,
      role: otherUser.role,
      isActive: otherUser.isOnline || false,
    };
  };

  // Fetch conversations on mount
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const response = await fetchConversations();
        // API returns { status, message, data: [...] }
        const conversationsData = response.data || response.conversations || [];

        // Transform conversations to include otherUser
        const transformedConversations = conversationsData.map((conv) => ({
          ...conv,
          id: conv._id,
          otherUser: getOtherUser(conv.participants),
          lastMessage: conv.last_message?.text || conv.last_message || null,
          lastMessageTime: conv.last_message_at || conv.updated_at,
          unreadCount: conv.unread_count || 0,
        }));

        setConversations(transformedConversations);

        // Don't auto-select - let user click to open conversation
      } catch (error) {
        console.error("Failed to load conversations:", error);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [currentUserId]);

  // Listen for new messages to update conversation list (message:new event)
  const handleNewMessage = useCallback(
    (data) => {
      setConversations((prev) => {
        const conversationId =
          data.conversationId || data.conversation || data.conversation_id;
        const updatedConversations = prev.map((conv) => {
          if (conv._id === conversationId || conv.id === conversationId) {
            return {
              ...conv,
              lastMessage: data.text || data.content || data.message?.text,
              lastMessageTime:
                data.createdAt || data.created_at || new Date().toISOString(),
              unreadCount:
                selectedConversation?._id === conv._id ||
                selectedConversation?.id === conv.id
                  ? 0
                  : (conv.unreadCount || 0) + 1,
            };
          }
          return conv;
        });

        // Sort by most recent message
        return updatedConversations.sort(
          (a, b) =>
            new Date(b.lastMessageTime || b.updated_at) -
            new Date(a.lastMessageTime || a.updated_at)
        );
      });
    },
    [selectedConversation]
  );

  useSocketEvent("message:new", handleNewMessage);

  // Also listen for message:sent to update conversation list
  useSocketEvent("message:sent", handleNewMessage);

  // Listen for conversation updates
  const handleConversationUpdated = useCallback((data) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === data.id || conv._id === data._id
          ? { ...conv, ...data }
          : conv
      )
    );
  }, []);

  useSocketEvent("conversation:updated", handleConversationUpdated);

  // Listen for user online status
  const handleUserOnline = useCallback((data) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.otherUser?.id === data.userId ||
        conv.otherUser?._id === data.userId
          ? {
              ...conv,
              otherUser: { ...conv.otherUser, isActive: true, isOnline: true },
            }
          : conv
      )
    );
  }, []);

  useSocketEvent("user:online", handleUserOnline);

  // Listen for user offline status
  const handleUserOffline = useCallback((data) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.otherUser?.id === data.userId ||
        conv.otherUser?._id === data.userId
          ? {
              ...conv,
              otherUser: {
                ...conv.otherUser,
                isActive: false,
                isOnline: false,
              },
            }
          : conv
      )
    );
  }, []);

  useSocketEvent("user:offline", handleUserOffline);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    // Mark as read
    setConversations((prev) =>
      prev.map((conv) =>
        conv._id === conversation._id ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  const filteredConversations = conversations.filter((conv) => {
    const userName = conv.otherUser?.name || "";
    return userName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Get the selected user for ChatScreen
  const selectedUser = selectedConversation?.otherUser
    ? {
        ...selectedConversation.otherUser,
        img: selectedConversation.otherUser.profilePic || ProfilePic,
      }
    : null;

  return (
    <Box sx={{ marginTop: "50px", marginBottom: "50px" }}>
      <DashboardHeader
        headerText="Messages"
        bodyText="Conversations tied to campaigns will appear here for easy tracking."
      />

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        {/* Left Sidebar */}
        <Box
          sx={{
            width: "30%",
            border: "1px solid #CFCFCF",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header + Search */}
          <Box sx={{ p: 2 }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: "500",
                mb: 1,
              }}
            >
              Chat List
            </Typography>

            <TextField
              fullWidth
              size="small"
              placeholder="Search chats..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearch size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                fontFamily: "Poppins",
              }}
            />

            <Divider
              sx={{
                mt: 2,
                borderColor: "black",
                borderBottomWidth: "1.5px",
                width: "100%",
              }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              maxHeight: "400px",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE + Edge
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari
              },
            }}
          >
            {loading ? (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography sx={{ fontFamily: "Poppins", color: "#707070" }}>
                  Loading conversations...
                </Typography>
              </Box>
            ) : filteredConversations.length === 0 ? (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography sx={{ fontFamily: "Poppins", color: "#707070" }}>
                  {searchQuery
                    ? "No conversations found"
                    : "No conversations yet"}
                </Typography>
              </Box>
            ) : (
              filteredConversations.map((conversation) => {
                const { _id, otherUser, lastMessage, unreadCount } =
                  conversation;
                const name = otherUser?.name || "Unknown User";
                const slogan = lastMessage || "No messages yet";
                const img = otherUser?.avatar || ProfilePic;
                const isActive = otherUser?.isActive || false;
                const isSelected = selectedConversation?._id === _id;

                return (
                  <Box
                    key={_id}
                    onClick={() => handleConversationClick(conversation)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      p: 1,
                      px: 3,
                      backgroundColor: isSelected ? "#8EC6EB20" : "transparent",
                      "&:hover": {
                        backgroundColor: "#76767626",
                        cursor: "pointer",
                      },
                    }}
                  >
                    {/* Profile Picture with Active Dot */}
                    <Box sx={{ position: "relative", display: "inline-block" }}>
                      <Box
                        component="img"
                        src={img}
                        alt={name}
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <BsCircleFill
                        style={{
                          position: "absolute",
                          bottom: 2,
                          right: 2,
                          color: isActive ? "#4CAF50" : "#565656",
                          fontSize: "14px",
                          border: "2px solid white",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          {name}
                        </Typography>
                        {unreadCount > 0 && (
                          <Box
                            sx={{
                              backgroundColor: "#4CAF50",
                              color: "white",
                              borderRadius: "50%",
                              width: 20,
                              height: 20,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {unreadCount}
                          </Box>
                        )}
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "13px",
                          color: "text.secondary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {slogan}
                      </Typography>
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        </Box>

        {/* Chat Window */}
        <Box
          sx={{
            width: "65%",
            border: "1px solid #CFCFCF",
            borderRadius: "8px",
            p: 2,
          }}
        >
          <ChatScreen conversation={selectedConversation} user={selectedUser} />
        </Box>
      </Box>
    </Box>
  );
}

export default MessagesSidebar;
