import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <button
          className="flex items-center justify-center bg-white hover:shadow hover:bg-slate-100 text-gray-800
                  hover:text-black rounded-lg duration-200 p-2"
          onClick={() => {
            // ! Attendre d'implémenter le store pour communiquer l'état à la page register
          }}
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 11.004H6.414l5.293-5.293-1.414-1.414-7.707 7.707 7.707 7.707 1.414-1.414-5.293-5.293H21v-2Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}
