import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Pastee = () => {
  // Access the "pastes" array from the Redux store's "paste" slice
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // ✅ Corrected: "lowercase()" to "toLowerCase()"
  //It creates a new array called filteredData that contains only those paste items where the title matches the search term
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  function handleDelete(pasteId){
  dispatch(removeFromPaste({ _id: pasteId }));
  }
  

  function handleCopy(content){
     navigator.clipboard.writeText(content)
    .then(() => {
toast.success(" Copied to the clipboard");
  })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
  }

  function handleShare(paste) {
  if (navigator.share) { // Checks if the browser supports the Web Share API. If yes, we proceed to share; if not, we show an alert.
    navigator.share({
      title: paste.title,
      text: paste.content,
      url: `${window.location.origin}/paste/${paste._id}`, // or a link to the paste
    })
    .then(() => {
      toast.success('Shared successfully');
    })
    .catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    const message = `${paste.title}\n\n${paste.content}\n\n${window.location.origin}/paste/${paste._id}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  }
}

 return (
  <div>
    <input
      className="title p-2 rounded-2xl min-w-[600px] mt-5 bg-gray-900 text-white placeholder-gray-400 outline-none"
      type="search"
      placeholder="Enter your Search here"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <div className="flex flex-col gap-5 mt-5">
      {filteredData.length > 0 &&
        filteredData.map((paste) => {
          return (
            <div
              key={paste._id}
              className="border border-gray-700 bg-gray-900 text-white p-4 rounded-xl shadow-sm "
            >
              <div className="text-xl font-semibold text-center mb-2  tracking-wide">
                {paste.title}
              </div>
 
              <div className="text-lg text-gray-300 text-center mb-4 tracking-wide">
                {paste.content}
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-3">
                <a
                  href={`/?pasteId=${paste._id}`}
                  className="bg-gray-800  text-white px-4 py-2 rounded-md  transition hover"
                >
                  EDIT
                </a>

                <a
                  href={`/pastes/${paste._id}`}
                  className="bg-gray-800  text-white px-4 py-2 rounded-md transition focus:outline-none"
                >
                  VIEW
                </a>

                <button
                  onClick={() => handleDelete(paste._id)}
                  className="bg-gray-800 text-white hover:text-indigo-400 transition-colors duration-200 px-4 py-2 rounded-md  focus:outline-none"
                >
                  DELETE
                </button>

                <button
                  onClick={() => handleCopy(paste.content)}
                  className="bg-gray-800 text-white hover:text-indigo-400 transition-colors duration-200 px-4 py-2 rounded-md  focus:outline-none"
                >
                  COPY
                </button>

                <button
                  onClick={() => handleShare(paste)}view looking different and why focus is not working on then 
                  
                  className="bg-gray-800 hover:text-indigo-400 transition-colors duration-200 text-white px-4 py-2 rounded-md  focus:outline-none"
                >
                  SHARE
                </button>
              </div>

              <div className="text-xs text-gray-400 text-center">
                {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          );
        })}
    </div>
  </div>
);

};

export default Pastee;
