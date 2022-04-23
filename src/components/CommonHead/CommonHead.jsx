import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: "1px 1px 1px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
  },
  heading: {
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: 1.56,
    textAlign: "left",
    color: "#414141",
    paddingLeft: "40px",
    paddingTop: "14px",
    paddingBottom: "14px",
  },
}));

export default function CommonHead({ title, children }) {
  const classes = useStyles();
  return (
    <Paper square elevation={0} className={classes.header}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography className={classes.heading}>{title}</Typography>
        </Grid>
        <Grid style={{ paddingRight: "40px" }} item>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
}
