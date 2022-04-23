import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  location: [],
  status: "loading",
};

export const getLocationData = createAsyncThunk(
  "locationData/getLocationData",
  async () => {
    const { data } = await axios.get("/ui/locations/");
    return data;
  }
);

const locationSlice = createSlice({
  name: "locationData",
  initialState,
  extraReducers: {
    [getLocationData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getLocationData.fulfilled]: (state, action) => {
      state.status = "success";
      state.location = action.payload.data;
    },
    [getLocationData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default locationSlice.reducer;
