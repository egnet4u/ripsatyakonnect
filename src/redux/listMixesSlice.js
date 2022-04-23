import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listDetails: {},
  status: "idle",
  selectedMixNumber: 1,
  /** New backend code start */
  mixInfContentRemove: {
    influencer_content_remove_data_1: [], influencer_content_remove_data_2: [], influencer_content_remove_data_3: [],
    influencer_content_remove_data_4: [], influencer_content_remove_data_5: []
  },
  mixInfContentUpdate: {
    influencer_content_data_update_1: [], influencer_content_data_update_2: [], influencer_content_data_update_3: [],
    influencer_content_data_update_4: [], influencer_content_data_update_5: []
  },
  mixInfluencerDataUpdate: {
    inf_update_data_mix_1: [], inf_update_data_mix_2: [], inf_update_data_mix_3: [],
    inf_update_data_mix_4: [], inf_update_data_mix_5: []
  },
  mixInfContentData: {
    mix_inf_cont_1: [], mix_inf_cont_2: [], mix_inf_cont_3: [], mix_inf_cont_4: [], mix_inf_cont_5: []
  },
  mixInflencerData: { mix_influencers_data_1: [], mix_influencers_data_2: [], mix_influencers_data_3: [], mix_influencers_data_4: [], mix_influencers_data_5: [] },
  mixListDetails: { influencers_data_list_1: [], influencers_data_list_2: [], influencers_data_list_3: [], influencers_data_list_4: [], influencers_data_list_5: [], },
  mixDetails: [{ "id": 0, "mix_number": 1, "mix_name": "Mix 1" }, { "id": 0, "mix_number": 2, "mix_name": "Mix 2" },
  { "id": 0, "mix_number": 3, "mix_name": "Mix 3" }, { "id": 0, "mix_number": 4, "mix_name": "Mix 4" }, { "id": 0, "mix_number": 5, "mix_name": "Mix 5" }],
  /** end */
};

/** Oldd backend api */
export const getListDetails = createAsyncThunk(
  "listMixesData/getListDetails",
  async (id) => {
    const { data } = await axios.get("/list_details/" + id);
    return data;
  }
);

/** Start New backend code Here */
/** Get all mixes through api */
export const getListMixes = createAsyncThunk(
  "listMixesData/getListMixes",
  async (id) => {
    const { data } = await axios.get(`/mix/?project_id=${id}`);
    return data;
  }
);

/** Get the all mix list influencer data */
export const mixListData = createAsyncThunk(
  "listMixesData/mixListData",
  async (d) => {
    const gData = d;
    if (gData.mixid !== 0) {
      const { data } = await axios.get(`/mix/influencer?mix_id=${gData.mixid}`);
      return { mainData: data.data, mixNumber: gData.mixnum };
    } else {
      const empData = [];
      return { mainData: empData, mixNumber: gData.mixnum };
    }

  }
);
/** End */

/** Get the all mix list influencer data */
export const mixInfConData = createAsyncThunk(
  "listMixesData/mixInfConData",
  async (d) => {
    const gData = d;
    if (gData.mixInfId !== 0) {
      const { data } = await axios.get(`/mix/influencer/content/?mix_influencer_id=${gData.mixInfId}`);
      return { mainData: data.data, mixNumber: gData.mixnum, mixInfId: gData.mixInfId };
    }
  }
);
/** End */








const listMixesSlice = createSlice({
  name: "listMixesData",
  initialState,
  reducers: {
    addNewMix: (state, action) => {
      state.listDetails[`influencers_data_list_${action.payload.mixNumber}`] =
        action.payload.data;
    },
    addMixInfluencers: (state, action) => {
      state.mixInflencerData[`mix_influencers_data_${action.payload.mixNum}`] = action.payload.data;
    },
    removeInfluencerFromMix: (state, action) => {
      //const updated = state.listDetails[`influencers_data_list_${action.payload.mixNumber}`
      const updated = state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`
      ].filter(
        (influencer) =>
          influencer.instagram_handle !== action.payload.instagram_handle
      );
      //state.listDetails[`influencers_data_list_${action.payload.mixNumber}`] = updated;
      state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`] = updated;

    },
    synchronizeMixData: (state, action) => {
      state.listDetails[`influencers_data_list_${action.payload.mixNumber}`] =
        action.payload.data;
      state.selectedMixNumber = action.payload.mixNumber;
    },
    addContentToAllInfluencers: (state, action) => {
      let foundMix = state.listDetails[`influencers_data_list_${action.payload.mixNumber}`];

      let updated = foundMix.map((influencer) => {
        let totalPlan = influencer.content_plan
          ? [...influencer.content_plan]
          : [];
        action.payload.content.map((item) => {
          const exists =
            totalPlan.findIndex((p) => p.type === item.type) !== -1;
          const index = totalPlan.findIndex((p) => p.type === item.type);
          if (exists) {
            totalPlan.splice(index, 1);
          }
          let plan = {};
          if (state.listDetails.platforms[0] === "instagram") {
            plan.final_pricing =
              influencer[`instagram_${item.type}_pricing`] || 0;
            plan.estimated_engagement = influencer[`${item.type}_engagement`];
          }
          if (state.listDetails.platforms[0] === "youtube") {
            plan.final_pricing =
              influencer[`youtube_${item.type}_pricing`] || 0;
          }
          plan.pieces = item.pieces;
          plan.type = item.type;
          totalPlan.push(plan);
          return item;
        });

        influencer.content_plan = totalPlan;
        return influencer;
      });
      state.listDetails[`influencers_data_list_${action.payload.mixNumber}`] =
        updated;
      state.selectedMixNumber = action.payload.mixNumber;
    },
    addContentToOneInfluencer: (state, action) => {
      let updateMix =
        state.listDetails[`influencers_data_list_${action.payload.mixNumber}`];
      let foundIndex = updateMix.findIndex(
        (inf) => inf.instagram_handle === action.payload.instagram_handle
      );

      let influencer = updateMix[foundIndex];

      let totalPlan = influencer.content_plan
        ? [...influencer.content_plan]
        : [];
      action.payload.content.map((item) => {
        const exists = totalPlan.findIndex((p) => p.type === item.type) !== -1;
        const index = totalPlan.findIndex((p) => p.type === item.type);
        if (exists) {
          totalPlan.splice(index, 1);
        }
        let plan = {};
        if (state.listDetails.platforms[0] === "instagram") {
          plan.final_pricing =
            influencer[`instagram_${item.type}_pricing`] || 0;
          plan.estimated_engagement = influencer[`${item.type}_engagement`];
        }
        if (state.listDetails.platforms[0] === "youtube") {
          plan.final_pricing = influencer[`youtube_${item.type}_pricing`] || 0;
        }

        plan.pieces = item.pieces;
        plan.type = item.type;
        totalPlan.push(plan);
        return item;
      });

      influencer.content_plan = totalPlan;
      updateMix.splice(foundIndex, 1, influencer);

      state.listDetails[`influencers_data_list_${action.payload.mixNumber}`] =
        updateMix;
      state.selectedMixNumber = action.payload.mixNumber;
    },
    updateValues: (state, action) => {
      //let updateMix = state.listDetails[`influencers_data_list_${action.payload.mixNumber}`];
      let updateMix = state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`]
      let foundIndex = updateMix.findIndex(
        (inf) => inf.instagram_handle === action.payload.instagram_handle
      );
      //Update the Campaign Influencer Status
      if (foundIndex !== -1) {
        let influencer = updateMix[foundIndex];
        influencer.mixdata[action.payload.name] = action.payload.value;
        influencer.mixdata[`instagram_handle`] = action.payload.instagram_handle;
        updateMix[foundIndex] = influencer;
      }
      //state.listDetails[`influencers_data_list_${action.payload.mixNumber}`] = updateMix;
      state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`] = updateMix;
      //Update the "mixInfluencerDataUpdate";
      let mixIndDataUpdate = state.mixInfluencerDataUpdate[`inf_update_data_mix_${action.payload.mixNumber}`];
      let find_ind = mixIndDataUpdate.findIndex((ind) => ind.id === action.payload.mix_inf_id);
      if (find_ind !== -1) {
        let influencer = updateMix[foundIndex];
        mixIndDataUpdate[find_ind] = influencer.mixdata;
        state.mixInfluencerDataUpdate[`inf_update_data_mix_${action.payload.mixNumber}`]
          = mixIndDataUpdate;
      } else {
        let influencer = updateMix[foundIndex];
        state.mixInfluencerDataUpdate[`inf_update_data_mix_${action.payload.mixNumber}`]
          = [...mixIndDataUpdate, influencer.mixdata];
      }
      state.selectedMixNumber = action.payload.mixNumber;
    },
    removeInfluencerContent: (state, action) => {
      //let updateMix =  state.listDetails[`influencers_data_list_${action.payload.mixNumber}`];
      let updateMix = state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`];
      let removeInfContentData = state.mixInfContentRemove[`influencer_content_remove_data_${action.payload.mixNumber}`];

      let foundIndex = updateMix.findIndex(
        (inf) => inf.instagram_handle === action.payload.instagram_handle
      );

      let influencer = updateMix[foundIndex];

      let totalPlan = influencer.content_plan;
      const index = totalPlan.findIndex((p) => p.content_type === action.payload.type);
      if (index !== -1) {
        totalPlan.splice(index, 1);
      }
      influencer.content_plan = totalPlan;
      updateMix[foundIndex] = influencer;

      if (removeInfContentData.length !== 0) {
        state.mixInfContentRemove[`influencer_content_remove_data_${action.payload.mixNumber}`].push(action.payload);
      } else {
        state.mixInfContentRemove[`influencer_content_remove_data_${action.payload.mixNumber}`] = [action.payload];
      }
      //state.listDetails[`influencers_data_list_${action.payload.mixNumber}`] = updateMix;
      state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`] = updateMix;
      state.selectedMixNumber = action.payload.mixNumber;
    },
    updateContentValues: (state, action) => {
      //let updateMix = state.listDetails[`influencers_data_list_${action.payload.mixNumber}`];
      let updateMix = state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`];
      let updateContentData = state.mixInfContentUpdate[`influencer_content_data_update_${action.payload.mixNumber}`];

      let foundIndex = updateMix.findIndex(
        (inf) => inf.instagram_handle === action.payload.instagram_handle
      );
      let influencer = updateMix[foundIndex];
      let totalPlan = influencer.content_plan;
      //const index = totalPlan.findIndex((p) => p.type === action.payload.type);
      const index = totalPlan.findIndex((p) => p.content_type === action.payload.type);
      totalPlan[index][action.payload.name] = action.payload.value;
      influencer.content_plan = totalPlan;
      updateMix.splice(foundIndex, 1, influencer);
      state.listDetails[`influencers_data_list_${action.payload.mixNumber}`] = updateMix;
      if (updateContentData.length !== 0) {
        let contentIndex = updateContentData.findIndex((content) => content.id === totalPlan[index].id);
        if (contentIndex !== -1) {
          updateContentData[contentIndex] = totalPlan[index];
          state.mixInfContentUpdate[`influencer_content_data_update_${action.payload.mixNumber}`] = updateContentData;
        } else {
          let concatContentData = [...updateContentData];
          state.mixInfContentUpdate[`influencer_content_data_update_${action.payload.mixNumber}`].push(totalPlan[index]);
        }
      } else {
        state.mixInfContentUpdate[`influencer_content_data_update_${action.payload.mixNumber}`] = [totalPlan[index]];
      }
      state.selectedMixNumber = action.payload.mixNumber;
      //Update the Campaign Influencer Status
      let againUpdateMixselect = state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`];
      let againFoundIndex = againUpdateMixselect.findIndex(
        (inf) => inf.instagram_handle === action.payload.instagram_handle
      );
      let againGetInfluencer = againUpdateMixselect[againFoundIndex];
      let getMixDataInf = againGetInfluencer[`mixdata`]
      let againTotalPlan = againGetInfluencer.content_plan;
      const cost = againTotalPlan.map((d) => parseInt(d.num_posts) * parseInt(d.price === "" ? 0 : d.price));
      const total = cost.reduce((a, b) => a + b, 0);
      againGetInfluencer[`cpe`] = total;
      againGetInfluencer[`est_cost`] = total;
      againGetInfluencer[`offer_cost`] = total;
      againGetInfluencer[`brand_cost`] = Math.round(total + (total * 10) / 100);
      getMixDataInf[`est_cost`] = total;
      getMixDataInf[`cpe`] = total;
      getMixDataInf[`offer_cost`] = total;
      getMixDataInf[`brand_cost`] = Math.round(total + (total * 10) / 100);

      //select again influencer data to insert in  a influencer updata data in redux
      let selectAgainnInfData = state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`];
      let findIndexOfInf = selectAgainnInfData.findIndex((inf) => inf.instagram_handle === action.payload.instagram_handle);
      let selectUpdateInfData = state.mixInfluencerDataUpdate[`inf_update_data_mix_${action.payload.mixNumber}`];
      let selectUnikiInfData = selectAgainnInfData[findIndexOfInf];
      let createObject = {};
      createObject.id = selectUnikiInfData.id;
      createObject.status = selectUnikiInfData.status;
      createObject.instagram_handle = selectUnikiInfData.instagram_handle;
      createObject.margin = selectUnikiInfData.margin;
      createObject.cpe = selectUnikiInfData.cpe;
      createObject.est_cost = selectUnikiInfData.est_cost;
      createObject.offer_cost = selectUnikiInfData.offer_cost;
      createObject.brand_cost = selectUnikiInfData.brand_cost;
      createObject.mix_id = selectUnikiInfData.mix_id;
      createObject.influencer_id = selectUnikiInfData.influencer_id;
      createObject.assigned_to = selectUnikiInfData.assigned_to;
      if (selectUpdateInfData.length !== 0) {
        let findIndexInf = selectUpdateInfData.findIndex((inf) => inf.instagram_handle === action.payload.instagram_handle);
        if (findIndexInf !== -1) {
          selectUpdateInfData[findIndexInf] = createObject;
        } else {
          selectUpdateInfData.push(createObject);
        }
      } else {
        selectUpdateInfData.push(createObject);
      }
      state.mixInfluencerDataUpdate[`inf_update_data_mix_${action.payload.mixNumber}`] = selectUpdateInfData;

    },
    setMixNumber: (state, action) => {
      state.selectedMixNumber = action.payload.value;
    },
    setListField: (state, action) => {
      state.listDetails[action.payload.name] = action.payload.value;
    },
    emptyUpdateMixInfData: (state, action) => {
      state.mixInfluencerDataUpdate[`inf_update_data_mix_${action.payload.mixNumber}`] = [];
    },
    emptyMixesOfInf: (state, action) => {
      state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`] = [];
    },
    emptyMixesListDetail: (state, action) => {
      state.mixListDetails[`influencers_data_list_${action.payload.mixNumber}`] = [];
    },
    emptyMixesDetail: (state, action) => {
      state.mixDetails[action.payload.mixNumber] = { id: 0, mix_number: action.payload.mixNumber + 1, mix_name: `Mix ${action.payload.mixNumber + 1}` }
    },
    deleteMixesToRedux: (state, action) => {
      state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`] = [];
    },
    contentAddInMixInfluencerData: (state, action) => {
      const GetD = action.payload.mainData;
      if (GetD.length > 0) {
        let conData = state.mixInfContentData[`mix_inf_cont_${action.payload.mixNumber}`];
        const getInfDataRedux = state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`];
        conData = [...conData, ...GetD];
        for (let i = 0; i < getInfDataRedux.length; i++) {
          let selectDataInf = getInfDataRedux[i]['mixdata']['id'];
          if (selectDataInf === action.payload.mixInfId) {
            getInfDataRedux[i]['content_plan'] = GetD;
            state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`] = getInfDataRedux;
          }
        }
      }
    },
    newContentAddInInfluencers: (state, action) => {
      //{conData : data , mixNumberGet:getMixNumber  , mixInfsId: GetmixInfid };
      const data = action.payload.conData;
      const mixnumber = action.payload.mixNumberGet;
      const mixInfId = action.payload.mixInfsId[`mix_influencer_id`];
      const getInf = state.mixInflencerData[`mix_influencers_data_${mixnumber}`];
      if (getInf.length !== 0) {
        const findIndex = getInf.findIndex((inf) => inf.id === mixInfId);
        if (findIndex !== -1) {
          getInf[findIndex][`content_plan`] = data;
          state.mixInflencerData[`mix_influencers_data_${mixnumber}`] = getInf;
        }
      }

    },
    emptyContentUpdateRedux: (state, action) => {
      state.mixInfContentUpdate[`influencer_content_data_update_${action.payload.mixNumber}`] = [];
    },
    emptyRemoveContentRedux: (state, action) => {
      state.mixInfContentRemove[`influencer_content_remove_data_${action.payload.mixNumber}`] = [];
    }

  },
  extraReducers: {
    [getListDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getListDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.listDetails = action.payload.data;
    },
    [getListDetails.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getListMixes.pending]: (state, action) => {
      state.getListMixstatus = "loading";
    },
    [getListMixes.fulfilled]: (state, action) => {
      state.getListMixstatus = "success";
      var getData = action.payload.data;
      //console.log(getData);
      var mixArr = state.mixDetails;
      for (var i = 0; i < getData.length; i++) {
        var dbMixNumber = getData[i].mix_number;
        for (var j = 0; j < mixArr.length; j++) {
          if (mixArr[j].mix_number === dbMixNumber) {
            mixArr[j].id = getData[i].id;
            mixArr[j].mix_name = getData[i].mix_name;
          }
        }
      }
      //console.log("ListMixesSlice",mixArr);
      state.mixDetails = mixArr;

    },
    [getListMixes.rejected]: (state, action) => {
      state.getListMixstatus = "failed";
    },

    [mixListData.pending]: (state, action) => {
      state.status = "loading";
    },
    [mixListData.fulfilled]: (state, action) => {
      state.status = "success";
      if (action.payload.mixNumber == 1) {
        state.mixListDetails.influencers_data_list_1 = action.payload.mainData;
      }
      if (action.payload.mixNumber == 2) {
        state.mixListDetails.influencers_data_list_2 = action.payload.mainData;
      }
      if (action.payload.mixNumber == 3) {
        state.mixListDetails.influencers_data_list_3 = action.payload.mainData;
      }
      if (action.payload.mixNumber == 4) {
        state.mixListDetails.influencers_data_list_4 = action.payload.mainData;
      }
      if (action.payload.mixNumber == 5) {
        state.mixListDetails.influencers_data_list_5 = action.payload.mainData;
      }
      //console.log("listMixesSice-action-payload",action.payload.mainData);
    },
    [mixListData.rejected]: (state, action) => {
      state.status = "failed";
    },

    [mixInfConData.pending]: (state, action) => {
      state.status = "loading";
    },
    [mixInfConData.fulfilled]: (state, action) => {
      state.status = "success";
      const GetD = action.payload.mainData;
      if (GetD.length > 0) {
        //console.log("ListMixesSlice",GetD);
        let conData = state.mixInfContentData[`mix_inf_cont_${action.payload.mixNumber}`];
        //state.mixInfContentData[`mix_inf_cont_${action.payload.mixNumber}`]  = GetD;
        const getInfDataRedux = state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`];
        conData = [...conData, ...GetD];
        for (let i = 0; i < getInfDataRedux.length; i++) {
          let selectDataInf = getInfDataRedux[i]['mixdata']['id'];
          if (selectDataInf === action.payload.mixInfId) {
            getInfDataRedux[i]['content_plan'] = GetD;
            state.mixInflencerData[`mix_influencers_data_${action.payload.mixNumber}`] = getInfDataRedux;
            // console.log("list mixesSlice => Recive Api response Data=>",
            //                GetD ,"getInfluencerData related to mix =>" ,
            //                getInfDataRedux ,"mix number =>",
            //                action.payload.mixNumber,"mix inf id",action.payload.mixInfId);

          }
        }



        // var d = action.payload.mainData;
        // var infIdsMix = action.payload.mixInfId;

        // var empArr = conData.push(...d);     
        // state.mixInfContentData[`mix_inf_cont_${action.payload.mixNumber}`] = conData;
      }

    },
    [mixInfConData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default listMixesSlice.reducer;
export const {
  addContentToAllInfluencers,
  addContentToOneInfluencer,
  updateValues,
  removeInfluencerContent,
  updateContentValues,
  setMixNumber,
  setListField,
  synchronizeMixData,
  removeInfluencerFromMix,
  addNewMix,
  addMixInfluencers,
  emptyUpdateMixInfData,
  emptyMixesOfInf,
  emptyMixesListDetail,
  emptyMixesDetail,
  deleteMixesToRedux,
  contentAddInMixInfluencerData,
  emptyContentUpdateRedux,
  emptyRemoveContentRedux, newContentAddInInfluencers
} = listMixesSlice.actions;
