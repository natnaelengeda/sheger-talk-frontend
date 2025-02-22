"use client";

import React, { useEffect, Dispatch, SetStateAction, useRef, useState } from 'react';

// Components
import MessageIn from './components/MessageIn';
import MessageOut from './components/MessageOut';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [typing, setTyping] = useState<boolean>(false);

  // Handle Recieve Messages
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
        setTyping(data.isTyping);
      }
    });

    return () => {
      socket?.off("reciever_typing");
    };
  }, [socket]);


  return (
    <div
      className='w-full min-h-[800px] h-auto flex flex-col items-start justify-start gap-3 px-3 py-5 overflow-hidden'>
      {
        messageList.map((message: IMessageData) => {
          if (user.socketId == message.socket_id) {
            return (
              <MessageOut
                key={message.id}
                id={message.id}
                message={message.message}
                time={message.time} />
            );
          } else {
            return (
              <MessageIn
                key={message.id}
                id={message.id}
                message={message.message}
                time={message.time} />
            );
          }
        })}

      {/* Typing Indicator */}
      {
        typing && (
          <div
            className="typing-indicator w-auto max-w-[90%] h-auto min-h-12 min-w-20 bg-black text-white px-2 py-2 rounded-sm flex flex-row items-center justify-center gap-1">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

      <div ref={messagesEndRef} />
    </div >
  )
}
