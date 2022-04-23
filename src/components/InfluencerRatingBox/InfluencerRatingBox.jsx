import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { submitInfluencerStarScore } from "../../api";
import { getCampaignDetails } from "../../redux/campaignSlice";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "435px",
    position: "absolute",
    padding: "10px",
    boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.09)",
    zIndex: 100,
    background: "#fff",
  },
  red: {
    color: "red",
  },
  text: {
    fontSize: "10px",
    lineHeight: 1.6,
    color: "#414141",
  },
  button: {
    fontSize: "10px",
    lineHeight: 1.6,
  },
  chip: { fontSize: "10px" },
}));

export default function InfluencerRatingBox({
  handleClose,
  campaign_id,
  instagram_handle,
}) {
  const [overall, setOverall] = useState(0);
  const [timelines, setTimelines] = useState(0);
  const [teamPlayer, setTeamPlayer] = useState(0);
  const [content, setContent] = useState(0);
  const [trustRating, setTrustRating] = useState("good");
  const [comments, setComments] = useState("");
  const classes = useStyles();
  const user = useSelector((state) => state.userData.user);
  const { isLoading, mutateAsync } = useMutation(submitInfluencerStarScore);
  const dispatch = useDispatch();
  const listDetails = useSelector((state) => state.listMixesData.listDetails);

  const style = (type) => {
    if (trustRating === type) {
      return { background: "#2e75bb", color: "#ffffff" };
    } else {
      return {};
    }
  };

  const disableSubmitButton = () => {
    if (
      overall.length === 0 ||
      timelines.length === 0 ||
      teamPlayer.length === 0 ||
      content.length === 0 ||
      trustRating.length === 0 ||
      comments.length === 0
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    mutateAsync({
      influencer_handle: instagram_handle,
      campaign_id: campaign_id,
      timelines_score: timelines,
      teamplayer_score: teamPlayer,
      content_score: content,
      overall_score: overall,
      comments: comments,
      trust_flag: trustRating,
      rated_by_email: user.email,
      rated_by_name: user.name,
      date_of_feedback: new Date().toLocaleDateString(),
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            getCampaignDetails({ id: listDetails.list_name, email: user.email })
          );
        }
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        handleClose();
      });
  };

  return (
    <Box className={classes.box}>
      <Grid
        container
        style={{ borderBottom: "1px solid rgba(112, 112, 112, 0.12)" }}
      >
        <Grid xs={6} item>
          <Grid container style={{ marginBottom: "5px" }}>
            <Grid xs={6} item>
              <Typography className={classes.text}>
                Overall Rating<span className={classes.red}>*</span>
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <Rating
                value={overall}
                size="small"
                onChange={(event, newValue) => {
                  setOverall(newValue);
                }}
                precision={0.5}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={6} item></Grid>
      </Grid>
      <Grid container>
        <Grid xs={6} item>
          <Grid container style={{ margin: "10px 0" }}>
            <Grid xs={6} item>
              <Typography className={classes.text}>
                Timelines<span className={classes.red}>*</span>
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <Rating
                value={timelines}
                size="small"
                onChange={(event, newValue) => {
                  setTimelines(newValue);
                }}
                precision={0.5}
              />
            </Grid>
          </Grid>
          <Grid container style={{ margin: "10px 0" }}>
            <Grid xs={6} item>
              <Typography className={classes.text}>
                Team Player<span className={classes.red}>*</span>
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <Rating
                value={teamPlayer}
                size="small"
                onChange={(event, newValue) => {
                  setTeamPlayer(newValue);
                }}
                precision={0.5}
              />
            </Grid>
          </Grid>
          <Grid container style={{ margin: "10px 0" }}>
            <Grid xs={6} item>
              <Typography className={classes.text}>
                Content<span className={classes.red}>*</span>
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <Rating
                value={content}
                onChange={(event, newValue) => {
                  setContent(newValue);
                }}
                size="small"
                precision={0.5}
              />
            </Grid>
          </Grid>
          <Grid container style={{ margin: "10px 0" }}>
            <Grid xs={6} item>
              <Typography className={classes.text}>
                Trust Rating<span className={classes.red}>*</span>
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <FormControl>
                <RadioGroup
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: ".8rem",
                  }}
                  aria-label="trust-rating"
                  name="trust_rating"
                  value={trustRating}
                  onChange={(e) => setTrustRating(e.target.value)}
                >
                  <FormControlLabel
                    value="good"
                    control={<Radio style={{ display: "none" }} />}
                    label={
                      <Chip
                        className={classes.chip}
                        style={style("good")}
                        size="small"
                        label="Good"
                      />
                    }
                  />
                  <FormControlLabel
                    value="bad"
                    control={<Radio style={{ display: "none" }} />}
                    label={
                      <Chip
                        className={classes.chip}
                        style={style("bad")}
                        size="small"
                        label="Bad"
                      />
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={6} item>
          <Box margin="10px 0" width="100%">
            <TextField
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              style={{ width: "100%" }}
              InputProps={{ style: { fontSize: 11 } }}
              label="Enter your comments"
              InputLabelProps={{
                style: {
                  fontSize: 11,
                },
              }}
              multiline
              variant="outlined"
              rows={4}
            />
          </Box>
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="flex-end"
        borderTop="1px solid rgba(112, 112, 112, 0.12)"
        paddingTop="10px"
      >
        <Box>
          <Button
            onClick={handleClose}
            color="secondary"
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            disabled={disableSubmitButton()}
            className={classes.button}
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
          >
            Submit{" "}
            {isLoading && (
              <CircularProgress
                style={{ marginLeft: "0.3rem", color: "#fff" }}
                size={13}
              />
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
