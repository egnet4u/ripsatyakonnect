import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import PendingContent from "../PendingContent/PendingContent";
import TabPanel from "../TabPanel/TabPanel";

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
  heading: {
    fontSize: "14px",
    color: "#414141",
  },
}));

export default function PendingContainer({ value, index, pending }) {
  const classes = useStyles();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);

  return (
    <TabPanel value={value} index={index} pad={"0px"}>
      <Box>
        <Box padding="40px 0 50px 13px">
          <Typography className={classes.heading}>
            Content Yet To Go Live
          </Typography>
        </Box>
        <Box>
          {//pitchInfo.type_of_campaign[0] === "instagram" && (
            pitchInfo.platform === "instagram" && (
            <Grid
              container
              justify="space-around"
              alignItems="center"
              className={classes.listHeader}
            >
              <Grid item xs={2} className={classes.listHeadItem}>
                Handle
              </Grid>
              <Grid item xs={1} className={classes.listHeadItem}>
                Image
              </Grid>
              <Grid xs={1} item className={classes.listHeadItem}>
                Video
              </Grid>
              <Grid xs={1} item className={classes.listHeadItem}>
                Carousel
              </Grid>
              <Grid xs={1} item className={classes.listHeadItem}>
                Reels
              </Grid>
              <Grid xs={1} item className={classes.listHeadItem}>
                IGTV
              </Grid>
              <Grid xs={1} item className={classes.listHeadItem}>
                Static Story
              </Grid>
              <Grid xs={1} item className={classes.listHeadItem}>
                Video Story
              </Grid>
            </Grid>
          )}
          {//pitchInfo.type_of_campaign[0] === "youtube" && (
            pitchInfo.platform === "youtube" && (
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.listHeader}
            >
              <Grid item xs={2} className={classes.listHeadItem}>
                Channel
              </Grid>
              <Grid item xs={1} className={classes.listHeadItem}>
                Video
              </Grid>
              {/* <Grid xs={1} item className={classes.listHeadItem}>
                Dedicated Video
              </Grid> */}
            </Grid>
          )}
        </Box>
         {pending.status &&
          pending.data.map((influencer) => (
            <PendingContent
              key={influencer.instagram_handle}
              influencer={influencer}
            />
          ))}
      </Box>
    </TabPanel>
  );
}
