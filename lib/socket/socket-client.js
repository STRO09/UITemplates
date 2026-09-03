import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

const defaultOptions = {
  autoConnect: false,
};

let sharedSocket = null;

/**
 * Creates a new isolated Socket.IO connection.
 */
export function createSocket(options = {}) {
  if (typeof window === "undefined") {
    return null;
  }

  return io(SOCKET_URL, {
    ...defaultOptions,
    ...options,
  });
}

/**
 * Returns the shared Socket.IO connection.
 */
export function getSocket(options = {}) {
  if (!sharedSocket) {
    sharedSocket = createSocket(options);
  }

  return sharedSocket;
}

/**
 * Disconnects and clears the shared socket.
 */
export function destroySharedSocket() {
  if (!sharedSocket) return;

  sharedSocket.disconnect();
  sharedSocket = null;
}
