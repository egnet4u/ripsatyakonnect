import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  campaignDetails: {data:{campaign_posts:[],hashtags:[],start_date:"" , end_date:"" , campaign_queued:false}},
  campaignInfDataUpdate:[],
  campaignInfContentDataUpdate:[],
  campaignInfContentDataRemove:[],
  updateLiveCampaignDate : [],
  updateLiveCampaignHasTag:[],
  updateLiveCampRemoveHashTag:[],
  updateLiveExcludeEstEng:[],
  status: "idle",
  pending: {},
  pendingStatus: "idle",
};

//In new bakend "getCampaignDetailsData" are used to getting the data of campaign
export const getCampaignDetailsData = createAsyncThunk(
"campaignData/getCampaignDetailsData" , 
async(projectId) => {
  const {data} = await axios.get(`/project/campaign/create/?project_id=${projectId}`);
  return data.data;
}
)
//Here we are get the campaign influencer data by campaign id "getCampaignInfluencerData"
export const getCampaignInfluencerData = createAsyncThunk(
  "campaignData/getCampaignInfluencerData" ,
  async(campaignId) => {
    const {data} = await axios.get(`/project/campaign/influencer/?campaign_id=${campaignId}`);
    return data.data;
  }
)

export const getCampaignPendingData = createAsyncThunk(
  "campaignData/getCampaignPendingData",
  async (d) => {
    const camp_id = d.campaign_id;
    const platform = d.platform;
    //const { data } = await axios.get("/campaign_influencers_pending_data/" + id);
    const {data}  = await axios.get(`project/campaign/pending/data/?campaign_id=${camp_id}&platform=${platform}`);
    return data;
  }
);
export const getCampaignLiveDataRedux  = createAsyncThunk(
  "campaignData/getCampaignLiveDataRedux",
  async(d) => {
      const  camp_id = d.camId;
      const platform = d.platform;
      const {data}  = await axios.get(`project/campaign/live/data/?campaign_id=${camp_id}&platform=${platform}`);
      return data;
  }
)

//old backend
export const getCampaignDetails = createAsyncThunk(
  "campaignData/getCampaignDetails",
  async ({ id, email }) => {
    const { data } = await axios.get(
      "/campaign_details/" + id + "?current_user_email=" + email
    );
    return data;
  }
);


const campaignSlice = createSlice({
  name: "campaignData",
  initialState,
  reducers: {
    synchronizeCampaignMixData: (state, action) => {
      state.campaignDetails.data[`campaign_influencer_data`] = action.payload.data;
    },
    removeInfluencerFromCampaignMix: (state, action) => {
      const updated = state.campaignDetails.data[`campaign_influencer_data`].filter(
        (influencer) =>
          influencer.instagram_handle !== action.payload.instagram_handle
      );
      state.campaignDetails.data[`campaign_influencer_data`] = updated;
      const updateCampSecData = state.campaignDetails[`campaignSecondData`].filter(
        (influencer) =>
          influencer.instagram_handle !== action.payload.instagram_handle
      );
      state.campaignDetails[`campaignSecondData`] = updateCampSecData;
    },
    addContentToCampaignAllInfluencers: (state, action) => {
      let foundMix = state.campaignDetails.data[`campaign_influencer_data`];
      
      let updated = foundMix.map((influencer) => {
        let inf = influencer;
        let totalPlan = inf.content_plan;
        action.payload.content.map((item) => {
          const exists = totalPlan.findIndex((p) => p.content_type === item.content_type);
          //const index = totalPlan.findIndex((p) => p.type === item.type);
          let plan = {};
          plan.num_posts = item.num_posts;
          plan.content_type = item.content_type;
          plan.price  = 0;
          plan.platform  = state.campaignDetails.campaignFirstData[0].platform;
          plan.campaign_influencer_id = influencer.main_inf_data.id;
          plan.id  = 0;
          if (exists !== -1) {
            let  counting  = totalPlan[exists][`price`]*item.num_posts;
            totalPlan[exists].num_posts = item.num_posts;
            state.campaignInfContentDataUpdate.push(totalPlan[exists]);
          }else{
            totalPlan.push(plan);
            state.campaignInfContentDataUpdate.push(plan);
          }
          // if (state.campaignDetails.campaignFirstData[0].platforms === "instagram") {
          //   plan.final_pricing =
          //     influencer[`instagram_${item.type}_pricing`] || 0;
          //   plan.estimated_engagement = influencer[`${item.type}_engagement`];
          // }
          // if (state.campaignDetails.data.platforms[0] === "youtube") {
          //   plan.final_pricing =
          //     influencer[`youtube_${item.type}_pricing`] || 0;
          // }
          return item;
        });

        influencer.content_plan = totalPlan;
        return influencer;
      });
      state.campaignDetails.data[`campaign_influencer_data`] = updated;
    },
    addContentToCampaignOneInfluencer: (state, action) => {
      let updateMix = state.campaignDetails.data[`campaign_influencer_data`];
      let updateContentCampaignData  = state.campaignInfDataUpdate;
      let foundIndex = updateMix.findIndex(
        (inf) => inf.instagram_handle === action.payload.instagram_handle
      );
      let updateContentCampaign = [];
      let influencer = updateMix[foundIndex];
      let totalPlan = influencer.content_plan
        ? [...influencer.content_plan]
        : [];
      action.payload.content.map((item) => {
        const exists = totalPlan.findIndex((p) => p.content_type === item.content_type) !== -1;
        const index = totalPlan.findIndex((p) => p.content_type === item.content_type);
        if (exists) {
          totalPlan.splice(index, 1);
        }

        let plan = {};
        // if (state.campaignDetails.data.platforms[0] === "instagram") {
          if (action.payload.content_platform === "instagram") {
            plan.price =
             influencer[`instagram_${item.content_type}_pricing`] || 0;
            plan.estimated_engagement = influencer[`${item.content_type}_engagement`];
         }
        // if (state.campaignDetails.data.platforms[0] === "youtube") {
          if (action.payload.content_platform === "youtube") {
              plan.price = influencer[`youtube_${item.content_type}_pricing`] || 0;
          }
        plan.num_posts = item.num_posts;
        plan.content_type = item.content_type;
        plan.platform = item.platform;
        plan.id = item.id;
        plan.campaign_influencer_id  = item.mix_influencer_id;
        updateContentCampaign.push(plan);
        totalPlan.push(plan);
        return item;
      });

      influencer.content_plan = totalPlan;
      updateMix.splice(foundIndex, 1, influencer);
      //state.campaignInfDataUpdate = updateContentCampaign;
      state.campaignDetails.data[`campaign_influencer_data`] = updateMix;
    },
    updateCampaignValues: (state, action) => {
      let updateMix = state.campaignDetails.data[`campaign_influencer_data`];
      let insertUpdateData = state.campaignInfDataUpdate;
      let foundIndex = updateMix.findIndex(
        (inf) => inf.instagram_handle === action.payload.instagram_handle
      );

      //let influencer = updateMix[foundIndex];
      let influencer = updateMix[foundIndex];
      let infMixData = influencer['main_inf_data'];
      infMixData[action.payload.name] = action.payload.value;
      
      if(insertUpdateData.length > 0){
        let foundIndex = insertUpdateData.findIndex(
          (inf) => inf.instagram_handle === action.payload.instagram_handle
        );
        if(foundIndex !== -1){
          insertUpdateData[foundIndex] = infMixData; 
          state.campaignInfDataUpdate = insertUpdateData;
        }else{
          insertUpdateData.push(infMixData);
          state.campaignInfDataUpdate = insertUpdateData;
        }
      }else{
        state.campaignInfDataUpdate = [infMixData];
      }

      updateMix.splice(foundIndex, 1, influencer);
      state.campaignDetails.data[`campaign_influencer_data`] = updateMix;
    },
    removeCampaignInfluencerContent: (state, action) => {
      let updateMix = state.campaignDetails.data[`campaign_influencer_data`];
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
      state.campaignDetails.data[`campaign_influencer_data`] = updateMix;
      state.campaignInfContentDataRemove.push(action.payload);
    },
    updateCampaignContentValues: (state, action) => {
      let updateMix = state.campaignDetails.data[`campaign_influencer_data`];
      let contentUpdateDataStore = state.campaignInfContentDataUpdate;
      let foundIndex = updateMix.findIndex(
        (inf) => inf.instagram_handle === action.payload.instagram_handle
      );

      let influencer = updateMix[foundIndex];

      let totalPlan = influencer.content_plan;
      const index = totalPlan.findIndex((p) => p.content_type === action.payload.type);
      totalPlan[index][action.payload.name] = action.payload.value;
      influencer.content_plan = totalPlan;
      updateMix.splice(foundIndex, 1, influencer);
      if(contentUpdateDataStore.length !== 0){
        let contentIndex = contentUpdateDataStore.findIndex((content)=> content.id === totalPlan[index].id);
        if(contentIndex !== -1){
         contentUpdateDataStore[contentIndex] = totalPlan[index];
         state.campaignInfContentDataUpdate = contentUpdateDataStore;
        }else{
          contentUpdateDataStore.push(totalPlan[index])
          state.campaignInfContentDataUpdate = contentUpdateDataStore;
        }
      }else{
        state.campaignInfContentDataUpdate = [totalPlan[index]]; 
      }
      state.campaignDetails.data[`campaign_influencer_data`] = updateMix;
      //Again Select campagin details and insert data in campaignInfDataUpdate;  
      let camDetailsCon = state.campaignDetails.data[`campaign_influencer_data`];
      let selectInfData = camDetailsCon.findIndex((inf)=> inf.instagram_handle === action.payload.instagram_handle);
      if(selectInfData !== -1){
        let infSelect  = camDetailsCon[selectInfData];
        let infContentPlan = infSelect[`content_plan`];
        let infMainData = infSelect[`main_inf_data`];
        const cost = infContentPlan.map((d)=> parseInt(d.num_posts)*parseInt( d.price === "" ? 0 : d.price));
        const total  = cost.reduce((a,b)=> a+b , 0);
        let createObject = {};
        createObject.id = infMainData.id;
        createObject.status  = infMainData.status;
        createObject.instagram_handle  = infMainData.instagram_handle;
        createObject.margin  = 10;
        createObject.cpe  = total;
        createObject.est_cost  = total;
        createObject.offer_cost  = total;
        createObject.brand_cost  =  Math.round(total+(total*10)/100);
        createObject.campaign_id  = infMainData.campaign_id;
        createObject.influencer_id  = infMainData.influencer_id;
        createObject.assigned_to  = infMainData.assigned_to;
        
        let selectCampUpdateInfData = state.campaignInfDataUpdate;
        if(selectCampUpdateInfData.length !== 0){
            let findIndexUpdateInf = selectCampUpdateInfData.findIndex((inf)=> inf.instagram_handle === action.payload.instagram_handle);
            if(findIndexUpdateInf !== -1){
              selectCampUpdateInfData[findIndexUpdateInf] = createObject;
            }else{
              selectCampUpdateInfData.push(createObject);
            }
        }else{
          selectCampUpdateInfData.push(createObject);
        }
        
        
        //Update data in ampaign_influencer_data
        infSelect[`main_inf_data`] = {...infMainData , cpe:total , est_cost:total , offer_cost:total ,brand_cost:Math.round(total+(total*10)/100) }
        

      }
 
    },
    updateCampaignPosts: (state, action) => {
      // let campaignCopy = { ...state.campaignDetails.data };
      
      let campaignPosts = state.campaignDetails.data["campaign_posts"];
      let liveDataExcEstReach = state.updateLiveExcludeEstEng;

      let foundIndex = campaignPosts.findIndex(
        //(post) => post.shortcode === action.payload.shortcode
        (post) => post.id === action.payload.liveDataId
      );
      let foundPost = campaignPosts.filter(
        (post) => post.id === action.payload.liveDataId
      );
      if (action.payload.isExStatus) {
        //foundPost.is_excluded = false;
        campaignPosts[foundIndex].is_excluded = false;
      } else {
        //foundPost.is_excluded = true;
        campaignPosts[foundIndex].is_excluded = true;
      }

      if(liveDataExcEstReach.length !== 0){
         let srcIndex = liveDataExcEstReach.findIndex((live)=> live.id === action.payload.liveDataId);
         if(srcIndex !== -1){
          liveDataExcEstReach[srcIndex] = campaignPosts[foundIndex];
         }else{
          liveDataExcEstReach.push(campaignPosts[foundIndex]);
         }
      }else{
         liveDataExcEstReach.push(campaignPosts[foundIndex]);
      }
      
      //campaignPosts.splice(foundIndex, 1, foundPost);
      state.campaignDetails.data[`campaign_posts`] = campaignPosts;
      state.updateLiveExcludeEstEng = liveDataExcEstReach;
    },
    updateLiveCampEstEng:(state,action)=>{
      let campaignPosts = state.campaignDetails.data["campaign_posts"];
      let liveDataExcEstReach = state.updateLiveExcludeEstEng;
      
      let foundIndex = campaignPosts.findIndex(
        (post) => post.id === action.payload.liveDataId
      );
      campaignPosts[foundIndex][`achieved_engagement`] = action.payload.value;
      if(liveDataExcEstReach.length !== 0){
         let srcIndex = liveDataExcEstReach.findIndex((live)=> live.id === action.payload.liveDataId);
         if(srcIndex !== -1){
          liveDataExcEstReach[srcIndex] = campaignPosts[foundIndex];
         }else{
          liveDataExcEstReach.push(campaignPosts[foundIndex]);
         }
      }else{
         liveDataExcEstReach.push(campaignPosts[foundIndex]);
      }
      
      state.campaignDetails.data[`campaign_posts`] = campaignPosts;
      state.updateLiveExcludeEstEng = liveDataExcEstReach;
    },
    addPostManually: (state, action) => {
      let campaignPosts = state.campaignDetails.data["campaign_posts"];
      const newPost = { ...action.payload.post, is_excluded: false };
      campaignPosts.push(newPost);
      state.campaignDetails.data[`campaign_posts`] = campaignPosts;
    },
    //new backend
    camInfDataInsert: (state , action) => {
      //console.log("campaign slice",action.payload); 
      state.campaignDetails.data.campaign_influencer_data = action.payload;
    },
    addCamContentInRedux: (state , action) =>{
     const selectInfData = state.campaignDetails.data.campaign_influencer_data[action.payload.arrayIndex];
     selectInfData.content_plan = action.payload.mainData;
     selectInfData.main_inf_data = action.payload.mainInfData;
    },
    addContentInInfluencers : (state , action)=>{
      const selectInfData = state.campaignDetails.data.campaign_influencer_data;
      const findInd = selectInfData.findIndex((inf)=>inf.main_inf_data.id === action.payload.camInfId);
      if(findInd !== -1){
        selectInfData[findInd].content_plan = action.payload.contet_plan
      }
    },
    addInfInCampAndStoreInRedux: (state , action)=>{
      //const selectInfData = state.campaignDetails.data.campaign_influencer_data;
      //selectInfData.content_plan = action.payload.mainData;
      //selectInfData.main_inf_data = action.payload.mainInfData;
      state.campaignDetails.data.campaign_influencer_data.push(action.payload);
    },
    campaignLiveStaticStoryAndStaticVideo:(state,action)=>{
       const getCamPostsData = state.campaignDetails.data[`campaign_posts`];
       if(getCamPostsData.length!== 0){
         let recContentData = [...getCamPostsData ,action.payload];
         state.campaignDetails.data[`campaign_posts`] = recContentData; 
       }else{
         getCamPostsData.push(action.payload);
         state.campaignDetails.data[`campaign_posts`] = getCamPostsData;
       }
       
       
       
    },
    InitialGetHasTagInsert :(state , action) =>{
      //console.log(action.payload);
      state.campaignDetails.data.hashtags = action.payload;
    },
    addHasTagInRedux:(state , action)  =>{
       let selectHasTag = state.campaignDetails.data.hashtags;
        if(!selectHasTag.includes(action.payload.hastag)){
          selectHasTag.push(action.payload.hastag);
          state.updateLiveCampaignHasTag.push(action.payload.hastag);
        }
    },
    removeHasTag:(state , action) =>{
     state.campaignDetails.data.hashtags  = action.payload.hashtagsCopy ;
     state.updateLiveCampRemoveHashTag.push(action.payload.removeHashTag);
    },
    liveCamStartAndEndDateSet:(state , action)=>{
      state.campaignDetails.data.start_date = action.payload.startDate;
      state.campaignDetails.data.end_date = action.payload.endDate;
      state.updateLiveCampaignDate = [action.payload.mainData];
    },
    setCamDateInRedux:(state,action)=>{
      state.campaignDetails.data.start_date = action.payload.startDate;
      state.campaignDetails.data.end_date = action.payload.endDate;
      state.campaignDetails.data.campaign_queued = action.payload.campaign_queued;
    },
    addMoreInfInCampaign:(state, action)=>{
      state.campaignDetails.campaignSecondData.push(action.payload);  
    },
    emptyCampaignInfUpdateData:(state , action)=>{
      state.campaignInfDataUpdate = [] ;
    },
    emptyCampaignContentUpdateData:(state , action)=>{
      const emp = [];
      state.campaignInfContentDataUpdate = emp;
    },
    emptyCampaignContentRemoveData:(state,action)=>{
      state.campaignInfContentDataRemove  = [];
    },
    emptyCampaignContentStaticStoryVideo:(state,action)=>{
      state.campaignDetails.data.campaign_posts = [];
    },
    emptyliveCampaignDate:(state , action)=>{
      state.updateLiveCampaignDate = [];
    },
    emptyLiveCamHashTag:(state,action)=>{
      state.updateLiveCampaignHasTag = [];
    },
    emptyRemoveHashTag:(state,action)=>{
      state.updateLiveCampRemoveHashTag = [];
    },
    emptyLiveCampUpdateEngExc:(state,action)=>{
      state.updateLiveExcludeEstEng = [];
    }

  },
  extraReducers: {
    [getCampaignDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCampaignDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.campaignDetails = action.payload;
    },
    [getCampaignDetails.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getCampaignPendingData.pending]: (state, action) => {
      state.pendingStatus = "loading";
    },
    [getCampaignPendingData.fulfilled]: (state, action) => {
      state.pendingStatus = "success";
      state.pending.data = action.payload.data;
      state.pending.status  = action.payload.status;
    },
    [getCampaignPendingData.rejected]: (state, action) => {
      state.pendingStatus = "failed";
    },
    [getCampaignLiveDataRedux.pending]: (state, action)=>{
      state.liveDataStatus = "loading";
    },
    [getCampaignLiveDataRedux.fulfilled]: (state, action)=>{
     state.liveDataStatus = "success";
     let recConData = action.payload.data
     //console.log(recConData);
     let contentPosts =  state.campaignDetails.data[`campaign_posts`];
     if(contentPosts.length !== 0){
          let newContentArrayData = [...contentPosts , ...recConData];
          state.campaignDetails.data[`campaign_posts`] = newContentArrayData;
     }else{
      state.campaignDetails.data[`campaign_posts`] =  recConData; 
     }
    },
    [getCampaignLiveDataRedux.rejected]:(state,action)=>{
      state.liveDataStatus = "failed";
    },

    //new backend
    [getCampaignDetailsData.pending]: (state , action) =>{
      state.status = "loading";
    },
    [getCampaignDetailsData.fulfilled]: (state , action) =>{
      state.status = "success";
      const camData = action.payload;
      //console.log(action.payload);
      state.campaignDetails.campaignFirstData = camData;
      camData.length > 0 ? state.campaignDetails.flag = true : state.campaignDetails.flag = false ;
    },
    [getCampaignDetailsData.rejected] : (state , action) =>{
         state.status = "failed";
    },
    [getCampaignInfluencerData.pending] : (state , action) => {
      state.camInfStatus = "loading";
    },
    [getCampaignInfluencerData.fulfilled]: (state , action) => {
      state.camInfStatus = "success";
      const camInfData = action.payload;
      //console.log(camInfData);
      state.campaignDetails.campaignSecondData = camInfData;   
    },
    [getCampaignInfluencerData.rejected]: (state , action) => {
      state.camInfStatus = "failed";
    }

  },
});

export default campaignSlice.reducer;
export const {
  addContentToCampaignAllInfluencers,
  addContentToCampaignOneInfluencer,
  updateCampaignValues,
  removeCampaignInfluencerContent,
  updateCampaignContentValues,
  updateCampaignPosts,updateLiveCampEstEng,
  addPostManually,
  synchronizeCampaignMixData,
  removeInfluencerFromCampaignMix,
  camInfDataInsert,
  addCamContentInRedux,
  emptyCampaignInfUpdateData,
  addHasTagInRedux,
  removeHasTag,InitialGetHasTagInsert,
  liveCamStartAndEndDateSet,emptyliveCampaignDate,setCamDateInRedux,emptyLiveCamHashTag,
  emptyRemoveHashTag,addMoreInfInCampaign,
  emptyCampaignContentUpdateData,emptyLiveCampUpdateEngExc,
  emptyCampaignContentRemoveData,
  campaignLiveStaticStoryAndStaticVideo,addContentInInfluencers,
  emptyCampaignContentStaticStoryVideo,addInfInCampAndStoreInRedux
} = campaignSlice.actions;
