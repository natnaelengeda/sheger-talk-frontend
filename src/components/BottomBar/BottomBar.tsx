"use client";
import React, { Dispatch, SetStateAction, useState } from 'react'

// Compnoents
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import CancelAlert from './components/CancelAlert';

// Socket;
import { useSocket } from '@/context/SocketProvider';

// Emoji Picker
import EmojiPicker,
{
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
  Theme,
} from 'emoji-picker-react';

// Redux
import { useSelector } from 'react-redux';
import { UserState } from '@/state/user';

// Utils
import { generateRandomId } from '@/utils/randomIdGenerator';

// Interface
import { IMessageData } from '@/interface/Message';

// Icons
import { MdOutlineEmojiEmotions } from "react-icons/md";

import toast from 'react-hot-toast';

interface BottomBarProps {
  pageState: string;
  setPageState: Dispatch<SetStateAction<string>>;
  setCurrentMessage: Dispatch<any>;
  setMessageList: Dispatch<SetStateAction<IMessageData[] | []>>;
}

export default function BottomBar({ pageState, setPageState, setCurrentMessage, setMessageList }: BottomBarProps) {
  const socket = useSocket();
  const user = useSelector((state: { user: UserState }) => state.user);

  const [emojiOpened, setEmojiOpened] = useState(false);
  const [cancelOpened, setCancelOpened] = useState(false);

  const [message, setMessage] = useState("");

  const emojiClicked = (emojiData: EmojiClickData) => {
    setMessage(prevousString => prevousString + emojiData.emoji);
  }

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const cancelChat = () => {
    setPageState("start");
    setCancelOpened(false);
  }

  const sendMessage = () => {
    if (message == " ") {
      toast("Enter Message to Send");
    } else {
      const date = new Date();

      const messageData: IMessageData = {
        id: generateRandomId(25),
        room: "123",
        message: message,
        socket_id: user.socketId,
        time: date.toISOString(),
      };

      // Send Message
      socket?.emit("send_message", JSON.stringify(messageData));

      // Set Current Message List
      setMessageList((list: any) => [...list, messageData]);
      setCurrentMessage("");

      // Clear Message After Sending
      setMessage("");
      // }
    }
  }


  return (
    <div
      style={{
        display: pageState == "start" ? "none" : ""
      }}
      className='relative w-full'>
      {/* Text Bar */}
      <div
        className='fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex flex-row items-center justify-start px-2 gap-2'>

        {/* Text Input */}
        <div
          className='w-full relative'>
          <Input
            className='border border-gray-300 outline-none focus:outline-none pr-10'
            placeholder='Enter message...'
            value={message}
            onChange={changeText} />
          <div
            className='h-full absolute top-0 right-0 flex flex-col items-center justify-center pr-3'>
            <MdOutlineEmojiEmotions
              onClick={() => setEmojiOpened(!emojiOpened)}
              className="text-2xl" />
          </div>
        </div>
        <div
          className=''>
          <Button
            onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
      {/* Emoji Picker */}
      <div
        style={{
          display: !emojiOpened ? "none" : ""
        }}
        className='w-96 fixed bottom-20 right-0'>
        <EmojiPicker
          open={emojiOpened}
          theme={Theme.LIGHT}
          emojiStyle={EmojiStyle.APPLE}
          suggestedEmojisMode={SuggestionMode.FREQUENT}
          searchDisabled={true}
          skinTonesDisabled={true}
          lazyLoadEmojis={false}
          onEmojiClick={emojiClicked}
          height={500}
          width={"90%"} />
      </div>

      <CancelAlert
        open={cancelOpened}
        setCancelOpened={setCancelOpened}
        cancelChat={cancelChat} />
    </div>

  )
}
