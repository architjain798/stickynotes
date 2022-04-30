import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NoteState from "./context/notes/NoteState";


function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
