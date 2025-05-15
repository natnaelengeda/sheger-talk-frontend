"use client";

import React, { useEffect, useState } from 'react'

// Skeleton Loading
import Skeleton from 'react-loading-skeleton';

// Async Image
import { AsyncImage } from 'loadable-image';
import { Blur } from 'transitions-kit'

export default function Ads() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<[]>([]);


  useEffect(() => {
    setIsLoading(true);
    setData([]);
  }, []);
  const highlights = [
    {
      name: "AI Writing Assistant",
      description: "Boost your productivity with intelligent content suggestions and grammar correction powered by AI.",
      image: "https://picsum.photos/seed/ai/300/200"
    },
    {
      name: "Dark Mode Update",
      description: "Enjoy a sleek new dark theme that's easier on your eyes during nighttime sessions.",
      image: "https://picsum.photos/seed/darkmode/300/200"
    },
    {
      name: "Team Collaboration",
      description: "Work with your teammates in real-time, share feedback, and streamline your workflow.",
      image: "https://picsum.photos/seed/team/300/200"
    },
    {
      name: "Mobile Experience",
      description: "Our new mobile layout is optimized for smaller screens, delivering a faster and smoother user experience.",
      image: "https://picsum.photos/seed/mobile/300/200"
    }
  ];

  return (
    <div
      className='relative w-full h-full flex flex-col items-start justify-start gap-3 overflow-y-scroll'>

      {/* Title */}
      <div className='w-full px-5'>
        <h1 className='text-2xl text-primary font-bold'>Featured</h1>
        <hr className='w-20 border- border-primary' />
      </div>

      {/* Ads */}
      <div
        className='w-full h-[26rem] grid grid-cols-1 px-3 gap-3 mb-20'>
        {
          !isLoading &&
          data.length == 0 &&
          <div className='w-full flex items-center justify-center'>
            <h1 className='text-lg text-primary'>No Featured Products</h1>
          </div>
        }

        {
          !isLoading &&
          data.length != 0 &&
          highlights.map((item, index) => {
            return (
              <div
                key={index}
                className='w-full h-60 flex flex-col items-start border border-gray-200 bg-white rounded-lg overflow-hidden'>
                <div className='flex- w-full h-40'>
                  <AsyncImage
                    src={item.image}
                    style={{ width: "100%", height: "100%" }}
                    Transition={props => <Blur
                      radius={10}
                      color='#0F4C81'
                      {...props} />} />
                </div>

              </div>
            );
          })
        }

        {
          isLoading &&
          [1, 2, 3].map((_, index) => {
            return (
              <div
                key={index}
                className='w-full h-60 items-start border border-gray-200 bg-white rounded-lg overflow-hidden'>
                {/* Image */}
                <div
                  className='w-full h-40 bg-gray-200'>
                  <Skeleton
                    className='w-full h-full' />
                </div>

                {/* Text */}
                <div className='w-full flex flex-col items-start justify-start gap-2 px-4 pt-3'>
                  <div className='h-4 w-20'>
                    <Skeleton
                      className='w-full h-full' />
                  </div>

                  <div className='h-4 w-60'>
                    <Skeleton
                      className='w-full h-full' />
                  </div>

                </div>
              </div>
            );
          })
        }
        <div className='h-20'>

        </div>
      </div>
    </div>
  )
}
