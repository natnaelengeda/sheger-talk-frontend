import React, { useEffect, useState } from 'react'
import Image from 'next/image';

// Redux
import { useSelector } from 'react-redux';
import { UserState } from '@/state/user';

// Sockets
import { useSocket } from '@/context/SocketProvider';

// Toast
import toast from 'react-hot-toast';

// Utils
import { getRandomNumber16 } from '@/utils/randomNumberGenerator1-6';

interface IConnectionRequest {
  visible: boolean;
  id: string;
  sender_id: string;
}

export default function ConnectionRequest({ visible, id, sender_id }: IConnectionRequest) {
  const user = useSelector((state: { user: UserState }) => state.user);
  const socket = useSocket();

  const randomImage = getRandomNumber16();

  const AcceptFunction = () => {
    toast.dismiss(id);

    socket?.emit("accept-chat-request",
      JSON.stringify({
        sender_socket_id: sender_id,
        reciever_socket_id: user.socketId
      }),
    );

  }

  return (
    <div className={`${visible ? 'animate-enter' : 'animate-leave'}  max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto border border-gray-200  ring-1 ring-black ring-opacity-5 flex flex-col items-start justify-start overflow-hidden`}>
      <div
        className={`w-full flex`}>
        <div
          className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Image
                className="h-10 w-10 rounded-full"
                src={randomImage}
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
            onClick={AcceptFunction}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Accept
          </button>
        </div>
      </div>
      {/* Progress Bar */}
      <ProgressBar />

    </div>
  )
}


const ProgressBar = () => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevProgress - 1;
      });
    }, 100); // Decrease progress every 100ms (10 seconds total)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '10px',
        // border: '1px solid #ccc'
      }}>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0, // Anchor to the left
          width: `${progress}%`, // Width decreases from right to left
          height: '10px',
          backgroundColor: '#4f46e5 ',
          transition: 'width 0.1s linear', // Smooth transition
        }}
      ></div>
    </div>
  );
};
