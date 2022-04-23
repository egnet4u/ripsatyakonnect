import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  requirement: [],
  status: "loading",
};

export const getRequirementData = createAsyncThunk(
  "requirementData/getRequirementData",
  async () => {
    const { data } = await axios.get("/ui/requirements/");
    return data;
  }
);

const requirementSlice = createSlice({
  name: "requirementData",
  initialState,
  extraReducers: {
    [getRequirementData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getRequirementData.fulfilled]: (state, action) => {
      state.status = "success";
      state.requirement = action.payload.data;
    },
    [getRequirementData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default requirementSlice.reducer;
