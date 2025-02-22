"use client";

import {
  // Dispatch,
  // SetStateAction,
  useEffect,
  useState
} from "react";

// Components
import PageStart from "@/components/PageStart";
import Messages from "@/components/Messages/Messages";

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
  sendWebPush,
} from "./Push";

// Redux
import { useSelector } from "react-redux";
import { UserState } from "@/state/user";

// Toast
import toast, { Toaster } from 'react-hot-toast';
import ConnectionRequest from "@/components/ConnectionRequest";

// Interface
import { IMessageData } from "@/interface/Message";

export default function Home() {
  const user = useSelector((state: { user: UserState }) => state.user);

  // States
  const [pageState, setPageState] = useState<string>("start");
  // const [pageState, setPageState] = useState<string>("messagings");
  const [unsupported, setUnsupported] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  // const [message, setMessage] = useState<string | null>(null);

  // Socket
  const socket = useSocket();

  // Messages
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<Array<IMessageData> | []>([]);

  // Connection Request
  // const [seconds, setSeconds] = useState<number>(10);

  // Use Effects
  useEffect(() => {
    console.log(unsupported, subscription);
    const isUnsupported = notificationUnsupported();
    setUnsupported(isUnsupported);

    if (isUnsupported) {
      console.log(currentMessage)
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
      const sender_id = socketMessage.sender_socket_id;

      toast.custom((t: { visible: boolean, id: string }) => (
        <ConnectionRequest
          visible={t.visible}
          id={t.id}
          sender_id={sender_id} />
      ), {
        duration: 10000,
      });
    })
  }, [socket]);

  // Start Chat
  useEffect(() => {
    socket?.on("start-chat", (data) => {
      const dataJSON = JSON.parse(data);
      const body = {
        userId: user.userId,
        room: dataJSON.room_id,
        socketId: user.socketId
      }
      console.log(body);
      
      socket?.emit("join-room", JSON.stringify(body));
    });

    socket?.on("joined-room", (data) => {
      const dataJSON = JSON.parse(data);
      const room = dataJSON.room_id;

      localStorage.setItem("room", room);
      setPageState("messaging");
    });

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
          <PageStart /> :
          pageState == "messaging" ?
            <Messages
              messageList={messageList}
              setMessageList={setMessageList}
            /> : null
      }

      <OnlineCounter
        pageState={pageState} />

      <Notifications />

      <BottomBar
        pageState={pageState}
        setPageState={setPageState}
        setCurrentMessage={setCurrentMessage}
        setMessageList={setMessageList} />

      <Toaster />
    </div>
  );
}
