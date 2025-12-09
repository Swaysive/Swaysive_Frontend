import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { connectSocket, disconnectSocket, getSocket } from '../utils/socket';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
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
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      return;
    }

    const socketInstance = connectSocket();
    setSocket(socketInstance);

    const handleConnect = () => {
      setIsConnected(true);
      setError(null);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleError = (err) => {
      setError(err);
      console.error('Socket error:', err);
    };

    socketInstance.on('connect', handleConnect);
    socketInstance.on('disconnect', handleDisconnect);
    socketInstance.on('connect_error', handleError);

    return () => {
      socketInstance.off('connect', handleConnect);
      socketInstance.off('disconnect', handleDisconnect);
      socketInstance.off('connect_error', handleError);
      disconnectSocket();
    };
  }, []);

  const emit = useCallback((eventName, data) => {
    if (socket && isConnected) {
      socket.emit(eventName, data);
    } else {
      console.warn('Socket not connected. Cannot emit event:', eventName);
    }
  }, [socket, isConnected]);

  const value = {
    socket,
    isConnected,
    error,
    emit,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
