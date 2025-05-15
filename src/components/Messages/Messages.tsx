"use client";

import React, { useEffect, Dispatch, SetStateAction, useRef } from 'react';

// Socket
import { useSocket } from '@/context/SocketProvider';

// Redux
import { useSelector } from 'react-redux';
import { UserState } from '@/state/user';

// Interface 
import { IMessageData, ITypingData } from '@/interface/Message';

// Toast
import AppToast from '@/core/AppToast';

// Styles
import "./styles/styles.css";


interface IMessagesPage {
  messageList: IMessageData[],
  setMessageList: Dispatch<SetStateAction<IMessageData[] | []>>;
}

export default function Messages({ messageList, setMessageList }: IMessagesPage) {
  const socket = useSocket();
  const user = useSelector((state: { user: UserState }) => state.user);
  // const messagesEndRef = useRef<HTMLDivElement>(null);

  // const [typing, setTyping] = useState<boolean>(false);

  // // Handle Recieve Messages
  useEffect(() => {
    socket?.on("receive_message", (data) => {
      const inData: IMessageData = JSON.parse(data);

      setMessageList((list: IMessageData[]) => {
        if (list.some((msg: IMessageData) => msg.id === inData.id)) {
          return list;
        } else {
          return [...list, inData];
        }
      });
    });
  }, [socket]);

  // Send Welcome Toast
  useEffect(() => {
    AppToast.welcomeNotify();
  }, []);

  // Scroll To Bottom After Message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  // Listen for typing events
  useEffect(() => {
    socket?.on("reciever_typing", (message) => {
      const data: ITypingData = JSON.parse(message)
      if (data.socket_id != user.socketId) {
        // setTyping(data.isTyping);
      }
    });

    return () => {
      socket?.off("reciever_typing");
    };
  }, [socket]);
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom()
  }, [messageList])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="w-full flex flex-col h-screen bg-gray-100">
      <div className='h-28'>
      </div>
      {/* Messages container - flex-grow to take available space */}
      <div className="flex-grow overflow-y-auto p-4 flex flex-col-reverse">
        <div className="flex flex-col">
          {/* Scroll anchor at the beginning of the reversed list */}
          <div ref={messagesEndRef} />

          {/* Messages displayed in chronological order */}
          {
            messageList.map((message: IMessageData) => (
              <div key={message.id} className={`max-w-[80%] mb-4 ${user.socketId == message.socket_id ? "ml-auto" : "mr-auto"}`}>
                <div
                  className={`p-3 rounded-lg ${user.socketId == message.socket_id
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}>
                  {message.message}
                </div>
                <div className='w-full flex items-end justify-end px-2'>
                  <p
                    className='text-xs'>
                    {new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div ref={messagesEndRef} />
      <div className='h-16'>
      </div>
    </div>
  )
}
