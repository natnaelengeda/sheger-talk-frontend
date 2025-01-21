"use client";

import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'

// Components
import { Button } from '../ui/button';

// Styles
import "./styles/styles.css";

// AppAsset
import AppAsset from '@/core/AppAsset';

interface PageProps {
  setPageState: Dispatch<SetStateAction<string>>
}
export default function PageStart({ setPageState }: PageProps) {
  const [loading, setloading] = useState(false);

  const searchFunction = () => {
    setloading(!loading);
    setTimeout(() => {
      setPageState("messaging");
    }, 2000);
  }

  const changePageState = () => {

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
