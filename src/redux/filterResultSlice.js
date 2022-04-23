import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { formatForShortlist } from "../utils/formatForShortlist";

const initialState = {
  influencers: [],
//   mixDetails:[{"id": 0,"mix_number": 1,"mix_name": "Mix 1"},
//    {"id": 0,"mix_number": 2,"mix_name": "Mix 2"},
//    {"id": 0,"mix_number": 3,"mix_name": "Mix 3"},
//   {"id": 0,"mix_number": 4,"mix_name": "Mix 4"},
//  {"id": 0,"mix_number": 5,"mix_name": "Mix 5"}],
//   status: "idle",
  selectedInfluencers: [],
  selectedMix: {},
  typeOfList: null,
  isNewlyCreated: {
    type: null,
    mixNumber: null,
    data: null,
  },
};

/** Get all mixes through api */
// export const getListMixes = createAsyncThunk(
//   "filterResultData/getListMixes",
//   async (id) => {
//     const  data  = await axios.get(`/mix/?project_id=${id}`);
//     return data;
//   }
// );

export const getFilterResultData = createAsyncThunk(
  "filterResultData/getFilterResultData",
  async (searchData) => {
    //const { data } = await axios.post(
      //"/integrated_influencer_search_by_name_and_handle",{search_string: searchData.search_string,platforms: searchData.platforms,}
    const { data } = await axios.get(
      `influencer/search/?search_string=${searchData.search_string}`
    );
    //return data;
    //console.log(data.data);
    return data.data;
  }
);

export const getFilterSearchResultData = createAsyncThunk(
  "filterResultData/getFilterSearchResultData",
  // async (searchData) => {
  //   const { data } = await axios.post("/list_filters", searchData);
  //   return data;
  // }
  async (searchData) => {
    const { data } = await axios.post("/instagram/filter/", searchData);
    return data.data;
  }
);

export const getAllInfluencerData = createAsyncThunk(
  "filterResultData/getAllInfluencerData",
  async (filterData) => {
    const { data } = await axios.get(
      `/influencer?page=${filterData.page}&reverse=true&sort_keyword=${filterData.sort}&platforms=${filterData.platforms}`
    );
    return data;
  }
);

export const getInfluencersDataFromHandles = createAsyncThunk(
  "filterResultData/getInfluencersDataFromHandles",
  async (influencersData) => {
    const { data } = await axios.post(
      `/get_comprehensive_influencer_data`,
      influencersData
    );
    return data;
  }
);



const filterResultSlice = createSlice({
  name: "filterResultData",
  initialState,
  reducers: {
    setNewlyCreated: (state, action) => {
      state.isNewlyCreated.type = action.payload.type;
      state.isNewlyCreated.data = action.payload.data;
      state.isNewlyCreated.mixNumber = action.payload.mixNumber;
    },
    setSeletedInfluencers: (state, action) => {
      if (action.payload.checked) {
        state.selectedInfluencers = [
          ...state.selectedInfluencers,
          action.payload.influencer,
        ];
      }
      if (!action.payload.checked) {
        state.selectedInfluencers = state.selectedInfluencers.filter(
          (inf) =>
            inf.instagram_handle !== action.payload.influencer.instagram_handle
        );
      }
    },
    clearSelectedInfluencer: (state, action) => {
      state.selectedInfluencers = [];
    },
    setSelectedMix: (state, action) => {
      state.selectedMix.name = action.payload.name;
      state.selectedMix.number = action.payload.number;
      state.selectedMix.mixid = action.payload.mixid;

    },
    resetSelectedMix: (state, action) => {
      state.selectedMix = {};
    },
    resetTypeOfList: (state, action) => {
      state.typeOfList = null;
    },
    setTypeOfList: (state, action) => {
      state.typeOfList = action.payload.value;
    },
    updateInfluencerData: (state, action) => {
      const index = state.influencers.indexOf(
        (influencer) =>
          influencer.instagram_handle === action.payload.instagram_handle
      );
      state.influencers.splice(index, 1, action.payload);
    },
  },
  extraReducers: {
    [getFilterResultData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getFilterResultData.fulfilled]: (state, action) => {
      state.status = "success";
      let count = action.payload.length;
      state.influencers.count  =  1;
      state.influencers.influencers =  action.payload;
      //state.influencers = action.payload.data;
    },
    [getFilterResultData.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getFilterSearchResultData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getFilterSearchResultData.fulfilled]: (state, action) => {
      state.status = "success";
      let count  = action.payload.length; 
      //console.log(action.payload, count);
      state.influencers.count  = count
      state.influencers.influencers = action.payload;
    },
    [getFilterSearchResultData.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getAllInfluencerData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllInfluencerData.fulfilled]: (state, action) => {
      state.status = "success";
      state.influencers = action.payload.data;
    },
    [getAllInfluencerData.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getInfluencersDataFromHandles.pending]: (state, action) => {
      state.status = "loading";
    },
    [getInfluencersDataFromHandles.fulfilled]: (state, action) => {
      state.status = "success";
      state.typeOfList = "handles";
      var results = action.payload.data;
      var compactedList = [];
      for (var i = 0; i < results.length; i++) {
        if (results[i].exists) {
          compactedList.push(formatForShortlist(results[i]));
        } else {
          compactedList.push({
            instagram_handle: results[i].instagram_handle,
            selected: false,
            exists: results[i].exists,
          });
        }
      }

      state.influencers = compactedList;
    },
    [getInfluencersDataFromHandles.rejected]: (state, action) => {
      state.status = "failed";
    },

    // [getListMixes.pending]: (state, action) => {
    //   state.status = "loading";
    // },
    // [getListMixes.fulfilled]: (state,action) =>{
    //   state.status = "success";
    //  // var getData = action.payload.data;
    //   //var d = state.mixDetails;
    //  // state.mixDetails = [...d , ...getData];
    // },
    // [getListMixes.rejected]: (state, action) => {
    //   state.status = "failed";
    // },
    
    
    
   
  },
});

export default filterResultSlice.reducer;
export const {
  setSeletedInfluencers,
  clearSelectedInfluencer,
  resetTypeOfList,
  setTypeOfList,
  setSelectedMix,
  updateInfluencerData,
  resetSelectedMix,
  setNewlyCreated,
} = filterResultSlice.actions;
