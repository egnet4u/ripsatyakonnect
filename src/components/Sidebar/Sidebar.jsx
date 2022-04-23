import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { ReactComponent as TaskOverviewSvg } from "../../assets/task-overview.svg";
// import { ReactComponent as ProjectManagementSvg } from "../../assets/project-management.svg";
import { ReactComponent as HashtagSvg } from "../../assets/hashtag.svg";
import { ReactComponent as DiscoverSvg } from "../../assets/discover.svg";
import { ReactComponent as AccountRotationSvg } from "../../assets/account-rotation.svg";
import { ReactComponent as AllUsers } from "../../assets/all-users.svg";
import { ReactComponent as ImageTagSvg } from "../../assets/image-tag.svg";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#2e75bb",
    borderEndEndRadius: "30px",
    borderStartEndRadius: "30px",
    padding: "1rem 1.4rem",
    zIndex: theme.zIndex.drawer + 2,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: ".6rem .3rem",
    width: "90px",
    borderRadius: "10px",
    margin: "0.5rem 0",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: "11px",
    lineHeight: "1.82",
    textAlign: "center",
    color: "#ffffff",
  },
  listIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
  },
  active: {
    borderRadius: "10px",
    background: "rgba(238, 238, 238, 0.25)",
    display: "block",
  },
}));

export default function Sidebar({ handleSideBar }) {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <List>
        <NavLink
          exact
          to="/"
          onClick={handleSideBar}
          className={classes.link}
          activeClassName={classes.active}
        >
          <ListItem className={classes.list} button>
            <ListItemIcon className={classes.listIcon}>
              <TaskOverviewSvg />
            </ListItemIcon>
            <ListItemText
              className={classes.text}
              disableTypography
              primary={<Typography variant="caption">Task Overview</Typography>}
            />
          </ListItem>
        </NavLink>
        <NavLink
          activeClassName={classes.active}
          exact
          onClick={handleSideBar}
          to="/discover"
          className={classes.link}
        >
          <ListItem className={classes.list} button>
            <ListItemIcon className={classes.listIcon}>
              <DiscoverSvg />
            </ListItemIcon>
            <ListItemText
              className={classes.text}
              disableTypography
              primary={<Typography variant="caption">Discover</Typography>}
            />
          </ListItem>
        </NavLink>
        {/* <ListItem className={classes.list} button>
          <ListItemIcon className={classes.listIcon}>
            <ProjectManagementSvg />
          </ListItemIcon>
          <ListItemText
            className={classes.text}
            disableTypography
            primary={
              <Typography variant="caption">Project Management</Typography>
            }
          />
        </ListItem> */}
        <NavLink
          activeClassName={classes.active}
          exact
          onClick={handleSideBar}
          to="/hashtags"
          className={classes.link}
        >
          <ListItem className={classes.list} button>
            <ListItemIcon className={classes.listIcon}>
              <HashtagSvg />
            </ListItemIcon>
            <ListItemText
              className={classes.text}
              disableTypography
              primary={<Typography variant="caption">Hashtags</Typography>}
            />
          </ListItem>
        </NavLink>
        <NavLink
          activeClassName={classes.active}
          exact
          onClick={handleSideBar}
          to="/search-by-image-tag"
          className={classes.link}
        >
          <ListItem className={classes.list} button>
            <ListItemIcon className={classes.listIcon}>
              <ImageTagSvg />
            </ListItemIcon>
            <ListItemText
              className={classes.text}
              disableTypography
              primary={
                <Typography variant="caption">Search by Image Tag</Typography>
              }
            />
          </ListItem>
        </NavLink>
        <NavLink
          activeClassName={classes.active}
          exact
          onClick={handleSideBar}
          to="/account-rotation"
          className={classes.link}
        >
          <ListItem className={classes.list} button>
            <ListItemIcon className={classes.listIcon}>
              <AccountRotationSvg />
            </ListItemIcon>
            <ListItemText
              className={classes.text}
              disableTypography
              primary={
                <Typography variant="caption">Account Rotation</Typography>
              }
            />
          </ListItem>
        </NavLink>
        <NavLink
          activeClassName={classes.active}
          exact
          onClick={handleSideBar}
          to="/users"
          className={classes.link}
        >
          <ListItem className={classes.list} button>
            <ListItemIcon className={classes.listIcon}>
              <AllUsers />
            </ListItemIcon>
            <ListItemText
              className={classes.text}
              disableTypography
              primary={
                <Typography variant="caption">All Users</Typography>
              }
            />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}
