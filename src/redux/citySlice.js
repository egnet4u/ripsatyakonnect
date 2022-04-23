import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cities: [],
  status: "loading",
};

export const getCityData = createAsyncThunk(
  "cityData/getCityData",
  async (iso2) => {
    const { data } = await axios.get("/ui/cities/?country_iso2=" + iso2);
    return data;
  }
);

const citySlice = createSlice({
  name: "cityData",
  initialState,
  extraReducers: {
    [getCityData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCityData.fulfilled]: (state, action) => {
      state.status = "success";
      state.cities = action.payload.data;
    },
    [getCityData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default citySlice.reducer;
