import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  loader: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

export default function GlobalLoader({ color, size }) {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <CircularProgress size={size || 20} color={color || "inherit"} />
    </div>
  );
}
