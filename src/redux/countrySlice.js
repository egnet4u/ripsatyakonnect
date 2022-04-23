import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  countries: [],
  status: "loading",
};

export const getCountryData = createAsyncThunk(
  "countryData/getCountryData",
  async () => {
    const { data } = await axios.get("/ui/countries/");
    return data;
  }
);

const countrySlice = createSlice({
  name: "countryData",
  initialState,
  extraReducers: {
    [getCountryData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCountryData.fulfilled]: (state, action) => {
      state.status = "success";
      state.countries = action.payload.data;
    },
    [getCountryData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default countrySlice.reducer;
