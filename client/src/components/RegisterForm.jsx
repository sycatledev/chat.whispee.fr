import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import BackButton from "./BackButton.jsx";

export default function RegisterForm({identifier, ws}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useState(false)

  const sendSocketMessage = async (ws, message) => {
    console.log("<< " + message);

    ws.send(message);
  };

  let data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (JSON.stringify(identifier).includes('@')) {
      setEmail(identifier)
    } else {
      setUsername(identifier)
    }

    data = {
        username: username,
        email: email,
        password: password
    }
    console.log(data)
    await sendSocketMessage(ws, `register_user|||${JSON.stringify(data)}`)
  };

  return (
    <div className="p-10 px-18 lg:mx-4 rounded-xl shadow bg-white hover:shadow-lg duration-300">
      <div className="flex items-center">
        <BackButton />
        <div className="flex flex-col ml-5">
          <h2 className="text-3xl">Create Account</h2>
          <p className="text-gray-400 text-sm">
            Type your information to start talk !
          </p>
        </div>
      </div>
      <form
        action=""
        method="post"
        className="flex flex-col space-y-5 mt-5 "
        onSubmit={handleSubmit}
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
            placeholder="Username"
            value={username}
            onInput={(e) => setUsername(e.currentTarget.value)}
          />
        </label>

        <label className="flex items-center bg-white rounded-lg" htmlFor="">
          <FontAwesomeIcon
            icon={faLock}
            className="h-8 w-5 px-3 border-r-[1px] border-black"
          />
          <input
            className="ml-2 py-2 px-2 outline-none rounded-lg rounded-b-none focus:rounded-l-none focus:invalid:border-[#e20000] focus:valid:border-[#125da9]"
            type="email"
            required
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email"
          />
        </label>

        <label className="flex items-center bg-white rounded-lg" htmlFor="">
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
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
          />
        </label>

        <div className="flex w-full justify-end">
          <button
            type="submit"
            className="relative py-2 px-5 w-24 !bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 duration-300 hover:shadow active:scale-95 text-white right-0 rounded-md"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
