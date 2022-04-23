import {
  Box, makeStyles, Paper,
  CircularProgress, Tooltip, IconButton, Typography
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import RefreshIcon from "@material-ui/icons/Refresh";
import ReplayIcon from "@material-ui/icons/Replay";
import CatImg from "../../assets/cat.jpg";
import { convertNumberToBMK } from "../../utils/converNumberToBMK";
import { useMutation, useQueryClient } from "react-query";
import { getEstimatedEngagement, removeInfluencerFromQueue } from "../../api";
import { toast } from "react-toastify";
import { addInfToQueuedInNew, influencerDataUpdate } from "../../new_api/api";
const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  create: {
    position: "absolute",
    right: 30,
    top: 85,
  },
  plus: {
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.06)",
    padding: "2px",
    background: "#ffffff",
    borderRadius: "50%",
    fontSize: "30px",
    color: "#2e75bb",
  },
  search: {
    width: "100%",
  },
  container: {
    marginTop: "23px",
  },
  card: {
    width: "300px",
    border: " solid 1px #d1e3f5",
    borderRadius: "6px",
    padding: "18px 0",
    marginBottom: "44px",
    [theme.breakpoints.up("sm")]: {
      marginRight: "20px",
      marginLeft: "20px",
    },
  },
  profile: {
    width: "82px",
    height: "82px",
    borderRadius: "18px",
  },
  name: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#2e75bb",
    lineHeight: 1.5,
    marginTop: "6px",
  },
  handle: {
    marginTop: "6px",
    fontSize: "12px",
    color: "#414141",
  },
  tag: {
    color: "#4f3a88",
    fontSize: "11px",
    lineHeight: 1.55,
    backgroundColor: "#f4f0fd",
    padding: "4px 10px",
    borderRadius: "14px",
    margin: "19px 0",
  },
  number: {
    color: "#414141",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: 1.56,
  },
  numberTitle: {
    lineHeight: 1.55,
    color: "#6e6e6e",
    fontSize: "11px",
  },
}));



export default function InfluencerCard({ influencer, platform }) {
  //console.log(influencer , "plateform =>" ,platform )
  const classes = useStyles();
  const queryClient = useQueryClient();
  const addDefaultUrl = (e) => {
    e.target.src = CatImg;
  };

  const { mutateAsync, isLoading } = useMutation(getEstimatedEngagement, {
    onSuccess: () => {
      queryClient.invalidateQueries("influencers");
    },
  });
  const { mutateAsync: mutateAsyncUnqueue, isLoading: isLoadingUnqueue } =
    useMutation(removeInfluencerFromQueue, {
      onSuccess: () => {
        queryClient.invalidateQueries("influencers");
      },
    });

  const { mutateAsync: addInfInQueuedData, isLoading: addInfToQueuedIsLoading } = useMutation(addInfToQueuedInNew);
  const { mutateAsync: unqueueInfluencerData, isLoading: unqueueInfDataIsLoading } = useMutation(influencerDataUpdate);

  const queue = async (e) => {
    e.preventDefault();
    const instagram_id = influencer.instagram_id;
    try {
      //const data = await mutateAsync(influencer.instagram_handle);
      //toast.success(data.message);
      await addInfInQueuedData({ instagram_id: instagram_id, refresh: "soft" }).then((data) => {
        const res = data.data;
        if (res.status) {
          toast.success(res.message);
        } else {
          toast.success(res.message);
        }
      }).catch((err) => {
        toast.error("Something went wrong. Please try again");
      })
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  const unqueue = async (e) => {
    e.preventDefault();
    try {
      const instagram_id = influencer.instagram_id;
      await unqueueInfluencerData({ instagram_id: instagram_id, queued: false }).then((res) => {
        if (res.status) {
          toast.success("Status Update Successfully");
        } else {
          toast.error("Something went wrong. Please try again");
        }
      }).catch((err) => {
        toast.error("Something went wrong. Please try again");
      })
      //const data = await mutateAsyncUnqueue(influencer.instagram_handle);
      //toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  let enggArr = [];
  if (influencer) {
    enggArr.push({ eng: influencer.video_engagement, type: "Video Eng." });
    enggArr.push({
      eng: influencer.carousel_engagement,
      type: "Carousel Eng.",
    });
    enggArr.push({ eng: influencer.igtv_engagement, type: "IGTV Eng." });
    enggArr.push({ eng: influencer.reels_engagement, type: "Reels Eng." });
  }
  enggArr.sort(function (a, b) {
    return b.eng - a.eng;
  });

  const ytUrl = () => {
    const id = influencer.youtube_url.slice(24)

    return id;
  }

  return (
    <>{platform === "instagram" ? 
    
      <Link
        to={{
          pathname: `/discover/${influencer.instagram_id}/instagram`,
          state: { instagram_id: influencer.instagram_id },
        }}
        className={classes.link}
      >
        <Paper className={classes.card} elevation={1} variant="outlined">
          <Box textAlign="right" padding="10px">
            {influencer.queued ? (
              <Tooltip title="Unqueue">
                <IconButton onClick={unqueue} size="small" color="secondary">
                  {//isLoadingUnqueue 
                    unqueueInfDataIsLoading ? (
                      <CircularProgress size={17} color="secondary" />
                    ) : (
                      <ReplayIcon color="secondary" fontSize="small" />
                    )}
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Queue">
                <IconButton onClick={queue} size="small">
                  {//isLoading 
                    addInfToQueuedIsLoading ? (
                      <CircularProgress size={17} style={{ color: "#059669" }} />
                    ) : (
                      <RefreshIcon htmlColor="#059669" fontSize="small" />
                    )}
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Box textAlign="center">
            <img
              className={classes.profile}
              src={influencer.instagram_profile_pic_url}
              onError={addDefaultUrl}
              alt={influencer.name}
              loading="lazy"
            />
            <Typography className={classes.name}>{influencer.name}</Typography>
            <Typography className={classes.handle}>
              @{influencer.instagram_handle}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-around" padding="12px 0">
            {/* <Typography className={classes.tag}>Actor</Typography>
            <Typography className={classes.tag}>Director</Typography>
            <Typography className={classes.tag}>Photographer</Typography> */}
          </Box>
          <Box display="flex" justifyContent="space-around" textAlign="center">
            <div>
              <Typography className={classes.number}>
                {convertNumberToBMK(influencer.instagram_followers)}
              </Typography>
              <Typography className={classes.numberTitle}>Followers</Typography>
            </div>
            <div>
              <Typography className={classes.number}>
                {influencer.image_engagement
                  ? convertNumberToBMK(influencer.image_engagement.toFixed(1))
                  : "-"}
              </Typography>
              <Typography className={classes.numberTitle}>Image Eng.</Typography>
            </div>
            <div>
              <Typography className={classes.number}>
                {enggArr && enggArr[0].eng
                  ? convertNumberToBMK(enggArr[0].eng.toFixed(1))
                  : "-"}
              </Typography>
              <Typography className={classes.numberTitle}>
                {enggArr && enggArr[0].type && enggArr[0].type}
              </Typography>
            </div>
          </Box>
        </Paper>
      </Link> 
      :
      // Youtube Tab
      <Link
        to={{
          pathname: `/discover/${encodeURIComponent(influencer.youtube_url)}/youtube`,
          state: { youtube_url: influencer.youtube_url },
        }}
        className={classes.link}
      >
        <Paper className={classes.card} elevation={1} variant="outlined">
          <Box textAlign="right" padding="10px">
            {influencer.queued ? (
              <Tooltip title="Unqueue">
                <IconButton onClick={unqueue} size="small" color="secondary">
                  {//isLoadingUnqueue 
                    unqueueInfDataIsLoading ? (
                      <CircularProgress size={17} color="secondary" />
                    ) : (
                      <ReplayIcon color="secondary" fontSize="small" />
                    )}
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Queue">
                <IconButton onClick={queue} size="small">
                  {//isLoading 
                    addInfToQueuedIsLoading ? (
                      <CircularProgress size={17} style={{ color: "#059669" }} />
                    ) : (
                      <RefreshIcon htmlColor="#059669" fontSize="small" />
                    )}
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Box textAlign="center">
            <img
              className={classes.profile}
              src={influencer.youtube_channel_thumbnail}
              onError={addDefaultUrl}
              alt={influencer.channel_name}
              loading="lazy"
            />
            <Typography className={classes.name}>{influencer.youtube_channel_name}</Typography>
            <Typography className={classes.handle}>
              @{influencer.youtube_channel_id}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-around" padding="12px 0">
            {/* <Typography className={classes.tag}>Actor</Typography>
          <Typography className={classes.tag}>Director</Typography>
          <Typography className={classes.tag}>Photographer</Typography> */}
          </Box>
          <Box display="flex" justifyContent="space-around" textAlign="center">
            <div>
              <Typography className={classes.number}>
                {convertNumberToBMK(influencer.youtube_channel_subscriber_count)}
              </Typography>
              <Typography className={classes.numberTitle}>Subscribers</Typography>
            </div>
            <div>
              <Typography className={classes.number}>
                {influencer.youtube_channel_view_count
                  ? convertNumberToBMK(influencer.youtube_channel_view_count.toFixed(1))
                  : "-"}
              </Typography>
              <Typography className={classes.numberTitle}>View Count</Typography>
            </div>
            <div>
              <Typography className={classes.number}>
                {influencer.youtube_channel_video_count
                  ? convertNumberToBMK(influencer.youtube_channel_video_count.toFixed(1))
                  : "-"}
              </Typography>
              <Typography className={classes.numberTitle}>Video Count</Typography>
            </div>
            {/* <div>
              <Typography className={classes.number}>
                {enggArr && enggArr[0].eng
                  ? convertNumberToBMK(enggArr[0].eng.toFixed(1))
                  : "-"}
              </Typography>
              <Typography className={classes.numberTitle}>
                {enggArr && enggArr[0].type && enggArr[0].type}
              </Typography>
            </div> */}
          </Box>
        </Paper>
      </Link>}</>
  );
}
