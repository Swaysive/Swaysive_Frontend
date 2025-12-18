import {
  Box,
  Typography,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  BsThreeDotsVertical,
  BsCheck2All,
  BsCircleFill,
  BsEmojiSmile,
} from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import React, { useState, useEffect, useCallback } from "react";
import { useSocket, useSocketEvent } from "../../context/SocketContext";
import { useAuth } from "../../context/Auth";
import { fetchMessages } from "../../api/conversationsApi";
import { v4 as uuidv4 } from "uuid";

function ChatScreen({ conversation, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { emit, isConnected, socket } = useSocket();
  const { authData } = useAuth();
  const currentUserId = authData?.user?.id;
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get conversation ID helper
  const conversationId = conversation?._id || conversation?.id;

  // Join conversation room when conversation changes
  useEffect(() => {
    if (!conversationId || !isConnected) return;

    // Join the conversation room
    console.log("🚪 [conversation:join] Emitting:", { conversationId });
    emit("conversation:join", { conversationId });

    // Cleanup: leave conversation room when component unmounts or conversation changes
    return () => {
      console.log("🚶 [conversation:leave] Emitting:", { conversationId });
      emit("conversation:leave", { conversationId });
    };
  }, [conversationId, isConnected, emit]);

  // Listen for conversation:joined confirmation
  const handleConversationJoined = useCallback((data) => {
    console.log("✅ [conversation:joined] Confirmed:", data);
  }, []);

  useSocketEvent("conversation:joined", handleConversationJoined);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (!conversationId) return;

    const loadMessages = async () => {
      setLoading(true);
      try {
        const response = await fetchMessages(conversationId);
        // API returns { status, message, data: { messages: [], pagination: {} } }
        const messagesData = response.data?.messages || response.messages || [];

        // Sort messages by created_at ascending (oldest first, newest last - WhatsApp style)
        const sortedMessages = messagesData.sort((a, b) => {
          const timeA = new Date(a.created_at || a.createdAt).getTime();
          const timeB = new Date(b.created_at || b.createdAt).getTime();
          return timeA - timeB;
        });

        setMessages(sortedMessages);

        console.log("💬 Messages loaded:", { count: sortedMessages.length });

        // Mark messages as read when viewing the conversation
        if (isConnected && sortedMessages.length > 0) {
          // Send the last (most recent) message ID
          const lastMessage = sortedMessages[sortedMessages.length - 1];
          console.log(
            "📤 [message:read] Emitting read receipt for:",
            lastMessage._id || lastMessage.id
          );
          emit("message:read", {
            conversation_id: conversationId,
            message_id: lastMessage._id || lastMessage.id,
          });
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [conversationId, isConnected, emit]);

  // Listen for broadcasted messages in the conversation room (message:sent)
  const handleMessageSent = useCallback(
    (data) => {
      console.log("📩 [message:sent] Received:", data);

      // Handle nested message structure: data might have message nested inside
      const messageData = data.message || data;
      // Check both top-level and nested message for conversation_id
      const msgConversationId =
        data.conversationId ||
        data.conversation ||
        data.conversation_id ||
        messageData.conversation_id;

      console.log("📩 Checking conversation ID:", {
        msgConversationId,
        currentConversationId: conversationId,
      });

      // Check if message belongs to current conversation
      if (msgConversationId === conversationId) {
        console.log(
          "📩 [message:sent] Message belongs to current conversation"
        );
        // Avoid duplicates - check if message already exists by tempId or id
        // Note: temp_id is at top level (data.temp_id), not in messageData
        const tempId = data.temp_id || messageData.temp_id;

        setMessages((prev) => {
          const exists = prev.some(
            (msg) =>
              (msg.tempId && msg.tempId === tempId) ||
              (msg.id && msg.id === messageData.id) ||
              (msg._id && msg._id === messageData._id)
          );
          if (exists) {
            console.log(
              "📩 [message:sent] Updating existing optimistic message"
            );
            // Update the existing message with server data
            return prev.map((msg) =>
              msg.tempId === tempId
                ? { ...messageData, status: "sent", isSender: true }
                : msg
            );
          }
          console.log("📩 [message:sent] Adding new message from other user");
          // Determine if sender - handle both string ID and object with _id
          const senderId =
            typeof messageData.sender_id === "object"
              ? messageData.sender_id?._id
              : messageData.sender_id;
          const isSender = senderId === currentUserId;
          console.log("📩 Sender check:", {
            senderId,
            currentUserId,
            isSender,
          });

          // Add new message from other user
          return [...prev, { ...messageData, isSender }];
        });

        // Mark message as read since we're viewing the conversation
        if (isConnected && messageData._id) {
          console.log("📤 [message:read] Emitting read receipt");
          emit("message:read", {
            conversation_id: conversationId,
            message_id: messageData._id || messageData.id,
          });
        }
      } else {
        console.log(
          "📩 [message:sent] Message is for different conversation:",
          msgConversationId
        );
      }
    },
    [conversationId, isConnected, emit, currentUserId]
  );

  useSocketEvent("message:sent", handleMessageSent);

  // Listen for global new message notification (message:new)
  const handleNewMessage = useCallback(
    (data) => {
      console.log("🆕 [message:new] Received:", data);

      // Handle nested message structure: data.message contains the actual message
      const messageData = data.message || data;
      const msgConversationId =
        data.conversationId || data.conversation || data.conversation_id;

      if (msgConversationId === conversationId) {
        console.log("🆕 [message:new] Message belongs to current conversation");
        setMessages((prev) => {
          const exists = prev.some(
            (msg) => msg.id === messageData.id || msg._id === messageData._id
          );
          if (!exists) {
            console.log("🆕 [message:new] Adding new message");

            // Determine if sender - handle both string ID and object with _id
            const senderId =
              typeof messageData.sender_id === "object"
                ? messageData.sender_id?._id
                : messageData.sender_id;
            const isSender = senderId === currentUserId;
            console.log("🆕 Sender check:", {
              senderId,
              currentUserId,
              isSender,
            });

            return [...prev, { ...messageData, isSender }];
          }
          console.log("🆕 [message:new] Message already exists, skipping");
          return prev;
        });

        // Mark message as read since we're viewing the conversation
        if (isConnected && messageData._id) {
          console.log("📤 [message:read] Emitting read receipt");
          emit("message:read", {
            conversation_id: conversationId,
            message_id: messageData._id || messageData.id,
          });
        }
      } else {
        console.log(
          "🆕 [message:new] Message is for different conversation:",
          msgConversationId
        );
      }
    },
    [conversationId, isConnected, emit, currentUserId]
  );

  useSocketEvent("message:new", handleNewMessage);

  // Listen for message seen confirmations
  const handleMessageSeen = useCallback((data) => {
    console.log("👁️ [message:seen] Received:", data);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === data.messageId || msg._id === data.messageId
          ? { ...msg, status: "seen", seenAt: data.seenAt }
          : msg
      )
    );
  }, []);

  useSocketEvent("message:seen", handleMessageSeen);

  const handleSend = () => {
    if (!newMessage.trim() || !conversationId) return;

    const tempId = uuidv4();
    const optimisticMessage = {
      id: null,
      tempId,
      text: newMessage,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: true,
      isActive: true,
      img: user?.img,
      status: "sending",
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, optimisticMessage]);

    // Emit socket event
    if (isConnected) {
      const payload = {
        temp_id: tempId,
        conversation_id: conversationId,
        text: newMessage,
        reply_to: null, // Can be set when implementing reply feature
      };
      console.log("📤 [message:send] Emitting:", payload);
      emit("message:send", payload);
    } else {
      console.warn("⚠️ Socket not connected. Message not sent.");
      // Update message status to failed
      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    }

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversation) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: "400px",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#F5F5F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IoMdSend size={40} color="#D3D3D3" />
        </Box>
        <Typography
          sx={{ color: "#707070", fontFamily: "Poppins", fontWeight: 500 }}
        >
          Select a conversation to start messaging
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            pl: 3,
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Box
              component="img"
              src={user?.img}
              alt="Profile"
              sx={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <BsCircleFill
              style={{
                position: "absolute",
                bottom: 2,
                right: 2,
                color: user?.isActive ? "#4CAF50" : "#565656",
                fontSize: "12px",
                border: "2px solid white",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                fontFamily: "Poppins",
              }}
            >
              {user?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: "400",
                fontFamily: "Poppins",
              }}
            >
              {/* {user?.isActive ? "Online" : "Offline"} */}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "#F7F7F8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "0.3px solid #D3D3D3",
          }}
        >
          <BsThreeDotsVertical color="#959595" />
        </Box>
      </Box>
      <Divider sx={{ mt: 2, borderBottomWidth: "1.5px" }} />
      <Box sx={{ textAlign: "center", mt: 1 }}>
        <Typography
          sx={{
            color: "#707070",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          {conversation.createdAt
            ? new Date(conversation.createdAt).toLocaleString()
            : "Today"}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          minHeight: "350px",
          maxHeight: "400px",
          overflowY: "auto",
          overflowX: "hidden", // Fix horizontal scroll
          display: "flex",
          flexDirection: "column",
          pr: 1, // Add padding for scrollbar
        }}
      >
        {loading ? (
          <Typography
            sx={{
              textAlign: "center",
              color: "#707070",
              fontFamily: "Poppins",
              mt: 4,
            }}
          >
            Loading messages...
          </Typography>
        ) : messages.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              mt: 4,
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                color: "#707070",
                fontFamily: "Poppins",
              }}
            >
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        ) : (
          messages.map((msg) => {
            const {
              id,
              tempId,
              text,
              time,
              img,
              isActive,
              status,
              sender_id,
              sender,
              created_at,
              read_by,
            } = msg;
            // Determine if message is from current user
            // Handle both sender_id object (from API) and direct ID (from socket/optimistic)
            const senderIdStr =
              typeof sender_id === "object" ? sender_id?._id : sender_id;

            const isSender =
              msg.isSender !== undefined
                ? msg.isSender
                : senderIdStr === currentUserId || sender === currentUserId;

            // Determine status for fetched messages
            // If status is not set (fetched from API), check read_by
            // If read_by contains someone other than sender, it's seen
            let messageStatus = status;
            if (!messageStatus && read_by && Array.isArray(read_by)) {
              const isReadByOthers = read_by.some((id) => id !== senderIdStr);
              messageStatus = isReadByOthers ? "seen" : "delivered";
            } else if (!messageStatus) {
              messageStatus = "sent";
            }

            // Format time if not present
            const displayTime =
              time ||
              (created_at
                ? new Date(created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "");

            return (
              <Box
                key={id || tempId || msg._id}
                sx={{
                  display: "flex",
                  justifyContent: isSender ? "flex-end" : "flex-start",
                  mb: 2,
                  alignItems: "flex-end",
                  gap: isSender ? 0 : 1.5,
                }}
              >
                {!isSender && (
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Box
                      component="img"
                      // src={img || "https://via.placeholder.com/40"}
                      // alt="Profilee"
                      sx={{
                        width: 25,
                        height: 25,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
                <Box
                  sx={{
                    mt: 3,
                    display: "inline-block",
                    maxWidth: "70%",
                    bgcolor: isSender ? "#8EC6EB40" : "#E5E5E5",
                    color: "black",
                    p: 1.3,
                    borderTopLeftRadius: isSender ? "5px" : "5px",
                    borderTopRightRadius: isSender ? "0px" : "5px",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                    position: "relative",
                    fontFamily: "Poppins",
                    mb: 1,
                    opacity: messageStatus === "sending" ? 0.6 : 1,
                    "&::after": isSender
                      ? {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          right: -10,
                          width: 0,
                          height: 0,
                          borderTop: "10px solid #8EC6EB40",
                          borderRight: "10px solid transparent",
                        }
                      : {},
                  }}
                >
                  <Typography sx={{ fontSize: "13px", mb: 1 }}>
                    {text}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 0.5,
                    }}
                  >
                    <Typography sx={{ fontSize: "10px", color: "#565656" }}>
                      {displayTime}
                    </Typography>
                    {isSender &&
                      (messageStatus === "failed" ? (
                        <Typography sx={{ fontSize: "10px", color: "red" }}>
                          ✗
                        </Typography>
                      ) : (
                        <BsCheck2All
                          size={14}
                          color={
                            messageStatus === "seen" ? "#4CAF50" : "#565656"
                          }
                        />
                      ))}
                  </Box>
                </Box>
              </Box>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1,
        }}
      >
        <Box>
          {/* <BsEmojiSmile size={20} /> */}
        </Box>
        <TextField
          fullWidth
          size="small"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Write your message here..."
          variant="outlined"
          disabled={!isConnected}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              paddingRight: "8px",
              fontFamily: "Poppins",
              fontSize: "14px",
            },
          }}
          InputProps={{
            startAdornment: (
              <>
                <InputAdornment position="start">
                  <IoAdd size={20} color="black" />
                </InputAdornment>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              </>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IoMdSend
                  size={22}
                  color={isConnected ? "#4CAF50" : "#D3D3D3"}
                  style={{ cursor: isConnected ? "pointer" : "not-allowed" }}
                  onClick={handleSend}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {!isConnected && (
        <Typography
          sx={{ textAlign: "center", fontSize: "12px", color: "red", mt: 1 }}
        >
          Disconnected - Trying to reconnect...
        </Typography>
      )}
    </Box>
  );
}

export default ChatScreen;
