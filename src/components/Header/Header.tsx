import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// State
import { useDispatch } from 'react-redux';
import { setIsOpen } from '@/state/sidebar';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Icons
import { RiMenu3Fill } from "react-icons/ri";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <header
      style={{
        zIndex: 30
      }}
      className='w-full h-20 fixed top-0 left-0 overflow-hidden px-5 bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border-b border-gray-100'>

      {/* Main */}
      <div
        className='w-full h-full mx-auto container flex flex-row items-center justify-between'>

        {/* Image */}
        <div
          onClick={() => {
            router.push("/");
          }}
          className='w-16 h-auto p-1'>
          <Image
            src={AppAsset.logo}
            alt="Logo"
            width={70}
            height={70}
            className='object-contain w-16 rounded-2xl overflow-hidden' />
        </div>

        {/* Menu */}
        {/* <Sidebar /> */}
        <div className='hidden'>
          <button
            onClick={() => {
              dispatch(setIsOpen({ isOpen: true }))
            }}
            className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow border-2 border-primary'>
            <RiMenu3Fill
              className='text-2xl text-primary font-bold' />
          </button>
        </div>
      </div>
    </header>
  )
}
