"use client";

import { SocketProvider } from "@/context/SocketProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const url = process.env.API_URL || "";

  return (
    <SocketProvider
      serverUrl={url}>
      {children}
    </SocketProvider>
  );
}