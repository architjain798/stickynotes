import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <div style={{ backgroundColor: "#273026", color: "yellow" }}>
      <NoteState>
        <BrowserRouter>
          <NavBar />
          <div className="container my-4">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
