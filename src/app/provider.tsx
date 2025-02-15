"use client";
import { useEffect } from "react";

// Socket
import { SocketProvider } from "@/context/SocketProvider";

// State
import { Provider } from 'react-redux';
import { persistor, store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import { analytics, firebase } from "@/utils/firebase";

export default function Providers({ children }: { children: React.ReactNode }) {
  const url = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    firebase;
    analytics;
  }, []);

  return (
    <Provider
      store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <SocketProvider
          serverUrl={`${url}/user`}>
          {children}
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
}