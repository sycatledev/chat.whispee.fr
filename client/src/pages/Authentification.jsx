import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer.jsx";
import React, { useState, useEffect } from "react";
import FormRegister from "../components/formRegister.jsx";
import FormLogin from "../components/formLogin.jsx";

const Authentification = () => {

  const [userList, setUserList] = useState([
    { id: 1, identify: "Azones", email: "azones@gmail.com", password: "password" },
    { id: 2, identify: "Sycatle", email: "sycatle@gmail.com", password: "password" },
    { id: 3, identify: "Arthur", email: "arthur@gmail.com", password: "password" },
  ])
  const [identify, setIdentify] = useState(null)
  const [register, setRegister] = useState(false)
  const [login, setLogin] = useState(false)
  const [holder, setHolder] = useState('')

  const verifyEmail = userList.filter(user => user.email === holder)
  const verifyUsername = userList.filter(user => user.identify === holder)
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexUsername = /^[a-zA-Z0-9_]{3,16}$/;

  const handleSubmit = (e) => {
    e.preventDefault()
    const emailIsValid = regexEmail.test(holder);
    const pseudoIsValid = regexUsername.test(holder);
  
    if (emailIsValid && verifyEmail.length > 0) // if email is valid and exist in database
    {
      setIdentify(true)
      setLogin(true) // Access to login page
    } 
    else if (emailIsValid && verifyEmail.length <= 0)  // Or if email is valid but the user not exist
    {
      setIdentify(true)
      setRegister(true) // Access to create account form
    }
    else if(pseudoIsValid && verifyUsername.length > 0)
    {
      setIdentify(true)
      setLogin(true)
    }
  }

  return (
    <div class="font-karla">
      <div className="flex min-h-screen justify-center sm:items-center">
        <section className="grid grid-cols-12 sm:space-y-10">
          <div className="col-span-12 lg:col-span-7 font-bold m-auto text-center">
            <h1 className="text-5xl p-5 sm:p-0">
              <span className="text-indigo-500 font-extrabold">Private Message</span> App
            </h1>
            <p className="text-lg lg:text-left">
              A place where your <span className="text-indigo-500">privacy</span> is by default.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4">
            {!identify ?
              <div className="p-10 px-18 rounded-xl shadow bg-white hover:shadow-lg duration-300">
                <h2 className="text-3xl">Login or register</h2>
                <p className="text-gray-400 text-sm">
                  Enter your identifier to connect to PrivateMessage.
                </p>

                {/* Form identify check */}

                <form
                  action=""
                  method="post"
                  className="flex flex-col space-y-5"
                  onSubmit={handleSubmit}
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
                      className="m-5 py-2 px-2 outline-none rounded-lg rounded-b-none focus:rounded-l-none focus:invalid:border-[#e20000] focus:valid:border-[#125da9]"
                      type="text"
                      id="email"
                      placeholder="Email / Username"
                      defaultValue=""
                      onInput={(e) => setHolder(e.currentTarget.value)}
                    />
                  </label>
                  <div className="flex w-full justify-end">
                    <button
                      type="submit"
                      className="relative py-2 px-3 w-24 !bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 duration-300 hover:shadow active:scale-95 text-white right-0 rounded-md"
                    >Continue
                    </button>
                  </div>
                </form>
              </div>
              :
              null }
              {login ? <FormLogin identifyInputValue={holder} /> : null}
              {register ? <FormRegister identifyInputValue={holder} /> : null}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Authentification;
