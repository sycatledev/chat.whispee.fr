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
  const inputValueRef = useRef('')

  const verifyEmail = userList.filter(user => user.email === inputValueRef.current)
  const verifyUsername = userList.filter(user => user.identify === inputValueRef.current)
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 useEffect(() => {
    regexEmail.test(inputValueRef) ? setEmailIsValid(true) : setEmailIsValid(false);
    if(emailIsValid && verifyEmail.length){
      setHolderIsValid(true)
    } else if (verifyUsername.length) {
      setHolderIsValid(true)
    } else {
      setHolderIsValid(false)
    }
 }, [inputValueRef.current])

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <section className="flex space-x-48">
          <div className="my-auto space-y-4">
            <h1 className="text-5xl">
              <span className="text-indigo-500 font-extrabold">
                Private Message
              </span>{" "}
              App
            </h1>
            <p className="text-lg">
              A place where your{" "}
              <span className="text-indigo-500">privacy</span> is by default.
            </p>
          </div>
          
              {!holderIsValid ?
            <div className="p-10 px-18 rounded-xl shadow bg-white hover:shadow-lg duration-300">
              <h2 className="text-3xl">Sign up</h2>
              <p className="text-gray-400 text-sm">
                Enter your credentials to log back to PrivateMessage.
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
                  onInput={(e) => inputValueRef.current = e.currentTarget.value}
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
                   placeholder="Valid Password"
                 />
               </label>
               <div className="flex w-full justify-end">
                <button
                  type="submit"
                  className="relative py-2 px-5 w-24 bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 duration-300 hover:shadow active:scale-95 text-white right-0 rounded-md"
                >
                  Sign up
                </button>
              </div>
              </form>
              </div>
              :
              <div className="p-10 px-18 rounded-xl shadow bg-white hover:shadow-lg duration-300">
              <h2 className="text-3xl">Sign in</h2>
              <p className="text-gray-400 text-sm">
                Enter your credentials to log back to PrivateMessage.
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
                  Sign in
                </button>
              </div>
              </form>
              </div>
              }
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Authentification;
