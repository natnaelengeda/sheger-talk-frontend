"use client";
import React, { useEffect } from 'react'
import Image from 'next/image';

// Socket
import { useSocket } from '@/context/SocketProvider';

// Utils
import { getRandomNumber16 } from '@/utils/randomNumberGenerator1-6';

import toast from 'react-hot-toast';

export default function Notifications() {
  const socket = useSocket();
  const randomImage = getRandomNumber16();

  useEffect(() => {
    socket?.on("recieve-notification", () => {
      toast.custom((t: { visible: string, id: string }) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <Image
                  className="h-10 w-10 rounded-full"
                  src={randomImage}
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Emilia Gates
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Sure! 8:30pm works great!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));

    });

  }, [socket]);

  return (
    <div>

    </div>
  )
}
