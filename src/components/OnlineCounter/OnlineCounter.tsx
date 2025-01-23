"use client";

import React, { useEffect, useState } from 'react'

// Sockets
import { useSocket } from '@/context/SocketProvider';

// Styles
import "./styles/styles.css";

interface PageProps {
  pageState: string;
}

export default function OnlineCounter({ pageState }: PageProps) {
  const socket = useSocket();
  const [onlineUsersNo, setOnlineUsersNo] = useState(0);

  useEffect(() => {
    socket?.on("update-online-users", (data) => {
      setOnlineUsersNo(data)
    })
  }, [socket]);

  return (
    <div
      style={{
        display:
          onlineUsersNo == 0 ? "none" :
            pageState == "messaging" ? "none" : ""
      }}
      className='absolute top-10 right-0 w-auto min-w-40 h-10  counter-class flex items-center justify-end pr-4'>

      {/* Main Content */}
      <div className='relative flex flex-row items-center justify-start gap-2 text-sm font-bold uppercase border border-gray-300 px-3 py-2 rounded-lg shadow '>
        {/* Green Online Dot */}
        <div className='w-[25px] h-[25px]  relative flex items-center justify-center'>
          <div className='w-[15px] h-[15px] rounded-full bg-[#62bd19] relative z-50'>
          </div>

          <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center'>
            <div className='w-[25px] h-[25px] rounded-full  ringring'>
            </div>
          </div>

        </div>
        {/* No of Users */}
        <p>{onlineUsersNo} Users</p>
      </div>

    </div>
  )
}
