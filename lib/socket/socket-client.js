import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

/**
 * Creates a Socket.IO client.
 *
 * Returns null when called without a browser environment.
 */
export default function createSocket(options = {}) {
  if (typeof window === "undefined") {
    return null;
  }

  return io(SOCKET_URL, {
    autoConnect: false,
    ...options,
  });
}
