import React from "react";
import {
  Box,
  Card,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import format from "date-fns/format";
import { Link } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { useSelector } from "react-redux";
import {isUserInfo} from "../../utils/permissions/checkUserRoles";
const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: "18px",
    marginRight: "10px",
  },
  taskHeading: {
    color: "#2e75bb",
    lineHeight: 1.5,
    padding: "12px 0 12px 20px",
    fontSize: "12px",
  },
  title: {
    fontSize: "10px",
    lineHeight: 1.6,
    color: "#666666",
    paddingTop: "6.5px",
  },
  value: {
    color: "#414141",
    lineHeight: 1.55,
    fontSize: "11px",
    paddingBottom: "8.5px",
  },
  link: {
    textDecoration: "none",
  },
}));
export default function SingleTask({ item }) {
  const classes = useStyles();
  const usersData = useSelector((state)=>state.allUsersData.users);
  const userDataExtract = (id) =>{
     if(usersData.length !== 0){
       const userInfo = usersData.filter((user)=> user.id === id);
       if(userInfo.length !== 0){
          return userInfo[0].username;
       }
       return ;
     }
     return;
  }
   
  return (
    <Link className={classes.link} to={`/projects/${item.project_id}`}>
      <Card
        className={classes.container}
        elevation={0}
        style={{
          boxShadow: "1px 1px 6px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className={classes.taskHeading}>
            {item.company_name}
          </Typography>
          {item.platform === "instagram" && (
            <InstagramIcon
              fontSize="small"
              style={{ marginRight: "20px" }}
              color="secondary"
            />
          )}
          {item.platform === "youtube" && (
            <YouTubeIcon
              fontSize="small"
              style={{ marginRight: "20px" }}
              color="secondary"
            />
          )}
        </Box>
        <Divider />
        <div
          style={{
            borderBottom: "1px dashed rgba(0, 0, 0, 0.26)",
            padding: " 0  0 0 20px",
          }}
        >
          <Typography className={classes.title}>Campaign Name</Typography>
          <Typography className={classes.value}>
            {item.campaign_name}
          </Typography>
        </div>
        <Grid container justify="space-between" style={{ padding: " 0 20px" }}>
          <Grid item>
            <Typography className={classes.title}>Start Date</Typography>
            <Typography className={classes.value}>
              {format(new Date(item.start_date), "dd MMM yyyy")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.title}>Lead</Typography>
            <Typography className={classes.value}>
              {userDataExtract(item.internal_lead)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.title}>Delivery Date</Typography>
            <Typography className={classes.value}>
              {format(new Date(item.end_date), "dd MMM yyyy")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.title}>Status</Typography>
            <Typography className={classes.value}>{item.status}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
}
