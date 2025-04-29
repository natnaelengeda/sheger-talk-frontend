"use client";

//Sidebar.js
import React, { useState, useEffect } from 'react';

// Styles
import styles from './styles/sidebar.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, SidebarState } from '@/state/sidebar';

// Icons
import { HiOutlineXMark } from "react-icons/hi2";
import Ads from './components/Ads';
import NavBar from './components/NavBar';

const Sidebar = () => {
  const sidebar = useSelector((state: { sidebar: SidebarState }) => state.sidebar);
  const dispatch = useDispatch();

  const [sidebarWidth, setSidebarWidth] = useState(16);
  const [navStyle, setNavStyle] = useState<string>("");

  // Effect to update sidebar width when isOpen state changes
  useEffect(() => {
    // Get sidebar element
    const sidebarElement =
      document.querySelector(`.${styles.sidebar}`);
    if (sidebarElement) {
      // Calculate width based on isOpen state
      const width =
        sidebar.isOpen ? (sidebarElement as HTMLElement).offsetWidth : 0;
      setSidebarWidth(width);
    }

    // Show Navbar Options
    if (sidebar.isOpen) {
      const timeout = setTimeout(() => {
        setNavStyle(styles.navVisible);
      }, 300); // match CSS duration
      return () => clearTimeout(timeout);
    } else {
      setNavStyle("");
    }

  }, [sidebar.isOpen]);

  return (
    <div
      className={`${styles.container} flex h-full min-h-[100dvh] overflow-hidden ${sidebar.isOpen ? `${styles.containerIsOpen}` : `${styles.containerIsClosed}`} overflow-hidden`}>
      {/* Sidebar */}
      <div
        // Adjusted width based on isOpen state
        style={{
          display: sidebar.isOpen ? `flex` : `none`,
          // width: sidebar.isOpen ? '19rem' : '5rem'
        }}
        className={`${styles.sidebar} ${sidebar.isOpen ? styles.sidebarOpen : styles.sidebarClosed} flex flex-col items-start justify-start gap-3 ${styles.nav} ${navStyle} overflow-hidden`}>
        {/* Sidebar content */}
        <NavBar />
        {/* Add Section */}
        <Ads />
      </div>
      {/* Main content */}
      <div

        className={`${styles.content} 
                  flex-1 p-4 pr-10
                  ${sidebar.isOpen ? styles.contentShifted : styles.contentShiftedBack}`}>
        {/* Button to toggle sidebar */}
        <button
          className={`w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow border-2 border-white ${styles.toggleButton}`}
          onClick={() => dispatch(setIsOpen({ isOpen: false }))}
          style={{
            zIndex: sidebar.isOpen ? `100` : `1`,
            display: !sidebar.isOpen ? `none` : ``,
            // Adjusted button position based on sidebar width
            right: sidebar.isOpen ? `calc(${sidebarWidth}px - 280px)` : '20px'
          }} >

          {/* Show x Icon when Open */}
          {sidebar.isOpen && (
            <HiOutlineXMark
              onClick={() => {
                // dispatch(setIsOpen({ isOpen: true }))
              }}
              className='text-3xl text-white font-bold' />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
