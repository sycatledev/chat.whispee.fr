import { useState } from "react";

export default function ChatFooter({ chat, inputRef, handleSubmitForm }) {
  return (
    <form
      onSubmit={handleSubmitForm}
      id="chat-form"
      className="flex flex-row items-center h-16 p-4 lg:rounded-b-xl bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white duration-200 w-full px-4 shadow-sm border-t border-neutral-200 dark:border-neutral-700"
    >
      <div className="flex-grow">
        <div className="relative w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5ZM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7Zm4 10.723V20h-2v-2.277a1.994 1.994 0 0 1 1.454-3.672 2 2 0 0 1 1.277 2.945 1.99 1.99 0 0 1-.731.727Z"></path>
              </svg>
            </div>

            <input
              type="text"
              id="chat-input"
              autoComplete="off"
              ref={inputRef}
              className="bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 text-sm rounded-l-lg disabled:cursor-not-allowed block w-full pl-10 p-2.5 duration-200"
              placeholder={`Send an encrypted message to ${chat?.chat_name}`}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center bg-primarydark enabled:hover:bg-primarydarker group border-t border-r border-b border-neutral-300 dark:border-neutral-700 disabled:cursor-not-allowed rounded-r-lg hover:shadow text-white px-4 py-2 flex-shrink-0"
        // disabled={inputRef.current?.value.trim.length === 0}
      >
        <svg
          className="w-6 h-6 -rotate-45 group-hover:rotate-0 duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="m21.426 11.096-17-8A.999.999 0 0 0 3.03 4.243l1.939 7.758-1.94 7.758a.998.998 0 0 0 1.397 1.147l17-8a1.001 1.001 0 0 0 0-1.81ZM5.48 18.198l.839-3.357 5.68-2.84-5.68-2.84-.84-3.357 13.17 6.197-13.17 6.197Z"></path>
        </svg>
      </button>
    </form>
  );
}
