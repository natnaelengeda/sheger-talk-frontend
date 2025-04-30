import React from 'react';

// Components
import Theme from './components/theme';

export default function Page() {

  return (
    <div
      className='w-full h-full flex flex-col items-start justify-start pt-28 px-5 font-Roboto'>
      {/* Title */}
      <div className='flex flex-col items-start justify-start gap-1 mb-5'>
        <h1 className='text-primary font-semibold text-lg'>Change Theme</h1>
        <hr className='w-20 border border-primary' />
      </div>

      <Theme />

    </div>
  )
}
