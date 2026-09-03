"use client";

import { useCallback, useContext } from "react";
import { SocketContext } from "@/providers/socket-provider";

/**
 * Provides access to the Socket.IO connection managed by SocketProvider.
 *
 * Use `onEvent` to subscribe to events; the returned function removes the listener.
 */
export function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider.");
  }

  const { socket, connected } = context;

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

  return {
    socket,
    connected,
    emit,
    onEvent,
    offEvent,
  };
}

// Usage:
// 1. Isolated socket:
// <SocketProvider shared={false}>...</SocketProvider>
//
// 2. Shared socket:
// <SocketProvider shared>...</SocketProvider>
//
// Components access the provider's socket through:
// const { connected, emit, onEvent } = useSocket();
