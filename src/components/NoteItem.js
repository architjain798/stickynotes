import React from "react";

const NoteItem = (props) => {
  return (
    <>
      <div
        className="card my-3 mx-3"
        style={{ width: "18rem", backgroundColor: "black", color: "white" }}
      >
        <div className="card-body">
          <h5 className="card-title">{props.data.title}</h5>
          <p className="card-text">{props.data.description}</p>
          <i className="fas fa-trash-alt mx-2"></i>
          <i className="far fa-edit mx-2"></i>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
