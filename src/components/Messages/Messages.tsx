"use client";

import React, { useEffect } from 'react'

// Components
import MessageOut from './components/MessageOut';
import MessageIn from './components/MessageIn';

// Styles
import "./styles/styles.css";

// Toast
import AppToast from '@/core/AppToast';


export default function Messages() {

  useEffect(() => {

    AppToast.welcomeNotify();

  }, []);

  return (
    <div
      className='w-full min-h-[800px] h-auto flex flex-col items-start justify-start gap-3 px-3 py-5 overflow-hidden'>

      {/* Message One */}
      <div
        className='w-full h-auto flex flex-row items-center justify-start'>
        <MessageIn />
      </div>

      {/* Message Out */}
      {/* <div
        className='w-full h-auto flex flex-row items-center justify-end'>
        <MessageOut />
      </div> */}


    </div>
  )
}
