"use client";
import React from 'react';

// State
import { changeTheme, UserState } from '@/state/user';
import { useDispatch, useSelector } from 'react-redux';

// Icons
import { TiTick } from "react-icons/ti";

export default function Theme() {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user);

  return (
    <div className='w-full flex flex-col items-start justify-start gap-2 mb-2'>
      <div className='flex flex-col items-start justify-start gap-2 mb-4'>
        <h1 className='text-primary font-semibold text-base'>Change Theme</h1>
        <hr className='w-20 border border-primary' />
      </div>

      {/* Options */}
      <div
        className='w-full grid grid-cols-3 gap-2'>

        {/* Light Theme */}
        <div
          onClick={() => {
            dispatch(changeTheme({ theme: "light" }))
          }}
          className='w-full h-auto flex flex-col items-start justify-start gap-2 '>
          <div
            className={`w-full h-24 rounded-xl bg-[#f6f6f6] overflow-hidden relative ${user.theme == "light" ? "border-4 border-black" : "border border-gray-300"}`}>
            <div className='w-full h-full bg-white absolute top-7 left-7 rounded-xl p-2 border border-gray-300'>
              <p className='text-lg font-semibold'>Aa</p>
            </div>

            {/* Tick */}
            <div
              style={{ display: user.theme == "light" ? "block" : "none" }}
              className="absolute  bottom-0 right-0 p-2">
              <div className='w-5 h-5 rounded-full bg-black flex items-center justify-center'>
                <TiTick className={`text-sm text-white`} />
              </div>
            </div>

          </div>
          <div>
            {/* Text */}
            <p className=''>Light</p>
          </div>
        </div>

        {/* Dark Theme */}
        <div
          onClick={() => {
            dispatch(changeTheme({ theme: "dark" }))
          }}
          className='w-full h-auto flex flex-col items-start justify-start gap-2 '>
          <div
            className={`w-full h-24 rounded-xl bg-[#4e4e4e] overflow-hidden relative ${user.theme == "dark" ? "border-4 border-black" : "border border-gray-500"}`}>
            <div className='w-full h-full bg-[#161616] absolute top-7 left-7 rounded-xl p-2 border border-gray-700'>
              <p className='text-lg font-semibold text-white'>Aa</p>
            </div>

            {/* Tick */}
            <div
              style={{ display: user.theme == "dark" ? "block" : "none" }}
              className="absolute  bottom-0 right-0 p-2">
              <div className='w-5 h-5 rounded-full bg-white flex items-center justify-center'>
                <TiTick className={`text-sm text-black font-bold`} />
              </div>
            </div>
          </div>
          <div>
            {/* Text */}
            <p>Dark</p>
          </div>
        </div>

        {/* System */}
        <div
          onClick={() => {
            dispatch(changeTheme({ theme: "system" }))
          }}
          className='w-full h-auto flex flex-col items-start justify-start gap-2 '>
          <div
            className={`relative w-full h-24 grid grid-cols-2 rounded-xl overflow-hidden ${user.theme == "system" ? "border-4 border-black" : "border border-gray-300"}`}>

            {/* Dark Side */}
            <div className='w-full h-24 bg-[#4e4e4e] overflow-hidden relative '>
              <div className='w-full h-full bg-[#161616] absolute top-7 left-3 rounded-xl p-2 border border-gray-700'>
                <p className='text-lg font-semibold text-white'>Aa</p>
              </div>
            </div>

            {/* Light Side */}
            <div className='w-full h-24  bg-[#f6f6f6] overflow-hidden relative'>
              <div className='w-full h-full bg-white absolute top-7 left-3 rounded-xl p-2 border border-gray-300'>
                <p className='text-lg font-semibold'>Aa</p>
              </div>
            </div>

            {/* Tick */}
            <div
              style={{ display: user.theme == "system" ? "block" : "none" }}
              className="absolute  bottom-0 right-0 p-2">
              <div className='w-5 h-5 rounded-full bg-black flex items-center justify-center'>
                <TiTick className={`text-sm text-white`} />
              </div>
            </div>

          </div>
          <div>
            {/* Text */}
            <p>System</p>
          </div>
        </div>


      </div>
    </div>
  )
}
