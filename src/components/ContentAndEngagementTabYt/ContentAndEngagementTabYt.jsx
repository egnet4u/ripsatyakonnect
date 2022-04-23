import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Icon,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import TabPanel from "../TabPanel/TabPanel";
import React from "react";

import { Info } from "@material-ui/icons";

import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { updateInfluencer } from "../../api";
import {
  getInfluencerInfo,
  updateField,
} from "../../redux/influencerInfoSlice";
import { useParams } from "react-router-dom";
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

export default function ContentAndEngagementTabYt({ value, index }) {
  const influencerData = useSelector((state) => state.influencerInfoData.data);
  // const status = useSelector((state) => state.influencerInfoData.status);
  const infYoutubeData = useSelector((state) => state.influencerInfoData.youtubeInfData);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mutateAsync, isLoading } = useMutation(updateInfluencer);
  const { handle } = useParams();

  const handleSave = async () => {
    try {
      const res = await mutateAsync(influencerData);
      if (res.status) {
        toast.success(res.data.message);
        dispatch(getInfluencerInfo(handle));
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
           // onClick={handleSave}
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
        <Box
          component={Paper}
          margin="1rem 0"
          elevation={0}
          boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
        >
          <Grid container justify="space-between" className={classes.row}>
            <Grid item xs={5} sm={4} md={3}>
              <Typography variant="caption" className={classes.statsHeading}>
                Average Views
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <Typography variant="caption">
                {infYoutubeData[0].youtube_channel_average_views
                  ? convertNumberToBMK(
                    infYoutubeData[0].youtube_channel_average_views
                    )
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
          <Grid container justify="space-between" className={classes.row}>
            <Grid item xs={5} sm={4} md={3}>
              <Typography variant="caption" className={classes.statsHeading}>
                Average Comments
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <Typography variant="caption">
                {infYoutubeData[0].youtube_channel_average_comments
                  ? convertNumberToBMK(
                      infYoutubeData[0].youtube_channel_average_comments
                    )
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
          <Grid container justify="space-between" className={classes.row}>
            <Grid item xs={5} sm={4} md={3}>
              <Typography variant="caption" className={classes.statsHeading}>
                Integrated Video Pricing (₹/piece)
              </Typography>
            </Grid>

            <Grid item xs={4} sm={3} md={2}>
              <TextField
                value={infYoutubeData[0].youtube_integrated_video_pricing}
                name="youtube_integrated_video_pricing"
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
                  shrink: !!infYoutubeData[0].youtube_integrated_video_pricing,
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
          <Grid container justify="space-between" className={classes.row}>
            <Grid item xs={5} sm={4} md={3}>
              <Typography variant="caption" className={classes.statsHeading}>
                Dedicated Video Pricing (₹/piece)
              </Typography>
            </Grid>

            <Grid item xs={4} sm={3} md={2}>
              <TextField
                value={infYoutubeData[0].youtube_dedicated_video_pricing}
                name="youtube_dedicated_video_pricing"
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
                  shrink: !!infYoutubeData[0].youtube_dedicated_video_pricing,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </TabPanel>
  );
}
