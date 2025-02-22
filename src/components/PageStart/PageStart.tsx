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

  const searchFunction = () => {
    setloading(true);
    axios.get(`/online/${user.socketId}`)
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          const random_socket_id = response.data;

          setloading(false);
          socket?.emit(
            "request-connection",
            JSON.stringify({
              sender_socket_id: user.socketId,
              reciever_socket_id: random_socket_id
            }));
        }
      }).catch((error) => {
        console.error(error);
        toast.error("Unable to Find Someone for you");
      });

  }

  return (
    <div
      className='relative w-full h-full flex flex-col items-center justify-start pt-60 gap-10 water-heartbeat'>

      {/* Sheger Talk Logo */}
      <div
        className='relative w-full h-full flex items-center justify-center'>
        <Image
          className={`relative w-32 h-32 object-contain z-50 ${loading ? "heartbeat" : ""}`}
          src={AppAsset.logo}
          alt="Sheger Talk Logo" />
        <section
          className={loading ? "micro" : ""}>
        </section>
      </div>

      <p>Start Chatting With People Online</p>

      <div className='pt-10'>
        <Button
          onClick={searchFunction}>
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
