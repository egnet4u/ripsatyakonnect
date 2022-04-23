import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  heading: {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "-0.05px",
    textAlign: "left",
    color: "#202224",
    marginBottom: "9px",
  },
  text: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStretch: "normal",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 1.5,
    letterSpacing: "-0.05px",
    textAlign: "left",
    color: "#202224",
    marginBottom: 9,
    marginTop: 9,
  },
  input: {
    marginBottom: "15px",
    marginTop: "15px",
  },

  forgetPasswordContainer: {
    marginTop: 13,
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
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
    paddingTop: "10px",
    paddingBottom: "10px",
  },
});
export default function ResetPassword({ handleFormDisplay }) {
  const classes = useStyles();
  return (
    <div>
      <form>
        <Typography className={classes.heading}>Forget Password</Typography>
        <Typography className={classes.text}>
          Don’t worry, you are just two steps away from accessing your account.
        </Typography>
        <TextField
          className={classes.input}
          label="Email Address"
          variant="outlined"
          size="small"
          type="email"
          fullWidth
          InputProps={{
            style: { fontSize: 11 },
          }}
          InputLabelProps={{ style: { fontSize: 11 } }}
        />
        <Typography className={classes.text}>
          We will send you a reset password link to your registered email id
        </Typography>
        <div style={{ marginTop: "24px" }}>
          <Button
            onClick={() => handleFormDisplay("reset")}
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.button}
          >
            Send Reset Link
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
