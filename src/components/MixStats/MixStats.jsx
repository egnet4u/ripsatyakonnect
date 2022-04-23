import {
  Box,
  Button,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { ReactComponent as Image } from "../../assets/image.svg";
import { ReactComponent as Video } from "../../assets/video.svg";
import { ReactComponent as Carousel } from "../../assets/carousel.svg";
import { ReactComponent as Reels } from "../../assets/reels.svg";
import { ReactComponent as IGTV } from "../../assets/igtv.svg";
import { ReactComponent as StaticStory } from "../../assets/story.svg";
import { ReactComponent as VideoStory } from "../../assets/video_story.svg";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "10px",
  },
  text: {
    fontSize: "10px",
    lineHeight: 1.6,
    color: "#414141",
  },
  box: {
    backgroundColor: "#fcf6e5",
  },
  textLarge: {
    fontSize: "12px",
  },
}));

export default function MixStats({ mixNumber }) {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  //const mixInflencerData = useSelector((state) => state.listMixesData.mixInflencerData);
  const mixInflencerData = useSelector((state) => state.listMixesData.mixInflencerData);
  console.log("🚀 ~ file: MixStats.jsx ~ line 42 ~ MixStats ~ mixInfluncerData", mixInflencerData)
  const getContentForAllInfluencers = () => {
    let content = {};
    console.log("🚀 ~ file: MixStats.jsx ~ line 45 ~ getContentForAllInfluencers ~ content", content)
    mixInflencerData[`mix_influencers_data_${mixNumber}`].forEach((influencer) => {
      if (influencer.content_plan) {
        influencer.content_plan.forEach((plan) => {
          if (content[plan.content_type]) {
            content[plan.content_type] += Number(plan.num_posts);
          } else {
            content[plan.content_type] = Number(plan.num_posts);
          }
        });

      }
    });
    return content;
    console.log("🚀 ~ file: MixStats.jsx ~ line 61 ~ getContentForAllInfluencers ~ content", content)


  };

  const getEstimateCost = () => {
    let totalSum = 0;
    mixInflencerData[`mix_influencers_data_${mixNumber}`].forEach((influencer) => {
      totalSum += influencer.est_cost;
    });
    return totalSum
  }

  const totalPieces = () => {
    return Object.keys(getContentForAllInfluencers()).reduce(
      (a, c) => a + Number(getContentForAllInfluencers()[c]),
      0
    );
  };
  return (
    <Box
      width="554px"
      position="absolute"
      top={"65px"}
      left={0}
      right={0}
      marginLeft="auto"
      marginRight="auto"
      className={classes.box}
      paddingLeft="10px"
    >
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ padding: "5px 0" }}
      >
        <Grid item>
          <Typography className={classes.text}>
            Mix {mixNumber} Statistics
          </Typography>
        </Grid>
        <Grid item>
          {show ? (
            <Button
              className={classes.button}
              onClick={() => setShow(!show)}
              color="primary"
            >
              Hide
            </Button>
          ) : (
            <Button
              className={classes.button}
              onClick={() => setShow(!show)}
              color="primary"
            >
              Show
            </Button>
          )}
        </Grid>
      </Grid>
      {show && (
        <>
          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" paddingRight="17px">
              <Tooltip title="Total Influencers">
                <SupervisorAccountIcon fontSize="small" />
              </Tooltip>
              <Typography
                className={classes.textLarge}
                style={{ paddingLeft: "5px" }}
              >
                {mixInflencerData[`mix_influencers_data_${mixNumber}`].length}
              </Typography>
            </Box>
            <Box>
              <Tooltip title="Projected Budget">
                <Typography className={classes.textLarge}>
                  ₹  {getEstimateCost()}

                </Typography>
              </Tooltip>
            </Box>
          </Box>
          <Box padding="20px 0 14.5px 0">
            <Grid container justify="space-between">
              <Grid item>
                <Grid container>
                  {Object.keys(getContentForAllInfluencers()).map((item) => (
                    <Grid item style={{ paddingRight: "15px" }}>
                      <Grid container alignItems="center">
                        <Grid
                          item
                          style={{
                            paddingRight: "5px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {item === "image" && (
                            <Tooltip title="Image">
                              <Image />
                            </Tooltip>
                          )}
                          {item === "video" && (
                            <Tooltip title="Video">
                              <Video />
                            </Tooltip>
                          )}
                          {item === "carousel" && (
                            <Tooltip title="Carousel">
                              <Carousel />
                            </Tooltip>
                          )}
                          {item === "igtv" && (
                            <Tooltip title="IGTV">
                              <IGTV />
                            </Tooltip>
                          )}
                          {item === "static_story" && (
                            <Tooltip title="Static Story">
                              <StaticStory />
                            </Tooltip>
                          )}
                          {item === "video_story" && (
                            <Tooltip title="Video Story">
                              <VideoStory />
                            </Tooltip>
                          )}
                          {item === "reels" && (
                            <Tooltip title="Reels">
                              <Reels />
                            </Tooltip>
                          )}
                          {item === "integrated_video" && (
                            <Tooltip title="Integrated Video">
                              <Video />
                            </Tooltip>
                          )}
                          {item === "dedicated_video" && (
                            <Tooltip title="Dedicated Video">
                              <Reels />
                            </Tooltip>
                          )}
                        </Grid>
                        <Grid item>
                          <Typography className={classes.textLarge}>
                            {getContentForAllInfluencers()[item]}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              justify="flex-end"
              style={{ paddingRight: "10px", paddingTop: "10px" }}
            >
              <Grid item style={{ paddingRight: "10px" }}>
                <Typography className={classes.textLarge}>
                  Total Pieces:
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textLarge}>
                  {totalPieces()}
                </Typography>
              </Grid>
              {/* {mixInflencerData.platforms[0] === "instagram" && (
                <Grid
                  item
                  style={{ paddingRight: "10px", paddingLeft: "15px" }}
                >
                  <Typography className={classes.textLarge}>
                    Expected Eng./Reach:
                  </Typography>
                </Grid>
              )}
              {mixInflencerData.platforms[0] === "instagram" && (
                <Grid item>
                  <Typography className={classes.textLarge}>
                    {mixInflencerData[`expected_engagement_${mixNumber}`]} /{" "}
                    {mixInflencerData[`expected_reach_${mixNumber}`]}
                  </Typography>
                </Grid>
              )} */}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}
