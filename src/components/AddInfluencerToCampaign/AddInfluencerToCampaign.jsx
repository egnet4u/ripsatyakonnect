import {
    Box,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    Tooltip,
    Typography,
  } from "@material-ui/core";
  import React, { useEffect } from "react";
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
      fontSize: "10px",
      lineHeight: 1.5,
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
      background: "#f5f9fc",
      padding: "0 13px",
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
  
  export default function AddInfluencerToCampaign({ handleClose, open }) {
    const classes = useStyles();
    const { mutateAsync } = useMutation(updateCampaign);
    const dispatch = useDispatch();
    const [foundInfluencers, setFoundInfluencers] = React.useState([]);
    const [text, setText] = React.useState("");
    const [debounceText] = useDebounce(text, 500);
    const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
    const user = useSelector((state) => state.userData.user);
    const {mutateAsync:addInfluencersInCamp , isLoading:isLoadingaddInfInCampaign} = useMutation(addInfInCampaign);
    const {mutateAsync:getCamInfData , isLoading:getCamInfDataIsLoading}  = useMutation(getCampaignInfluencersData);
    const campaignDetails = useSelector(
      (state) => state.campaignData.campaignDetails
    );
    const handleSearch = (e) => {
      const parsed = parseHandle(e.target.value);
      setText(parsed);
    };
  
    const addDefaultUrl = (e) => {
      e.target.src = CatImg;
    };
    useEffect(() => {
      if (debounceText) {
        searchInfluencerByNameAndHandle({
          search_string: debounceText,
          platforms: pitchInfo.platform,
        })
          .then((data) => {
            setFoundInfluencers(data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [debounceText, pitchInfo.platform]);
  
    async function addToMix(influencer) {
       //console.log(influencer);
      try {
        const foundIndex = campaignDetails.data[
          `campaign_influencer_data`
        ].findIndex(
          (inf) => inf.instagram_handle === influencer.instagram_handle
        );
        if (foundIndex !== -1) {
          return window.confirm(
            `${influencer.instagram_handle} already exists in this mix`
          );
        }else{
          const cam_id = campaignDetails.campaignFirstData[0].id;
          const mixID  = campaignDetails.campaignFirstData[0].mix_id;
          const project_id = campaignDetails.campaignFirstData[0].project_id;
          const infObj = {};
          infObj.campaign_id =  cam_id;
          infObj.assigned_to =  null ;
          infObj.margin =  10; 
          infObj.cpe =  0;
          infObj.est_cost = 0 ;
          infObj.offer_cost =  0;
          infObj.brand_cost =  0;
          infObj.status =   "master";
          infObj.influencer_id = influencer.id;
          infObj.instagram_handle = influencer.instagram_handle;
          infObj.project_id = project_id;

          await addInfluencersInCamp(infObj).then((res)=>{
            toast.success("Influencer Add Successfully");
            const campaign_influencer_id = res.data.campaign_influencer_id;
            getCamInfData(cam_id).then((otherres)=>{
                const latestInfData = otherres.data;
                const  sortedData = latestInfData.sort((a,b)=> a.id - b.id);
                const lastDataSelectInf = sortedData[sortedData.length -1];
                const infObj = {};
                infObj.instagram_handle = lastDataSelectInf.instagram_handle;
                infObj.instagram_profile_pic_url = lastDataSelectInf.instagram_profile_pic_url;
                infObj.name = lastDataSelectInf.name;
                infObj.tier = lastDataSelectInf.tier;
                infObj.content_plan = [];
                infObj.main_inf_data = lastDataSelectInf;
                console.log(infObj);
                dispatch(addInfInCampAndStoreInRedux(infObj));
                dispatch(addMoreInfInCampaign(lastDataSelectInf));
                handleClose();
            }).catch((err)=>{
                console.log("AddInfluencerToCAMpaign" , err);
            })
          }).catch((err)=>{
            toast.error("Something is wrong");
          })
          
        }
         //   const response = await getInfluencerByHandle(influencer.instagram_handle);
      //   if (response.status) {
      //     let newInfluencer = {};
      //     influencerProps.forEach((prop) => {
      //       if (influencer[prop]) {
      //         newInfluencer[prop] = influencer[prop];
      //       }
      //     });
      //     let updatedInfluencer = {
      //       ...newInfluencer,
      //       offer_cost: 0,
      //       status: "master",
      //       content_plan: [],
      //     };
      //     let updatedData = [
      //       ...campaignDetails.data[`campaign_influencer_data`],
      //       updatedInfluencer,
      //     ];
  
      //     const result = await mutateAsync({
      //       campaign_influencer_data: updatedData,
      //       campaign_name: campaignDetails.data.campaign_name,
      //       master_margin: 0,
      //     });
      //     if (result.status.status === "success") {
      //       toast.success("Influencer added to campaign");
      //       dispatch(
      //         getCampaignDetails({
      //           id: pitchInfo.list_link,
      //           email: user.email,
      //         })
      //       );
      //     }
      //     handleClose();
      //   } else {
      //     toast.error("Influencer not found");
      //   }
     
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again");
      }
    }
  
    return (
      <div>
        <Dialog
          BackdropProps={{
            classes: {
              root: classes.backdrop,
            },
          }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.title} id="alert-dialog-title">
            <Grid container justify="flex-end" alignItems="center">
              <Grid item>
                <Tooltip title="Close" placement="left">
                  <IconButton
                    onClick={handleClose}
                    size="small"
                    color="secondary"
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Box textAlign="center">
              <Typography style={{ marginBottom: "1rem", fontSize: "14px" }}>
                Search And Add Influencer
              </Typography>
              <Grid container justify="space-between">
                <Grid item xs={12}>
                  <TextField
                    onChange={handleSearch}
                    className={classes.search}
                    label={
                      pitchInfo.platform === "instagram"
                        ? "Search Influencer by Name, Instagram  Handle"
                        : "Search Influencer by Name"
                    }
                    variant="outlined"
                    size="small"
                    type="text"
                    InputProps={{
                      endAdornment: (
                        <SearchIcon
                          color="primary"
                          style={{ fontSize: "16px" }}
                        />
                      ),
                      style: { fontSize: 11 },
                    }}
                    InputLabelProps={{ style: { fontSize: 11 } }}
                  />
                </Grid>
              </Grid>
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
                <Grid
                  item
                  xs={4}
                  style={{ textAlign: "left" }}
                  className={classes.listHeadItem}
                >
                  Profile
                </Grid>
  
                <Grid item xs={2} className={classes.listHeadItem}>
                  {pitchInfo.platform === "instagram" && "Followers"}
                  {pitchInfo.platform === "youtube" && "Subscribers"}
                </Grid>
                {pitchInfo.platform === "instagram" && (
                  <Grid xs={2} item className={classes.listHeadItem}>
                    Image
                  </Grid>
                )}
                {pitchInfo.platform === "instagram" && (
                  <Grid item xs={2} className={classes.listHeadItem}>
                    Video
                  </Grid>
                )}
                {pitchInfo.platform === "youtube" && (
                  <Grid xs={2} item className={classes.listHeadItem}>
                    Average Views
                  </Grid>
                )}
                {pitchInfo.platform === "youtube" && (
                  <Grid item xs={2} className={classes.listHeadItem}>
                    Average Comments
                  </Grid>
                )}
                <Grid xs={2} item className={classes.listHeadItem}></Grid>
              </Grid>
              {foundInfluencers.map((influencer) => (
                <Grid
                  container
                  alignItems="center"
                  justify="space-between"
                  className={classes.listContainer}
                >
                  <Grid item xs={4} className={classes.listColumn}>
                    <Grid container alignItems="center">
                      <Grid item xs={4}>
                        <img
                          onError={addDefaultUrl}
                          className={classes.img}
                          src={influencer.instagram_profile_pic_url}
                          alt={"profile"}
                        />
                      </Grid>
  
                      <Grid item xs={8}>
                        <Typography
                          className={classes.name}
                          style={{
                            textDecoration: "none",
                            overflowWrap: "break-word",
                          }}
                        >
                          {influencer.name}
                        </Typography>
                        <Link
                          style={{
                            textDecoration: "none",
                            overflowWrap: "break-word",
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                          to={`/discover/${influencer.instagram_handle}`}
                        >
                          <Typography className={classes.handle}>
                            @{influencer.instagram_handle}
                          </Typography>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid style={{ textAlign: "center" }} item xs={2}>
                    {pitchInfo.platform === "instagram" && (
                      <Typography className={classes.entry}>
                        {influencer.instagram_followers &&
                          convertNumberToBMK(influencer.instagram_followers)}
                      </Typography>
                    )}
                    {pitchInfo.platform === "youtube" && (
                      <Typography className={classes.entry}>
                        {influencer.youtube_channel_subscriber_count
                          ? convertNumberToBMK(
                              influencer.youtube_channel_subscriber_count
                            )
                          : 0}
                      </Typography>
                    )}
                  </Grid>
                  <Grid style={{ textAlign: "center" }} item xs={2}>
                    {pitchInfo.platform === "instagram" && (
                      <Typography className={classes.entry}>
                        {influencer.image_engagement &&
                          convertNumberToBMK(influencer.image_engagement)}{" "}
                        /
                        {influencer.image_engagement_rate &&
                          convertNumberToBMK(influencer.image_engagement_rate)}
                      </Typography>
                    )}
  
                    {pitchInfo.platform === "youtube" && (
                      <Typography className={classes.entry}>
                        {influencer.youtube_channel_average_views
                          ? convertNumberToBMK(
                              influencer.youtube_channel_average_views
                            )
                          : 0}
                      </Typography>
                    )}
                  </Grid>
                  <Grid style={{ textAlign: "center" }} item xs={2}>
                    {pitchInfo.platform === "instagram" && (
                      <Typography className={classes.entry}>
                        {influencer.video_engagement &&
                          convertNumberToBMK(influencer.video_engagement)}{" "}
                        /
                        {influencer.video_engagement_rate &&
                          convertNumberToBMK(influencer.video_engagement_rate)}
                      </Typography>
                    )}
                    {pitchInfo.platform === "youtube" && (
                      <Typography className={classes.entry}>
                        {influencer.youtube_channel_average_comments
                          ? convertNumberToBMK(
                              influencer.youtube_channel_average_comments
                            )
                          : 0}
                      </Typography>
                    )}
                  </Grid>
                  <Grid style={{ textAlign: "center" }} item xs={2}>
                    <Button
                      onClick={() => addToMix(influencer)}
                      variant="text"
                      color="primary"
                      className={classes.button}
                    >
                      Add to mix
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </DialogContent>
          <DialogActions
            style={{ paddingRight: "1.5rem", paddingBottom: "1rem" }}
          >
            <Grid container justify="flex-end" alignItems="center">
              <Grid item>
                <Button
                  className={classes.button}
                  onClick={handleClose}
                  color="secondary"
                  size="small"
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  