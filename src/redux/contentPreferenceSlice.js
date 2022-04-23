import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  content: [],
  status: "loading",
};

export const getContentPreference = createAsyncThunk(
  "contentPreferenceData/getContentPrefrence",
  async () => {
    const { data } = await axios.get("/ui/content_preferences/");
    return data;
  }
);

const contentPreferenceSlice = createSlice({
  name: "contentPreferenceData",
  initialState,
  extraReducers: {
    [getContentPreference.pending]: (state, action) => {
      state.status = "loading";
    },
    [getContentPreference.fulfilled]: (state, action) => {
      state.status = "success";
      state.content = action.payload.data;
    },
    [getContentPreference.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default contentPreferenceSlice.reducer;
