import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  languages: [],
  status: "loading",
};

export const getLanguageData = createAsyncThunk(
  "languageData/getLanguageData",
  async () => {
    const { data } = await axios.get("/ui/languages/");
    return data;
  }
);

const languageSlice = createSlice({
  name: "languageData",
  initialState,
  extraReducers: {
    [getLanguageData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getLanguageData.fulfilled]: (state, action) => {
      state.status = "success";
      state.languages = action.payload.data;
    },
    [getLanguageData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default languageSlice.reducer;
