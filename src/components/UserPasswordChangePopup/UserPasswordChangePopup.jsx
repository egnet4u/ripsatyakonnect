import {
    Box,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    Tooltip,
    Typography,MenuItem
  } from "@material-ui/core";
  import React, { useEffect, useState } from "react";
  import Button from "@material-ui/core/Button";
  import Dialog from "@material-ui/core/Dialog";
  import DialogActions from "@material-ui/core/DialogActions";
  import DialogContent from "@material-ui/core/DialogContent";
  import DialogTitle from "@material-ui/core/DialogTitle";
  import HighlightOffIcon from "@material-ui/icons/HighlightOff";
  import { useDebounce } from "use-debounce/lib";
  import { parseHandle } from "../../utils/parseHandle";
  import {
    getInfluencerByHandle,
    searchInfluencerByNameAndHandle,
    updateCampaign,
  } from "../../api";
  import SearchIcon from "@material-ui/icons/Search";
  import { Link } from "react-router-dom";
  import CatImg from "../../assets/cat.jpg";
  import { convertNumberToBMK } from "../../utils/converNumberToBMK";
  import { useDispatch, useSelector } from "react-redux";
  import { toast } from "react-toastify";
  import { useMutation } from "react-query";
  import {addInfInCampaign , getCampaignInfluencersData} from "../../new_api/api"
  import { getCampaignDetails ,addMoreInfInCampaign , addInfInCampAndStoreInRedux} from "../../redux/campaignSlice";
  
  const useStyles = makeStyles((theme) => ({
    title: {
      borderTop: "7px solid #2e75bb",
      paddingTop: "17px",
      minWidth: "600px",
      // [theme.breakpoints.up("sm")]: {
      //   minWidth: "464px",
      // },
      // [theme.breakpoints.up("md")]: {
      //   minWidth: "600px",
      // },
      "& h2": {
        color: "#41414",
        fontWeight: 500,
        fontSize: "14px",
      },
    },
    noteTitle: {
      color: "#41414",
      fontSize: "13px",
      marginBottom: "6px",
    },
    button: {
      fontSize: "15px",
      lineHeight: 1.5,
      marginLeft: "10px",
    },
    text: {
      fontSize: "12px",
      fontStyle: "italic",
      textAlign: "left",
      color: "#414141",
      lineHeight: 1.5,
    },
    backdrop: {
      backdropFilter: "blur(3px)",
      backgroundColor: "rgba(0, 0, 0, 0.28)",
    },
    input: {
      width: "100%",
    },
    search: {
      width: "100%",
    },
    listHeader: {
      borderRadius: "6px",
      background: "transparent",
      padding: "0 13px",
      marginTop: "15px",
    },
    listHeadItem: {
      fontFamily: "Poppins",
      fontSize: "12px",
      lineHeight: 1.5,
      color: "#414141",
      padding: "10px 0",
      textAlign: "center",
    },
    listContainer: {
      borderRadius: "6px",
      padding: "0 13px",
      boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.07)",
    },
    listColumn: {
      fontFamily: "Poppins",
      fontSize: "12px",
      lineHeight: 1.5,
      color: "#414141",
      padding: "10px 0",
    },
  
    testDark: {
      background: "#f0f0f0",
      padding: "7px 8px",
      borderRadius: "6px",
    },
    img: {
      height: "48px",
      width: "48px",
      borderRadius: "3px",
      marginRight: "17px",
    },
    name: {
      letterSpacing: "-0.04px",
      fontSize: "12px",
      lineHeight: 1.5,
      color: "#2e75bb",
    },
  
    option: {
      fontSize: "11px",
    },
    handle: {
      marginTop: "3px",
      marginBottom: "9px",
      letterSpacing: "-0.04px",
      fontSize: "10px",
      lineHeight: 1.6,
      color: "#414141",
    },
    entry: {
      fontSize: "11px",
      lineHeight: 1.54,
      color: "#414141",
    },
  }));
  
  const influencerProps = [
    "instagram_handle",
    "name",
    "instagram_followers",
    "image_engagement",
    "video_engagement",
    "image_engagement_rate",
    "video_engagement_rate",
    "primary_categories",
    "tier",
    "instagram_image_quality",
    "instagram_video_quality",
    "youtube_url",
    "youtube_channel_id",
    "youtube_channel_name",
    "youtube_channel_description",
    "youtube_channel_custom_url",
    "youtube_channel_videos",
    "youtube_channel_subscriber_count",
    "youtube_channel_thumbnail",
    "youtube_channel_video_count",
    "youtube_channel_subscriber_count",
    "youtube_channel_view_count",
    "youtube_dedicated_video_pricing",
    "youtube_integrated_video_pricing",
    "youtube_channel_country",
    "youtube_channel_average_views",
    "youtube_channel_average_comments",
    "youtube_channel_average_likes",
    "youtube_channel_average_dislikes",
  ];
  
  export default function AddUserPopUP({showHide , setShowHide , userData }) {

    const classes = useStyles();
    const [userRole , setUserRole] = useState("Brand");
     
    const roles = ["Super Admin" , "Management Admin" , "Community Admin","Intern" , "Brand"];
    const userRoleChange =(e)=>{
        setUserRole(e.target.value);
    }
  
    return (
      <div>
        <Dialog
          BackdropProps={{
            classes: {
              root: classes.backdrop,
            },
          }}
          open={showHide}
          onClose={setShowHide}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.title} id="alert-dialog-title">
            <Grid container justify="flex-end" alignItems="center">
              <Grid item>
                <Tooltip title="Close" placement="left">
                  <IconButton
                    onClick={setShowHide}
                    size="small"
                    color="secondary"
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Box textAlign="center">
              <Typography 
              style={{color:"#333333", marginBottom: ".1rem", fontSize: "20px" , fontWeight:"900"}}
              >
               Change Password
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
          <Box>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.listHeader}
            > 
                <Grid item xs={12} >
                    <TextField style={{"width":"100%"}} 
                    required id="outlined-basic" disabled
                    label="Name" variant="outlined" value={userData.username} />
                </Grid>
            </Grid>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.listHeader}
            > 
                <Grid item xs={12} >
                    <TextField style={{"width":"100%"}} 
                    required id="outlined-basic-email" disabled
                    label="Email Address" variant="outlined" value={userData.email} />
                </Grid>
            </Grid>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.listHeader}
            > 
            <Grid item xs={12} >
                <TextField style={{"width":"100%"}} 
                required id="outlined-basic-password" 
                type="password"
                label="Password" variant="outlined" />
            </Grid>
            </Grid>
            </Box>
          </DialogContent>
          <DialogActions
            style={{ paddingRight: "1.5rem", paddingBottom: "1rem" }}
          >
            <Grid container justify="flex-end" alignItems="center">
              <Grid item>
                <Button
                  className={classes.button}
                  onClick={setShowHide}
                  size="medium"
                  variant="contained" 
                  color="primary"
                >
                  Change Password {" "}
                </Button>
                <Button
                  className={classes.button}
                  onClick={setShowHide}
                  color="secondary"
                  size="medium"
                  variant="contained" 
                  
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  