import React from "react";

const EmptyChatContainer = () => {
  return (
    <>
      <div
        id="chat-header"
        className="flex flex-row items-center h-16 lg:rounded-t-xl bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white duration-200 w-full px-2"
      ></div>
      <div
        id="chat-content"
        className="flex flex-col h-full overflow-x-auto p-4 my-2"
      >
        <div className="flex flex-col h-full rounded-2xl">
          <div
            className="grid grid-cols-12 gap-y-2"
            id="messages-container"
          ></div>
        </div>
        <form
          id="chat-form"
          className="flex flex-row items-center h-16 p-4 lg:rounded-b-xl bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white duration-200 w-full px-4"
        ></form>
      </div>
    </>
  );
};

export default EmptyChatContainer;
