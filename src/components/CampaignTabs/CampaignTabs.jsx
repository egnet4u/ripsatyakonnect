import {
  Box,
  CircularProgress,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import {
  getCampaignDetails,
  camInfDataInsert,
  addCamContentInRedux,
  getCampaignPendingData, getCampaignLiveDataRedux,
  getCampaignDetailsData,
  getCampaignInfluencerData,
  campaignLiveStaticStoryAndStaticVideo, emptyCampaignContentStaticStoryVideo,
} from "../../redux/campaignSlice";
import { getCampaginContentData, getCampLiveDataStaticVideoStoryPost, getCampaignLiveData } from '../../new_api/api';
import CampaignMixContainer from "../CampaignMixContainer/CampaignMixContainer";
import LiveCampaignContainer from "../LiveCampaignContainer/LiveCampaignContainer";
import PendingContainer from "../PendingContainer/PendingContainer";
import { toast } from "react-toastify";

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderBottom: "1px solid #ccc",
  },
  tab: {
    color: "#2e75bb",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 500,
  },
  text: {
    fontSize: "12px",
    color: "#414141",
    paddingLeft: "13px",
  },
}));

export default function CampaignTabs({ value, handleChange }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const currentUser = useSelector((state) => state.userData.user);
  const { mutateAsync: getCamConData, isLoading: isLoadingGetCamConData } = useMutation(getCampaginContentData);
  console.log("🚀 ~ file: CampaignTabs.jsx ~ line 57 ~ CampaignTabs ~ getCamConData", getCamConData)
  const { mutateAsync: getCamLiveData, isLoading: getCamLiveDataIsLoading } = useMutation(getCampaignLiveData);
  const { mutateAsync: postLiveDataStaticVideoStory, isLoading: liveDataStaticStoryVideoIsLoading } = useMutation(getCampLiveDataStaticVideoStoryPost);

  //We are create this state because "CampaignMixContainer" 
  //first but in which "filteredInfluencers" map function not get so that resion this state create 
  const [showInfD, setShowInfD] = useState(false);
  const [runOneTime, setRunMoreTIme] = useState(true);
  const [camLiveData, setCamLiveData] = useState(false);
  const [indDataStoreInRedux, setInfDataInRedux] = useState(false);
  const [camIdGet, setCamId] = useState(null);
  const [campInfId, setCampInfId] = useState(null)
  useEffect(() => {
    //Get Campagin Details by redux thunk//
    //dispatch(getCampaignDetails({ id: pitchInfo.list_link, email: currentUser.email }));
    dispatch(getCampaignDetailsData(pitchInfo.project_id));
    //}, [dispatch, pitchInfo.list_link, currentUser.email]);
  }, [pitchInfo.id]);

  const campaignDetails = useSelector(
    (state) => state.campaignData.campaignDetails
  );
  const status = useSelector((state) => state.campaignData.status);
  const pending = useSelector((state) => state.campaignData.pending);
  const camInfStatus = useSelector((state) => state.campaignData.camInfStatus);
  const influencers = useSelector((state) => state.filterResultData.influencers.influencers);
  const campaignDetailsData = campaignDetails.campaignFirstData;
  //Here we are insert the all influencer in the redux those influencer are getting by campaign id
  useEffect(() => {
    if (campaignDetails.flag) {
      const camFirstDataLen = campaignDetails.campaignFirstData.length;
      const campaignId = campaignDetails.campaignFirstData[camFirstDataLen - 1].id;
      if (campaignId) {
        //here we are store the campaign inf data in redux but not combined with inf data
        dispatch(getCampaignInfluencerData(campaignId));
        setInfDataInRedux(true);
        setCamId(campaignId);
      }
    }
  }, [campaignDetails.flag, pitchInfo.id])

  // when all influencers are successfully inserted in the redux 
  //then get influenders data which are already in save in redux
  useEffect(() => {
    if (camInfStatus === "success" && runOneTime && indDataStoreInRedux) {
      const getCamInfIds = campaignDetails.campaignSecondData;
      const allInfCamInstaHandel = getCamInfIds.map((res) => ({
        instagram_handle: res.instagram_handle,
        instagram_profile_pic_url: res.instagram_profile_pic_url,
        name: res.name, tier: res.tier
      }));
      //console.log("CAmpaignTabs.js",infData) 
      //Here we are store only influencers data not store any other content related to campaign like 
      //campaign content , campaign inf data (brand cost ,price etc)
      //dispatch(camInfDataInsert(infData));
      dispatch(camInfDataInsert(allInfCamInstaHandel));
      for (let i = 0; i < getCamInfIds.length; i++) {
        const infMainData = getCamInfIds[i];
        const camInfId = getCamInfIds[i].id;
        setCampInfId(camInfId)
        //Here we are get the camaign data, 
        getCamConData(camInfId).then((res) => {
          const crateData = {};
          crateData.arrayIndex = i;
          crateData.mainData = res;
          crateData.mainInfData = infMainData;
          dispatch(addCamContentInRedux(crateData));
          if (i === getCamInfIds.length - 1) {
            setTimeout(() => {
              setShowInfD(true);
            }, 100);
          }
        })
      }
      setCamLiveData(true);
      setRunMoreTIme(false);
      const len = campaignDetailsData.length;
      const campaignId = campaignDetailsData[len - 1].id;
      //Here we are get the pending data 
      dispatch(getCampaignPendingData({ campaign_id: campaignId, platform: pitchInfo.platform }));
    }
  }, [camInfStatus, runOneTime, campaignDetailsData, indDataStoreInRedux])


  //This useEffect run for static story and video story
  useEffect(async () => {
    if (showInfD) {
      const len = campaignDetailsData.length;
      const campaignId = campaignDetailsData[len - 1].id;
      //Empty redux for campaign static story and video story
      dispatch(emptyCampaignContentStaticStoryVideo());
      const getCamConData = campaignDetails.data.campaign_influencer_data;

      await getCamLiveData({ camId: campaignId, platform: pitchInfo.platform }).then((res) => {
        console.log("live data get in campaignTab", res.length, res);
        const dataLen = res.length;
        //When reciveing live data is not empty
        if (dataLen !== 0) {
          //for loop which are select the data of static story and videostory with instagramHandel;
          for (let i = 0; i < getCamConData.length; i++) {
            const instagram_handel = getCamConData[i].instagram_handle;
            const name = getCamConData[i].name;
            const InfConDataGet = getCamConData[i].content_plan;

            if (InfConDataGet.length > 0) {
              // console.log("InfConDataGet",InfConDataGet);
              const countLiveStaticStoryData = res.filter((d) => d.instagram_handle === instagram_handel && d.content_type === "static_story");
              const countLiveVideoStoryData = res.filter((d) => d.instagram_handle === instagram_handel && d.content_type === "video_story");
              const lenLiveStaticStory = countLiveStaticStoryData.length;
              const lenLiveVideoStory = countLiveVideoStoryData.length;
              //select only static story and video story data
              const selectStaticStory = InfConDataGet.filter((d) => d.content_type == "static_story");
              const selectStaticVideo = InfConDataGet.filter((d) => d.content_type == "video_story");
              const countSelectStaticStory = selectStaticStory[0].num_posts;
              const platformStaticStory = selectStaticStory[0].platform;
              const platformVideoStory = selectStaticVideo[0].platform;
              const countSelectStaticVideo = selectStaticVideo[0].num_posts;
              const diffStaticStory = countSelectStaticStory - lenLiveStaticStory;
              const diffVideoStory = countSelectStaticVideo - lenLiveVideoStory;
              //console.log("countLiveStaticStoryData" , countLiveStaticStoryData ,lenLiveStaticStory ,"countLiveVideoStoryData",countLiveVideoStoryData,lenLiveVideoStory);
              //console.log("selectStaticStory",selectStaticStory ,"selectStaticVideo",selectStaticVideo)
              //console.log("countSelectStaticStory",countSelectStaticStory,"countSelectStaticVideo",countSelectStaticVideo);
              //console.log("diffStaticStory",diffStaticStory ,"diffVideoStory",diffVideoStory );
              if (diffStaticStory > 0) {
                for (let y = 0; y < diffStaticStory; y++) {
                  const obj_story = {};
                  obj_story.achieved_engagement = 0;
                  obj_story.achieved_engagement_rate = 0;
                  obj_story.achieved_reach = 0;
                  obj_story.content_type = "static_story";
                  obj_story.expected_engagement = 0;
                  obj_story.expected_engagement_rate = 0;
                  obj_story.expected_reach = 0;
                  obj_story.instagram_followers = 0;
                  obj_story.instagram_handle = instagram_handel;
                  obj_story.is_excluded = true;
                  obj_story.manual_addition = true;
                  obj_story.name = name;
                  obj_story.type = "static_story";
                  obj_story.platform = platformStaticStory;
                  obj_story.campaign_id = campaignId;
                  postLiveDataStaticVideoStory(obj_story);
                }
              }
              if (diffVideoStory > 0) {
                for (let x = 0; x < diffVideoStory; x++) {
                  const obj_story = {};
                  obj_story.achieved_engagement = 0;
                  obj_story.achieved_engagement_rate = 0;
                  obj_story.achieved_reach = 0;
                  obj_story.content_type = "video_story";
                  obj_story.expected_engagement = 0;
                  obj_story.expected_engagement_rate = 0;
                  obj_story.expected_reach = 0;
                  obj_story.instagram_followers = 0;
                  obj_story.instagram_handle = instagram_handel;
                  obj_story.is_excluded = true;
                  obj_story.manual_addition = true;
                  obj_story.name = name;
                  obj_story.type = "video_story";
                  obj_story.platform = platformVideoStory;
                  obj_story.campaign_id = campaignId;
                  postLiveDataStaticVideoStory(obj_story);
                }
              }

            }
          }

        } else {
          //if live data is empty then aall post request call
          //Select influencer one by one
          for (let i = 0; i < getCamConData.length; i++) {
            const instagram_handel = getCamConData[i].instagram_handle;
            const name = getCamConData[i].name;
            const InfConDataGet = getCamConData[i].content_plan;
            //if content avelable then code run
            if (InfConDataGet.length > 0) {
              //select only static story and video story data
              const selectStaticVideo = InfConDataGet.filter((d) => d.content_type === "static_story" || d.content_type === "video_story");
              for (let j = 0; j < selectStaticVideo.length; j++) {
                const static_video_story = selectStaticVideo[j].num_posts;
                const content_story_video = selectStaticVideo[j].content_type;
                const platform = selectStaticVideo[j].platform;
                //console.log(static_video_story);
                //every static story and video story contain unique data
                for (let index = 0; index < static_video_story; index++) {
                  const obj_story = {};
                  obj_story.achieved_engagement = 0;
                  obj_story.achieved_engagement_rate = 0;
                  obj_story.achieved_reach = 0;
                  obj_story.content_type = content_story_video;
                  obj_story.expected_engagement = 0;
                  obj_story.expected_engagement_rate = 0;
                  obj_story.expected_reach = 0;
                  obj_story.instagram_followers = 0;
                  obj_story.instagram_handle = instagram_handel;
                  obj_story.is_excluded = true;
                  obj_story.manual_addition = true;
                  obj_story.name = name;
                  obj_story.type = content_story_video;
                  obj_story.platform = platform;
                  obj_story.campaign_id = campaignId;
                  //call a post request//
                  postLiveDataStaticVideoStory(obj_story);
                  //console.log(obj_story);
                  //await dispatch(campaignLiveStaticStoryAndStaticVideo(obj_story));
                }
              }
            }
          }
        }
      }).catch((err) => {
        toast.error("Something is wrong In Getting Live Data");
      })

      //Here we are get the live data from scrappers
      dispatch(getCampaignLiveDataRedux({ camId: campaignId, platform: pitchInfo.platform }));
    }
  }, [showInfD])


  useEffect(() => {
    if (
      campaignDetails &&
      campaignDetails.data &&
      campaignDetails.data.campaign_name
    ) {
      // dispatch(getCampaignPendingData(campaignDetails.data.campaign_name));
      console.log("CampaignTabs.jsx  Here pandig data run");
    }
  }, [dispatch, campaignDetails]);

  return (
    <>
      {(status === "loading" || camInfStatus === "loading") && <CircularProgress size={20} color="primary" />}
      {status === "success" && campaignDetails.flag && (
        <Box>
          <Box>
            <Tabs
              variant="scrollable"
              className={classes.tabs}
              indicatorColor="primary"
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab className={classes.tab} label="Mix" {...a11yProps(0)} />
              <Tab
                className={classes.tab}
                label="Live Campaign"
                {...a11yProps(1)}
              />
              <Tab className={classes.tab} label="Pending" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CampaignMixContainer
            value={value}
            index={0}
            showInfD={showInfD}
            camInfStatus={camInfStatus}
            status={status}
            camIdGet={camIdGet}
            campInfId={campInfId}
          />
          <LiveCampaignContainer value={value} index={1} />
          <PendingContainer value={value} index={2} pending={pending} />
        </Box>
      )}
      {/* {status === "success" && !campaignDetails.flag && (
        <Typography className={classes.text}>{campaignDetails.data}</Typography>
      )} */}
    </>
  );
}
