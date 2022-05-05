import React from "react";

const NoteItem = (props) => {
  console.log(props);
  return (
    <>
      <div className="card my-3 mx-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.data.title}</h5>
          <p className="card-text">{props.data.description}</p>
          <a href="/" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
