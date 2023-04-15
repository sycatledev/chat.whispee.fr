import React, { useState } from "react";
import { Tooltip } from "flowbite-react";

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
      } else {
        parent = parent.parentNode;
      }
    }
  };
  return (
    <>
      <div
        className="flex flex-row items-center rounded-t-xl text-black dark:text-white duration-200 w-full justify-around p-2 border-b-[1px] border-neutral-200 dark:border-neutral-600"
        onClick={handleNav}
      >
        <Tooltip
          content="Click here to access to your chats"
          animation="duration-200"
        >
          <button
            className={`p-2 rounded-xl ${
              messageNav
                ? "dark:text-white text-black"
                : "text-gray-500 dark:hover:text-gray-300 hover:text-black"
            }`}
            id="messageNav"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 18h2v4.081L11.101 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2Z"></path>
              <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2Z"></path>
            </svg>
          </button>
        </Tooltip>
        <Tooltip
          content="Click here to access to your friends"
          animation="duration-200"
        >
          <button
            className={`p-2 rounded-xl ${
              contactNav
                ? "dark:text-white text-black"
                : "text-gray-500 dark:hover:text-gray-300 hover:text-black"
            }`}
            id="contactNav"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 2H6a2 2 0 0 0-2 2v3H2v2h2v2H2v2h2v2H2v2h2v3a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-8 2.999c1.648 0 3 1.351 3 3A3.012 3.012 0 0 1 13 11c-1.647 0-3-1.353-3-3.001 0-1.649 1.353-3 3-3ZM19 18H7v-.75c0-2.219 2.705-4.5 6-4.5s6 2.281 6 4.5V18Z"></path>
            </svg>
          </button>
        </Tooltip>
      </div>
    </>
  );
};

export default Nav;
