"use client";

import React from 'react';

// Components
import Theme from './components/theme';
import Language from './components/language';
import Link from 'next/link';

export default function Page() {

  return (
    <div
      className='w-full h-full flex flex-col items-start justify-start pt-28 px-5 font-Roboto'>
      {/* Title */}
      <div className='flex flex-col items-start justify-start gap-1 mb-5'>
        <h1 className='text-primary font-semibold text-lg'>Appearance</h1>
        <hr className='w-20 border border-primary' />
      </div>
      <Theme />
      <Language />

      <div className='pt-20'>
        {/* <Button
          onClick={() => router.push("/")}>
          Go Back Home
        </Button> */}
        <Link
          href={"/"}>
          Go Back Home
        </Link>

      </div>
    </div>
  )
}
