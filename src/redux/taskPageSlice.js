import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pitchInfo: {},
  status: "idle",
  pitchTasksDetails: {},
  taskStatus: "idle",
};

export const getPitchData = createAsyncThunk(
  "pitchData/getPitchData",
  async (id) => {
    const { data } = await axios.get("/project/?project_id=" + id);
    return data;
  }
);

export const getPitchTasksDetailsData = createAsyncThunk(
  "pitchData/getPitchTasksDetailsData",
  async (id) => {
    const { data } = await axios.get("/workflow/?project_id=" + id);
    return data;
  }
);
const taskPageSlice = createSlice({
  name: "pitchData",
  initialState,
  reducers: {
    setPitchField: (state, action) => {
      state.pitchInfo[action.payload.name] = action.payload.value;
    },
    addPitchAttachment: (state, action) => {
      state.pitchInfo.attachment_filename = [
        ...state.pitchInfo.attachment_filename,
        { name: action.payload.name, size: action.payload.size },
      ];
    },
    removePitchAttachment: (state, action) => {
      let foundIndex = state.pitchInfo.attachment_filename.findIndex(
        (file) => file.name === action.payload.name
      );
      if (foundIndex !== -1) {
        state.pitchInfo.attachment_filename.splice(foundIndex, 1);
      }
    },
  },
  extraReducers: {
    [getPitchData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPitchData.fulfilled]: (state, action) => {
      state.status = "success";
      state.pitchInfo = action.payload.data;
    },
    [getPitchData.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getPitchTasksDetailsData.pending]: (state, action) => {
      state.taskStatus = "loading";
    },
    [getPitchTasksDetailsData.fulfilled]: (state, action) => {
      state.taskStatus = "success";
      state.pitchTasksDetails = action.payload.data;
    },
    [getPitchTasksDetailsData.rejected]: (state, action) => {
      state.taskStatus = "failed";
    },
  },
});

export default taskPageSlice.reducer;
export const { setPitchField, addPitchAttachment, removePitchAttachment } =
  taskPageSlice.actions;
