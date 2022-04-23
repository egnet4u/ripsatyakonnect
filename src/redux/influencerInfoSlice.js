import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  youtubeInfData: {},
  youTubeDataStatus: "loading",
  status: "loading",
};

export const getInfluencerInfo = createAsyncThunk(
  "influencerInfoData/getInfluencerInfo",
  async (id) => {
    const { data } = await axios.get("/influencer/?instagram_id=" + id);
    return data;
  }
);
export const getInfluencerInfoDataByHandel = createAsyncThunk(
  "influencerInfoData/getInfluencerInfoDataByHandel",
  async (handle) => {
    const { data } = await axios.get(`influencer/search/?search_string=${handle}`);
    if (data.data.lenght !== 0) {
      const findData = data.data;
      return findData[0];
    } else {
      const emp = [];
      return emp;
    }

  }

)
//get Youtube Inf Data
export const youtubeDataGet = createAsyncThunk(
  "influencerInfoData/youtubeDataGet",
  async (youtubeUrl) => {
    // const {data} = await axios.get(`/youtube/profile/data/?instagram_id=${instaId}`);
    const { data } = await axios.get(`/youtube/profile/data/?youtube_url=${youtubeUrl}`);
    return data.data;
  }
)


const influencerInfoSlice = createSlice({
  name: "influencerInfoData",
  initialState,
  reducers: {
    setYoutubeInfData: (state, action) => {
      //console.log(action.payload);
      state.youtubeInfData = action.payload;
    },
    updateField: (state, action) => {
      state.data[action.payload.name] = action.payload.value;
    },
    updateValueToArray: (state, action) => {
      state.data[action.payload.name] = [action.payload.value];
    },
    updateLanguage: (state, action) => {
      state.data.language[action.payload.index] = action.payload.value;
    },
    updateSecondaryCategories: (state, action) => {
      state.data.secondary_categories[action.payload.index] =
        action.payload.value;
    },
  },
  extraReducers: {
    [getInfluencerInfo.pending]: (state, action) => {
      state.status = "loading";
    },
    [getInfluencerInfo.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload.data;
    },
    [getInfluencerInfo.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getInfluencerInfoDataByHandel.pending]: (state, action) => {
      state.status = "loading";
    },
    [getInfluencerInfoDataByHandel.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
    },
    [getInfluencerInfoDataByHandel.rejected]: (state, action) => {
      state.status = "failed";
    },
    [youtubeDataGet.pending]: (state, action) => {
      state.youTubeDataStatus = "loading";
    },
    [youtubeDataGet.fulfilled]: (state, action) => {
      state.youTubeDataStatus = "success";
      state.youtubeInfData = action.payload;
    },
    [youtubeDataGet.rejected]: (state, action) => {
      state.youTubeDataStatus = "failed";
    }
  },
});

export const {
  setData,
  updateField,
  updateValueToArray,
  updateLanguage,
  updateSecondaryCategories, setYoutubeInfData,
} = influencerInfoSlice.actions;
export default influencerInfoSlice.reducer;
