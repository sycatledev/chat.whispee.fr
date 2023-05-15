import React from "react";

//#TODO: Finish this systems

export default function Modal({ title, isOpen, onClose, content, action }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        tabIndex="-1"
        className="fixed flex inset-0 items-center mx-auto z-50 p-4 overflow-x-hidden overflow-y-auto"
      >
        <div className="flex relative w-full max-w-2xl m-auto bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white rounded-lg shadow">
          <div className="flex items-center p-4 border-b rounded-t dark:border-gray-600">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mr-2 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2Z"></path>
              </svg>
            </button>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>

          <div className="p-4 space-y-6">{content}</div>
          {action != undefined ? (
            <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              {/* <button
                data-modal-hide="staticModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="staticModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button> */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        className="bg-black/75 h-full w-full fixed z-40"
        onClick={onClose}
      ></div>
    </>
  );
}
