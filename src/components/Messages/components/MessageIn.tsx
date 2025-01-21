import React from 'react'

export default function MessageIn() {
  return (
    <div className='w-auto max-w-[90%] h-auto min-h-10 min-w-20 bg-black text-white px-2 py-2 rounded-sm flex flex-col gap-1'>

      {/* Message */}
      <div>
        <p
          className='text-container'>
          Hello My Name is Natnael Engeda
        </p>
      </div>

      {/* Time */}
      <div className='w-full flex items-end justify-end px-2'>
        <p className='text-sm'>11:12 AM</p>
      </div>
    </div>
  )
}
