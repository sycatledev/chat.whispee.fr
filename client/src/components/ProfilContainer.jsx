import { useEffect } from "react";

export default function ProfilContainer({ toggle, showParams, setShowParams }) {
  return (
    <>
      <div className="flex justify-between items-center mt-5 pt-5 border-t-[1px] border-neutral-200 dark:border-neutral-600">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-8 w-8 bg-indigo-400 text-white rounded-full">
            V
          </div>
          <h1 className="font-karla ml-2">Pseudonyme</h1>
        </div>
        <div className="flex ml-5">
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
                        dark:active:bg-indigo-400 p-2 rounded-xl text-gray-500 dark:hover:text-gray-300`}
            id="paramNav"
            onClick={() =>
              showParams ? setShowParams(false) : setShowParams(true)
            }
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
      </div>
    </>
  );
}
