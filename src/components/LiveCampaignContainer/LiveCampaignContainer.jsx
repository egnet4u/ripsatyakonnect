import {
  Box,
  Button,
  Chip,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState ,useEffect } from "react";
import TabPanel from "../TabPanel/TabPanel";
import LiveCampaignPost from "../LiveCampaignPost/LiveCampaignPost";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useIsMutating, useMutation } from "react-query";
import { updateCampaign } from "../../api";
import { getCampaignDetails ,addHasTagInRedux,hashtagsCopy , InitialGetHasTagInsert,
  removeHasTag,liveCamStartAndEndDateSet , setCamDateInRedux} from "../../redux/campaignSlice";
import {campaignHasTagPost  , deleteCamHasTag  ,  
  GetCampaignLiveDataQueue  ,campaignLiveDataQueuePut,getCampHasTag } from "../../new_api/api"

const useStyles = makeStyles((theme) => ({
  listHeader: {
    borderRadius: "6px",
    background: "#f5f9fc",
    padding: "0 13px",
  },
  listHeadItem: {
    fontFamily: "Poppins",
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#414141",
    padding: "10px 0",
  },
  button: {
    fontSize: "12px",
  },
  chip: {
    fontSize: "12px",
    margin: "0 .5rem",
  },
}));

export default function LiveCampaignContainer({ value, index }) {
  
  //Temporary Data set//
  const hasTag = ["instagram" , "youtube" , "tiktok","ripplelink"];

  const [hashtagText, setHashtagText] = useState("");
  const { mutateAsync } = useMutation(updateCampaign);
  
  const {mutateAsync:getHasTagCam , isLoading:getHasTagIsLoading} = useMutation(getCampHasTag);
  //Get live Data Campaign 
  const {mutateAsync:queueLiveDataGet , isLoading:getCamLiveDataIsLoading} = useMutation(GetCampaignLiveDataQueue);
  //Date change API Call//
  const {mutateAsync:PutcampaignLiveDataQueue , isLoading:campaignLiveDataQueueIsloading} = useMutation(campaignLiveDataQueuePut);
  //Post Hash Tag in Campaign
  const {mutateAsync: postHasTagApi , isLoading:postHasTagIsLoading} = useMutation(campaignHasTagPost);
  //Delete HashTag API
  const {mutateAsync:hasTagDelete ,  isLoading:deleteHastagIsLoading} = useMutation(deleteCamHasTag);
    

  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const user = useSelector((state) => state.userData.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const campaignDetails = useSelector(
    (state) => state.campaignData.campaignDetails
  );
  const [startDate, setStartDate] = useState(campaignDetails.data.start_date);
  const [endDate, setEndDate] = useState(campaignDetails.data.end_date);
  const flag  = campaignDetails.flag;
  //Set the start dtae and end date values
  useEffect( async () => {
    if(flag){
      const camId = campaignDetails.campaignFirstData[0].id;
      await queueLiveDataGet(camId).then((res)=>{
        const startDate = res.data[0].start_date;
        const endDate = res.data[0].end_date;
        const campaign_queued  = res.data[0].campaign_queued;
        setStartDate(startDate);
        setEndDate(endDate);
        if(startDate && endDate){
            dispatch(setCamDateInRedux({startDate , endDate ,campaign_queued }));
        }
      })
      await getHasTagCam(camId).then((res)=>{
        if(res.status){
          const has_tag = res.data;
          dispatch(InitialGetHasTagInsert(has_tag));
        }
      })
    }
  }, [flag])
  
  //const [startDate, setStartDate] = useState(undefined);
  //const [endDate, setEndDate] = useState(undefined);

  const handleSaveDates = async () => {
    const campaign_id = campaignDetails.campaignFirstData[0].id ;
      // var obj = {};
      // obj.campaign_live_id  = 0;
      // obj.processing = false;
      // obj.campaign_queued = false;
      // obj.start_date = startDate;
      // obj.end_date = endDate;
      // obj.campaign_id = campaign_id;
      await queueLiveDataGet(campaign_id).then((res)=>{
        if(res.status){
            const getData = res.data[0];
            const obj = {};
            obj.campaign_live_id  = getData.id;
            obj.processing = getData.processing;
            obj.campaign_queued = getData.campaign_queued;
            obj.start_date = startDate;
            obj.end_date = endDate;
            obj.campaign_id = getData.campaign_id;
            PutcampaignLiveDataQueue(obj).then((res)=>{
               toast.success("Selected Date Update Successfully");
            }).catch((err)=>{
               toast.error("Something is wrong in Date Updateion");
            });
        }       
      }).catch((error)=>{
        toast.error("Queue Data Not Get Something Is Wrong");
      })
      //dispatch(liveCamStartAndEndDateSet({startDate: startDate, endDate:endDate , mainData:obj}));
      
  };

  const handleAddHashtag = async () => {
    const newHashtag = hashtagText.trim();
    if (!campaignDetails.data.hashtags.includes(newHashtag) && newHashtag) {
      const campaign_id = campaignDetails.campaignFirstData[0].id ;
      const hasObj = {};
      hasObj.id = 0 ;
      hasObj.hashtag = newHashtag;
      hasObj.campaign_id = campaign_id;
      const updatedHashtags = [...campaignDetails.data.hashtags, hasObj];
      dispatch(InitialGetHasTagInsert(updatedHashtags));
      //console.log(updatedHashtags);
      const hashData = {campaign_id:campaign_id , hashtags:[newHashtag]};
      await postHasTagApi(hashData).then((res)=>{
        toast.success("HasTag Add Successfully");
      }).catch((err)=>{
        toast.error("Something is wrong");
      })
      await getHasTagCam(campaign_id).then((res)=>{
       if(res.status){
         const has_tag = res.data;
         dispatch(InitialGetHasTagInsert(has_tag));
       }
      })
     
    
      //dispatch(addHasTagInRedux({hastag:hasObj}));
      // await mutateAsync({
      //   campaign_name: campaignDetails.data.campaign_name,
      //   hashtags: campaignDetails.updatedHashtags,
      // });
      // dispatch(
      //   getCampaignDetails({ id: pitchInfo.list_link, email: user.email })
      // );
      setHashtagText("");
    }else{
      alert("Hastag Already Present");
    }
  };

  const handleRemoveHashtag = async (hashtag ,cam_hastag_id) => {
    let confirmation = window.confirm(
      `Click 'Ok' to remove ${hashtag} from the campaign.`
    );
    if (!confirmation) return;
    const findIndexHashTag = campaignDetails.data.hashtags.findIndex((hash)=> hash.hashtag === hashtag);
    if (findIndexHashTag !== -1) {
      const hashtagsCopy = [...campaignDetails.data.hashtags];
      const removeHashTag = campaignDetails.data.hashtags[findIndexHashTag];
      //let index = hashtagsCopy.indexOf(hashtag);
      hashtagsCopy.splice(findIndexHashTag, 1);
      let campaign_hashtag_id = cam_hastag_id;
        await hasTagDelete({campaign_hashtag_id}).then((res)=>{
          if(res.status){
            toast.success("Hashtag Remove Successfully");
          }
        }).catch((err)=>{
          toast.error("Something is wrong");
        })
      dispatch(removeHasTag({hashtagsCopy , removeHashTag}));
      
      //await mutateAsync({campaign_name: campaignDetails.data.campaign_name,hashtags: hashtagsCopy,});
      //dispatch(getCampaignDetails({ id: pitchInfo.list_link, email: user.email }));
    }
  };

  return (
    <TabPanel value={value} index={index} pad={"0px"}>
      <Box>
        <Box padding="40px 0 35px 13px">
          <Typography variant="caption">Campaign Period:</Typography>
          <TextField
            value={startDate ? format(new Date(startDate), "yyyy-MM-dd") : null}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ margin: "0 1rem" }}
            name="state_date"
            className={classes.input}
            label="Start Date"
            variant="outlined"
            size="small"
            type="date"
            InputProps={{
              style: { fontSize: 11 },
            }}
            InputLabelProps={{ style: { fontSize: 11 }, shrink: true }}
          />
          <TextField
            value={endDate ? format(new Date(endDate), "yyyy-MM-dd") : null}
            onChange={(e) => setEndDate(e.target.value)}
            name="end_date"
            className={classes.input}
            label="End Date"
            variant="outlined"
            size="small"
            type="date"
            InputProps={{
              style: { fontSize: 11 },
            }}
            InputLabelProps={{ style: { fontSize: 11 }, shrink: true }}
          />
          <Button
            style={{ margin: "0 1rem" }}
            disabled={
              startDate === undefined || startDate === "" ||
              endDate === undefined || endDate === "" ||
              (startDate && startDate.length === 0) ||  
              (endDate && endDate.length === 0)
            }
            onClick={handleSaveDates}
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Save Dates
          </Button>
        </Box>
        <Box padding="0px 0 10px 13px">
          <Typography variant="caption">Hashtags / Keywords:</Typography>
          { campaignDetails.data.hashtags &&
            campaignDetails.data.hashtags.map((hashtag, i) => (
              //hasTag.map((hashtag, i) => (
              <Chip
                size="small"
                className={classes.chip}
                key={hashtag.hashtag + i}
                label={hashtag.hashtag}
                onDelete={() => handleRemoveHashtag(hashtag.hashtag , hashtag.id)}
              />
            ))}
        </Box>
        <Box padding="10px 0 50px 0px">
          <TextField
            onChange={(e) => setHashtagText(e.target.value)}
            value={hashtagText}
            style={{ margin: "0 1rem" }}
            className={classes.input}
            label="Hashtag"
            variant="outlined"
            size="small"
            type="text"
            InputProps={{
              style: { fontSize: 11 },
            }}
            InputLabelProps={{ style: { fontSize: 11 } }}
          />
          <Button
            disabled={hashtagText.length === 0}
            onClick={handleAddHashtag}
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Add Hashtag
          </Button>
        </Box>
        <Box>
          <Grid
            container
            justify="space-around"
            alignItems="center"
            className={classes.listHeader}
          >
            <Grid item xs={2} className={classes.listHeadItem}>
              Post Info
            </Grid>
            <Grid item xs={1} className={classes.listHeadItem}>
              Likes
            </Grid>
            {//pitchInfo.type_of_campaign[0] === "youtube" && (
             pitchInfo.platform === "youtube" && (
              <Grid item xs={1} className={classes.listHeadItem}>
                Dislikes
              </Grid>
            )}
            <Grid xs={1} item className={classes.listHeadItem}>
              Views
            </Grid>
            <Grid xs={1} item className={classes.listHeadItem}>
              Comments
            </Grid>
            {//pitchInfo.type_of_campaign[0] === "instagram" && (
              pitchInfo.platform === "instagram" && (
              <Grid xs={1} item className={classes.listHeadItem}>
                Eng. Exp.
              </Grid>
            )}
            {//pitchInfo.type_of_campaign[0] === "instagram" && (
             pitchInfo.platform === "instagram" && (
              <Grid xs={1} item className={classes.listHeadItem}>
                Eng. Ach.
              </Grid>
            )}
            {//pitchInfo.type_of_campaign[0] === "instagram" && (
              pitchInfo.platform === "instagram" && (
              <Grid xs={1} item className={classes.listHeadItem}>
                Rate Exp.
              </Grid>
            )}
            {//pitchInfo.type_of_campaign[0] === "instagram" && (
             pitchInfo.platform === "instagram" && (
              <Grid xs={1} item className={classes.listHeadItem}>
                Rate Ach.
              </Grid>
            )}
            {//pitchInfo.type_of_campaign[0] === "instagram" && (
              pitchInfo.platform === "instagram" && (
              <Grid xs={1} item className={classes.listHeadItem}>
                Reach Exp.
              </Grid>
            )}
            {//pitchInfo.type_of_campaign[0] === "instagram" && (
              pitchInfo.platform === "instagram" && (
              <Grid xs={1} item className={classes.listHeadItem}>
                Reach Ach.
              </Grid>
            )}
            <Grid xs={1} item className={classes.listHeadItem}>
              Exclude
            </Grid>
          </Grid>
        </Box>
        {//pitchInfo.type_of_campaign[0] === "instagram" &&
          pitchInfo.platform === "instagram" && campaignDetails.data.campaign_posts && 
           campaignDetails.data.campaign_posts.map((post , index) => (
             <LiveCampaignPost key={`${post.instagram_handle}_${index}`} post={post} index={index}/>
           ))
        }
        {//pitchInfo.type_of_campaign[0] === "youtube" &&
           pitchInfo.platform === "youtube" && campaignDetails.data.campaign_videos &&
           campaignDetails.data.campaign_videos.map((post) => (
             <LiveCampaignPost key={post.instagram_handle} post={post} />
           ))
        }
      </Box>
    </TabPanel>
  );
}
