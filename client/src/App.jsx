import { useState } from "react";
import Authentification from "./pages/Authentification.jsx";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentification />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
