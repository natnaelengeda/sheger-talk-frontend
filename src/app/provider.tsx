"use client";
import { useEffect } from "react";

// Socket
import { SocketProvider } from "@/context/SocketProvider";

// State
import { Provider } from 'react-redux';
import { persistor, store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

// Firebase
import { analytics, firebase } from "@/utils/firebase";

// Progress Bar
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

// Components
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Providers({ children }: { children: React.ReactNode }) {
  const url = process.env.NEXT_PUBLIC_API_URL || "";

  // Initialize Firebase
  const InitializeFirebase = () => {
    try {
      console.log(firebase);
      console.log(analytics);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    InitializeFirebase();
  }, []);



  const App = () => {
    return (
      <SocketProvider
        serverUrl={`${url}/user`}>
        <div
          className="w-full h-full flex flex-col items-start justify-start relative">
          <Header />
          <Sidebar />
          {children}
        </div>
      </SocketProvider>
    );
  }

  return (
    <Provider
      store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <ProgressBar
          height="4px"
          color="#000000"
          options={{ showSpinner: false }}
          shallowRouting />
        <App />
      </PersistGate>
    </Provider>
  );
}
