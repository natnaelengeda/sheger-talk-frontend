"use client";

import React, { useState } from 'react';
import Image from 'next/image';

// Components
import { Button } from '../ui/button';

// Axios
import axios from "@/utils/axios";

// Redux
import { UserState } from '@/state/user';
import { useSelector } from 'react-redux';

// Socket
import { useSocket } from '@/context/SocketProvider';

// Styles
import "./styles/styles.css";

// Toast
import toast from 'react-hot-toast';

// AppAsset
import AppAsset from '@/core/AppAsset';

export default function PageStart() {
  const user = useSelector((state: { user: UserState }) => state.user);
  const socket = useSocket();

  const [loading, setloading] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);

  const searchFunction = () => {
    setloading(true);
    axios.get(`/online/${user.socketId}`)
      .then((response) => {
        const status = response.status;

        if (status == 200) {
          // const result = response.data;

          const random_socket_id = response.data.id;
          setShowWaiting(true);
          socket?.emit(
            "request-connection",
            JSON.stringify({
              sender_socket_id: user.socketId,
              reciever_socket_id: random_socket_id
            }));
        } else if (status == 201) {
          toast.error("Unable to Find Someone for you");
          setloading(false);
        }
      }).catch(() => {
        toast.error("Unable to Find Someone for you");
        setloading(false);
      });
  }

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showWaiting) {
      timer = setTimeout(() => {
        setShowWaiting(false);
        setloading(false);
        toast.error("No response received. Please try again.");
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [showWaiting]);

  return (
    <div
      className='relative w-full h-full flex flex-col items-center justify-start pt-40 gap-10 water-heartbeat'>

      {/* Sheger Talk Logo */}
      <div
        className='relative w-full h-full flex items-center justify-center'>
        <Image
          className={`relative w-32 h-32 rounded-2xl border border-gray-300 shadow-xl object-contain z-10 ${loading ? "heartbeat" : ""}`}
          src={AppAsset.logo}
          alt="Sheger Talk Logo" />
        <section
          className={loading ? "micro" : ""}>
        </section>
      </div>

      <p
        style={{
          zIndex: 3,
        }}
        className='text-xl relative'>
        Start Chatting With People Online
      </p>

      {
        showWaiting &&
        <p>Waiting for them to Accept</p>
      }

      <div className={`${showWaiting ? "pt-1" : "pt-10"}`}>
        <Button
          className='w-40 h-12 text-lg'
          onClick={searchFunction}
          disabled={loading}>
          {
            loading ?
              "Looking..." :
              "Start Looking"
          }
        </Button>
      </div>

    </div>
  )
}
