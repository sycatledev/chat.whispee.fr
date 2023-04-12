import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function FormLogin(identifyInputValue) {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([
    {
      id: 1,
      identify: "Azones",
      email: "azones@gmail.com",
      password: "password",
    },
    {
      id: 2,
      identify: "Sycatle",
      email: "sycatle@gmail.com",
      password: "password",
    },
    {
      id: 3,
      identify: "Arthur",
      email: "arthur@gmail.com",
      password: "password",
    },
  ]);
  const [holder, setHolder] = useState(identifyInputValue.identifyInputValue);
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexUsername = /^[a-zA-Z0-9_]{3,16}$/;
  const emailIsValid = regexEmail.test(identifyInputValue.identifyInputValue);
  const pseudoIsValid = regexUsername.test(
    identifyInputValue.identifyInputValue
  );

  const emailValue = userList.filter((user) => user.email === holder);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      if (emailIsValid) {
        const user = userList.filter((user) => user.email === holder);
        if (user[0].password === password) {
          setLoader(false);
          navigate("/app");
        } else {
          setLoader(false);
        }
      }

      if (pseudoIsValid) {
        const user = userList.filter((user) => user.identify === holder);
        if (user[0].password === password) {
          setLoader(false);
          navigate("/app");
        } else {
          setLoader(false);
        }
      }
    }, 2000);
  };
  return (
    <div className="p-10 px-18 lg:mx-4 rounded-xl shadow bg-white hover:shadow-lg duration-300">
      <h2 className="text-3xl">
        Welcome back, {emailIsValid ? emailValue[0].identify : holder}
      </h2>

      <p className="text-gray-400 text-sm">
        Enter your password to login to PrivateMessage.
      </p>
      <form
        action=""
        method=""
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
            placeholder="Email / Username"
            disabled
            value={holder}
            onChange={(e) => setHolder(e.currentTarget.value)}
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
