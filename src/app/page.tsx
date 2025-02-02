"use client";

import {
  // Dispatch,
  // SetStateAction,
  useEffect,
  useState
} from "react";

// Components
import PageStart from "@/components/PageStart";
import Messages from "@/components/Messages";

// Bottom Bar
import BottomBar from "@/components/BottomBar";

// Socket
import { useSocket } from "@/context/SocketProvider";

// Components
import OnlineCounter from "@/components/OnlineCounter";
import Notifications from "@/components/Notifications";
import {
  checkPermissionStateAndAct,
  notificationUnsupported,
  // registerAndSubscribe,
  sendWebPush
} from "./Push";

// Toast
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [pageState, setPageState] = useState<string>("start");
  const [unsupported, setUnsupported] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const socket = useSocket();

  if (false) {
    console.log(unsupported, subscription, message)
    setMessage("");
  }

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


  // Recieve
  useEffect(() => {
    socket?.on("request-connection-client", (data) => {
      const socketMessage = JSON.parse(data);
      const sender_id = socketMessage.sender_id;
      console.log(sender_id)

      toast.custom((t: { visible: string, id: string }) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://avatar.iran.liara.run/public"
                  alt="Random Avatar"
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Someone Wants to Talk with you...
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Accept before 10 Seconds
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Accept
            </button>
          </div>
        </div>
      ));

      console.log(data);
    })
  }, [socket]);

  return (
    <div
      className="relative w-full h-full flex flex-col-reverse items-start justify-start font-Roboto pb-16 overflow-x-hidden">
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
