import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoginForm({identifier, ws}) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);


  const sendSocketMessage = async (ws, message) => {
    console.log("<< " + message);

    ws.send(message);
  };
  let data;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    data = {
        identifier,
        password
    }
    await sendSocketMessage(ws, `login_user||| ${JSON.stringify(data)}`)
  };

  return (
    <div className="p-10 px-18 lg:mx-4 rounded-xl shadow bg-white hover:shadow-lg duration-300">
      <h2 className="text-3xl">
        Welcome back, 
      </h2>

      <p className="text-gray-400 text-sm">
        Enter your password to login to Whispee.
      </p>
      <form
        action=""
        method=""
        className="flex flex-col space-y-5 mt-5 "
        onSubmit={handleSubmit}
      >
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
            onInput={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
          />
        </label>
        <div className="flex w-full justify-end">
          <button
            type="submit"
            className="flex items-center relative py-2 px-5 w-24 !bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 duration-300 hover:shadow active:scale-95 text-white right-0 rounded-md"
          >
            <p className="mx-auto">Login</p>
            {loader ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin ml-2" />
            ) : null}
          </button>
        </div>
      </form>
    </div>
  );
}
