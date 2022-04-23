import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import TabPanel from "../TabPanel/TabPanel";
import ReportsTabs from "../ReportsTabs/ReportsTabs";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  box: {
    height: `calc(100vh - ${265}px)`,
    paddingTop: "13.5px",
  },
  container: {
    paddingLeft: "17px",
    paddingTop: "7px",
    paddingBottom: "16px",
    borderBottom: "1px dashed #a7a7a7",
  },
  title: {
    color: "#414141",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: 1.56,
    padding: "8px 0",
  },
  label: {
    "& span": {
      color: "#414141",
      fontSize: "12px",
      lineHeight: 1.5,
    },
  },
  button: {
    fontSize: "12px",
  },
}));

export default function TaskReportsTab({ value, index }) {
  const classes = useStyles();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);

  return (
    <TabPanel pad={"0px"} value={value} index={index}>
      <Grid
        className={classes.container}
        container
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography className={classes.title}>
                {pitchInfo.campaign_given_name && pitchInfo.campaign_given_name}{" "}
                Reports
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.box}>
        <ReportsTabs />
      </div>
    </TabPanel>
  );
}
