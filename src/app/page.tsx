"use client";

import { useEffect, useState } from "react";

// Components
import PageStart from "@/components/PageStart";
import Messages from "@/components/Messages";

// Bottom Bar
import BottomBar from "@/components/BottomBar";

// Toast
import { Toaster } from 'react-hot-toast';
import { useSocket } from "@/context/SocketProvider";
import OnlineCounter from "@/components/OnlineCounter";

export default function Home() {
  const [pageState, setPageState] = useState("start");



  return (
    <div
      className="relative w-full h-full flex flex-col-reverse items-start justify-start font-Roboto pb-16">
      {
        pageState == "start" ?
          <PageStart
            setPageState={setPageState} /> :
          pageState == "messaging" ?
            <Messages /> : null
      }

      <OnlineCounter
        pageState={pageState} />

      <BottomBar
        pageState={pageState}
        setPageState={setPageState} />
      <Toaster />
    </div>
  );
}
