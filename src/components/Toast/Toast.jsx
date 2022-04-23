import React from "react";
import Alert from "@material-ui/lab/Alert/Alert";
import { makeStyles, Snackbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  alert: {
    padding: "10px",
    background: "#fff",
    color: "#414141",
    fontSize: "12px",
    borderRadius: "6px",
    boxShadow: "0 3px 10px 0 rgba(0, 0, 0, 0.1)",
  },
}));

export default function Toast({ handleClose, open, severity, children }) {
  const classes = useStyles();
  const style = () => {
    if (severity === "success") {
      return { borderLeft: "4px solid #4CAF50" };
    } else if (severity === "error") {
      return { borderLeft: "4px solid #F44336" };
    } else if (severity === "info") {
      return { borderLeft: "4px solid #2196F3" };
    } else if (severity === "warning") {
      return { borderLeft: "4px solid #FF9800" };
    } else {
      return {};
    }
  };
  return (
    <Snackbar
      className={classes.snackbar}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        className={classes.alert}
        onClose={handleClose}
        style={style()}
        severity={severity}
      >
        {children}
      </Alert>
    </Snackbar>
  );
}
