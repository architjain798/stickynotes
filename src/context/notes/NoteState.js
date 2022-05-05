import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const dataStatic = [
    {
      _id: "624aa0329a3c90d0efbf2c41",
      user: "624428a33aa412d3ddb7e55b",
      title: "My name is ritika",
      description: "ddsfsfsfsdfsdfsdfsdf a asj sdfdsfsdasd",
      tag: "today",
      date: "1649057842721",
      __v: 0,
    },
    {
      _id: "624aa0329a3c90d0efbf2c41",
      user: "624428a33aa412d3ddb7e55b",
      title: "My name is archit",
      description: "dwie wehk eihjwe djasdja sdajksdnas",
      tag: "today",
      date: "1649057842721",
      __v: 0,
    },
    {
      _id: "624aa0329a3c90d0efbf2c41",
      user: "624428a33aa412d3ddb7e55b",
      title: "My name is ritika",
      description: "ddsfsfsfsdfsdfsdfsdf a asj sdfdsfsdasd",
      tag: "today",
      date: "1649057842721",
      __v: 0,
    },
    {
      _id: "624aa0329a3c90d0efbf2c41",
      user: "624428a33aa412d3ddb7e55b",
      title: "My name is archit",
      description: "dwie wehk eihjwe djasdja sdajksdnas",
      tag: "today",
      date: "1649057842721",
      __v: 0,
    },
    {
      _id: "624aa0329a3c90d0efbf2c41",
      user: "624428a33aa412d3ddb7e55b",
      title: "My name is ritika",
      description: "ddsfsfsfsdfsdfsdfsdf a asj sdfdsfsdasd",
      tag: "today",
      date: "1649057842721",
      __v: 0,
    },
    {
      _id: "624aa0329a3c90d0efbf2c41",
      user: "624428a33aa412d3ddb7e55b",
      title: "My name is archit",
      description: "dwie wehk eihjwe djasdja sdajksdnas",
      tag: "today",
      date: "1649057842721",
      __v: 0,
    },
    {
      _id: "624aa0329a3c90d0efbf2c41",
      user: "624428a33aa412d3ddb7e55b",
      title: "My name is ritika",
      description: "ddsfsfsfsdfsdfsdfsdf a asj sdfdsfsdasd",
      tag: "today",
      date: "1649057842721",
      __v: 0,
    },
    {
      _id: "624aa0329a3c90d0efbf2c41",
      user: "624428a33aa412d3ddb7e55b",
      title: "My name is archit",
      description: "dwie wehk eihjwe djasdja sdajksdnas",
      tag: "today",
      date: "1649057842721",
      __v: 0,
    },
  ];

  const [data, setData] = useState(dataStatic);

  return (
    <NoteContext.Provider value={{ data, setData }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
