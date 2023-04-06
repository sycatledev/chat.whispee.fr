import { useState, useEffect } from "react";

const useWebSocket = () => {
  const [websocket, setWebsocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:456/");
    ws.addEventListener("open", () => {
      console.log("Connected to server");
    });
    ws.addEventListener("close", () => {
      console.log("Lost connection to server");
    });
    ws.addEventListener("error", (event) => {
      console.error("Websocket error", event);
    });

    setWebsocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return websocket;
};

export default useWebSocket;
