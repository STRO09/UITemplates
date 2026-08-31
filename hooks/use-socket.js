"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import createSocket from "@/lib/socket/socket-client";

/**
 * Manages a Socket.IO connection.
 */
export function useSocket({ options = {}, autoConnect = true } = {}) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  if (!socketRef.current) {
    socketRef.current = createSocket(options);
  }

  const socket = socketRef.current;

  const emit = useCallback(
    (event, ...args) => {
      socket?.emit(event, ...args);
    },
    [socket],
  );

  const onEvent = useCallback(
    (event, handler) => {
      socket?.on(event, handler);

      return () => {
        socket?.off(event, handler);
      };
    },
    [socket],
  );

  const offEvent = useCallback(
    (event, handler) => {
      socket?.off(event, handler);
    },
    [socket],
  );

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    if (autoConnect) {
      socket.connect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.disconnect();
    };
  }, [socket, autoConnect]);

  return {
    socket,
    connected,
    emit,
    onEvent,
    offEvent,
  };
}



// USAGE ::: 
// emit("message", message);

// useEffect(() => {
//   return onEvent("message", handleMessage);
// }, [onEvent]);

// offEvent("message", handleMessage);