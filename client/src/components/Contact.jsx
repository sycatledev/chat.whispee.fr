import { useEffect, useState } from "react"
import { isEmpty } from "./Utils";

export function Contact({contactNav}){

  const [contacts, setContacts] = useState([]);
  const [readyContact, setContactReady] = useState(false);
 
  useEffect(() => {
    const init = async () => {
      const ws = new WebSocket("ws://localhost:456/");
      ws.addEventListener("open", async (event) => {
        console.log("Connected to server");
        await sendSocketMessage(ws, "load_contacts|||");
      });
      ws.addEventListener("close", async (event) => {
        console.log("Lost connection to server");
      });
      ws.addEventListener("error", async (event) => {
        console.error("Websocket error", event);
      });
      ws.addEventListener("message", async (event) => {
        await handleSocketMessage(event.data);
      });
    };
    init();
  }, []);

  const handleSocketMessage = async (socketMessage) => {
    console.log(">> " + socketMessage);
    let socketContent = socketMessage.split("|||");
    let socketCommand = socketContent[0];
    let socketData = socketContent[1];
  
    if (socketCommand === "contacts_loaded") {
      let contactsData = JSON.parse(socketData);
      setContacts(contactsData);
      setContactReady(true)
    }
  };

  const sendSocketMessage = async (ws, message) => {
    console.log("<< " + message);

    ws.send(message);
  };
    return (
        <div className={`flex flex-col my-4 ${contactNav ? "" : "hidden"}`}>
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Contact</span>
                <span
                  id="active-chats-numbers"
                  className="flex items-center justify-center bg-indigo-300 dark:bg-indigo-700 h-4 w-4 rounded-full"
                >
                {contacts.length}
                </span>
              </div>

              <div
                className="flex flex-col space-y-1 mt-4 -mx-2 h-[22rem] overflow-y-auto"
                id="chats-container"
              >
                {readyContact ? !isEmpty(contacts) && contacts.map(contact => (
                <button
                key={contact.chat_id}
                data-user-id={contact.chat_id}
                className="chat-button flex flex-row items-center hover:bg-indigo-100 active:bg-indigo-200 dark:hover:bg-indigo-500 dark:active:bg-indigo-600 rounded-xl p-2"
              >
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-400 text-white rounded-full">
                  {contact.chat_name[0]}
                </div>
                <div className="ml-2 text-sm font-semibold">
                  {contact.chat_name}
                </div>

                {contact.chat_pending_messages > 0 ? (
                  <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                    {contact.chat_pending_messages}
                  </div>
                ) : (
                  ""
                )}
              </button>
              )) : (
                  <>
                    <div className="animate-pulse flex space-x-4 items-center p-2">
                      <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
                      </div>
                    </div>

                    <div className="animate-pulse flex space-x-4 items-center p-2">
                      <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
                      </div>
                    </div>

                    <div className="animate-pulse flex space-x-4 items-center p-2">
                      <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
                      </div>
                    </div>

                    <div className="animate-pulse flex space-x-4 items-center p-2">
                      <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
        </div>
    )
    }
