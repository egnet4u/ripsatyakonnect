import React, { Suspense, useState } from "react";
import {
  CircularProgress,
  createMuiTheme,
  CssBaseline,
  Grid,
  Hidden,
  makeStyles,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

import LoginMainImg from "../../assets/login-main.svg";
import PlayCircle from "../../assets/play-circle.svg";
const LoginForm = React.lazy(() =>
  import("../../components/LoginForm/LoginForm")
);

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#1c75bb",
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
  },
  container: {
    maxWidth: "1366px",
    padding: "7rem 0",
    margin: "0 auto",
  },
  heading: {
    width: "350px",
    height: "83px",
    margin: "0 2px 17px 0",
    fontSize: "29px",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.48",
    letterSpacing: "-0.1px",
    textAlign: "left",
    color: "#ffffff",
  },
  subHeading: {
    width: "352px",
    height: "28px",
    margin: "17px 0 0",
    fontFamily: "Poppins",
    fontSize: "19.8px",
    fontWeight: "300",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.52",
    letterSpacing: "-0.07px",
    textAlign: "left",
    color: "#ffffff",
  },
  play: {
    width: "24",
    height: "24",
    objectFit: "contain",
    margin: "0 10px 0 0",
  },
  playText: {
    fontFamily: "Open Sans",
    fontSize: "12px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.42,
    letterSpacing: "-0.04px",
    textAlign: "left",
    color: "#ffffff",
  },
  playContainer: {
    marginTop: "2.5rem",
  },
  img: {
    padding: "2.5rem 0",
  },
  fixWidth: {
    width: "352px",
  },
}));
export default function Login() {
  const classes = useStyles();
  const [mytheme, setMyTheme] = useState(theme);

  return (
    <ThemeProvider theme={mytheme}>
      <CssBaseline />
      <div className="root">
        <div className={classes.container}>
          <Grid container justify="space-around" alignItems="center">
            <Hidden mdDown>
              <Grid item className="grid">
                <div>
                  <Typography className={classes.heading}>
                    End to End Influencer Manangement
                  </Typography>
                  <Typography className={classes.subHeading}>
                    AI-Selection | Optimisation | Insights
                  </Typography>
                </div>
              </Grid>
            </Hidden>
            <Hidden smDown>
              <Grid item>
                <div className={classes.img}>
                  <img src={LoginMainImg} alt="Ripple Konnect" />
                </div>
              </Grid>
            </Hidden>

            <Grid item>
              <div>
                <Suspense
                  fallback={<CircularProgress size={20} color="inherit" />}
                >
                  <LoginForm setMyTheme={setMyTheme} />
                </Suspense>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-around"
            alignItems="center"
            className={classes.playContainer}
          >
            <Grid
              item
              container
              alignItems="center"
              className={classes.fixWidth}
            >
              <img
                className={classes.play}
                src={PlayCircle}
                alt="Product tour"
              />
              <Typography className={classes.playText} variant="caption">
                Product Tour
              </Typography>
            </Grid>
            <Grid item className={classes.fixWidth}></Grid>
            <Grid item className={classes.fixWidth}></Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}
