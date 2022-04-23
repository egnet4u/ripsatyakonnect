import React from "react";

import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import CatImg from "../../assets/cat.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "80%",
  },
  listContainer: {
    borderRadius: "6px",
    padding: "0 13px",
    boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.07)",
  },
  listColumn: {
    fontFamily: "Poppins",
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#414141",
    padding: "10px 0",
  },
  text: {
    fontSize: "10px",
    fontWeight: 500,
    lineHeight: 1.6,
    color: "#414141",
  },
  testDark: {
    background: "#f0f0f0",
    padding: "7px 8px",
    borderRadius: "6px",
  },
  img: {
    height: "48px",
    width: "48px",
    borderRadius: "3px",
    marginRight: "17px",
  },
  name: {
    letterSpacing: "-0.04px",
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#2e75bb",
  },

  option: {
    fontSize: "11px",
  },
  handle: {
    marginTop: "3px",
    marginBottom: "9px",
    letterSpacing: "-0.04px",
    fontSize: "10px",
    lineHeight: 1.6,
    color: "#414141",
  },
}));

export default function PendingContent({ influencer }) {
  const classes = useStyles();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const planned_content = influencer.planned_content;
  const delivered_content = influencer.delivered_content;
  const addDefaultUrl = (e) => {
    e.target.src = CatImg;
  };

  const getContentValue = (type) => {
    let content = {};
    if (influencer.planned_content) {
      influencer.planned_content.forEach((item) => {
        content.total = item[type];
      });
    }

    if (influencer.delivered_content) {
      influencer.delivered_content.forEach((item) => {
        return (content.delivered = item[type]);
      });
    }
    return content;
  };
  //Change the clor when content publish complete
  const changeColor = (delCon  , totCon) =>{
      let styVal = delCon/totCon ;
      if(Math.floor(styVal) === 0){
        return {color:"red"}
      }else if(Math.floor(styVal) === 1){
        return {color:"green"}
      }else{
        return {color:"black"}
      }

  }

  return (
    <>
      <Box marginTop="22px">
        {//pitchInfo.type_of_campaign[0] === "instagram" && (
          pitchInfo.platform === "instagram" && (
          <Grid
            container
            alignItems="center"
            justify="space-around"
            className={classes.listContainer}
          >
            <Grid item xs={2} className={classes.listColumn}>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <img
                    onError={addDefaultUrl}
                    className={classes.img}
                    src={influencer.instagram_profile_pic_url}
                    alt={"profile"}
                  />
                </Grid>

                <Grid item xs={7}>
                  <Typography
                    className={classes.name}
                    style={{
                      textDecoration: "none",
                      overflowWrap: "break-word",
                    }}
                  >
                    {influencer.name}
                  </Typography>
                  <Link
                    style={{
                      textDecoration: "none",
                      overflowWrap: "break-word",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    to={`/discover/${influencer.instagram_handle}`}
                  >
                    <Typography className={classes.handle}>
                      @{influencer.instagram_handle}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text} style={changeColor(delivered_content.image ,planned_content.image )}>
                {/* {getContentValue("image").delivered || 0} /{" "}
                {getContentValue("image").total} */}
                {delivered_content.image ||  0} / {" "}{planned_content.image}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text} style={changeColor(delivered_content.video , planned_content.video)} >
                {/* {getContentValue("video").delivered || 0} /{" "}
                {getContentValue("video").total} */}
                {delivered_content.video ||  0} / {" "}{planned_content.video}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text} style={changeColor(delivered_content.carousel ,planned_content.carousel )}>
                {/* {getContentValue("carousel").delivered || 0} /{" "}
                {getContentValue("carousel").total} */}
                {delivered_content.carousel ||  0} / {" "}{planned_content.carousel}
              </Typography>
            </Grid>
            <Grid xs={1} item className={classes.listColumn}>
              <Typography className={classes.text} style={changeColor(delivered_content.reels ,planned_content.reels )}>
                {/* {getContentValue("reels").delivered || 0} /{" "}
                {getContentValue("reels").total} */}
                {delivered_content.reels ||  0} / {" "}{planned_content.reels}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text} style={changeColor(delivered_content.igtv ,planned_content.igtv )}>
                {/* {getContentValue("igtv").delivered || 0} /{" "}
                {getContentValue("igtv").total} */}
                {delivered_content.igtv ||  0} / {" "}{planned_content.igtv}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text} style={changeColor(delivered_content.static_story ,planned_content.static_story )}>
                {/* {getContentValue("static_story").delivered || 0} /{" "}
                {getContentValue("static_story").total} */}
                {delivered_content.static_story ||  0} / {" "}{planned_content.static_story}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text} style={changeColor(delivered_content.video_story ,planned_content.video_story )}>
                {/* {getContentValue("video_story").delivered || 0} /{" "}
                {getContentValue("video_story").total} */}
                {delivered_content.video_story ||  0} / {" "}{planned_content.video_story}
              </Typography>
            </Grid>
          </Grid>
        )}

        {//pitchInfo.type_of_campaign[0] === "youtube" && (
          pitchInfo.platform === "youtube" && (
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.listContainer}
          >
            <Grid item xs={2} className={classes.listColumn}>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <img
                    onError={addDefaultUrl}
                    className={classes.img}
                    src={influencer.instagram_profile_pic_url}
                    alt={"profile"}
                  />
                </Grid>

                <Grid item xs={7}>
                  <Typography
                    className={classes.name}
                    style={{
                      textDecoration: "none",
                      overflowWrap: "break-word",
                    }}
                  >
                    {influencer.name}
                  </Typography>
                  <Link
                    style={{
                      textDecoration: "none",
                      overflowWrap: "break-word",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    to={`/discover/${influencer.instagram_handle}`}
                  >
                    <Typography className={classes.handle}>
                      @{influencer.instagram_handle}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {/* {influencer.delivered_content[0].scrapped_total_videos || 0} /{" "} */}
                {/* {getContentValue("integrated_video").total +
                  getContentValue("dedicated_video").total || 0} */}
              </Typography>
            </Grid>
            {/* <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {getContentValue("dedicated_video").delivered || 0} /{" "}
                {getContentValue("dedicated_video").total || 0}
              </Typography>
            </Grid> */}
          </Grid>
        )}
      </Box>
    </>
  );
}
