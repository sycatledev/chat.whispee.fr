import React, { useState, useEffect } from "react";
import RegisterForm from "../components/forms/RegisterForm.jsx";
import LoginForm from "../components/forms/LoginForm.jsx";
import Loader from "../components/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { isEmpty, useAppData } from "../components/Utils.jsx";

export default function Authentification() {
  const {
    identify,
    webSocket,
    register,
    username,
    login,
    session,
    sendSocketMessage,
    setLogin,
    setRegister,
    setIdentify,
  } = useAppData();
  const navigate = useNavigate();
  const [holder, setHolder] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    let data = {
      identifier: holder,
    };

    await sendSocketMessage(
      webSocket,
      `check_identifier||| ${JSON.stringify(data)}`
    );
  };
  useEffect(() => {
    if (session === true) {
      navigate("/app");
    }
  }, [session]);

  let handleBackLogin = (e) => {
    e.preventDefault(e);
    setLoader(false);
    setLogin(false);
    setIdentify(false);
  };
  let handleBackRegister = (e) => {
    e.preventDefault(e);
    setLoader(false);
    setRegister(false);
    setIdentify(false);
  };

  return (
    <div className="font-karla bg-gradient-to-br from-[#f8f6ff] to-[#ab94fd]">
      <div className="flex min-h-screen justify-center sm:items-center">
        {/* <section className="grid grid-cols-12 sm:space-y-10">
          <div className="col-span-12 lg:col-span-7 font-bold m-auto text-center">
            <h1 className="text-5xl p-5 sm:p-0">
              <span className="text-indigo-500 font-extrabold">Whispee</span>{" "}
              Chat
            </h1>
            <p className="text-lg lg:text-left">
              A place where your{" "}
              <span className="text-indigo-500">privacy</span> is by default.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4"> */}
        <div className="p-10 px-18 rounded-xl shadow bg-white hover:shadow-lg duration-200 w-full lg:w-[420px]">
          {!identify ? (
            <>
              <h2 className="text-3xl">Login or register</h2>
              <p className="text-gray-400 text-sm">
                Enter your identifier to connect to Whispee.
              </p>

              {/* Form identify check */}

              <form
                action=""
                method="post"
                className="flex flex-col space-y-4 my-6"
                onSubmit={handleSubmit}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2a4.505 4.505 0 0 0-4.5 4.5ZM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17Z"></path>
                    </svg>
                  </div>

                  <input
                    type="text"
                    id="email"
                    className="bg-white border border-neutral-300 text-black text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5 duration-200"
                    placeholder="Email or Username"
                    required
                    onInput={(e) => setHolder(e.currentTarget.value)}
                  />
                </div>

                <div className="flex w-full justify-end">
                  <button
                    type="submit"
                    className="relative py-2 px-3 w-24 bg-indigo-500 hover:bg-indigo-600 duration-200 hover:shadow active:scale-95 text-white right-0 rounded-md"
                  >
                    <p className="mx-auto">
                      {loader ? <Loader /> : "Continue"}
                    </p>
                  </button>
                </div>
              </form>
            </>
          ) : null}
          {login ? (
            <LoginForm
              identifier={holder}
              username={username}
              ws={webSocket}
              onClose={handleBackLogin}
            />
          ) : null}
          {register ? (
            <RegisterForm
              identifier={holder}
              ws={webSocket}
              onClose={handleBackRegister}
            />
          ) : null}
        </div>
        {/* </div>
        </section> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
