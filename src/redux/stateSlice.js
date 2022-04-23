import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  states: [],
  status: "loading",
};

export const getStateData = createAsyncThunk(
  "stateData/getStateData",
  async (iso2) => {
    const { data } = await axios.get("/ui/states/?country_iso2=" + iso2);
    return data;
  }
);

const stateSlice = createSlice({
  name: "stateData",
  initialState,
  extraReducers: {
    [getStateData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getStateData.fulfilled]: (state, action) => {
      state.status = "success";
      state.states = action.payload.data;
    },
    [getStateData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default stateSlice.reducer;
