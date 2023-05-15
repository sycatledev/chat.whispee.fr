import React from "react";
import { useAppData } from "../Utils";
import Avatar from "../user/Avatar.jsx";

const Chats = ({ messageNav, displayChat }) => {
  const { chats, ready } = useAppData();
  return (
    <div className={`flex flex-col my-4 h-full ${!messageNav ? "hidden" : ""}`}>
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">My Chats ({chats.length})</span>
        <button className="flex items-center justify-center text-gray-500 dark:hover:text-gray-300 hover:text-black rounded-xl flex-shrink-0">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
          </svg>
        </button>
      </div>
      <div
        className="flex flex-col h-full space-y-1 mt-4 -mx-2 overflow-y-auto"
        id="chats-container"
      >
        {ready ? (
          chats.map((chat) => (
            <button
              onClick={() => displayChat(chat.chat_id)}
              key={chat.chat_id}
              data-user-id={chat.chat_id}
              className="chat-button flex flex-row items-center hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-xl p-2"
            >
              <Avatar username={chat.chat_name}></Avatar>
              <div className="ml-2 text-sm font-semibold select-none">
                {chat.chat_name}
              </div>

              {chat.chat_pending_messages > 0 ? (
                <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                  {chat.chat_pending_messages}
                </div>
              ) : (
                ""
              )}
            </button>
          ))
        ) : (
          <>
            <div className="animate-pulse flex space-x-4 items-center p-2">
              <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
              </div>
            </div>

            <div className="animate-pulse flex space-x-4 items-center p-2">
              <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
              </div>
            </div>

            <div className="animate-pulse flex space-x-4 items-center p-2">
              <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
              </div>
            </div>

            <div className="animate-pulse flex space-x-4 items-center p-2">
              <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chats;
