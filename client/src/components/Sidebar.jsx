import Nav from "../components/Nav.jsx";
import Chats from "../components/nav/Chats.jsx";
import { Friend } from "../components/nav/Friends.jsx";
import ProfilDropdown from "../components/Dropdown.jsx";

export default function Sidebar({
  visible,
  messageNav,
  setMessageNav,
  friendNav,
  setFriendNav,
  chats,
  ready,
  displayChat,
  messages,
  toggleTheme,
  username,
  handleDisconnect,
}) {
  return (
    <div
      className={
        (visible ? "flex" : "hidden") +
        " flex-col justify-between p-4 w-64 text-black dark:text-white bg-[#f7f7f7] dark:bg-[#1c1c1c] h-full duration-200 flex-shrink-0"
      }
    >
      <div className="h-full transition-all ease-out">
        <Nav
          messageNav={messageNav}
          setMessageNav={setMessageNav}
          friendNav={friendNav}
          setFriendNav={setFriendNav}
        />
        <Chats
          chats={chats}
          ready={ready}
          displayChat={displayChat}
          messages={messages}
          messageNav={messageNav}
        />
        <Friend friendNav={friendNav} />
      </div>

      <ProfilDropdown
        toggle={toggleTheme}
        username={username}
        handleDisconnect={handleDisconnect}
      />
    </div>
  );
}
