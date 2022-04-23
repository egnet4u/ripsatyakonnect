import { Button, makeStyles, TextField } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  input: {
    marginBottom: "32px",
  },
  checkbox: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "-0.04px",
    textAlign: "left",
    color: "#000000",
    marginTop: "16px",
    marginBottom: "16px",
  },
  forgetPasswordContainer: {
    marginTop: 15,
    textAlign: "center",
  },
  forgetPassword: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "-0.04px",
    textAlign: "right",
    color: "#c42f30",
    textDecoration: "none",
    textTransform: "none",
  },
  buttonContainer: {
    marginTop: 36,
  },
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
    paddingTop: "10px",
    paddingBottom: "10px",
  },
});
export default function ForgetPassword({ handleFormDisplay }) {
  const classes = useStyles();
  return (
    <div>
      <form>
        <TextField
          className={classes.input}
          label="New Password"
          variant="outlined"
          size="small"
          type="password"
          fullWidth
          InputProps={{
            style: { fontSize: 11 },
          }}
          InputLabelProps={{ style: { fontSize: 11 } }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            style: { fontSize: 11 },
          }}
          InputLabelProps={{ style: { fontSize: 11 } }}
        />

        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            fullWidth
          >
            Change Password
          </Button>
        </div>
      </form>
      <div className={classes.forgetPasswordContainer}>
        <Button
          onClick={() => handleFormDisplay("login")}
          variant="text"
          className={classes.forgetPassword}
        >
          Back to sign in
        </Button>
      </div>
    </div>
  );
}
