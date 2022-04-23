import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  status: "loading",
};

export const getUserData = createAsyncThunk(
  "userData/getUserData",
  async () => {
    const { data } = await axios.get("/self");
    return data;
  }
);

const userSlice = createSlice({
  name: "userData",
  initialState,
  extraReducers: {
    [getUserData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserData.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload;
    },
    [getUserData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default userSlice.reducer;
