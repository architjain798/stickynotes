import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
const Notes = () => {
  const context = useContext(noteContext);

  const { data, addNote } = context;

  return (
    <>
      <div className="row">
        {data.map((x, i) => {
          return <NoteItem key={i} data={x} />;
        })}
      </div>
    </>
  );
};

export default Notes;
