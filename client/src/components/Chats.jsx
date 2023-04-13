import React from "react";

const Chats = ({ messageNav, chats, ready, displayChat }) => {
  return (
    <div className={`flex flex-col my-4 h-full ${!messageNav ? "hidden" : ""}`}>
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Active Chats </span>
        <span
          id="active-chats-numbers"
          className="flex items-center justify-center bg-indigo-300 dark:bg-indigo-700 h-4 w-4 rounded-full"
        >
          {chats.length}
        </span>
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
              className="chat-button flex flex-row items-center hover:bg-indigo-100 active:bg-indigo-200 dark:hover:bg-indigo-500 dark:active:bg-indigo-600 rounded-xl p-2"
            >
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-400 text-white rounded-full">
                {chat.chat_name[0]}
              </div>
              <div className="ml-2 text-sm font-semibold">{chat.chat_name}</div>

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
