import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
const Authentification = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <section className="flex space-x-48">
        <div className="my-auto">
          <h1 className="text-5xl"><span className="text-blue-800">Private Message </span>App</h1>
          <p className="mt-5">Coming soon , App under construction</p>
        </div>
        <div className="p-10 px-18 border-[2px] rounded-lg border-black bg-neutral-200">
          <h2 className="text-center text-3xl">Sign In</h2>
          <form action="" method="post" className="flex flex-col space-y-5 mt-5 ">
            <label className="flex items-center bg-white rounded-lg" htmlFor="identifier">
              <FontAwesomeIcon icon={faUser} className="h-8 w-5 px-3 border-r-[1px] border-black" />
              <input
                className="ml-2 py-2 px-2 outline-none rounded-lg rounded-b-none focus:rounded-l-none focus:invalid:border-[#e20000] focus:valid:border-[#125da9]"
                type="text"
                minLength={2}
                maxLength={30}
                id="identifier"
                placeholder="Identifiant"
              />
            </label>

            <label className="flex items-center bg-white rounded-lg"htmlFor="">
              <FontAwesomeIcon icon={faLock} className="h-8 w-5 px-3 border-r-[1px] border-black" />
              <input
                className="ml-2 py-2 px-2 outline-none rounded-lg rounded-b-none focus:rounded-l-none focus:invalid:border-[#e20000] focus:valid:border-[#125da9]" 
                type="password"
                minLength={7}
                maxLength={30}
                required
                name="" id=""
                placeholder="Password" />
            </label>

            <label className="flex items-center bg-white rounded-lg" htmlFor="username">
              <FontAwesomeIcon icon={faUser} className="h-8 w-5 px-3 border-r-[1px] border-black" />
              <input
                className="ml-2 py-2 px-2 outline-none rounded-lg rounded-b-none focus:rounded-l-none focus:invalid:border-[#e20000] focus:valid:border-[#125da9]" 
                type="text"
                id="username"
                placeholder="Username" />
            </label>

            <label className="flex items-center bg-white rounded-lg" htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="h-8 w-5 px-3 border-r-[1px] border-black" />
              <input
                className="ml-2 py-2 px-2 outline-none rounded-lg rounded-b-none focus:rounded-l-none focus:invalid:border-[#e20000] focus:valid:border-[#125da9]" 
                type="email" 
                id="email"
                placeholder="Email"
              />
            </label>

            <div className="flex w-full justify-end">
              <button type="submit" className="relative py-2 px-5 w-24 bg-gradient-to-r from-cyan-600 to-blue-900 right-0 rounded-md">Submit</button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
};

export default Authentification;
