import React from 'react'

export default function MessageOut() {
  return (
    <div className='w-auto max-w-[90%] h-auto min-h-10 min-w-20 border border-gray-200 shadow-md bg-gray-50 text-black px-2 py-2 rounded-sm flex flex-col gap-1'>
      <div>
        <p
          className='text-container'>
          Nice to Meet you Nigga!!! lorem
        </p>
      </div>
      {/* Time */}
      <div className='w-full flex items-end justify-end px-2'>
        <p className='text-sm'>11:12 AM</p>
      </div>
    </div>
  )
}
