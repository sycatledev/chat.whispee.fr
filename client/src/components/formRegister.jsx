import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


export default function FormRegister(identifyEmail){

    const [userList, setUserList] = useState([
        { id: 1, identify: "Azones", email: "azones@gmail.com", password: "password" },
        { id: 2, identify: "Sycatle", email: "sycatle@gmail.com", password: "password" },
        { id: 3, identify: "Arthur", email: "arthur@gmail.com", password: "password" },
      ])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        setEmail(identifyEmail.identifyEmail)
    }, [email, password, confirmPassword])

    return(
        <div className="p-10 px-18 lg:mx-4 rounded-xl shadow bg-white hover:shadow-lg duration-300">
              <h2 className="text-3xl">Create Account</h2>
              <p className="text-gray-400 text-sm">
                Type your information to start talk !
              </p>
              <form
                action=""
                method="post"
                className="flex flex-col space-y-5 mt-5 "
                onSubmit={(e) => {
                  e.preventDefault()
                    if(email && password && confirmPassword && (password === confirmPassword)){
                        const verify = userList.map(user => user.email === email)
                        console.log(verify)
                    }
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
                    value={email}
                    onInput={(e) => setEmail(e.currentTarget.value)}
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
                    onInput={(e) => setPassword(e.currentTarget.value)}
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
                    onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                    placeholder="Confirm Password"
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
    )
}