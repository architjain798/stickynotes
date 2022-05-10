import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = () => {
  return (
    <>
      <AddNote />
      <h3 className="my-3">Your Notes</h3>
      <div className="container">
        <Notes />
      </div>
    </>
  );
};

export default Home;
