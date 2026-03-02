import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = { 
  pastes: localStorage.getItem("pastes") // Checks if there is any data saved in the browser’s localStorage under the key "pastes"
    ? JSON.parse(localStorage.getItem("pastes")) // If yes (truthy), it parses the stored JSON string back into an array using JSON.parse().
    : [] // If no data is found (falsy), it sets the pastes array as an empty array [] (i.e., no saved pastes yet).
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {

    addToPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); //This saves the updated list of pastes to browser storage (localStorage).
      toast("paste created sucessfully");
    },

    updateToPaste: (state , action) => {
      const paste = action.payload; // This gets the updated paste object sent from your component.
      const index = state.pastes.findIndex((item)=> item._id === paste._id);
      if(index >=0){
        state.pastes[index]=paste; // This replaces the old paste at that index with the new (updated) paste.
        localStorage.setItem("pastes",JSON.stringify(state.pastes));// Saves the updated pastes array to localStorage, so data is not lost on refresh.
        toast.success("paste updated")
      }
    },


    resetAllpaste: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },

    
    removeFromPaste: (state, action) => {
  // Get the paste (note) to be deleted from the action payload
  const paste = action.payload;

  // Find the index of the paste in the array by matching its _id
  const index = state.pastes.findIndex((item) => item._id === paste._id);

  // If the paste is found (index is valid)
  if (index >= 0) {
    // Remove 1 item at that index from the pastes array
    state.pastes.splice(index, 1);

    // Update localStorage with the new pastes array (after deletion)
    localStorage.setItem("pastes", JSON.stringify(state.pastes));

    // Show a success toast notification
    toast.success("paste deleted");
  }
}
  },
});

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, removeFromPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
