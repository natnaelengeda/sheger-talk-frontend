import React from 'react'

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setIsOpen } from '@/state/sidebar';

export default function NavBar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const menuItems = [
    { id: 0, label: "Profile", name: "profile" },
    { id: 1, label: "Chat History", name: "chat_history" },
    { id: 2, label: "Feedback", name: "feedback" },
    { id: 3, label: "Donate", name: "donate" },
  ];

  return (
    <ul
      className={`w-full h-auto pt-24 px-2 flex flex-col items-start justify-start gap-2 pl-4 `}>
      {
        menuItems.map((menu, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                router.push(`/${menu.name}`)
                dispatch(setIsOpen({ isOpen: false }));
              }}
              className='w-full h-12 border-2 border-primary/85 text-primary flex items-center justify-start shadow-md pl-4 rounded-lg'>
              <p
                className='text-base'>
                {menu.label}
              </p>
            </li>
          );
        })
      }
    </ul>
  )
}
