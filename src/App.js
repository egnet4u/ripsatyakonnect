import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React, { Suspense, useEffect, useState } from "react";
import { ConfirmProvider } from "material-ui-confirm";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader";
import UserContext from "./contexts/UserContext";
/** Get current user so get by local storage */
import { getCurrentUser } from "./utils/getCurrentUser";

import { getCountryData } from "./redux/countrySlice";
import { ToastContainer } from "react-toastify";
const Layout = React.lazy(() => import("./components/Layout/Layout"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const TaskOverview = React.lazy(() =>
  import("./pages/TaskOverview/TaskOverview")
);
const CreatePitch = React.lazy(() => import("./pages/CreatePitch/CreatePitch"));
const Influencers = React.lazy(() => import("./pages/Influencers/Influencers"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
const TaskPage = React.lazy(() => import("./pages/TaskPage/TaskPage"));
const UserList = React.lazy(() => import("./pages/UserList/UserList"));
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

function App() {
  const [mytheme, setMyTheme] = useState(theme);
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    /** Here we are check current user and auth token */
    const token = localStorage.getItem("authToken");
    const currentUser = localStorage.getItem("currentUser");
    if (!token || !currentUser) {
      setIsAuth(false);
    }

  }, []);

  useEffect(() => {
    setMyTheme(theme);
  }, []);

  useEffect(() => {
    if (isAuth && localStorage.authToken) {
      dispatch(getCountryData());
    }
  }, [dispatch, isAuth]);

  return (
    <ThemeProvider theme={mytheme}>
      <ConfirmProvider>
        <CssBaseline />
        <ToastContainer />
        <BrowserRouter>
          <UserContext.Provider value={{ isAuth, setIsAuth }}>
            <div className="App">
              <Suspense fallback={<GlobalLoader size={20} color="inherit" />}>
                <Switch>
                  <Route path="/login" exact component={Login} />
                  {isAuth ? (
                    <Layout>
                      <Switch>
                        <Route path="/" exact component={TaskOverview} />
                        <Route path="/create" component={CreatePitch} />
                        <Route path="/discover" component={Influencers} />
                        <Route path="/projects/:id" component={TaskPage} />
                        <Route path="/users" component={UserList} />
                        <Route path={"*"} component={NotFound} />
                      </Switch>
                    </Layout>
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Switch>
              </Suspense>
            </div>
          </UserContext.Provider>
        </BrowserRouter>
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default App;
