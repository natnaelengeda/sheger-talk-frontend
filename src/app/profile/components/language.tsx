"use client";
import React from 'react';

// State
import { changeLanguage, UserState } from '@/state/user';
import { useDispatch, useSelector } from 'react-redux';
import { TiTick } from 'react-icons/ti';

export default function Language() {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user);

  return (
    <div className='w-full flex flex-col items-start justify-start gap-2 mb-2'>
      <div className='flex flex-col items-start justify-start gap-2 mb-4'>
        <h1 className='text-primary font-semibold text-base'>Language</h1>
        <hr className='w-20 border border-primary' />
      </div>

      {/* Options */}
      <div
        className='w-full grid grid-cols-3 gap-2'>

        {/* English */}
        <div
          onClick={() => {
            dispatch(changeLanguage({ language: "en" }))
          }}
          className='w-full h-auto flex flex-col items-start justify-start gap-2 '>
          <div
            className={`w-full h-24 rounded-xl bg-[#f6f6f6] overflow-hidden relative ${user.language == "en" ? "border-4 border-blue-600" : "border border-gray-300"}`}>
            <img
              src={`https://flagcdn.com/w320/us.png`}
              className='w-full h-full object-left-top object-cover' />
            <div
              className='w-full h-full bg-white absolute top-14 left-14 rounded-xl p-2 border border-gray-300'>
              <p className='text-lg font-semibold'>Aa</p>
            </div>

            {/* Tick */}
            <div
              style={{ display: user.language == "en" ? "block" : "none" }}
              className="absolute top-0 right-0 p-2">
              <div className='w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center'>
                <TiTick className={`text-sm text-black`} />
              </div>
            </div>

          </div>
          <div>
            {/* Text */}
            <p className=''>English</p>
          </div>
        </div>

        {/* Amharic */}
        <div
          onClick={() => {
            dispatch(changeLanguage({ language: "am" }))
          }}
          className='w-full h-auto flex flex-col items-start justify-start gap-2 '>
          <div
            className={`w-full h-24 rounded-xl bg-[#f6f6f6] overflow-hidden relative ${user.language == "am" ? "border-4 border-red-600" : "border border-gray-300"}`}>
            <img
              src={`https://flagcdn.com/w320/et.png`}
              className='w-full h-full object-center object-cover' />
            <div
              className='w-full h-full bg-white absolute top-14 left-14 rounded-xl p-2 border border-gray-300'>
              <p className='text-lg font-semibold pl-1'>አሀ</p>
            </div>

            {/* Tick */}
            <div
              style={{ display: user.language == "am" ? "block" : "none" }}
              className="absolute top-0 right-0 p-2">
              <div className='w-5 h-5 rounded-full bg-red-700 flex items-center justify-center'>
                <TiTick className={`text-sm text-white`} />
              </div>
            </div>

          </div>
          <div>
            {/* Text */}
            <p className=''>አማረኛ</p>
          </div>
        </div>
      </div>
    </div>
  )
}
