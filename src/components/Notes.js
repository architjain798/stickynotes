import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NotesItem from "./NoteItem";
const Notes = () => {
  const context = useContext(noteContext);

  const { data, setData } = context;

  return (
    <>
      <div>
        {data.map((x, i) => {
          return (
            <div key={i}>
              <NotesItem data={x} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
