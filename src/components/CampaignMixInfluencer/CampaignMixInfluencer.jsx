import React, { useState } from "react";

import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CatImg from "../../assets/cat.jpg";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AssignContentCampaignOneBox from "../AssignContentCampaignOneBox/AssignContentCampaignOneBox";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import InfluencerRatingBox from "../InfluencerRatingBox/InfluencerRatingBox";
import { useDispatch, useSelector } from "react-redux";

import { HighlightOffOutlined } from "@material-ui/icons";
import { removeInfluencerFromCampaignMix } from "../../redux/campaignSlice";

import { ReactComponent as Image } from "../../assets/image.svg";
import { ReactComponent as Video } from "../../assets/video.svg";
import { ReactComponent as Carousel } from "../../assets/carousel.svg";
import { ReactComponent as Reels } from "../../assets/reels.svg";
import { ReactComponent as IGTV } from "../../assets/igtv.svg";
import { ReactComponent as StaticStory } from "../../assets/story.svg";
import { ReactComponent as VideoStory } from "../../assets/video_story.svg";
import {
  removeCampaignInfluencerContent,
  updateCampaignContentValues,
  updateCampaignValues,
} from "../../redux/campaignSlice";
import CloseIcon from "@material-ui/icons/Close";
import InfluencerNotesModal from "../InfluencerNotesModal/InfluencerNotesModal";
import { Autocomplete } from "@material-ui/lab";
import { deleteCamInfluencer, getInfluencerListMix } from '../../new_api/api';
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "80%",
  },
  inputNote: {
    width: "100%",
  },
  inputProfile: {
    width: "90%",
  },
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
  },
  buttonRate: {
    fontSize: "10px",
    lineHeight: 1.6,
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
    height: "80px",
    width: "80px",
    borderRadius: "3px",
    marginRight: "17px",
  },
  name: {
    letterSpacing: "-0.04px",
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#2e75bb",
  },

  tier: {
    textAlign: "center",
    boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.07)",
    padding: "4px 10px",
    borderRadius: "15px",
    border: "solid 1px #facd34",
    backgroundColor: "#ffcc33",
    fontSize: "10px",
    lineHeight: 1.6,
    color: "#463809",
    display: "inline-block",
    marginTop: "9px",
    marginBottom: "14px",
    marginRight: "10px",
  },
  option: {
    fontSize: "11px",
  },
  background: {
    borderRadius: "3px",
    backgroundColor: "#ededed",
    padding: "5px 6px",
  },
  inputModal: {
    backgroundColor: "#fff",
  },
  autocomplete: {
    width: "100%",
    background: "#fff",
    "& label": {
      fontSize: "11px",
    },
    "& fieldset": {
      fontSize: "11px",
    },
  },
  control: {
    "& span": {
      fontSize: "11px",
      lineHeight: 1.5,
    },
  },

  options: {
    fontSize: "11px",
    width: "inherit",
    wordBreak: "break-all",
  },
}));

export default function CampaignMixInfluencer({
  rating,
  influencer,
  room,
  handleInput,
  handleBlur,
  handleSelect,
  handleBlurSelect,
  handleRemoveContent,
  handleRemoveInfluencer,
  campInfId
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mutateAsync: delInfCam, isLoading: delInfCamLoading } = useMutation(deleteCamInfluencer);
  const users = useSelector((state) => state.allUsersData.users);
  const status = useSelector((state) => state.allUsersData.status);
  const addDefaultUrl = (e) => {
    e.target.src = CatImg;
  };
  const campaignDetails = useSelector(
    (state) => state.campaignData.campaignDetails
  );
  const [mixInfId, setMixInfId] = useState(null)
  const [open, setOpen] = React.useState(false);
  const tiers = useSelector((state) => state.tierData.tiers);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getMixInfluencerId = async (mix_id_value) => {
    const influencerData = await getInfluencerListMix(mix_id_value)
    setMixInfId(influencerData.data[0].id);
  }


  const [ratingOpen, setRatingOpen] = React.useState(false);
  const handleClickRatingOpen = () => {
    setRatingOpen(true);
  };
  const handleRatingClose = () => {
    setRatingOpen(false);
  };
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);


  const [openNotes, setOpenNotes] = React.useState(false);
  const handleClickOpenNotes = () => {
    setOpenNotes(true);
    getMixInfluencerId(campaignDetails.campaignFirstData[0].mix_id)
  };
  const handleCloseNotes = () => {
    setOpenNotes(false);
  };

  const getListManagers = () => {
    //return [campaignDetails.data.campaign_manager,...campaignDetails.data.team_members,];
    return ["Nishant", "Satyam"];
  };

  function adminUsers() {
    if (status === "success") {
      return users.map((user) => {
        return `${user.username} (${user.email})`;
      });
    }
    return [];
  }
  /** return the internal lead user id */
  function internalLead(InternalLeadId) {
    if (InternalLeadId) {
      let start = InternalLeadId.indexOf("(");
      let end = InternalLeadId.indexOf(")");
      let emailId = InternalLeadId.slice(start + 1, end);
      const getUserEmailObject = users.find((uidData) => uidData.email === emailId);
      return getUserEmailObject.id;
    }
  }

  /** Find email address By UserID */
  function getEmailId(uid) {
    if (uid === null) {
      return;
    }
    const fIndE = users.find((e) => e.id === uid);
    return fIndE.email;
  }

  const checkStarRatingDisabled = () => {
    //return campaignDetails.status.includes(influencer.instagram_handle);
    return false;
  };

  const handleRemoveInfluencerFromCampaign = async (instagram_handle, mixInfluencerId, campaignId) => {
    const confirmation = window.confirm(
      `Click 'Ok' to remove @${instagram_handle} from this campaign.`
    );
    if (!confirmation) {
      return;
    }

    handleRemoveInfluencer(instagram_handle, 0);
    dispatch(
      removeInfluencerFromCampaignMix({
        instagram_handle,
      })
    );
    //  const filtered = campaignDetails.data.campaign_influencer_data.filter(
    //    (inf) => inf.instagram_handle !== instagram_handle
    //  );

    delInfCam({ camId: campaignId, camInfId: mixInfluencerId }).then((ans) => {
      toast.success("Influencer delete successfully In Campaign");
    }).catch((err) => { toast.error("Something is Wrong in delting influencers") })

    // const res = await mutateAsyncUpdateCampaign({
    //   campaign_name: campaignDetails.data.campaign_name,
    //   campaign_influencer_data: filtered,
    //   master_margin: 0,
    // });
    // if (res.status.status === "success") {
    //   toast.success("Influencer removed");
    //   dispatch(
    //     getCampaignDetails({
    //       id: pitchInfo.list_link,
    //       email: user.email,
    //     })
    //   );
    // } else {
    //   toast.error("Something went wrong. Please try again");
    // }
  };

  //get estimate and brand cost
  const est_brand_cost = (influencer, type, margin = 10) => {
    if (type === "est") {
      if (influencer.content_plan.length > 0) {
        const data = influencer.content_plan;
        const cost = data.map((d) => parseInt(d.num_posts) * parseInt(d.price));
        const total = cost.reduce((a, b) => a + b, 0);
        return Math.round(total);
      } else {
        return 0;
      }
    }
    if (type === "brand_cost") {
      if (influencer.content_plan.length > 0) {
        const data = influencer.content_plan;
        const cost = data.map((d) => parseInt(d.num_posts) * parseInt(d.price));
        const total = cost.reduce((a, b) => a + b, 0);
        return Math.round(total + (total * margin) / 100);
      } else {
        return 0;
      }
    }
  }

  return (
    <>
      <Box marginTop="22px">
        <Grid
          container
          alignItems="center"
          className={classes.listContainer}
          justify="space-between"
        >
          <Grid item xs={3} className={classes.listColumn}>
            <Grid container>
              <Grid item xs={4} lg={4}>
                <img
                  onError={addDefaultUrl}
                  className={classes.img}
                  src={influencer.instagram_profile_pic_url}
                  alt={"profile"}
                />
              </Grid>
              <Grid item xs={7} lg={7}>
                <Box display="flex" alignItems="center">
                  <Link
                    style={{
                      textDecoration: "none",
                      overflowWrap: "break-word",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    to={`/discover/${influencer.instagram_handle}`}
                  >
                    <Typography className={classes.name}>
                      {influencer.name}
                    </Typography>
                  </Link>
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize={"small"} color="primary" />
                  </IconButton>
                  <Tooltip title="Remove influencer from the mix">
                    <IconButton
                      size="small"
                      style={{ marginLeft: "6px" }}
                      onClick={() =>
                        handleRemoveInfluencerFromCampaign(
                          influencer.instagram_handle,
                          influencer.main_inf_data.id,
                          influencer.main_inf_data.campaign_id
                        )
                      }
                    >
                      <HighlightOffOutlined
                        fontSize="small"
                        color="secondary"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center">
                  {influencer.tier === 0 ||
                    influencer.tier === null ||
                    influencer.tier === undefined ? (
                    <Box padding="7px 0" marginBottom="14px"></Box>
                  ) : (
                    <Typography className={classes.tier}>
                      {tiers[influencer.tier - 1].tier}
                    </Typography>
                  )}
                  {rating && (
                    <Box position="relative" padding="7px 0">
                      <Button
                        disabled={checkStarRatingDisabled()}
                        onClick={handleClickRatingOpen}
                        disableRipple
                        className={classes.buttonRate}
                        size="small"
                        color="primary"
                        startIcon={<StarOutlineIcon />}
                      >
                        Rate Me
                      </Button>
                      {/* {ratingOpen && (
                        <InfluencerRatingBox
                          instagram_handle={influencer.instagram_handle}
                          campaign_id={campaignDetails.data.campaign_name}
                          open={ratingOpen}
                          handleClose={handleRatingClose}
                        />
                      )} */}
                    </Box>
                  )}
                </Box>
                <Box width="100%">
                  <Autocomplete
                    value={influencer.main_inf_data.assigned_to ? getEmailId(influencer.main_inf_data.assigned_to) : ""}
                    // onBlur={(e) =>
                    //   handleBlurSelect( e, "list_poc", e.target.value, 0, influencer.instagram_handle )
                    // }
                    onChange={(e, value) => {
                      //handleSelect(e , "list_poc" , value , 0 , influencer.instagram_handle );
                      dispatch(
                        updateCampaignValues({ name: "assigned_to", value: internalLead(value), instagram_handle: influencer.instagram_handle, })
                      );
                    }}
                    name="assigned_to"
                    classes={{
                      option: classes.options,
                      input: classes.options,
                    }}
                    className={classes.autocomplete}
                    size="small"
                    id={`mix-${0}-${influencer.instagram_handle}-list_poc`}
                    options={
                      // getListManagers()
                      adminUsers()
                    }
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Assign"
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} className={classes.listColumn}>
            {influencer.content_plan && influencer.content_plan.length !== 0 && (
              <Grid container>
                {influencer.content_plan.map((plan, i) => (
                  <Grid key={plan.content_type + i} item style={{ padding: "4px 5px" }}>
                    <Box key={plan.content_type + i} className={classes.background}>
                      <Grid
                        container
                        alignItems="center"
                        justify="space-around"
                      >
                        <Grid
                          item
                          xs={1}
                          style={{
                            display: "flex",
                            justifyItems: "center",
                            alignItems: "center",
                          }}
                        >
                          {plan.content_type === "image" && (
                            <Tooltip title="Image">
                              <Image />
                            </Tooltip>
                          )}
                          {plan.content_type === "video" && (
                            <Tooltip title="Video">
                              <Video />
                            </Tooltip>
                          )}
                          {plan.content_type === "carousel" && (
                            <Tooltip title="Carousel">
                              <Carousel />
                            </Tooltip>
                          )}
                          {plan.content_type === "igtv" && (
                            <Tooltip title="IGTV">
                              <IGTV />
                            </Tooltip>
                          )}
                          {plan.content_type === "static_story" && (
                            <Tooltip title="Static Story">
                              <StaticStory />
                            </Tooltip>
                          )}
                          {plan.content_type === "video_story" && (
                            <Tooltip title="Video Story">
                              <VideoStory />
                            </Tooltip>
                          )}
                          {plan.content_type === "reels" && (
                            <Tooltip title="Reels">
                              <Reels />
                            </Tooltip>
                          )}
                          {plan.content_type === "integrated_video" && (
                            <Tooltip title="Integrated Video">
                              <Video />
                            </Tooltip>
                          )}
                          {plan.content_type === "dedicated_video" && (
                            <Tooltip title="Dedicated Video">
                              <Reels />
                            </Tooltip>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            name="num_posts"
                            //onBlur={(e) =>  handleBlur( e, plan.type, 0, influencer.instagram_handle )}
                            id={`mix-${0}-${influencer.instagram_handle
                              }-pieces-${plan.content_type}`}
                            onChange={(e) => {
                              //  handleInput( e,  plan.type,  0,  influencer.instagram_handle );
                              dispatch(
                                updateCampaignContentValues({
                                  type: plan.content_type,
                                  name: e.target.name,
                                  value: e.target.value,
                                  instagram_handle: influencer.instagram_handle,
                                  campaign_influencer_id: plan.campaign_influencer_id,
                                  campaign_influencer_content_id: plan.id
                                })
                              );
                            }}
                            className={classes.inputModal}
                            variant="outlined"
                            size="small"
                            type="number"
                            InputProps={{
                              style: { fontSize: 10 },
                            }}
                            InputLabelProps={{ style: { fontSize: 10 } }}
                            label="Qty"
                            value={plan.num_posts}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            name="price"
                            id={`mix-${0}-${influencer.instagram_handle
                              }-final_pricing-${plan.content_type}`}
                            //onBlur={(e) => handleBlur(  e,  plan.type,  0,  influencer.instagram_handle )}
                            onChange={(e) => {
                              //  handleInput( e, plan.type,  0, influencer.instagram_handle );
                              dispatch(
                                updateCampaignContentValues({
                                  type: plan.content_type,
                                  name: e.target.name,
                                  value: e.target.value,
                                  instagram_handle: influencer.instagram_handle,
                                  campaign_influencer_id: plan.campaign_influencer_id,
                                  campaign_influencer_content_id: plan.id
                                })
                              );
                            }}
                            className={classes.inputModal}
                            variant="outlined"
                            size="small"
                            type="number"
                            InputProps={{
                              style: { fontSize: 10 },
                            }}
                            InputLabelProps={{ style: { fontSize: 10 } }}
                            label="Amount"
                            value={plan.price}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Tooltip title="Remove Content">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                //  handleRemoveContent( plan.type, influencer.instagram_handle, 0 );
                                dispatch(
                                  removeCampaignInfluencerContent({
                                    type: plan.content_type,
                                    instagram_handle: influencer.instagram_handle,
                                    campaign_influencer_id: plan.campaign_influencer_id,
                                    campaign_influencer_content_id: plan.id
                                  })
                                );
                              }}
                            >
                              <CloseIcon
                                fontSize="small"
                                style={{ fontSize: "14px" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
            <Button
              className={classes.button}
              color="primary"
              endIcon={<AddCircleIcon color="primary" />}
              onClick={handleClickOpen}
            >
              Add
            </Button>
            {open && (
              <Box position="relative">
                <AssignContentCampaignOneBox
                  room={room}
                  open={open}
                  handleClose={handleClose}
                  instagram_handle={influencer.instagram_handle}
                  mixNumber={0}
                  infMixData={influencer.main_inf_data}
                />
              </Box>
            )}
          </Grid>
          {pitchInfo.platform === "instagram" && (
            <Grid
              xs={1}
              style={{ textAlign: "center" }}
              item
              className={classes.listColumn}
            >
              <Typography variant="caption" className={classes.testDark}>
                {
                  //influencer.main_inf_data.est_cost
                  influencer.content_plan.length !== 0 ? est_brand_cost(influencer, "est") : 0
                }

              </Typography>
            </Grid>
          )}
          <Grid xs={1} item className={classes.listColumn}>
            <TextField
              id={`mix-${0}-${influencer.instagram_handle}-offer_cost`}
              className={classes.input}
              label="Offer"
              variant="outlined"
              size="small"
              type="number"
              name="offer_cost"
              //onBlur={(e) =>
              //  handleBlur(e, null, 0, influencer.instagram_handle)
              //}
              onChange={(e) => {
                // handleInput(e, null, 0, influencer.instagram_handle);
                dispatch(
                  updateCampaignValues({
                    name: e.target.name,
                    value: e.target.value,
                    instagram_handle: influencer.instagram_handle,
                  })
                );
              }}
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
              value={influencer.main_inf_data.offer_cost}
            />
          </Grid>
          <Grid xs={1} item className={classes.listColumn}>
            <Typography variant="caption" className={classes.testDark}>
              {influencer.main_inf_data.cpe}
            </Typography>
          </Grid>
          <Grid xs={1} item className={classes.listColumn}>
            <TextField
              id={`mix-${0}-${influencer.instagram_handle}-brand_cost`}
              className={classes.input}
              label="Brand Cost"
              variant="outlined"
              size="small"
              type="number"
              //  onBlur={(e) => handleBlur(e, null, 0, influencer.instagram_handle)}
              onChange={(e) => {
                //  handleInput(e, null, 0, influencer.instagram_handle);
                dispatch(
                  updateCampaignValues({
                    name: e.target.name,
                    value: e.target.value,
                    instagram_handle: influencer.instagram_handle,
                  })
                );
              }}
              name="brand_cost"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
              value={influencer.main_inf_data.brand_cost}
            />
          </Grid>
          <Grid xs={2} item className={classes.listColumn}>
            <Autocomplete
              value={influencer.main_inf_data.status ? influencer.main_inf_data.status : null}
              //onBlur={(e) =>handleBlurSelect( e, "status", e.target.value, 0, influencer.instagram_handle ) }
              onChange={(e, value) => {
                //handleSelect(e,"status",value,0,influencer.instagram_handle);
                dispatch(
                  updateCampaignValues({
                    name: "status",
                    value,
                    instagram_handle: influencer.instagram_handle,
                  })
                );
              }}
              name="status"
              classes={{
                option: classes.options,
                input: classes.options,
              }}
              className={classes.autocomplete}
              size="small"
              id={`mix-${0}-${influencer.instagram_handle}-status`}
              options={["master", "contacted", "accepted", "rejected"]}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  className={classes.input}
                  size="small"
                  {...params}
                  variant="outlined"
                  label="Status"
                />
              )}
            />
          </Grid>
          <Grid xs={1} item className={classes.listColumn}>
            <Button
              onClick={handleClickOpenNotes}
              variant="text"
              color="primary"
              className={classes.button}
            >
              View Notes
            </Button>
          </Grid>
        </Grid>
      </Box>
      {openNotes && (
        <InfluencerNotesModal
          instagram_handle={influencer.instagram_handle}
          source_name={pitchInfo.list_link}
          open={openNotes}
          handleClose={handleCloseNotes}
          name={influencer.name}
          mixName={"Mix"}
          campaignName={pitchInfo.campaign_given_name}
          source_type={
            campaignDetails.data.chosen_data_list_id ? "list" : "campaign"
          }
          mix_number={
            parseInt(campaignDetails.campaignFirstData[0].mix_id)
          }
          // source_name={pitchInfo.list_link}
          // open={openNotes}
          // handleClose={handleCloseNotes}
          // name={influencer.name}
          // mixName={mixDetails[mixNumber - 1].mix_name}
          // campaignName={pitchInfo.campaign_given_name}
          // source_type="list"
          // mix_number={influencer.mixdata.mix_id}
          project_id={pitchInfo.project_id}
          mix_influencer_id={mixInfId}
        />
      )}
    </>
  );
}
