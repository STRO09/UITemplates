"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { createSocket, getSocket } from "@/lib/socket/socket-client";

export const SocketContext = createContext(null);

export function SocketProvider({ children, shared = false, options = {} }) {
  const socket = useMemo(
    () => (shared ? getSocket(options) : createSocket(options)),
    [shared, options],
  );

  const [connected, setConnected] = useState(socket?.connected ?? false);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);

      // Only the owner of an isolated socket destroys it.
      if (!shared) {
        socket.disconnect();
      }
    };
  }, [socket, shared]);

  const value = {
    socket,
    connected,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
