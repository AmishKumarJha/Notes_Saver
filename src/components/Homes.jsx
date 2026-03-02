import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updateToPaste } from "../redux/pasteSlice";
import { addToPaste } from "../redux/pasteSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Homes = () => {
  const [title, setTitlle] = useState(""); // For title
  const [value, setValue] = useState(""); // for notes part

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch(); // It gives you the dispatch function so you can send actions to the Redux store.

  const allpastes = useSelector((state) => state.paste.pastes);
  useEffect(() => {
    if (pasteId) {
      const paste = allpastes.find((p) => p._id === pasteId);
      setTitlle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  // use of this is to create a paste and then sent it to slice
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPaste(paste));
    } else {
      //create
      dispatch(addToPaste(paste));
    }

    //after creation or updation
    setTitlle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className=" flex flex-row gap-7 place-content-between ">
        <input
          className=" title p-2 mt-3 Focus:border-blue-500 rounded-2xl w-[60%] pl-4"
          type="text"
          placeholder="Enter title here "
          value={title}
          onChange={(e) => setTitlle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="p-2 mt-3 Focus:border-blue-500 rounded-2xl"
        >
          {pasteId ? "UPDATE PASTE" : "CREATE MY PASTE"}
        </button>
      </div>

      <div className=" title mt-8  ">
        <textarea
          className="rounded-2xl mt-4, min-w-[500px] p-4"
          value={value}
          placeholder="Enter your content"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Homes;
