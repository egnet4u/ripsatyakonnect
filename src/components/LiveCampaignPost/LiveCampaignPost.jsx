import React from "react";

import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Checkbox,
  Tooltip,
  Link,TextField
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  getCampaignDetails,
  updateCampaignPosts,updateLiveCampEstEng
} from "../../redux/campaignSlice";
import { useMutation } from "react-query";
import { updateCampaign } from "../../api";

import { ReactComponent as Image } from "../../assets/image.svg";
import { ReactComponent as Video } from "../../assets/video.svg";
import { ReactComponent as Carousel } from "../../assets/carousel.svg";
import { ReactComponent as Reels } from "../../assets/reels.svg";
import { ReactComponent as IGTV } from "../../assets/igtv.svg";
import { ReactComponent as StaticStory } from "../../assets/story.svg";
import { ReactComponent as VideoStory } from "../../assets/video_story.svg";

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

export default function LiveCampaignPost({ post , index }) {
  const classes = useStyles();
  const { mutateAsync } = useMutation(updateCampaign);
  const dispatch = useDispatch();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const user = useSelector((state) => state.userData.user);

  const campaignDetails = useSelector(
    (state) => state.campaignData.campaignDetails
  );
  const handleExclude = (e, value , liveDataId , platform , isExStatus) => {
     
    //dispatch(updateCampaignPosts({ value, shortcode: post.shortcode }));
    dispatch(updateCampaignPosts({ value, liveDataId ,isExStatus }));

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
  };

  return (
    <>
      <Box marginTop="22px">
        {//pitchInfo.type_of_campaign[0] === "instagram" && (
         pitchInfo.platform === "instagram" && (
          <Grid container alignItems="center" className={classes.listContainer}>
            <Grid item xs={2} className={classes.listColumn}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box marginRight="1rem">
                    {post.content_type === "image" && (
                      <Tooltip title="Image">
                        <Image />
                      </Tooltip>
                    )}
                    {post.content_type === "video" && (
                      <Tooltip title="Video">
                        <Video />
                      </Tooltip>
                    )}
                    {post.content_type === "carousel" && (
                      <Tooltip title="Carousel">
                        <Carousel />
                      </Tooltip>
                    )}
                    {post.content_type === "igtv" && (
                      <Tooltip title="IGTV">
                        <IGTV />
                      </Tooltip>
                    )}
                    {post.content_type === "static_story" && (
                      <Tooltip title="Static Story">
                        <StaticStory />
                      </Tooltip>
                    )}
                    {post.content_type === "video_story" && (
                      <Tooltip title="Video Story">
                        <VideoStory />
                      </Tooltip>
                    )}
                    {post.content_type === "reels" && (
                      <Tooltip title="Reels">
                        <Reels />
                      </Tooltip>
                    )}
                  </Box>
                </Grid>
                <Grid item>
                  <Box>
                    <Typography className={classes.text}>
                      {post.name}
                    </Typography>
                  </Box>
                  <Box>
                    <RouterLink
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                      to={`/discover/${post.instagram_handle}`}
                    >
                      <Typography className={classes.handle}>
                        @{post.instagram_handle}
                      </Typography>
                    </RouterLink>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "11px" }}
                    href={`https://instagram.com/p/${post.shortcode}`}
                  >
                    {(post.content_type === "static_story" || post.content_type === "video_story") ? null : "View Post"}
                    
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>{post.likes}</Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.number_of_views}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.number_of_comments}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.expected_engagement}
              </Typography>
            </Grid>
            {/* <Grid xs={1} item className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.achieved_engagement}
              </Typography>
            </Grid> */}
            <Grid xs={1} item className={classes.listColumn}>
              {post.content_type === "video_story" ||
              post.content_type === "static_story" ? (
                <TextField
                  className={classes.input}
                  label="Eng. Ach."
                  variant="outlined"
                  size="small"
                  type="number"
                  onChange={(e) => {
                    dispatch(updateLiveCampEstEng({value: e.target.value,index,name: e.target.name,liveDataId:post.id}));
                  }}
                  name="achieved_engagement"
                  InputProps={{
                    style: { fontSize: 11 },
                  }}
                  InputLabelProps={{ style: { fontSize: 11 } }}
                  value={post.achieved_engagement}
                />
              ) : (
                <Typography className={classes.text}>
                  {post.achieved_engagement}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.expected_engagement_rate}%
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.achieved_engagement_rate}%
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.expected_reach}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.achieved_reach}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
            <Checkbox 
            checked={post.is_excluded}  
            value={post.is_excluded} 
            size="small" 
            color="primary" 
            onChange={(e, value) =>
              handleExclude(e, value , post.id , post.platform , post.is_excluded)
            } 
            />
            </Grid>
          </Grid>
        )}

        {//pitchInfo.type_of_campaign[0] === "youtube" && (
         pitchInfo.platform === "youtube" && (
          <Grid
            container
            alignItems="center"
            className={classes.listContainer}
            justify="space-around"
          >
            <Grid item xs={2} className={classes.listColumn}>
              <Grid container alignItems="center" justify="flex-start">
                <Grid item>
                  <Box marginRight="1rem">
                    <Tooltip title="Video">
                      <Video />
                    </Tooltip>
                  </Box>
                </Grid>
                <Grid item>
                  <Box>
                    <Typography className={classes.text}>
                      {post.video_title}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className={classes.handle}>
                      {post.channel_name}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "11px" }}
                    href={`https://www.youtube.com/watch?v=${post.video_id}`}
                  >
                    View Post
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.video_statistics.favoriteCount}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.video_statistics.dislikeCount}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.video_statistics.viewCount}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.listColumn}>
              <Typography className={classes.text}>
                {post.video_statistics.commentCount}
              </Typography>
            </Grid>

            <Grid item xs={1} className={classes.listColumn}>
              <Checkbox
                checked={post.is_excluded}
                value={post.is_excluded}
                size="small"
                color="primary"
                onChange={(e, value) => handleExclude(e, value)}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}
