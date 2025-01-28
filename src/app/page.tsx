"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Components
import PageStart from "@/components/PageStart";
import Messages from "@/components/Messages";

// Bottom Bar
import BottomBar from "@/components/BottomBar";

// Toast
import { Toaster } from 'react-hot-toast';
import { useSocket } from "@/context/SocketProvider";
import OnlineCounter from "@/components/OnlineCounter";
import Notifications from "@/components/Notifications";
import { checkPermissionStateAndAct, notificationUnsupported, registerAndSubscribe, sendWebPush } from "./Push";

export default function Home() {
  const [pageState, setPageState] = useState<string>("start");
  const [unsupported, setUnsupported] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const socket = useSocket();

  useEffect(() => {
    const isUnsupported = notificationUnsupported();
    setUnsupported(isUnsupported);

    if (isUnsupported) {
      return;
    }
    checkPermissionStateAndAct(setSubscription);
  }, []);

  useEffect(() => {
    socket?.on("notification-all", (data) => {
      // console.log(data);
      sendWebPush(data);
    })

    socket?.on("notification-personal", (data) => {
      // console.log(data);
      sendWebPush(data);
    });

  }, [socket]);


  return (
    <div
      className="relative w-full h-full flex flex-col-reverse items-start justify-start font-Roboto pb-16 overflow-xhidden">
      {/* <button
        disabled={unsupported}
        onClick={() => registerAndSubscribe(setSubscription)}
        className="px-3 py-2 bg-primary text-white rounded-lg m-20">
        {unsupported
          ? 'Notification Unsupported'
          : subscription
            ? 'Notification allowed'
            : 'Allow notification'}
      </button>

      <code className="m-24">
        {subscription
          ? JSON.stringify(subscription?.toJSON(), undefined, 2)
          : 'There is no subscription'}
      </code>

      {subscription ? (
        <>
          <input
            placeholder={'Type push message ...'}
            value={message ?? ''}
            onChange={e => setMessage(e.target.value)}
          />
          <button
            className="px-3 py-2 bg-primary text-white rounded-lg m-20"
            onClick={() => sendWebPush(message)}>Test Web Push</button>
        </>
      ) : null} */}

      {
        pageState == "start" ?
          <PageStart
            setPageState={setPageState} /> :
          pageState == "messaging" ?
            <Messages /> : null
      }

      <OnlineCounter
        pageState={pageState} />

      <Notifications />

      <BottomBar
        pageState={pageState}
        setPageState={setPageState} />

      <Toaster />
    </div>
  );
}
