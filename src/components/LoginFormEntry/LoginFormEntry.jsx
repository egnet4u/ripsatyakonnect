import React, { useContext } from "react";
import { useMutation } from "react-query";
import {
  Button,
  CircularProgress,
  createMuiTheme,
  makeStyles,
  TextField,
} from "@material-ui/core";

import { useForm } from "react-hook-form";
import { getToken } from "../../api";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import UserContext from "../../contexts/UserContext";
const useStyles = makeStyles({
  input: {
    marginBottom: "32px",
  },
  checkbox: {
    textAlign: "left",
    color: "#000000",
    marginTop: "16px",
    marginBottom: "16px",
    "& span": {
      fontFamily: "Poppins",
      fontSize: "12px",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: 1.5,
      letterSpacing: "-0.04px",
    },
  },
  password: {
    marginBottom: "32px",
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
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
    paddingTop: "10px",
    paddingBottom: "10px",
  },
});

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#f8fcff",
    },
    primary: {
      main: "#1c75bb",
    },
    secondary: {
      main: "#c42f30",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    button: {},
  },
});

export default function LoginFormEntry({ handleFormDisplay, setMyTheme }) {
  const history = useHistory();
  const classes = useStyles();
  const { setIsAuth } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, mutateAsync, isLoading } = useMutation(getToken);

  const onSubmit = async (user) => {
    try {
      const res = await mutateAsync({ ...user });
      if (res.status) {
        setIsAuth(true);
        toast.success(res.message);
        setMyTheme(theme);
        return history.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };
  console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          className={classes.input}
          label="Email Address"
          error={!!errors.email || (data && !data.status)}
          variant="outlined"
          size="small"
          type="email"
          {...register("email", { required: true })}
          fullWidth
          InputProps={{
            style: { fontSize: 11 },
          }}
          InputLabelProps={{ style: { fontSize: 11 } }}
          helperText={
            !!errors.email
              ? "*This is a required field."
              : data && !data.status
              ? data.error[0]
              : null
          }
        />
        <TextField
          error={!!errors.password || (data && !data.status)}
          className={classes.password}
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          {...register("password", { required: true })}
          fullWidth
          InputProps={{
            style: { fontSize: 11 },
          }}
          InputLabelProps={{ style: { fontSize: 11 } }}
          helperText={
            !!errors.password
              ? "*This is a required field."
              : data && !data.status
              ? data.error[0]
              : null
          }
        />

        {/* <FormControlLabel
          className={classes.checkbox}
          control={<Checkbox size="small" checked={true} color="primary" />}
          label="Remember Password"
        /> */}
        <div>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
      <div className={classes.forgetPasswordContainer}>
        <Button
          onClick={() => handleFormDisplay("forget")}
          variant="text"
          className={classes.forgetPassword}
        >
          Forgot Password
        </Button>
      </div>
    </div>
  );
}
