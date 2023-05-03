import React from "react";
import { useRef } from "react";

const MessageNotification = () => {
  const audioRef = useRef(null);
  return (
    <audio ref={audioRef}>
      <source src="./song.wav" type="audio/mpeg" />
    </audio>
  );
};

export default MessageNotification;
