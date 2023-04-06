import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Authentification = () => {
  const [userList, setUserList] = useState([
    {id: 1, identify: "Azones", email: "azones@gmail.com"},
    {id: 2, identify: "Sycatle", email: "sycatle@gmail.com"},
    {id: 3, identify: "Arthur", email: "arthur@gmail.com"},
  ])
  const [holderIsValid, setHolderIsValid] = useState(false)
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [holder, setHolder] = useState('')

  const verifyEmail = userList.filter(user => user.email === holder)
  const verifyUsername = userList.filter(user => user.identify === holder)
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 useEffect(() => {
    setEmailIsValid(regexEmail.test(holder))

    if(emailIsValid && verifyEmail.length > 0){
      setHolderIsValid(true)
    } else if (verifyUsername.length > 0) {
      setHolderIsValid(true)
    } else {
      setHolderIsValid(false)
    }
 }, [holder])

  return (
    <div class="font-karla">
      <div className="flex min-h-screen items-center justify-center">
        <section className="gap-8 grid grid-cols-12 mx-auto">
          <div className="m-auto space-y-2 col-span-12 lg:col-span-8 font-bold">
            <h1 className="text-5xl">
              <span className="text-indigo-500 font-extrabold">Private Message</span> App
            </h1>
            <p className="text-lg text-center lg:text-left">
              A place where your <span className="text-indigo-500">privacy</span> is by default.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 m-auto">
            {!holderIsValid ?
            <div className="p-10 px-18 lg:mx-4 rounded-xl shadow bg-white hover:shadow-lg duration-300">
              <h2 className="text-3xl">Login or register</h2>
              <p className="text-gray-400 text-sm">
                Enter your identifier to connect to PrivateMessage.
              </p>
              <form
              action=""
              method="post"
              className="flex flex-col space-y-5 mt-5 "
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <label
                className="flex items-center bg-white rounded-lg"
                htmlFor="email"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="h-8 w-5 px-3 border-r-[1px] border-black"
                />
                <input
                  className="ml-2 py-2 px-2 outline-none rounded-lg rounded-b-none focus:rounded-l-none focus:invalid:border-[#e20000] focus:valid:border-[#125da9]"
                  type="email"
                  id="email"
                  placeholder="Email / Username"
                  defaultValue=""
                  onInput={(e) => setHolder(e.currentTarget.value)}
                />
              </label>
    
              {/* <label
                  className="flex items-center bg-white rounded-lg"
                  htmlFor=""
                >
                  <FontAwesomeIcon
                    icon={faLock}
                    className="h-8 w-5 px-3 border-r-[1px] border-black"
                  />
                  <input
                    className="ml-2 py-2 px-2 outline-none rounded-lg rounded-b-none focus:rounded-l-none focus:invalid:border-[#e20000] focus:valid:border-[#125da9]"
                    type="password"
                    minLength={7}
                    maxLength={30}
                    required
                    name=""
                    id=""
                    placeholder="Password"
                  />
                  </label>
                  <label
                  className="flex items-center bg-white rounded-lg"
                  htmlFor=""
                >
                  <FontAwesomeIcon
                    icon={faLock}
                    className="h-8 w-5 px-3 border-r-[1px] border-black"
                  />
                  <input
                    className="ml-2 py-2 px-2 outline-none rounded-lg rounded-b-none focus:rounded-l-none focus:invalid:border-[#e20000] focus:valid:border-[#125da9]"
                    type="password"
                    minLength={7}
                    maxLength={30}
                    required
                    name=""
                    id=""
                    placeholder="Confirm password"
                  />
                </label> */}
                <div className="flex w-full justify-end">
                <button
                  type="submit"
                  className="relative py-2 px-5 w-24 bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 duration-300 hover:shadow active:scale-95 text-white right-0 rounded-md"
                >Continue
                </button>
              </div>
              </form>
            </div>
            :
            <div className="p-10 px-18 lg:mx-4 rounded-xl shadow bg-white hover:shadow-lg duration-300">
            <h2 className="text-3xl">Welcome back, %nom%</h2>
            <p className="text-gray-400 text-sm">
              Enter your password to login to PrivateMessage.
            </p>
            <form
            action=""
            method="post"
            className="flex flex-col space-y-5 mt-5 "
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <label
              className="flex items-center bg-white rounded-lg"
              htmlFor="identifier"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="h-8 w-5 px-3 border-r-[1px] border-black"
              />
              <input
                className="ml-2 py-2 px-2 outline-none rounded-lg rounded-b-none focus:rounded-l-none focus:invalid:border-[#e20000] focus:valid:border-[#125da9]"
                type="text"
                minLength={2}
                maxLength={30}
                id="identifier"
                placeholder="Email / Username"
                onChange={(e) => setHolder(e.currentTarget.value)}
              />
            </label>
            <label
                className="flex items-center bg-white rounded-lg"
                htmlFor=""
              >
                <FontAwesomeIcon
                  icon={faLock}
                  className="h-8 w-5 px-3 border-r-[1px] border-black"
                />
                <input
                  className="ml-2 py-2 px-2 outline-none rounded-lg rounded-b-none focus:rounded-l-none focus:invalid:border-[#e20000] focus:valid:border-[#125da9]"
                  type="password"
                  minLength={7}
                  maxLength={30}
                  required
                  name=""
                  id=""
                  placeholder="Password"
                />
              </label>
              <div className="flex w-full justify-end">
              <button
                type="submit"
                className="relative py-2 px-5 w-24 bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 duration-300 hover:shadow active:scale-95 text-white right-0 rounded-md"
              >
                Login
              </button>
            </div>
            </form>
            </div>
            }
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Authentification;
