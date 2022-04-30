import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
  const state = useContext(noteContext);

  const changeName = () => {
    alert("clicked");
    if (state.data.name === "archit") {
      state.setData({
        name: "ritika",
        class: "12B",
      });
    } else {
      state.setData({
        name: "archit",
        class: "5B",
      });
    }
  };

  return (
    <>
      <div onClick={changeName}>Click to change Name and Class</div>
      <div>
        This is About {state.data.name} and class {state.data.class}
      </div>
    </>
  );
};

export default About;
