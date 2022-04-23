import { makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: (props) => (props.marginTop ? props.marginTop : "24px"),
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    boxShadow: "1px 1px 6px 0 rgba(0, 0, 0, 0.1)",
    height: (props) =>
      props.height
        ? `calc(100vh - ${props.height}px)`
        : `calc(100vh - ${165}px)`,
    width: `calc(100vw - ${40}px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100vw - ${80}px)`,
    },
    padding: "13px 13px 0 13px",
    [theme.breakpoints.down("lg")]: {
      overflowY: "scroll",
    },
  },
}));

export default function CommonBox(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <Paper className={classes.content}>{props.children}</Paper>
    </div>
  );
}
