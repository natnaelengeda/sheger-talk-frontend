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

// App Toast
import AppToast from "@/core/AppToast";
import OnlineCounter from "@/components/OnlineCounter";
// import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";

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

      const type = dataJSON.type;

      if (type == "sender") {
        const user1_id = dataJSON.user1_id;
        const user2_id = dataJSON.user2_id;

        const body = {
          type: dataJSON.type,
          userId: user.userId,
          user1_id: user1_id,
          user2_id: user2_id,
          room: dataJSON.room_id,
          socketId: user.socketId
        }

        socket?.emit("join-room", JSON.stringify(body));
      } else {
        const body = {
          type: dataJSON.type,
          userId: user.userId,
          room: dataJSON.room_id,
          socketId: user.socketId
        }

        socket?.emit("join-room", JSON.stringify(body));
      }

    });

    socket?.on("joined-room", (data) => {
      const dataJSON = JSON.parse(data);
      const room = dataJSON.room_id;

      localStorage.setItem("room", room);
      setPageState("messaging");
    });


    socket?.on("left-room", (data) => {
      const dataJSON = JSON.parse(data);
      const room = localStorage.getItem("room");

      if (room == dataJSON.room) {
        AppToast.chatEndedUser();

        setPageState("start");
        setCurrentMessage("");
        setMessageList([]);

        const data = {
          userId: user.userId,
          room: room,
          socketId: user.socketId,
        };

        socket?.emit("l-room", JSON.stringify(data));
        localStorage.setItem("room", "");

      }
    })

    socket?.on("user-left-chat", (room) => {
      AppToast.UserDisconnected();

      setPageState("start");
      setCurrentMessage("");
      setMessageList([]);

      const sendData = {
        userId: user.userId,
        room: room,
        socketId: user.socketId
      };

      socket?.emit("l-room", JSON.stringify(sendData));
      localStorage.setItem("room", "");
    })

  }, [socket]);

  return (
    <div className="w-full h-full relative flex flex-col items-start justify-start">

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

