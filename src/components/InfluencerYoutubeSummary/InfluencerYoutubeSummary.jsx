import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import CatImg from "../../assets/cat.jpg";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LanguageIcon from "@material-ui/icons/Language";
import { getInfluencerInfo, setYoutubeInfData, youtubeDataGet } from "../../redux/influencerInfoSlice";
import { useParams } from "react-router";
import { convertNumberToBMK } from "../../utils/converNumberToBMK";
// import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useMutation } from "react-query";
import { addYoutuberToQueue, removeYoutuberFromQueue } from "../../api";
import { getYoutubeInfData } from "../../new_api/api";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "12px",
  },
  img: {
    width: "142px",
    height: "142px",
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
    marginRight: "10px",
  },
  text: {
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#414141",
  },
  icon: {
    marginRight: "3px",
  },
  number: {
    color: "#414141",
    fontSize: "22px",
    fontWeight: 500,
    lineHeight: 1.56,
  },
  numberTitle: {
    lineHeight: 1.55,
    color: "#6e6e6e",
    fontSize: "13px",
    marginTop: "5px",
  },
  status: {
    fontSize: "13px",
    lineHeight: "1.54",
    color: "#414141",
  },
  btn: {
    fontSize: "12px",
    fontWeight: 500,
  },
  button: {
    fontSize: "12px",
    textTransform: "none",
  },
}));

export default function InfluencerYoutubeSummary() {
  const [fullText, setFullText] = useState(false);
  const { handle } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mutateAsync, isLoading } = useMutation(addYoutuberToQueue);
  const { mutateAsync: mutateAsyncUnqueue, isLoading: isLoadingUnqueue } = useMutation(removeYoutuberFromQueue);
  const { mutateAsync: getNewYoutubeData, isLoading: youtubeNewDataIsLoading } = useMutation(getYoutubeInfData);
  const influencerData = useSelector((state) => state.influencerInfoData.data);
  const infYoutubeData = useSelector((state) => state.influencerInfoData.youtubeInfData);
  const infYoutueDataStatus = useSelector((state)=>state.influencerInfoData.youTubeDataStatus);


  const addDefaultUrl = (e) => {
    e.target.src = CatImg;
  };
  const handleFetchStats = async () => {
    try {
      // const res = await mutateAsync(influencerData.youtube_url);
      // if (res) {
      //   toast.success(res);
      //   dispatch(getInfluencerInfo(handle));
      // } else {
      //   toast.error(res);
      // }
      await getNewYoutubeData(influencerData.youtube_url).then((res) => {
        const createNewYoutubeData = { ...res[0], country: influencerData.country };
        toast.success("New Youtube Data Update ");
        dispatch(setYoutubeInfData(res));
      }).catch((error) => {
        toast.error("Something is Wrong");
      })
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  const handleUnqueueInfluencer = async () => {
    try {
      const res = await mutateAsyncUnqueue(influencerData.youtube_url);
      if (res) {
        toast.success(res);
        dispatch(getYoutubeInfData(handle));
      } else {
        toast.error(res);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  return (
    <Grid container justify="space-between" className={classes.container}>
      <Grid item xs={12} sm={4} md={2}>
        <Box display="flex" justifyContent="center">
          <img
            className={classes.img}
            src={
              infYoutubeData[0].youtube_channel_thumbnail ? infYoutubeData[0].youtube_channel_thumbnail : "./cat.jpg"
            }
            onError={addDefaultUrl}
            alt={
              infYoutubeData[0].youtube_channel_name
                ? infYoutubeData[0].youtube_channel_name
                : "Channel"
            }
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={3}>
        <Box>
          <Typography className={classes.name}>
            {infYoutubeData[0].youtube_channel_name &&
              infYoutubeData[0].youtube_channel_name}
          </Typography>
          <a
            style={{ textDecoration: "none", color: "#414141" }}
            href={infYoutubeData[0].youtube_url}
            target="_blank"
            rel="noreferrer"
          >
            <Typography className={classes.handle}>Visit channel</Typography>
          </a>
          <Box width="90%" padding="10px 0">
            <Typography
              style={{ marginBottom: "8px" }}
              className={classes.text}
            >
              {!fullText &&
                infYoutubeData[0].youtube_channel_description &&
                infYoutubeData[0].youtube_channel_description.substring(0, 150)}
              {fullText &&
                infYoutubeData[0].youtube_channel_description &&
                infYoutubeData[0].youtube_channel_description}
              {!fullText && (
                <Button
                  size="small"
                  variant="text"
                  color="primary"
                  className={classes.button}
                  onClick={() => setFullText(true)}
                >
                  View more
                </Button>
              )}
              {fullText && (
                <Button
                  size="small"
                  className={classes.button}
                  variant="text"
                  color="primary"
                  onClick={() => setFullText(false)}
                >
                  View less
                </Button>
              )}
            </Typography>

            <Link
              href={
                infYoutubeData[0].youtube_channel_custom_url &&
                infYoutubeData[0].youtube_channel_custom_url
              }
              variant="caption"
            >
              {infYoutubeData[0].youtube_channel_custom_url &&
                infYoutubeData[0].youtube_channel_custom_url}
            </Link>
          </Box>
          {/* <Box display="flex">
            <Box display="flex">
              <LocationOnIcon
                style={{ fontSize: "18px" }}
                className={classes.icon}
              />
              <Typography className={classes.text}>
                {influencerData.city && influencerData.city}
              </Typography>
            </Box>
            <Box display="flex" marginLeft={"30px"}>
              <LanguageIcon
                style={{ fontSize: "17px" }}
                className={classes.icon}
              />
              <Typography className={classes.text}>
                {influencerData.language &&
                  influencerData.language.map((lang, i) => (
                    <Typography
                      variant="caption"
                      className={classes.text}
                      key={i}
                    >
                      {i === 0 ? null : lang === "" || i === 2 ? null : ","}{" "}
                      {lang}
                    </Typography>
                  ))}
              </Typography>
            </Box>
          </Box> */}
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          marginTop="30px"
          marginBottom="30px"
        >
          <Box>
            <Typography className={classes.number}>
              {infYoutubeData[0].youtube_channel_subscriber_count
                ? convertNumberToBMK(
                  infYoutubeData[0].youtube_channel_subscriber_count
                )
                : 0}
            </Typography>
            <Typography className={classes.numberTitle}>Subscribers</Typography>
          </Box>
          <Box>
            <Typography className={classes.number}>
              {infYoutubeData[0].youtube_channel_view_count
                ? convertNumberToBMK(infYoutubeData[0].youtube_channel_view_count)
                : 0}
            </Typography>
            <Typography className={classes.numberTitle}>Views</Typography>
          </Box>
          <Box>
            <Typography className={classes.number}>
              {infYoutubeData[0].youtube_channel_video_count
                ? infYoutubeData[0].youtube_channel_video_count
                : 0}
            </Typography>
            <Typography className={classes.numberTitle}>Videos</Typography>
          </Box>
          <Box>
            {/* <Typography className={classes.number}>
              {influencerData.instagram_branded_percentage
                ? influencerData.instagram_branded_percentage
                : 0}
              %
            </Typography>
            <Typography className={classes.numberTitle}>
              Branded Posts
            </Typography> */}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <Box>
          {/* <Typography className={classes.status}>Status Updated</Typography>
          <Typography className={classes.numberTitle}>
            {format(new Date(influencerData.updated), "dd MMM yyyy")}
          </Typography> */}
        </Box>
        <Box marginTop="16px">
          {!infYoutubeData[0].fetch_youtube_stats_queued && (
            <Button
              onClick={handleFetchStats}
              className={classes.btn}
              variant="contained"
              color="primary"
            >
              Refresh youtube data{" "}
              {isLoading && (
                <CircularProgress
                  style={{ color: "white", marginLeft: "0.3rem" }}
                  size={13}
                />
              )}
            </Button>
          )}
          {infYoutubeData[0].fetch_youtube_stats_queued && (
            <Button
              onClick={handleUnqueueInfluencer}
              className={classes.btn}
              variant="contained"
              color="secondary"
            >
              Unqueue{" "}
              {isLoadingUnqueue && (
                <CircularProgress
                  style={{ color: "white", marginLeft: "0.3rem" }}
                  size={13}
                />
              )}
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
