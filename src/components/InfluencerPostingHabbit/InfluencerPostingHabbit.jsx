import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "21px",
    width: "100%",
  },
}));

export default function InfluencerPostingHabbit() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="caption">Posting Habbit</Typography>
    </div>
  );
}
