import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import TabPanel from "../TabPanel/TabPanel";
import React from "react";

import { Info } from "@material-ui/icons";
import { ReactComponent as ImageSvg } from "../../assets/image.svg";
import { ReactComponent as VideoSvg } from "../../assets/video.svg";
import { ReactComponent as CarouselSvg } from "../../assets/carousel.svg";
import { ReactComponent as ReelsSvg } from "../../assets/reels.svg";
import { ReactComponent as IGTVSvg } from "../../assets/igtv.svg";
import { ReactComponent as StorySvg } from "../../assets/story.svg";
import { ReactComponent as VideoStorySvg } from "../../assets/video_story.svg";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { updateInfluencer } from "../../api";
import {
  getInfluencerInfo,
  updateField,
} from "../../redux/influencerInfoSlice";
import { convertNumberToBMK } from "../../utils/converNumberToBMK";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  main: {},
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
  },

  heading: {
    fontSize: "14px",
    lineHeight: 1.36,
    color: "#414141",
  },
  input: {
    width: "100%",
  },
  text: {
    fontSize: "12px",
    color: "#414141",
    lineHeight: 1.36,
    marginLeft: "5px",
  },
  icon: {
    height: "17px",
    width: "17px",
  },

  statsHeading: {
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#414141",
  },
  row: {
    padding: "15px",
  },
  statsInput: {
    width: "95%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  option: {
    fontSize: "11px",
  },
}));

export default function ContentAndEngagementTab({ value, index }) {
  const influencerData = useSelector((state) => state.influencerInfoData.data);
  // const status = useSelector((state) => state.influencerInfoData.status);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mutateAsync, isLoading } = useMutation(updateInfluencer);

  const handleSave = async () => {
    try {
      const obj  = {...influencerData};
      for(const key in obj){
        if(obj[key] === null || obj[key === ""]){
            delete obj[key];
        }
      }
      
      const res = await mutateAsync(obj);
      if (res.status) {
        toast.success(res.message);
        dispatch(getInfluencerInfo(influencerData.instagram_id));
      } else {
        toast.error("Something went wrong. Please try again");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };
  return (
    <TabPanel value={value} index={index}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{
          paddingBottom: "12px",
          borderBottom: "0.5px dashed #5c6c7c",
        }}
      >
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Icon color="disabled">
                <Info className={classes.icon} />
              </Icon>
            </Grid>
            <Grid item>
              <Typography className={classes.text} variant="caption">
                Edit the details and save
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {/* <Button
            style={{ marginRight: "9px" }}
            className={classes.button}
            variant="text"
            color="secondary"
            onClick={() => dispatch(getInfluencerInfo(handle))}
          >
            Reset{" "}
            {status === "loading" && (
              <CircularProgress
                color="primary"
                style={{ marginLeft: "0.3rem" }}
                size={13}
              />
            )}
          </Button> */}
          <Button
            onClick={handleSave}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Save Details{" "}
            {isLoading && (
              <CircularProgress
                style={{ color: "white", marginLeft: "0.3rem" }}
                size={13}
              />
            )}
          </Button>
        </Grid>
      </Grid>
      <Box paddingTop="15px" className={classes.main}>
        <Box>
          <Grid container justify="space-around" className={classes.row}>
            <Grid item xs={3}></Grid>
            <Grid item xs={1}>
              <Typography className={classes.statsHeading} variant="caption">
                Overall
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    marginRight="9.5px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <ImageSvg />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Image
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    marginRight="9.5px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <VideoSvg />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Video
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    marginRight="9.5px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CarouselSvg />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Carousel
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    marginRight="9.5px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <ReelsSvg />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Reels
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    marginRight="9.5px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IGTVSvg />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    IGTV
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    marginRight="9.5px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <StorySvg />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Story
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    marginRight="9.5px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <VideoStorySvg />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Video Story
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          component={Paper}
          margin="1rem 0"
          elevation={0}
          boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
        >
          <Grid container justify="space-around" className={classes.row}>
            <Grid item xs={3}>
              <Typography variant="caption" className={classes.statsHeading}>
                Average Engagement
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.instagram_total_engagement
                  ? convertNumberToBMK(
                      influencerData.instagram_total_engagement
                    )
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.image_engagement
                  ? convertNumberToBMK(influencerData.image_engagement)
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.video_engagement
                  ? convertNumberToBMK(influencerData.video_engagement)
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.carousel_engagement
                  ? convertNumberToBMK(influencerData.carousel_engagement)
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.reels_engagement
                  ? convertNumberToBMK(influencerData.reels_engagement)
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.igtv_engagement
                  ? convertNumberToBMK(influencerData.igtv_engagement)
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.image_engagement
                  ? convertNumberToBMK(influencerData.image_engagement)
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.image_engagement
                  ? convertNumberToBMK(influencerData.image_engagement)
                  : 0}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          component={Paper}
          margin="1rem 0"
          elevation={0}
          boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
        >
          <Grid container justify="space-around" className={classes.row}>
            <Grid item xs={3}>
              <Typography variant="caption" className={classes.statsHeading}>
                Engagement Rate
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.instagram_total_engagement_rate
                  ? influencerData.instagram_total_engagement_rate
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.image_engagement_rate
                  ? influencerData.image_engagement_rate
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.video_engagement_rate
                  ? influencerData.video_engagement_rate
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.carousel_engagement_rate
                  ? influencerData.carousel_engagement_rate
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.reels_engagement_rate
                  ? influencerData.reels_engagement_rate
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.igtv_engagement_rate
                  ? influencerData.igtv_engagement_rate
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.image_engagement_rate
                  ? influencerData.image_engagement_rate
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.image_engagement_rate
                  ? influencerData.image_engagement_rate
                  : 0}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          component={Paper}
          margin="1rem 0"
          elevation={0}
          boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
        >
          <Grid container justify="space-around" className={classes.row}>
            <Grid item xs={3}>
              <Typography variant="caption" className={classes.statsHeading}>
                CPE
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption"></Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.image_cpe ? influencerData.image_cpe : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.video_cpe ? influencerData.video_cpe : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.carousel_cpe ? influencerData.carousel_cpe : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.reels_cpe ? influencerData.reels_cpe : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.igtv_cpe ? influencerData.igtv_cpe : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.static_story_cpe
                  ? influencerData.static_story_cpe
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">
                {influencerData.video_story_cpe
                  ? influencerData.video_story_cpe
                  : 0}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          component={Paper}
          margin="1rem 0"
          elevation={0}
          boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
        >
          <Grid container justify="space-around" className={classes.row}>
            <Grid item xs={3}>
              <Typography variant="caption" className={classes.statsHeading}>
                Content Pricing(₹/piece)
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption"></Typography>
            </Grid>
            <Grid item xs={1}>
              <TextField
                value={influencerData.image_pricing}
                name="image_pricing"
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                className={classes.statsInput}
                label="Pricing"
                variant="outlined"
                size="small"
                type="number"
                InputProps={{
                  style: { fontSize: 11 },
                }}
                InputLabelProps={{
                  style: { fontSize: 11 },
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                value={influencerData.video_pricing}
                name="video_pricing"
                className={classes.statsInput}
                label="Pricing"
                variant="outlined"
                size="small"
                type="number"
                InputProps={{
                  style: { fontSize: 11 },
                }}
                InputLabelProps={{
                  style: { fontSize: 11 },
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                value={influencerData.carousel_pricing}
                name="carousel_pricing"
                className={classes.statsInput}
                label="Pricing"
                variant="outlined"
                size="small"
                type="number"
                InputProps={{
                  style: { fontSize: 11 },
                }}
                InputLabelProps={{
                  style: { fontSize: 11 },
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                name="reels_pricing"
                value={influencerData.reels_pricing}
                className={classes.statsInput}
                label="Pricing"
                variant="outlined"
                size="small"
                type="number"
                InputProps={{
                  style: { fontSize: 11 },
                }}
                InputLabelProps={{
                  style: { fontSize: 11 },
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                value={influencerData.igtv_pricing}
                name="igtv_pricing"
                className={classes.statsInput}
                label="Pricing"
                variant="outlined"
                size="small"
                type="number"
                InputProps={{
                  style: { fontSize: 11 },
                }}
                InputLabelProps={{
                  style: { fontSize: 11 },
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                value={influencerData.static_story_pricing}
                name="static_story_pricing"
                className={classes.statsInput}
                label="Pricing"
                variant="outlined"
                size="small"
                type="number"
                InputProps={{
                  style: { fontSize: 11 },
                }}
                InputLabelProps={{
                  style: { fontSize: 11 },
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                value={influencerData.video_story_pricing}
                name="video_story_pricing"
                className={classes.statsInput}
                label="Pricing"
                variant="outlined"
                size="small"
                type="number"
                InputProps={{
                  style: { fontSize: 11 },
                }}
                InputLabelProps={{
                  style: { fontSize: 11 },
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          component={Paper}
          margin="1rem 0"
          elevation={0}
          boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
        >
          <Grid container justify="space-around" className={classes.row}>
            <Grid item xs={3}>
              <Typography variant="caption" className={classes.statsHeading}>
                Content Rating
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption"></Typography>
            </Grid>
            <Grid item xs={1}>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.statsInput}
              >
                <InputLabel className={classes.option} id="image_quality">
                  Rating
                </InputLabel>
                <Select
                  onChange={(e) =>
                    dispatch(
                      updateField({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  value={influencerData.image_quality}
                  labelId="image_quality"
                  label="Rating"
                  className={classes.option}
                  name="image_quality"
                >
                  <MenuItem className={classes.option} value={0}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem className={classes.option} value={1}>
                    Low
                  </MenuItem>
                  <MenuItem className={classes.option} value={2}>
                    Average
                  </MenuItem>
                  <MenuItem className={classes.option} value={3}>
                    Good
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.statsInput}
              >
                <InputLabel className={classes.option} id="video_quality">
                  Rating
                </InputLabel>
                <Select
                  onChange={(e) =>
                    dispatch(
                      updateField({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  value={influencerData.video_quality}
                  labelId="video_quality"
                  label="Rating"
                  className={classes.option}
                  name="video_quality"
                >
                  <MenuItem className={classes.option} value={0}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem className={classes.option} value={1}>
                    Low
                  </MenuItem>
                  <MenuItem className={classes.option} value={2}>
                    Average
                  </MenuItem>
                  <MenuItem className={classes.option} value={3}>
                    Good
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption"></Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption"></Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption"></Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption"></Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption"></Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </TabPanel>
  );
}
