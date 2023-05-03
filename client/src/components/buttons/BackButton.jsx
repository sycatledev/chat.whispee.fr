import React from "react";

export default function BackButton(props) {
  return (
    <>
      <button
        className={`flex items-center justify-center ${props.hoverBg} ${props.color1} ${props.color2}
                  hover:text-black rounded-lg duration-200 p-2`}
        onClick={(e) => props.onClose(e)}
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 11.004H6.414l5.293-5.293-1.414-1.414-7.707 7.707 7.707 7.707 1.414-1.414-5.293-5.293H21v-2Z"></path>
        </svg>
      </button>
    </>
  );
}
