import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const obj = {
    name: "archit",
    class: "5a",
  };

  const [data, setData] = useState(obj);

  return (
    <NoteContext.Provider value={{ data, setData }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
