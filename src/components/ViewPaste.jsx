
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";


const ViewPaste = () => {
// to extract the id from url
  const {id}=useParams();

  //get all paste from redux store
  const allPastes = useSelector((state)=>state.paste.pastes);
// find the specific paste by ID 
  const paste = allPastes.filter((p)=>p._id === id)[0];


  return (
    <div>


      <div className=" flex flex-row gap-7 place-content-between ">
        <input
           className="title p-2 mt-3 focus:border-blue-500 rounded-2xl w-full pl-4"
          type="text"
          placeholder="Enter title here "
          value={paste.title}
          disabled
          onChange={(e) => setTitlle(e.target.value)}
        />

      </div>


      <div className=" title mt-8  ">
        <textarea
          className="rounded-2xl mt-4, min-w-[500px] p-4"
          value={paste.content}
          
          placeholder="Enter your content"
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
