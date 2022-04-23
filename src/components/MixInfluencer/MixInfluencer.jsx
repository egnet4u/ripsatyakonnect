import React, { useEffect } from "react";

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
import AssignContentOneBox from "../AssignContentOneBox/AssignContentOneBox";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { ReactComponent as Image } from "../../assets/image.svg";
import { ReactComponent as Video } from "../../assets/video.svg";
import { ReactComponent as Carousel } from "../../assets/carousel.svg";
import { ReactComponent as Reels } from "../../assets/reels.svg";
import { ReactComponent as IGTV } from "../../assets/igtv.svg";
import { ReactComponent as StaticStory } from "../../assets/story.svg";
import { ReactComponent as VideoStory } from "../../assets/video_story.svg";
import {
  removeInfluencerContent,
  removeInfluencerFromMix,
  updateContentValues,
  updateValues,
} from "../../redux/listMixesSlice";
import CloseIcon from "@material-ui/icons/Close";
import { Autocomplete } from "@material-ui/lab";

import { deleteInfluencerInMix } from '../../new_api/api';
import { HighlightOffOutlined } from "@material-ui/icons";
import InfluencerNotesModal from "../InfluencerNotesModal/InfluencerNotesModal";

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

export default function MixInfluencer({
  //rating,
  influencer,
  mixNumber,
  room,
  handleBlur,
  handleBlurSelect,
  handleInput,
  handleSelect,
  handleRemoveContent,
  handleRemoveInfluencer,
}) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const addDefaultUrl = (e) => { e.target.src = CatImg; };

  ////////////////////////////////////
  /**Select the data from the redux */
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const listDetails = useSelector((state) => state.listMixesData.listDetails);
  const mixDetails = useSelector((state) => state.listMixesData.mixDetails);
  const projectAllUsers = useSelector((state) => state.allUsersData.users);
  const tiers = useSelector((state) => state.tierData.tiers);

  //////////////////////////////////////////////////////////////
  /** Here we are define the state and change the state value */
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openNotes, setOpenNotes] = React.useState(false);
  const handleClickOpenNotes = () => {
    setOpenNotes(true);
  };
  const handleCloseNotes = () => {
    setOpenNotes(false);
  };


  /////////////////////////////////////////////
  /** React Query  are use and call the api  */
  const { mutateAsync: delInfInMix, isLoading: isLoadingInfDelMix } = useMutation(deleteInfluencerInMix);

  /** return the internal lead user id */
  /** And this code copy by teamDetailsBox.jsx at a function that name is internalLead() */
  function convertEmailToId(emailIdOfUser) {
    if (emailIdOfUser) {
      const getUserEmailObject = projectAllUsers.find((uidData) => uidData.email === emailIdOfUser);
      return getUserEmailObject.id;
    }
  }
  /** Convert Id to email address */
  function convertIdToEmail(id) {
    if (id) {
      const getUserIdObject = projectAllUsers.find((uidData) => uidData.id === id);
      return getUserIdObject.email;
    }
  }

  /** Return Array of email id of users */
  const getListManagers = (projectAllUsers) => {
    //return [listDetails.campaign_manager, ...listDetails.team_members];
    return projectAllUsers.map((u) => u.email);
  };


  /** Remove Influencer from mix */
  const handleRemoveInfluencerFromMix = async (instagram_handle, mixNumber, mix_inf_id, mix_id) => {
    const confirmation = window.confirm(
      `Click 'Ok' to remove @${instagram_handle} from ${
      //listDetails[`mix_name_${mixNumber}`]
      mixDetails[mixNumber - 1][`mix_name`]
      } and mix number is ${mixNumber} where influencer id is ${mix_inf_id} and mix id is ${mix_id}.`
    );
    if (!confirmation) {
      return;
    }
    // handleRemoveInfluencer(instagram_handle, mixNumber);
    dispatch(
      removeInfluencerFromMix({
        mixNumber,
        instagram_handle,
      })
    );
    /** We call the api for deletiing a influencers from the server */
    const res = await delInfInMix({
      mix_influencer_id: mix_inf_id
    })
    if (res.status) {
      toast.success("Influencer deleted successfully in the mixes");
    } else {
      toast.error("Something went wrong. Please try again because response not Get");
    }

  };

  //get estimate and brand cost
  const est_brand_cost = (influencer, type, margin = 10) => {
    if (type === "est") {
      if (influencer.content_plan.length > 0) {
        const data = influencer.content_plan;
        const cost = data.map((d) => parseInt(d.num_posts) * parseInt(d.price === "" ? 0 : d.price));
        const total = cost.reduce((a, b) => a + b, 0);
        return Math.round(total);
      } else {
        return 0;
      }
    }
    if (type === "brand_cost") {
      if (influencer.content_plan.length > 0) {
        const data = influencer.content_plan;
        const cost = data.map((d) => parseInt(d.num_posts) * parseInt(d.price === "" ? 0 : d.price));
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
                        handleRemoveInfluencerFromMix(
                          influencer.instagram_handle,
                          mixNumber, influencer.mixdata.id, influencer.mixdata.mix_id
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
                    <Box padding="7px 0" marginBottom="14px">
                      <Typography className={classes.tier}>
                        Nano
                      </Typography>
                    </Box>
                  ) : (
                    <Typography className={classes.tier}>
                      {tiers[influencer.tier].tier}
                    </Typography>
                  )}
                </Box>
                <Box width="100%">
                  {/*Hide by satyam */}
                  <Autocomplete
                    //value={influencer.list_poc ? influencer.list_poc : ""}
                    value={influencer.mixdata.assigned_to ? convertIdToEmail(influencer.mixdata.assigned_to) : ""}
                    //onBlur={(e) =>
                    // handleBlurSelect(
                    //   e,
                    //   "list_poc",
                    //   e.target.value,
                    //   mixNumber,
                    //   influencer.instagram_handle
                    //  )
                    // }
                    onChange={(e, value) => {
                      // handleSelect(
                      //  e,
                      //  "list_poc",
                      //  value,
                      //  mixNumber,
                      //  influencer.instagram_handle
                      // );
                      dispatch(
                        updateValues({
                          //name: "list_poc",
                          name: "assigned_to",
                          value: convertEmailToId(value),
                          mixNumber, mix_inf_id: influencer.mixdata.id,
                          instagram_handle: influencer.instagram_handle,
                        })
                      );
                    }
                    }
                    name="assigned_to"
                    classes={{
                      option: classes.options,
                      input: classes.options,
                    }}
                    className={classes.autocomplete}
                    size="small"
                    id={`mix-${mixNumber}-${influencer.instagram_handle}-list_poc`}
                    options={getListManagers(projectAllUsers)}
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
                            onBlur={(e) =>
                              handleBlur(
                                e,
                                plan.content_type,
                                mixNumber,
                                influencer.instagram_handle
                              )
                            }
                            id={`mix-${mixNumber}-${influencer.instagram_handle}-pieces-${plan.content_type}`}
                            onChange={(e) => {
                              handleInput(
                                e,
                                plan.content_type,
                                mixNumber,
                                influencer.instagram_handle
                              );
                              dispatch(
                                updateContentValues({
                                  type: plan.content_type, name: e.target.name, value: e.target.value,
                                  mixNumber, instagram_handle: influencer.instagram_handle, mix_content_id: plan.id,
                                  mix_inf_id: plan.mix_influencer_id
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
                            id={`mix-${mixNumber}-${influencer.instagram_handle}-final_pricing-${plan.content_type}`}
                            //name="final_pricing"
                            name="price"
                            onBlur={(e) =>
                              handleBlur(
                                e,
                                plan.content_type,
                                mixNumber,
                                influencer.instagram_handle
                              )
                            }
                            onChange={(e) => {
                              handleInput(e, plan.content_type, mixNumber, influencer.instagram_handle);
                              dispatch(
                                updateContentValues({
                                  type: plan.content_type, name: e.target.name, value: e.target.value,
                                  mixNumber, instagram_handle: influencer.instagram_handle, mix_content_id: plan.id,
                                  mix_inf_id: plan.mix_influencer_id,
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

                                //handleRemoveContent(
                                //  plan.content_type,
                                //  influencer.instagram_handle,
                                //  mixNumber 
                                //);
                                dispatch(
                                  removeInfluencerContent({
                                    type: plan.content_type,
                                    mixNumber,
                                    instagram_handle:
                                      influencer.instagram_handle,
                                    mix_content_id: plan.id,
                                    mix_inf_id: plan.mix_influencer_id,
                                    mix_influencer_content_id: plan.id
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
                <AssignContentOneBox
                  room={room}
                  open={open}
                  handleClose={handleClose}
                  instagram_handle={influencer.instagram_handle}
                  mixNumber={mixNumber}
                  influencer={influencer}
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
                {/* {influencer.estimated_cost} */}
                {
                  // influencer.mixdata.est_cost
                  est_brand_cost(influencer, "est")
                }
              </Typography>
            </Grid>
          )}
          <Grid xs={1} item className={classes.listColumn}>
            <TextField
              id={`mix-${mixNumber}-${influencer.instagram_handle}-offer_cost`}
              className={classes.input}
              label="Offer"
              variant="outlined"
              size="small"
              type="number"
              name="offer_cost"
              //onBlur={(e) =>
              //  handleBlur(e, null, mixNumber, influencer.instagram_handle)
              //}
              onChange={(e) => {
                // handleInput(e, null, mixNumber, influencer.instagram_handle);
                dispatch(
                  updateValues({
                    name: e.target.name,
                    value: e.target.value,
                    mixNumber, mix_inf_id: influencer.mixdata.id,
                    instagram_handle: influencer.instagram_handle,
                  })
                );
              }}
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
              value={
                influencer.mixdata.offer_cost

              }
            />
          </Grid>
          <Grid xs={1} item className={classes.listColumn}>
            <Typography variant="caption" className={classes.testDark}>
              {/*influencer.cpe*/}
              {influencer.mixdata.cpe}
            </Typography>
          </Grid>
          <Grid xs={1} item className={classes.listColumn}>
            <TextField
              // onBlur={(e) =>
              //   handleBlur(e, null, mixNumber, influencer.instagram_handle)
              // }
              id={`mix-${mixNumber}-${influencer.instagram_handle}-brand_cost`}
              className={classes.input}
              label="Brand Cost"
              variant="outlined"
              size="small"
              type="number"
              onChange={(e) => {
                // handleInput(e, null, mixNumber, influencer.instagram_handle);
                dispatch(
                  updateValues({
                    name: e.target.name,
                    value: e.target.value,
                    mixNumber, mix_inf_id: influencer.mixdata.id,
                    instagram_handle: influencer.instagram_handle,
                  })
                );
              }}
              name="brand_cost"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
              //value={influencer.brand_cost}
              defaultValue={influencer.mixdata.brand_cost}

            />
          </Grid>
          <Grid xs={2} item className={classes.listColumn}>
            <Autocomplete
              // value={influencer.status ? influencer.status : null}
              value={influencer.mixdata.status ? influencer.mixdata.status : null}

              // onBlur={(e) =>
              //    handleBlurSelect(
              //      e,
              //      "status",
              //      e.target.value,
              //      mixNumber,
              //      influencer.instagram_handle
              //    )
              //  }
              onChange={(e, value) => {
                //  handleSelect(
                //    e,
                //    "status",
                //    value,
                //    mixNumber,
                //    influencer.instagram_handle
                //  );

                dispatch(
                  updateValues({
                    name: "status",
                    value,
                    mixNumber, mix_inf_id: influencer.mixdata.id,
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
              id={`mix-${mixNumber}-${influencer.instagram_handle}-status`}
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
      {////////////////////
        /*  Create a notes */
        /////////////////////
      }
      {openNotes && (
        <InfluencerNotesModal
          instagram_handle={influencer.instagram_handle}
          source_name={pitchInfo.list_link}
          open={openNotes}
          handleClose={handleCloseNotes}
          name={influencer.name}
          mixName={mixDetails[mixNumber - 1].mix_name}
          campaignName={pitchInfo.campaign_given_name}
          source_type="list"
          mix_number={influencer.mixdata.mix_id}
          project_id={pitchInfo.project_id}
          mix_influencer_id={influencer.id}
        />
      )}
    </>
  );
}
