import axios from "axios";

export const getToken = async (data) => {
  const response = await axios.post(`/signin/`, { ...data });
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  if (response.data.status) {
    /** Here we are use to localstorage first authtoken and second is current User  */
    localStorage.setItem("authToken", response.data.data.access);
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: response.data.data.name,
        email: response.data.data.email,
      })
    );
  }
  return response.data;
};

//this api call in the useSlice
export const getUser = async () => {
  const response = await axios.get(`/self`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getAllPitches = async () => {
  const response = await axios.get(`/project/`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getInfluencers = async ({ queryKey, pageParam = 1 }) => {
  const query = queryKey[1];
  // const platforms = JSON.stringify(["instagram"]);
  const response = await axios.get(
    `/influencer/?page=${pageParam}&sort_keyword=${query.sort}&reverse=${query.reverse}`
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

export const getInfluencerHistory = async ({ queryKey }) => {
  const handle = queryKey[1];
  const response = await axios.post(`/get_influencer_history/${handle}`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getCategoryOfBrand = async () => {
  const response = await axios.get(`/category_of_brand`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getLocation = async () => {
  const response = await axios.get(`/location`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`/categories`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getLanguages = async () => {
  const response = await axios.get(`/languages`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getTiers = async () => {
  const response = await axios.get(`/tier`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getContentPreferences = async () => {
  const response = await axios.get(`/content_preference`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getRequirements = async () => {
  const response = await axios.get(`/requirements`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};


/** Get all users for pitch and others */
export const getUsers = async () => {
  const response = await axios.get(`/users`);

  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

/** Create a new pitch or project  */
export const createNewProject = async (data) => {
  
  const response = await axios.post("/project/", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const createList = async (data) => {
  const response = await axios.post("/create_list", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const updateList = async (data) => {
  const response = await axios.post("/update_list", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const updatePitchInitial = async (data) => {
  const response = await axios.post("/update_pitch_initial", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};
export const updatePitch = async (data) => {
  const response = await axios.put("/project/", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

/** File upload api  */
export const uploadFile = async (data) => {
  const response = await axios.post(
    "/project/attachment?project_id=" + data.project_id + "&size=" + data.size+ "&filename=" + data.name,
    data.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const deleteFile = async (data) => {
  const response = await axios.post(
    "/delete_attachment?pitch_id=" + data.pitch_id,
    data.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const movePitchToRecycleBin = async (id) => {
  const response = await axios.delete("/project/?project_id=" + id);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const updateInfluencer = async (data) => {
  const response = await axios.put("/influencer/", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const updateCampaign = async (data) => {
  const response = await axios.post("/update_campaign", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const createCampaign = async (data) => {
  const response = await axios.post("/create_campaign", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const searchInfluencerByName = async (data) => {
  const response = await axios.post("/search_influencer_by_name", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};
export const searchInfluencerByNameAndHandle = async (data) => {
  const response = await axios.get(
    "/influencer/search/?search_string=" + data.search_string
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const updateInstagramHandle = async (data) => {
  const response = await axios.post("/change_handle", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const submitInfluencerStarScore = async (data) => {
  const response = await axios.post("/score_submit", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const addToInfluencerQueue = async (data) => {
  const response = await axios.put("/influencer/", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const removeInfluencerFromQueue = async (handle) => {
  const response = await axios.post(
    "/remove_from_fetch_stats_queue/" + handle,
    {}
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const createInfluencer = async (data) => {
  const response = await axios.post("/influencer/", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const validateInfluencer = async (handle) => {
  const response = await axios.get("/validate_influencer/" + handle);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const unqueueCampaignPosts = async (data) => {
  const response = await axios.post("/unqueue_campaign_posts", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getPostInfo = async (data) => {
  const response = await axios.post("/get_post_info", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const downloadUploadedFile = async (data) => {
  const response = await axios.get(
    //`/get_attachment/${data.file_name}?pitch_id=${data.pitch_id}`
    `/project/attachment/${data.file_name}?pitch_id=${data.pitch_id}`
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const updateTask = async (data) => {
  const response = await axios.put("/workflow/", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const rejectTask = async (data) => {
  const response = await axios.put("/workflow/", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};
// export const rejectTaskClientTeam = async (data) => {
//   const response = await axios.post("/reject_task_by_client_team", data);
//   if (!response.statusText === "OK") {
//     throw new Error("Something went wrong!");
//   }
//   return response.data;
// };

export const getListMixCsv = async (data) => {
  const response = await axios.get(
    `/list_mix_csv?list_name=${data.list_name}&mix_number=${data.mix_number}`
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getCampaignMixCsv = async (data) => {
  const response = await axios.get(
    `/campaign_mix_csv?campaign_name=${data.campaign_name}`
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getYoutubeListMixCsv = async (data) => {
  const response = await axios.get(
    `/list_mix_csv_for_youtube?list_name=${data.list_name}&mix_number=${data.mix_number}`
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getYoutubeCampaignMixCsv = async (data) => {
  const response = await axios.get(
    `/campaign_mix_csv_for_youtube?campaign_name=${data.campaign_name}`
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const fetchCampaignDetails = async (data) => {
  const response = await axios.get(
    `/campaign_details/${data.id}?current_user_email=${data.email}`
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

/** get company history list for use in create pitch page */
export const getCompanyHistory = async (query) => {
  const response = await axios.get(`/company/history?company_name=${query}`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const saveNotes = async (data) => {
  const response = await axios.post("/save_notes", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const deleteNotes = async (data) => {
  const response = await axios.post("/delete_notes_entry", data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getEstimatedEngagement = async (handle) => {
  const response = await axios.post(`/get_estimated_engagement/${handle}`, {});
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const addYoutuberToQueue = async (url) => {
  const response = await axios.get(`/youtube/add_youtuber_to_queue?url=${url}`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const removeYoutuberFromQueue = async (url) => {
  const response = await axios.get(
    `/youtube/remove_youtuber_from_queue?url=${url}`
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

// export const getCampaignReports = async (campaign_name) => {
//   const response = await axios.get(`/campaign_reports/${campaign_name}`);
//   if (!response.statusText === "OK") {
//     throw new Error("Something went wrong!");
//   }
//   return response.data;
// };

export const getCampaignBenchmarks = async (data) => {
  const response = await axios.get(
    `/campaign_benchmark/${data.campaign_name}?viral_margin=${data.viral_margin}`
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

// export const getCampaignDeliverables = async (campaign_name) => {
//   const response = await axios.get(
//     `/campaign_deliverable_type/${campaign_name}`
//   );
//   if (!response.statusText === "OK") {
//     throw new Error("Something went wrong!");
//   }
//   return response.data;
// };

export const getMapAndGenderData = async (campaign_name) => {
  const response = await axios.get(`/campaign_other_details/${campaign_name}`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const downloadAudienceData = async (id) => {
  const response = await axios.get(
    `/audience/csv/download/?instagram_id=${id}`
  );
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const fetchAudienceData = async (data) => {
  const response = await axios.post(`/instagram/audience_data/`, data);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};

export const getAudienceData = async (id) => {
  const response = await axios.get(`/instagram/audience_data/?instagram_id=${id}`);
  if (!response.statusText === "OK") {
    throw new Error("Something went wrong!");
  }
  return response.data;
};
