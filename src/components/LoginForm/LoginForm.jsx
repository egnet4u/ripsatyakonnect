import { Card, makeStyles, CircularProgress } from "@material-ui/core";
import React, { Suspense, useState } from "react";
import LoginLogo from "../../assets/login-logo.png";
const LoginFormEntry = React.lazy(() =>
  import("../LoginFormEntry/LoginFormEntry")
);
const ForgetPassword = React.lazy(() =>
  import("../ForgetPassword/ForgetPassword")
);
const ResetPassword = React.lazy(() =>
  import("../ResetPassword/ResetPassword")
);

const useStyles = makeStyles({
  card: {
    width: "390px",
    height: "487px",
    padding: "68px 28px 67px 38px",
    borderRadius: "8px",
    boxShadow: "6px 6px 54px 0 rgba(0, 0, 0, 0.05)",
    backgroundColor: "#ffffff",
  },
  logoContainer: {
    marginBottom: "49px",
  },
  logo: {
    width: "148px",
    height: "46px",
  },
});

export default function LoginForm({ setMyTheme }) {
  const [formDisplay, setFormDisplay] = useState("login");
  const classes = useStyles();
  const handleFormDisplay = (display) => {
    setFormDisplay(display);
  };
  let form;
  if (formDisplay === "login") {
    form = (
      <LoginFormEntry
        setMyTheme={setMyTheme}
        handleFormDisplay={handleFormDisplay}
      />
    );
  } else if (formDisplay === "reset") {
    form = <ResetPassword handleFormDisplay={handleFormDisplay} />;
  } else if (formDisplay === "forget") {
    form = <ForgetPassword handleFormDisplay={handleFormDisplay} />;
  }

  return (
    <Card className={classes.card}>
      <div className={classes.logoContainer}>
        <img
          className={classes.logo}
          src={LoginLogo}
          alt="Logo Ripple Konnect"
        />
      </div>
      <Suspense fallback={<CircularProgress size={25} color="primary" />}>
        {form}
      </Suspense>
    </Card>
  );
}
