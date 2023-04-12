import React, { useState } from "react";

const Nav = ({
  toggle,
  messageNav,
  setMessageNav,
  paramNav,
  setParamNav,
  contactNav,
  setContactNav,
}) => {
  const handleNav = (e) => {
    let parent = e.target;
    console.log(parent);
    for (let i = 0; i < 5; i++) {
      if (parent.id === "messageNav") {
        setMessageNav(true);
        setParamNav(false);
        setContactNav(false);
        break;
      } else if (parent.id === "contactNav") {
        setMessageNav(false);
        setParamNav(false);
        setContactNav(true);
        break;
      } else if (parent.id === "paramNav") {
        setMessageNav(false);
        setParamNav(true);
        setContactNav(false);
        break;
      } else {
        parent = parent.parentNode;
      }
    }
  };
  return (
    <>
      <div
        className="flex flex-row items-center h-16 rounded-t-xl bg-[#fefefe] dark:bg-[#080808] text-black dark:text-white duration-300 w-full justify-between"
        onClick={handleNav}
      >
        <button
          className={`active:bg-indigo-200 
  dark:active:bg-indigo-400 p-2 rounded-xl ${
    messageNav
      ? "bg-indigo-200 dark:bg-indigo-400 text-white"
      : "text-gray-500 dark:hover:text-gray-300 hover:text-black"
  }`}
          id="messageNav"
        >
          <svg
            className="h-6 w-6"
            width="46"
            height="46"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6l-3.99 4V4c0-1.1.89-2 1.99-2Zm14 7H6v2h12V9Zm-4 5H6v-2h8v2ZM6 8h12V6H6v2Z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <button
          className={`active:bg-indigo-200 
              dark:active:bg-indigo-400 p-2 rounded-xl ${
                contactNav
                  ? "bg-indigo-200 dark:bg-indigo-400 text-white"
                  : "text-gray-500 dark:hover:text-gray-300"
              }`}
          id="contactNav"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
            <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
            <path d="M16 3.133a4 4 0 0 1 0 7.75"></path>
            <path d="M21 20.998v-2a4 4 0 0 0-3-3.85"></path>
          </svg>
        </button>

        <button
          id="theme-button"
          onClick={toggle}
          className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 dark:active:bg-indigo-400 active:bg-indigo-200 p-2 rounded-xl"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 9a3 3 0 0 0 0 6V9Z"></path>
            <path d="M6 6h3.5L12 3.5 14.5 6H18v3.5l2.5 2.5-2.5 2.5V18h-3.5L12 20.5 9.5 18H6v-3.5L3.5 12 6 9.5V6Z"></path>
          </svg>
        </button>
        <button
          className={`active:bg-indigo-200 
                dark:active:bg-indigo-400 p-2 rounded-xl ${
                  paramNav
                    ? "bg-indigo-200 dark:bg-indigo-400 text-white"
                    : "text-gray-500 dark:hover:text-gray-300"
                }`}
          id="paramNav"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.723 1.723 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065Z"></path>
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default Nav;
