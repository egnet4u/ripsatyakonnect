import {
  AppBar,
  Avatar,
  Backdrop,
  Badge,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import React, { useContext, useState ,useEffect} from "react";
import Logo from "../../assets/logo.png";
import Profile from "../../assets/avatar.svg";
import Sidebar from "../Sidebar/Sidebar";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
/** Get current user so get by local storage */
import { getCurrentUser } from "../../utils/getCurrentUser";
import { useSelector ,useDispatch } from "react-redux";
import {getAllUsersData} from "../../redux/allUsersSlice"

const useStyles = makeStyles((theme) => ({
  root: {},
  appbar: {
    background: "#2e75bb",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  avatar: {
    width: "25px",
    height: "25px",
  },
  sidebarBtn: {
    [theme.breakpoints.down("sm")]: {
      height: "143px",
      width: "12px",
    },
    height: "160px",
    background: "#1c75bb",
    zIndex: theme.zIndex.drawer + 3,
    width: "16px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderEndEndRadius: "30px",
    borderStartEndRadius: "30px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
  sidebarIcon: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#e7e7e7",
  },
  item: {
    fontSize: "12px",
  },
  logout: {
    marginTop: "2rem",
  },
}));

export default function Layout({ children }) {
  const history = useHistory();
  const classes = useStyles();
  const { setIsAuth } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getAllUsersData());
  },[]);

  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const onLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    history.push("/login");
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      className={classes.logout}
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className={classes.item} onClick={onLogout}>
        Logout
      </MenuItem>
    </Menu>
  );
 /** Get current user which are already login it */
  const { name } = getCurrentUser();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static" elevation={0}>
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item className={classes.logo}>
              <Link to="/">
                <img src={Logo} alt="Ripple Konnect Logo" />
              </Link>
            </Grid>
            <Grid item className={classes.menuItems}>
              <IconButton color="inherit">
                <InfoIcon />
              </IconButton>
              <Tooltip title="Notifications">
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge variant="dot" color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title={name}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  <Avatar
                    src={Profile}
                    alt="Profile avatar"
                    className={classes.avatar}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <div>{children}</div>
      <div>
        <div className={classes.sidebarBtn} onClick={handleSideBar}>
          {sidebarOpen ? (
            <IconButton color="inherit">
              <NavigateBeforeIcon
                color="inherit"
                className={classes.sidebarIcon}
              />
            </IconButton>
          ) : (
            <NavigateNextIcon color="inherit" className={classes.sidebarIcon} />
          )}
        </div>
        {sidebarOpen ? <Sidebar handleSideBar={handleSideBar} /> : null}
      </div>
      <Backdrop
        className={classes.backdrop}
        open={sidebarOpen}
        onClick={handleSideBar}
      ></Backdrop>
    </div>
  );
}
