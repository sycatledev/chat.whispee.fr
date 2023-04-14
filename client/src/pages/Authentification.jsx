import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer.jsx";
import React, { useState, useEffect } from "react";
import RegisterForm from "../components/RegisterForm.jsx";
import LoginForm from "../components/LoginForm.jsx";

const Authentification = () => {

  const [username, setUsername] = useState('');
  const [identify, setIdentify] = useState(null);
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [holder, setHolder] = useState("");
  const [webSocket, setWebSocket] = useState(null)

  const sendSocketMessage = async (ws, message) => {
    console.log("<< " + message);

    ws.send(message);
  };

  let init = async () => {


    const ws = new WebSocket("ws://localhost:456/")
    setWebSocket(ws)
    ws.addEventListener('open', async (event) => {
      console.log("Connected to server")
      await sendSocketMessage(ws, `check_identifier||| ${JSON.stringify(data)}`)
    })

    ws.addEventListener("close", async (event) => { 
      console.log("Lost connection to server");
    });

    ws.addEventListener("error", async (event) => {
      console.error("Websocket error", event);
    });

    ws.addEventListener("message", async (event) => {
      await handleSocketMessage(event.data);
    });



    let handleSocketMessage = async (socketMessage) => {
      console.log(">> " + socketMessage);
      let socketContent = socketMessage.split("|||");
      let socketCommand = socketContent[0];
      let socketData = socketContent[1];
  
      if (socketCommand === "no_identifier_found") { // User not exist in database
        setIdentify(true);  
        setRegister(true); // Redirect to register page
      } else if (socketCommand === "identifier_found") {
        let userData = JSON.parse(socketData)
        setUsername(userData.username)
        setIdentify(true);
        setLogin(true);
      }
    };
    return ws
  }

  let data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    data = {
      identifier: holder
    }
    init()
  };

  return (
    <div className="font-karla">
      <div className="flex min-h-screen justify-center sm:items-center">
        <section className="grid grid-cols-12 sm:space-y-10">
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

          <div className="col-span-12 lg:col-span-4">
            {!identify ? (
              <div className="p-10 px-18 rounded-xl shadow bg-white hover:shadow-lg duration-300">
                <h2 className="text-3xl">Login or register</h2>
                <p className="text-gray-400 text-sm">
                  Enter your identifier to connect to Whispee.
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
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
            {login ? <LoginForm identifier={holder} username={username} ws={webSocket} /> : null}
            {register ? <RegisterForm identifier={holder} ws={webSocket} /> : null}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Authentification;
