import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tiers: [],
  status: "loading",
};

export const getTierData = createAsyncThunk(
  "tierData/getTierData",
  async () => {
    const { data } = await axios.get("/ui/tiers/");
    return data;
  }
);

const tierSlice = createSlice({
  name: "tierData",
  initialState,
  extraReducers: {
    [getTierData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTierData.fulfilled]: (state, action) => {
      state.status = "success";
      state.tiers = action.payload.data;
    },
    [getTierData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default tierSlice.reducer;
