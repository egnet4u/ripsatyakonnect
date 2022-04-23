import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Checkbox,
  Button,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addToInfluencerQueue,
  createInfluencer,
  getEstimatedEngagement,
  getInfluencerByHandle,
  updateInfluencer,
  validateInfluencer,
} from "../../api";
import CatImg from "../../assets/cat.jpg";
import { ReactComponent as ImageSvg } from "../../assets/image-dark.svg";
import { ReactComponent as VideoSvg } from "../../assets/video-dark.svg";
import {
  setSeletedInfluencers,
  updateInfluencerData,
} from "../../redux/filterResultSlice";
import { convertNumberToBMK } from "../../utils/converNumberToBMK";
import { formatForShortlist } from "../../utils/formatForShortlist";

const useStyles = makeStyles((theme) => ({
  list: {
    height: `calc(100vh - ${280}px)`,
    padding: "0.3rem 1rem",
    overflowY: "scroll",
  },

  border: {
    marginTop: "3.5px",
    borderBottom: "solid 1px #c7d9e6",
  },
  search: {
    width: "100%",
    margin: "0.5rem",
  },

  input: {
    width: "100%",
    background: "#fff",
    margin: "0.5rem 0",
  },
  option: {
    fontSize: "11px",
  },

  adornment: {
    color: "rgba(0, 0, 0, 0.36)",
    fontSize: "10px",
  },
  listContent: {
    borderRadius: "6px",
    boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.07)",
    margin: "20px 0",
    padding: "10px 0",
  },
  img: {
    height: "80px",
    width: "80px",
    borderRadius: "3px",
    marginRight: "17px",
    marginLeft: "10px",
  },
  name: {
    letterSpacing: "-0.04px",
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#2e75bb",
  },
  handle: {
    marginTop: "3px",
    marginBottom: "9px",
    letterSpacing: "-0.04px",
    fontSize: "10px",
    lineHeight: 1.6,
    color: "#414141",
  },
  tier: {
    textAlign: "center",
    boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.07)",
    padding: "4px 10px",
    borderRadius: "15px",
    border: "solid 1px #facd34",
    backgroundColor: "#ffcc33",
    fontSize: "10px",
    lineHeight: 1.6,
    color: "#463809",
    display: "inline-block",
  },
  category: {
    fontSize: "10px",
    lineHeight: 1.3,
    color: "#1d172e",
    padding: "8px 11px",
    borderRadius: "16px",
    backgroundColor: "#ece9f5",
    margin: "0.2rem",
  },
  entry: {
    fontSize: "13px",
    lineHeight: 1.54,
    color: "#414141",
  },
  checkboxContainer: {
    position: "relative",
  },
  checkbox: {
    position: "absolute",
    top: -20,
    left: -10,
  },
  notfound: {
    fontSize: "13px",
    color: theme.palette.secondary.main,
    margin: ".8rem 0",
    fontWeight: 600,
  },
}));

const quality = ["Low", "Average", "Good"];

export default function FilteredInfluencer({
  influencer,
  tier,
  cleared,
  selectAll,
}) {
  
   let extractTier = tier.tier;
 
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const { mutateAsync, isLoading } = useMutation(validateInfluencer);
  const {
    mutateAsync: mutateAsyncCreateInfluencer,
    isLoading: isLoadingCreateInfluencer,
  } = useMutation(createInfluencer);
  const { mutateAsync: mutateAsyncAddToQueue, isLoading: isLoadingAddToQueue } =
    useMutation(addToInfluencerQueue);
  const {
    mutateAsync: mutateAsyncEstimatedEngagement,
    isLoading: isLoadingEstimatedEngagement,
  } = useMutation(getEstimatedEngagement);
  const { mutateAsync: mutateAsyncUpdateInfluencer } =
    useMutation(updateInfluencer);
  const {
    mutateAsync: mutateAsyncInfluencerInfo,
    isLoading: isLoadingInfluencerInfo,
  } = useMutation(getInfluencerByHandle);

  const { typeOfList } = useSelector((state) => state.filterResultData);
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);

  const addDefaultUrl = (e) => {
    e.target.src = CatImg;
  };

  useEffect(() => {
    setSelected(false);
  }, [cleared]);

  useEffect(() => {
    if (selectAll) {
      setSelected(selectAll);
      dispatch(
        setSeletedInfluencers({
          checked: true,
          influencer,
        })
      );
    } else {
      setSelected(selectAll);
      dispatch(
        setSeletedInfluencers({
          checked: false,
          influencer,
        })
      );
    }
  }, [selectAll, influencer, dispatch]);

  const handleGetNow = async () => {
    try {
      const isValid = await mutateAsync(influencer.instagram_handle);

      if (isValid.response.data.exists) {
        await mutateAsyncCreateInfluencer({
          handle: influencer.instagram_handle,
        });
        await mutateAsyncAddToQueue(influencer.instagram_handle);
      } else {
        toast.error(
          `Profile with handle '${influencer.instagram_handle}' does not exist`
        );
        return;
      }

      toast.info("Processing...");

      var instaData = await mutateAsyncEstimatedEngagement(
        influencer.instagram_handle
      );

      if (instaData) {
        toast.success("Successfully added");
        await mutateAsyncUpdateInfluencer({
          ...instaData,
          instagram_handle: influencer.instagram_handle,
        });

        var latest = await mutateAsyncInfluencerInfo(
          influencer.instagram_handle
        );

        if (latest && latest.data) {
          const updated = formatForShortlist(latest.data);
          dispatch(updateInfluencerData(updated));
        } else {
          toast.error("Something went wrong. Please try again");
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  return (
    <Grid container justify="space-around" className={classes.listContent}>
      <Grid item xs={4} className={classes.listItem}>
        <Grid container alignItems="center" justify="space-between">
          <Grid
            item
            xs={12}
            md={5}
            lg={5}
            className={classes.checkboxContainer}
          >
            {typeOfList === "handles" && influencer.exists && (
              <Checkbox
                checked={selected}
                onChange={(e) => {
                  dispatch(
                    setSeletedInfluencers({
                      checked: e.target.checked,
                      influencer,
                    })
                  );
                  setSelected(!selected);
                }}
                value={influencer}
                size="small"
                color="primary"
                className={classes.checkbox}
              />
            )}
            {typeOfList !== "handles" && (
              <Checkbox
                checked={selected}
                onChange={(e) => {
                  dispatch(
                    setSeletedInfluencers({
                      checked: e.target.checked,
                      influencer,
                    })
                  );
                  setSelected(!selected);
                }}
                value={influencer}
                size="small"
                color="primary"
                className={classes.checkbox}
              />
            )}
            <img
              onError={addDefaultUrl}
              className={classes.img}
              src={influencer.instagram_profile_pic_url || "/cat.jpg"}
              alt={influencer.name}
            />
          </Grid>
          <Grid item xs={12} md={7} lg={7}>
            <Typography className={classes.name}>{influencer.name}</Typography>
            <Link
              style={{ textDecoration: "none", overflowWrap: "break-word" }}
              target="_blank"
              rel="noopener noreferrer"
              to={`/discover/${influencer.instagram_handle}`}
            >
              <Typography className={classes.handle}>
                @{influencer.instagram_handle}
              </Typography>
            </Link>
            {extractTier && <Typography className={classes.tier}>{extractTier}</Typography>}
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ borderRight: "solid 1px #b5b5b5" }}></Grid>
      <Grid item xs={2} className={classes.listItem}>
        <Grid
          container
          justify={typeOfList === "handles" ? "center" : "flex-start"}
        >
          {influencer.primary_categories &&
            influencer.primary_categories.map((category, i) => (
              <Grid item>
                <Typography className={classes.category} key={category + i}>
                  {category}
                </Typography>
              </Grid>
            ))}
          {typeOfList === "handles" && !influencer.exists && (
            <Grid item>
              <Box textAlign="center">
                <Typography className={classes.notfound}>
                  Not found in the DB.
                </Typography>
              </Box>
              <Box textAlign="center">
                <Button
                  onClick={handleGetNow}
                  size="small"
                  style={{ fontSize: "10px" }}
                  variant="contained"
                  color="primary"
                >
                  Get Now{" "}
                  {(isLoading ||
                    isLoadingCreateInfluencer ||
                    isLoadingAddToQueue ||
                    isLoadingEstimatedEngagement ||
                    isLoadingInfluencerInfo) && (
                    <CircularProgress
                      style={{ marginLeft: "0.3rem", color: "#fff" }}
                      size={13}
                    />
                  )}
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item style={{ borderRight: "solid 1px #b5b5b5" }}></Grid>
      <Grid item xs={1} className={classes.listItem}>
        <Box display="flex" alignItems="center" height="100%">
          { //pitchInfo.type_of_campaign[0] === "instagram" && (
            pitchInfo.platform === "instagram" && (
            <Typography className={classes.entry}>
              {influencer.instagram_followers &&
                convertNumberToBMK(influencer.instagram_followers)}
            </Typography>
          )}

          { //pitchInfo.type_of_campaign[0] === "youtube" && (
            pitchInfo.platform === "youtube" && (
            <Typography className={classes.entry}>
              {influencer.youtube_channel_subscriber_count
                ? convertNumberToBMK(
                    influencer.youtube_channel_subscriber_count
                  )
                : 0}
            </Typography>
          )} 
        </Box>
      </Grid>
      {//pitchInfo.type_of_campaign[0] === "youtube" && (
        pitchInfo.platform === "youtube" && (
        <Grid item xs={4} container alignContent="space-around">
          <Grid container justify="space-around">
            <Grid
              item
              xs={6}
              style={{ textAlign: "center" }}
              className={classes.listItem}
            >
              <Typography className={classes.entry}>
                {influencer.youtube_channel_average_views
                  ? convertNumberToBMK(influencer.youtube_channel_average_views)
                  : 0}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ textAlign: "center" }}
              className={classes.listItem}
            >
              <Typography className={classes.entry}>
                {influencer.youtube_channel_average_comments
                  ? convertNumberToBMK(
                      influencer.youtube_channel_average_comments
                    )
                  : 0}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )} 
       { //pitchInfo.type_of_campaign[0] === "instagram" && (
        pitchInfo.platform === "instagram" && (
        <Grid item xs={4} container alignContent="space-around">
          <Grid container justify="space-around">
            <Grid
              item
              xs={4}
              style={{ textAlign: "center" }}
              className={classes.listItem}
            >
              <Box display="flex" alignItems="center">
                <ImageSvg style={{ marginRight: "1rem" }} />
                <Typography className={classes.entry}>
                  {influencer.image_engagement &&
                    convertNumberToBMK(influencer.image_engagement)}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={4}
              style={{ textAlign: "center" }}
              className={classes.listItem}
            >
              <Typography className={classes.entry}>
                {influencer.image_engagement_rate &&
                  convertNumberToBMK(influencer.image_engagement_rate)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              style={{ textAlign: "center" }}
              className={classes.listItem}
            >
              <Typography className={classes.entry}>
                {/* {influencer.instagram_image_quality &&
                  quality[influencer.instagram_image_quality]} */}
                  {quality[influencer.image_quality]}
              </Typography>
            </Grid>
          </Grid>
          <Grid container style={{ borderBottom: "solid 1px #b5b5b5" }}></Grid>
          <Grid container justify="space-around">
            <Grid
              item
              style={{ textAlign: "center" }}
              xs={4}
              className={classes.listItem}
            >
              <Box display="flex" alignItems="center">
                <VideoSvg style={{ marginRight: "1rem" }} />
                <Typography className={classes.entry}>
                  {influencer.video_engagement &&
                    convertNumberToBMK(influencer.video_engagement)}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              style={{ textAlign: "center" }}
              xs={4}
              className={classes.listItem}
            >
              <Typography className={classes.entry}>
                {influencer.video_engagement_rate &&
                  convertNumberToBMK(influencer.video_engagement_rate)}
              </Typography>
            </Grid>
            <Grid
              item
              style={{ textAlign: "center" }}
              xs={4}
              className={classes.listItem}
            >
              <Typography className={classes.entry}>
                {/* {influencer.instagram_video_quality &&
                  quality[influencer.instagram_video_quality - 1]} */}
                  {quality[influencer.video_quality -1]}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )} 
    </Grid>
  );
}
