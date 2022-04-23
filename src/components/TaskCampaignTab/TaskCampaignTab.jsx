import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampaignTabs from "../CampaignTabs/CampaignTabs";
import TabPanel from "../TabPanel/TabPanel";
import { toast } from "react-toastify";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useMutation } from "react-query";
import {GetCampaignLiveDataQueue,campaignLiveDataQueuePut,campaignHasTagPost
  ,getCampHasTag ,deleteCamHasTag,updateLiveCampaignData} from "../../new_api/api"
import { unqueueCampaignPosts, updateCampaign } from "../../api";
import { getCampaignDetails,emptyliveCampaignDate ,emptyLiveCamHashTag ,
  InitialGetHasTagInsert,emptyRemoveHashTag,setCamDateInRedux,emptyLiveCampUpdateEngExc} from "../../redux/campaignSlice";
const useStyles = makeStyles((theme) => ({
  box: {
    height: `calc(100vh - ${265}px)`,
    paddingTop: "13.5px",
  },
  container: {
    paddingLeft: "17px",
    paddingTop: "7px",
    paddingBottom: "16px",
    borderBottom: "1px dashed #a7a7a7",
  },
  title: {
    color: "#414141",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: 1.56,
    padding: "8px 0",
  },
  label: {
    "& span": {
      color: "#414141",
      fontSize: "12px",
      lineHeight: 1.5,
    },
  },
  button: {
    fontSize: "12px",
  },
}));

export default function TaskCampaignTab({
  value,
  index,
  handleCampaignTabChange,
  campaignTabValue,
}) {
  
    const classes = useStyles();
    const dispatch = useDispatch();
    const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
    const user = useSelector((state) => state.userData.user);
    const campaignDetails = useSelector((state) => state.campaignData.campaignDetails);
    const DateUpdatePartSelect = useSelector((state)=>state.campaignData.updateLiveCampaignDate);
    const HasTagUpdateData  = useSelector((state)=> state.campaignData.updateLiveCampaignHasTag);
    const removeHashTag = useSelector((state)=>state.campaignData.updateLiveCampRemoveHashTag);
    const updateLiveDataExcEng = useSelector((state)=>state.campaignData.updateLiveExcludeEstEng);
    const { mutateAsync, isLoading } = useMutation(updateCampaign);
    const { mutateAsync: mutateAsyncQueue, isLoading: isLoadingQueue } = useMutation(updateCampaign);
    const { mutateAsync: mutateAsyncUnqueue, isLoading: isLoadingUnqueue } = useMutation(unqueueCampaignPosts);
    const {mutateAsync:queueLiveDataGet , isLoading:liveQueueDataIsloaidng} = useMutation(GetCampaignLiveDataQueue);
    const {mutateAsync:PutcampaignLiveDataQueue , isLoading:campaignLiveDataQueueIsloading} = useMutation(campaignLiveDataQueuePut);
    const {mutateAsync: postHasTagApi , isLoading:postHasTagIsLoading} = useMutation(campaignHasTagPost);
    const {mutateAsync:getHasTagCam , isLoading:getHasTagIsLoading} = useMutation(getCampHasTag);
    const {mutateAsync:hasTagDelete ,  isLoading:deleteHastagIsLoading} = useMutation(deleteCamHasTag);
    const {mutateAsync:liveCampDataUpdate , isLoading:updateLiveCampIsLoading} = useMutation(updateLiveCampaignData);
    
    
    const handleSavePosts = async () => {
    const campaign_id = campaignDetails.campaignFirstData[0].id ;
    // if(DateUpdatePartSelect.length !== 0){
    //   const startDate = DateUpdatePartSelect[0].start_date;
    //   const endDate = DateUpdatePartSelect[0].end_date
    //   await queueLiveDataGet(campaign_id).then((res)=>{
    //      if(res.status){
    //          const getData = res.data[0];
    //          const obj = {};
    //          obj.campaign_live_id  = getData.id;
    //          obj.processing = getData.processing;
    //          obj.campaign_queued = getData.campaign_queued;
    //          obj.start_date = startDate;
    //          obj.end_date = endDate;
    //          obj.campaign_id = getData.campaign_id;
    //          PutcampaignLiveDataQueue(obj).then((res)=>{
    //             toast.success("Queue Update Successfully");
    //          }).catch((err)=>{
    //             toast.error("Something is wrong in queue Updateion");
    //          });
    //      }       
    //   }).catch((error)=>{
    //     toast.error("Queue Data Not Get Something Is Wrong");
    //   })
    //   dispatch(emptyliveCampaignDate());
      
    // }

    // if(HasTagUpdateData.length !== 0){
    //    const HasTagData = HasTagUpdateData.map((has)=> has.hashtag);
    //    const hashData = {campaign_id:campaign_id , hashtags:HasTagData};
    //    await postHasTagApi(hashData).then((res)=>{
    //      toast.success("HasTag Add Successfully");
    //    }).catch((err)=>{
    //      toast.error("Something is wrong");
    //    })
    //    await getHasTagCam(campaign_id).then((res)=>{
    //     if(res.status){
    //       const has_tag = res.data;
    //       dispatch(InitialGetHasTagInsert(has_tag));
    //     }
    //   })
    //    dispatch(emptyLiveCamHashTag());
    // }

    // if(removeHashTag.length !== 0){
    //   for(let i =0 ; i<removeHashTag.length;i++){
    //     const campaign_hashtag_id = removeHashTag[i].id;
    //     await hasTagDelete({campaign_hashtag_id}).then((res)=>{
    //       if(res.status){
    //         toast.success("Hashtag Remove Successfully");
    //       }
    //     }).catch((err)=>{
    //       toast.error("Something is wrong");
    //     })
    //   }
    //   dispatch(emptyRemoveHashTag());
    // }
    
    //Code written by wasif//

  //  await mutateAsync({campaign_name: campaignDetails.data.campaign_name,start_date: startDate,end_date: endDate,});
  //  dispatch(getCampaignDetails({ id: pitchInfo.list_link, email: user.email }));

    // mutateAsync({
    //   campaign_name: campaignDetails.data.campaign_name,
    //   campaign_posts: campaignDetails.data.campaign_posts,
    //   campaign_videos: campaignDetails.data.campaign_videos,
    // })
    //   .then((res) => {
    //     dispatch(
    //       getCampaignDetails({ id: pitchInfo.list_link, email: user.email })
    //     );
    //   })
    //   .catch((err) => console.log(err));
    
    if(updateLiveDataExcEng.length !==0){
      for(let i=0;i<updateLiveDataExcEng.length;i++){
          let updateData = updateLiveDataExcEng[i];
          var error = 0;
          let createObject = {...updateData , campaign_influencer_live_id:updateData.id,platform:pitchInfo.platform}
          await liveCampDataUpdate(createObject).catch((err)=>{error++;});
          if(i === updateLiveDataExcEng.length-1){
            if(error !== 0){
             toast.error("Something is wrong");
            }else{
             toast.success("Data Update Successfully");
             dispatch(emptyLiveCampUpdateEngExc());
            }
          }
      }
    }

  };

  const handleCampaignQueued = async () => {
    const campaign_id = campaignDetails.campaignFirstData[0].id ;
    await queueLiveDataGet(campaign_id).then((res)=>{
      if(res.status){
          const getData = res.data[0];
          const obj = {};
          obj.campaign_live_id  = getData.id;
          obj.processing = getData.processing;
          obj.campaign_queued = !getData.campaign_queued;
          obj.start_date = getData.start_date;
          obj.end_date = getData.end_date;
          obj.campaign_id = getData.campaign_id;
          PutcampaignLiveDataQueue(obj).then((res)=>{
             //toast.success("Queue Update Successfully");
             dispatch(setCamDateInRedux({startDate:getData.start_date , endDate:getData.end_date,campaign_queued:!getData.campaign_queued}))
          }).catch((err)=>{
             toast.error("Something is wrong in queue Updateion");
          });
      }       
   }).catch((error)=>{
     toast.error("Queue Data Not Get Something Is Wrong");
   })
    // mutateAsyncQueue({campaign_name: campaignDetails.data.campaign_name,campaign_queued: true,})
    //   .then((res) => {dispatch(getCampaignDetails({ id: pitchInfo.list_link, email: user.email }));})
    //   .catch((err) => console.log(err));

  };

  const handleCampaignUnqueued = () => {
    // mutateAsyncUnqueue({
    //   campaign_name: campaignDetails.data.campaign_name,
    // })
    //   .then((res) => {
    //     dispatch(
    //       //getCampaignDetails({ id: pitchInfo.list_link, email: user.email })
    //     );
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <TabPanel pad={"0px"} value={value} index={index}>
      <Grid
        className={classes.container}
        container
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography className={classes.title}>
                {pitchInfo.campaign_given_name}
              </Typography>
            </Grid>
            {campaignTabValue === 1 && (
              <Grid item style={{ marginLeft: "0.5rem" }}>
                <Button
                  color="primary"
                  startIcon={<GetAppIcon color="primary" />}
                  className={classes.button}
                >
                  Dowload CSV
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item>
          {campaignTabValue === 1 && (
            <Grid container alignItems="center">
              <Grid item>
                {campaignDetails.data.campaign_queued ? (
                  <Button
                    size="small"
                    variant="outlined"
                    className={classes.button}
                    color="secondary"
                   // onClick={handleCampaignUnqueued}
                   onClick={handleCampaignQueued}
                  >
                    Unqueue{" "}
                    {isLoadingUnqueue || liveQueueDataIsloaidng || campaignLiveDataQueueIsloading && (
                      <CircularProgress
                        color="secondary"
                        style={{ marginLeft: "0.3rem" }}
                        size={13}
                      />
                    )}
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="outlined"
                    className={classes.button}
                    color="secondary"
                    onClick={handleCampaignQueued}
                  >
                    Queue for updation{" "}
                    {isLoadingQueue || liveQueueDataIsloaidng || campaignLiveDataQueueIsloading && (
                      <CircularProgress
                        color="secondary"
                        style={{ marginLeft: "0.3rem" }}
                        size={13}
                      />
                    )}
                  </Button>
                )}
              </Grid>
              <Grid item style={{ marginLeft: "10px" }}>
                <Button
                  size="small"
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={handleSavePosts}
                   disabled = { 
                  //   (DateUpdatePartSelect.length === 0) ? (HasTagUpdateData.length ===  0) ? (removeHashTag.length === 0)? true : false  :false : false                  
                  //   || (HasTagUpdateData.length ===  0) ? (DateUpdatePartSelect.length === 0)?(removeHashTag.length === 0)?true:false:false : false 
                  //   || (removeHashTag.length === 0)? (DateUpdatePartSelect.length === 0)? (HasTagUpdateData.length ===  0)?true :false :false : false
                  updateLiveDataExcEng.length === 0
                  }
          
                  >
                  Save Post{" "}
                  {(isLoading || postHasTagIsLoading || campaignLiveDataQueueIsloading || liveQueueDataIsloaidng) && (
                    <CircularProgress
                      style={{ color: "#fff", marginLeft: "0.3rem" }}
                      size={13}
                    />
                  )}
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <div className={classes.box}>
        <CampaignTabs
          handleChange={handleCampaignTabChange}
          value={campaignTabValue}
        />
      </div>
    </TabPanel>
  );
}
