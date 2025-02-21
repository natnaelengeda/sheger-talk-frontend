import React from 'react'

interface IMessageOut {
  id: string;
  message: string;
  time: string;
}

export default function MessageOut({ id, message, time }: IMessageOut) {

  return (
    <div
      key={id}
      className='w-auto max-w-[90%] h-auto min-h-10 min-w-20 border border-gray-200 shadow-md bg-gray-50 text-black px-2 py-2 rounded-sm flex flex-col gap-1 self-end'>
      <div>
        <p
          className='text-container'>
          {message}
        </p>
      </div>
      {/* Time */}
      <div className='w-full flex items-end justify-end px-2'>
        <p
          className='text-sm'>
          {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
        </p>
      </div>
    </div>
  )
}
