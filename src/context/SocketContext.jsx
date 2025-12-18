import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  connectSocket,
  disconnectSocket,
  getSocket,
  updateSocketAuth,
} from "../utils/socket";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const useSocketEvent = (eventName, handler) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on(eventName, handler);

    return () => {
      socket.off(eventName, handler);
    };
  }, [socket, eventName, handler]);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      // If no token, ensure socket is disconnected and return
      disconnectSocket();
      setIsConnected(false);
      setSocket(null); // Clear socket state if no token
      return;
    }

    // If token exists, we should ensure socket is connected and authenticated
    updateSocketAuth();
    const socketInstance = connectSocket();

    // Only set state if it's different to avoid re-renders (though objects check by ref)
    if (socket !== socketInstance) {
      setSocket(socketInstance);
    }

    const handleConnect = () => {
      setIsConnected(true);
      setError(null);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleError = (err) => {
      setError(err);
      console.error("Socket error:", err);
    };

    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);
    socketInstance.on("connect_error", handleError);

    // Check if already connected (sync)
    if (socketInstance.connected) {
      setIsConnected(true);
    }

    return () => {
      socketInstance.off("connect", handleConnect);
      socketInstance.off("disconnect", handleDisconnect);
      socketInstance.off("connect_error", handleError);

      // When token changes or unmount, we disconnect to ensure clean state for next run
      disconnectSocket();
      setIsConnected(false);
      // We don't necessarily need to set socket to null here if we are just re-running effect
      // But clearing it is safer for !socket check if we kept it.
      // Since we removed !socket check, we just rely on connectSocket() returning singleton.
    };
  }, [socket]); // Added socket to dependencies to react to its changes, though connectSocket returns singleton

  const emit = useCallback(
    (eventName, data) => {
      if (socket && isConnected) {
        socket.emit(eventName, data);
      } else {
        console.warn("Socket not connected. Cannot emit event:", eventName);
      }
    },
    [socket, isConnected]
  );

  const value = {
    socket,
    isConnected,
    error,
    emit,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
