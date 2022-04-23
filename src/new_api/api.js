import axios from 'axios';
const delData = require('./demo_data/campign_deliverable_type.json')
const reportData = require("./demo_data/campaign_reports.json")
const benchData = require("./demo_data/campaign_benchmarks.json")
const otherData = require('./demo_data/campagn_other_details.json')
/** Task List API */

export const AddNewUser = async (data) =>{
   const response = await axios.post(`/signup/`, data);
   if(!response.statusText === "OK"){
       throw new Error("Something Is Wrong");
   }
   return response;
}

export const addRoleOfUsers = async (data) =>{
   const response = await axios.put('/assign/role/',data);
   if(!response.statusText === "OK"){
       throw new Error("Something Is Wrong");
   }
   return response.data;
}

export const addBlockStatusOfUser = async (data) =>{
    const response = await axios.put('/change/user/block/status/',data);
    if(!response.statusText === "OK"){
        throw new Error("Something Is Wrong");
    }
    return response.data;
}

export const deleteUserData =async (data)=>{
   const response = await axios.delete('/delete/user/',{data:data});
   if(!response.statusText === "OK"){
       throw new Error("Something is wrong");
   }
   return response.data;
}


//Influencer Api's
export const influencerDataUpdate = async (data) => {
    const response = await axios.put('/influencer/', data);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}

//Discover Page 
export const getYtInfluencers = async ({ queryKey, pageParam = 1 }) => {
    const query = queryKey[1];
    // const platforms = JSON.stringify(["instagram"]);
    const response = await axios.get(
        `youtube/profile/data/?page=${pageParam}&sort_keyword=${query.sort}&reverse=${query.reverse}`
    );
    if (!response.statusText === "OK") {
        throw new Error("Something went wrong!");
    }
    return response.data;
};

export const getInfluencerByHandle = async (handle) => {
    const response = await axios.get(`/profile/?instagram_id${handle}`);
    if (!response.statusText === "OK") {
        throw new Error("Something went wrong!");
    }
    return response.data;
};





//Get youtbe Influencer Data in discovery page
export const getYoutubeInfData = async (youtubeUrl) => {
    //const response = await axios.get(`/youtube/profile/data/?instagram_id=${instaId}`);
   const response = await axios.get(`/youtube/profile/data/?youtube_url=${youtubeUrl}`);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data.data;
}

export const deleteAudienceInfData = async (data) => {
    const response = await axios.delete(`/instagram/audience_data/`, { data: data });
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    console.log(response);
    return response.data;
}

//INstagranm queued or hard refresh
export const addInfToQueuedInNew = (data) => {
    const response = axios.post(`/instagram/queued/`, data);
    if (!response.statusText === "OK") {
        throw new Error("Somwthing is wrong");
    }
    return response;
}
export const filterListAPI = async (data) => {
    const response = await axios.post('/instagram/filter/', data);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong!");
    }
    return response;
}

export const createMix = async (data) => {
    const response = await axios.post('/mix/', data);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong!");
    }
    return response;
}

export const updateMixValue = async (data) => {
    const response = await axios.put('/mix/', data);
    if (!response.statusText === "OK") {
        throw new Error("Something is Wrong");
    }
    return response.data;
}

export const updateMix = async (data) => {
    const response = await axios.post('/mix/influencer/', data);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong!");
    }
    return response.data;
}

export const getInfluencerListMix = async (mixId) => {
    const response = await axios.get(`/mix/influencer?mix_id=${mixId}`);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong!");
    }
    return response.data;
}
/** Content api  post  */
export const mixInfluencerContent = async (data) => {
    const checkData = await axios.get(`/mix/influencer/content/?mix_influencer_id=${data.mix_influencer_id}`);
    if (!checkData.statusText === "OK") {
        throw new Error("Something is wrong In api.js new folder!");
    }
    return checkData.data;
}

export const mixContentUpdate = async (data) => {
    const response = await axios.put('/mix/influencer/content/', data);
    if (!response.statusText === "OK") {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const mixContentRemoveData = async (data) => {
    const response = await axios.delete('/mix/influencer/content/', { data: data });
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}

export const mixContentPost = async (data) => {
    const response = await axios.post('/mix/influencer/content/', data)
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong!");
    }
    return response.data;
    //console.log("api.js data  post request"  ,data);
}
/**  Content api get  */
export const getContentInfData = async (d) => {
    const gData = d;
    if (gData.mixInfId !== 0) {
        const response = await axios.get(`/mix/influencer/content/?mix_influencer_id=${gData.mixInfId}`);
        if (!response.statusText === "OK") {
            throw new Error("Something is wrong!");
        }
        return { mainData: response.data.data, mixNumber: gData.mixnum, mixInfId: gData.mixInfId };
    }
}



export const mixInfluencerNote = async (data) => {
    const response = await axios.post('/mix/influencer/notes/', data);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong!");
    }
    return response.data;
}

/** Deleted mix */
export const deleteMixInList = async (data) => {

    const response = await axios.delete("/mix/", { data: data });
    if (!response.statusText === "OK") {
        throw new Error("Something went wrong!");
    }
    return response.data;
};

/** Delete influencers from the mixes */
export const deleteInfluencerInMix = async (data) => {
    const response = await axios.delete("/mix/influencer/", { data: data });
    if (!response.statusText === "OK") {
        throw new Error("Something went wrong!");
    }
    return response.data;
};

/** Update mix influencers data like cpc brand cost etc */

export const mixInfluencerDataUpdateApi = async (data) => {
    const response = await axios.put("/mix/influencer/", data);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong!");
    }
    return response.data;
}


/************************** Campaign Tab api  *******************************/
//When click on the create campaign button then post request call
export const createFinalCampaign = async (recData) => {
    const response = await axios.post(`/project/campaign/create/`, recData);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}

//When campaign created successfully then Get the campaign id
export const getCampaignId = async (projectId) => {
    const response = await axios.get(`/project/campaign/create/?project_id=${projectId}`);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}

export const addInfInCampaign = async (data) => {
    const response = await axios.post(`/project/campaign/influencer/`, data);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}

//Get the campaign influencers data those are show in campaign
export const getCampaignInfluencersData = async (recCampaignId) => {
    const response = await axios.get(`/project/campaign/influencer/?campaign_id=${recCampaignId}`);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}

// campain influencer data update
export const updateCampaignInfluencerData = async (data) => {
    const response = await axios.put(`/project/campaign/influencer/`, data);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}

//Get Compaign influencer content data
export const getCampaginContentData = async (camInfId) => {
    const response = await axios.get(`/project/campaign/influencer/content/?campaign_influencer_id=${camInfId}`);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data.data;
}

export const postCampaignContentData = async (data) => {
    const response = await axios.post(`/project/campaign/influencer/content/`, data);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}

export const campaignContentUpdate = async (data) => {
    const response = await axios.put('/project/campaign/influencer/content/', data);
    if (!response.statusText === "OK") {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const removeCampaignContentData = async (data) => {
    const response = await axios.delete(`/project/campaign/influencer/content/`, { data: data });
    if (!response.statusText === "OK") {
        throw new Error("Something is Wrong");
    }
    return response.data;
}

//Get Campaign live data In campaign Tab
export const getCampaignLiveData = async (gData) => {
    const platform = gData.platform;
    const camId = gData.camId;
    const response = await axios.get(`/project/campaign/live/data/?campaign_id=${camId}&platform=${platform}`);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong ");
    }
    return response.data.data;
}

export const getCampLiveDataStaticVideoStoryPost = async (data) => {
    const response = await axios.post(`/project/campaign/live/data/`, data);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}

export const updateLiveCampaignData = async (data) => {
    const response = await axios.put(`/project/campaign/live/data/`, data);
    if (!response.statusText === "OK") {
        throw new Error("Something Is Wrong");
    }
    return response.data;
}

//Delete campaign Influencers
export const deleteCamInfluencer = async (gData) => {
    const campId = gData.camId;
    const campInfId = { campaign_influencer_id: gData.camInfId };
    const response = await axios.delete(`/project/campaign/influencer/?campaign_id=${campId}`, { data: campInfId });
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}

//queue aand hashtag API's;
export const campaignHasTagPost = async (data) => {
    const response = await axios.post('/project/campaign/hashtags/queue/', data);
    if (!response.statusText === "OK") {
        throw new Error("Something is Wrong");
    }
    return response.data;
}

export const getCampHasTag = async (cam_id) => {
    const response = await axios.get(`/project/campaign/hashtags/queue/?campaign_id=${cam_id}`);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}

export const deleteCamHasTag = async (data) => {
    const response = await axios.delete('/project/campaign/hashtags/queue/', { data: data });
    if (!response.statusText === "OK") {
        throw new Error("Something is Wrong");
    }
    return response.data;
}

//Live campaign data queue
export const GetCampaignLiveDataQueue = async (campaignId) => {
    const response = await axios.get(`project/campaign/queue/?campaign_id=${campaignId}`);
    if (!response.statusText === "OK") {
        throw new Error("Something Is Wrong");
    }
    return response.data;
}

export const campaignLiveDataQueuePut = async (data) => {
    const response = await axios.put(`project/campaign/queue/`, data);
    if (!response.statusText === "OK") {
        throw new Error("Something is wrong");
    }
    return response.data;
}








//List Tab APIs

export const saveNotes = async (data) => {
    const response = await axios.post("/mix/influencer/notes/", data);
    if (!response.statusText === "OK") {
        throw new Error("Something went wrong!");
    }
    return response.data;
};
export const updateNotes = async (data) => {
    const payload = Object.assign({}, data);
    payload.mix_influencer_note_id = payload.id;
    delete payload.id
    const response = await axios.put("/mix/influencer/notes/", payload);
    if (!response.statusText === "OK") {
        throw new Error("Something went wrong!");
    }
    return response.data;
};

export const deleteNotes = async (payload) => {
    const response = await axios.delete("/mix/influencer/notes/", { data: payload });
    if (!response.statusText === "OK") {
        throw new Error("Something went wrong!");
    }
    return response.data;
};



// Report Tabs API
export const getCampaignReportsMetrics = async (campaign_data) => {
    const response = await axios.get(`project/campaign/metrics/?campaign_id=${campaign_data.id}&platform=${campaign_data.platform}`);
    if (!response.statusText === "OK") {
        throw new Error("Something Is Wrong");
    }
    return response.data;
};


export const getCampaignDeliverables = async (camp_id) => {
    const response = await axios.get(`project/campaign/deliverable/?campaign_id=${camp_id}`);
    if (!response.statusText === "OK") {
        throw new Error("Something Is Wrong");
    }
    return response.data;

};

export const getCampaignBenchmarks = async (data) => {
    //   const response = await axios.get(
    //     `/campaign_benchmark/${data.campaign_name}?viral_margin=${data.viral_margin}`
    //   );
    //   if (!response.statusText === "OK") {
    //     throw new Error("Something went wrong!");
    //   }
    //   return response.data;
    console.log("benchdata api.js", benchData)
    return benchData;
};

export const getMapAndGenderData = async (campaign_name) => {
    //   const response = await axios.get(`/campaign_other_details/${campaign_name}`);
    //   if (!response.statusText === "OK") {
    //     throw new Error("Something went wrong!");
    //   }
    //   return response.data;

    return otherData;
};
