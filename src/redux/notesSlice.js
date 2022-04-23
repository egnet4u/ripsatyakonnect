import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  headers: [],
  status: "idle",
};

//Edited by Ranveer
export const getNotes = createAsyncThunk("note/getNotes", async (noteData) => {
  const response = await axios.get(
    `/mix/influencer/notes/?project_id=${noteData.project_id}&mix_influencer_id=${noteData.mix_influencer_id}&mix_id=${noteData.mix_number}`
  );
  return response.data.data;
});



const notesSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    updateNoteValues: (state, action) => {
      const foundIndex = state.notes.findIndex(
        (note) =>
          note.mix_influencer_id === action.payload.mix_influencer_id &&
          parseInt(note.mix_id) === parseInt(action.payload.mix_id) && note.header_number === action.payload.header_number
      );
      state.notes[foundIndex][action.payload.name] = action.payload.value;
    },
  },
  extraReducers: {
    [getNotes.pending]: (state, action) => {
      state.status = "loading";
    },
    [getNotes.fulfilled]: (state, action) => {
      state.status = "success";
      state.notes = action.payload.data;
      state.headers = action.payload.headers;
    },
    [getNotes.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default notesSlice.reducer;
export const { addNote, updateNoteValues } = notesSlice.actions;
