import React, { useState } from "react";
import TabPanel from "../TabPanel/TabPanel";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";

import GetAppIcon from "@material-ui/icons/GetApp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CampaignMixInfluencer from "../CampaignMixInfluencer/CampaignMixInfluencer";
import { useSelector } from "react-redux";
import { AddCircleOutline } from "@material-ui/icons";
import CampaignMixStats from "../CampaignMixStats/CampaignMixStats";
import AssignContentCampaignAllBox from "../AssignContentCampaignAllBox/AssignContentCampaignAllBox";
import { useEffect } from "react";
import { getCampaignMixCsv, getYoutubeCampaignMixCsv } from "../../api";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import store from "../../redux/store";
import AddInfluencerToCampaign from "../AddInfluencerToCampaign/AddInfluencerToCampaign";
import {
  addContentToCampaignAllInfluencers,
  addContentToCampaignOneInfluencer,
  removeCampaignInfluencerContent,
  synchronizeCampaignMixData,
  updateCampaignContentValues,
  updateCampaignValues,
  removeInfluencerFromCampaignMix,
} from "../../redux/campaignSlice";
import {
  disconnectSocket,
  initiateSocket,
  removeContent,
  sendMessage,
  subscribeToAddContent,
  subscribeToAddContentAll,
  subscribeToChanges,
  subscribeToRemoveContent,
  subscribeToSync,
  subscribeToUpdate,
  subscribeToRemoveInfluencer,
  syncData,
  updateData,
  removeInfluencer,
} from "../../socket";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
  },
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
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
  },
}));

export default function CampaignMixContainer({ value, index, showInfD, camInfStatus, status, camIdGet }) {
  const { id } = useParams();
  const classes = useStyles();
  const [room, setRoom] = useState(`mix_campaign_${id}`);

  const [open, setOpen] = React.useState(false);
  const [campInfIds, setCampInfIds] = React.useState([]);
  const user = useSelector((state) => state.userData.user);
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  //const camInfStatus =  useSelector((state) => state.campaignData.camInfStatus);
  //const status = useSelector((state) => state.campaignData.status);
  const dispatch = useDispatch();
  const campaignDetails = useSelector(
    (state) => state.campaignData.campaignDetails
  );
  const [openAddInfluencer, setOpenAddInfluencer] = React.useState(false);
  const {
    mutateAsync: mutateAsyncDownloadCsv,
    isLoading: isLoadingDownloadCsv,
  } = useMutation(getCampaignMixCsv);

  const {
    mutateAsync: mutateAsyncYoutubeDownloadCsv,
    isLoading: isLoadingYoutubeDownloadCsv,
  } = useMutation(getYoutubeCampaignMixCsv);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  useEffect(() => {
    if (showInfD && camInfStatus) {
      if (camIdGet) {
        setFilteredInfluencers(campaignDetails.data.campaign_influencer_data);
      }
    }

  }, [showInfD, camInfStatus, camIdGet]);


  const handleClickOpenAddInfluencer = () => {
    setOpenAddInfluencer(true);
  };
  const handleCloseAddInfluencer = () => {
    setOpenAddInfluencer(false);
  };

  useEffect(() => {
    if (searchQuery.length !== 0) {
      let getCamInfData = campaignDetails.data;
      if (getCamInfData && Object.keys(getCamInfData).length !== 0 ||
        Object.keys(getCamInfData.campaign_influencer_data).length !== 0) {
        let newInfluencers = campaignDetails.data.campaign_influencer_data.filter(
          (influencer) =>
            influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            influencer.instagram_handle
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
        return setFilteredInfluencers(newInfluencers);
      } else {
        console.log("CampaignMixContainer", searchQuery);
      }

    } else {
      setFilteredInfluencers(campaignDetails.data.campaign_influencer_data);
    }
  },
    [searchQuery, campaignDetails.data.campaign_influencer_data]
  );

  //download campaign mix csv
  const downloadCampaignMixCsv = async () => {
    try {
      if (pitchInfo.type_of_campaign[0] === "youtube") {
        const response = await mutateAsyncYoutubeDownloadCsv({
          campaign_name: campaignDetails.data.campaign_name,
        });
        if (response) {
          return window.location.replace(response);
        }
      } else {
        const response = await mutateAsyncDownloadCsv({
          campaign_name: campaignDetails.data.campaign_name,
        });
        if (response) {
          return window.location.replace(response);
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  useEffect(() => {
    if (room && value === 0) {
      initiateSocket(room);
      syncData(room, "sender");
    }

    subscribeToSync((err, data) => {
      if (err) return;
      const mixData =
        store.getState().campaignData.campaignDetails.data[
        `campaign_influencer_data`
        ];
      updateData(room, mixData);
    });

    subscribeToUpdate((err, data) => {
      if (err) return;
      toast.success("Recieved updated data");
      dispatch(synchronizeCampaignMixData({ data }));
    });

    subscribeToChanges((err, data) => {
      if (err) return;
      let elem = document.getElementById(data.elem_id);
      if (elem) {
        if (data.name) {
          if (data.name === "pieces" || data.name === "final_pricing") {
            dispatch(
              updateCampaignContentValues({
                type: data.type,
                name: data.name,
                value: data.value,
                instagram_handle: data.instagram_handle,
              })
            );
          } else {
            dispatch(
              updateCampaignValues({
                name: data.name,
                value: data.value,
                instagram_handle: data.instagram_handle,
              })
            );
          }
        }

        elem.disabled = data.isFocus;
        if (data.isFocus) {
          elem.parentElement.style.border = "2px solid red";
          elem.parentElement.style.borderRadius = "6px";
          elem.setAttribute("title", `${data.user_name} is typing...`);
        } else {
          elem.parentElement.style.border = "none";
          elem.parentElement.style.borderRadius = "";
          elem.setAttribute("title", "");
        }
      }
    });
    subscribeToAddContent((err, data) => {
      if (err) return;
      dispatch(
        addContentToCampaignOneInfluencer({
          content: data.content,
          instagram_handle: data.instagram_handle,
        })
      );
    });

    subscribeToAddContentAll((err, data) => {
      if (err) return;
      dispatch(
        addContentToCampaignAllInfluencers({
          content: data.content,
        })
      );
    });

    subscribeToRemoveContent((err, data) => {
      if (err) return;
      dispatch(
        removeCampaignInfluencerContent({
          type: data.type,
          mixNumber: data.mixNumber,
          instagram_handle: data.instagram_handle,
        })
      );
    });
    subscribeToRemoveInfluencer((err, data) => {
      if (err) return;
      dispatch(
        removeInfluencerFromCampaignMix({
          instagram_handle: data.instagram_handle,
        })
      );
    });

    return () => {
      disconnectSocket();
    };
  }, [dispatch, value]);

  const handleInput = (e, type, mixNumber, instagram_handle) => {
    sendMessage(room, {
      elem_id: e.target.id,
      name: e.target.name,
      value: e.target.value,
      isFocus: true,
      room_name: room,
      instagram_handle: instagram_handle,
      type: type,
      user_name: user.name,
    });
  };

  const handleBlur = (e, type, mixNumber, instagram_handle) => {
    sendMessage(room, {
      elem_id: e.target.id,
      value: e.target.value,
      isFocus: false,
      instagram_handle: instagram_handle,
      room_name: room,
      type,
      user_name: user.name,
    });
  };

  const handleSelect = (e, name, value, mixNumber, instagram_handle) => {
    sendMessage(room, {
      elem_id: `mix-${mixNumber}-${instagram_handle}-${name}`,
      name: name,
      value: value,
      isFocus: true,
      room_name: room,
      instagram_handle: instagram_handle,
      user_name: user.name,
    });
  };
  const handleBlurSelect = (e, name, value, mixNumber, instagram_handle) => {
    sendMessage(room, {
      elem_id: `mix-${mixNumber}-${instagram_handle}-${name}`,
      isFocus: false,
      instagram_handle: instagram_handle,
      room_name: room,
      user_name: user.name,
    });
  };

  const handleRemoveContent = (type, instagram_handle, mixNumber) => {
    removeContent(room, {
      mixNumber,
      type,
      instagram_handle,
      user_name: user.name,
    });
  };

  const handleRemoveInfluencer = (instagram_handle, mixNumber) => {
    removeInfluencer(room, {
      mixNumber,
      instagram_handle,
      user_name: user.name,
      room_name: room,
    });
  };

  return (
    <>
      {value === 0 && <CampaignMixStats />}
      <TabPanel value={value} index={index} pad={"0px"}>
        <Box style={{ overflowX: "scroll" }}>
          <Box style={{ minWidth: "1400px" }}>
            <Grid
              style={{ marginTop: "23px" }}
              container
              alignItems="center"
              justify="space-between"
            >
              <Grid item xs={10}>
                <Grid container alignItems="center">
                  <Grid item xs={9}>
                    <TextField
                      value={searchQuery}
                      className={classes.input}
                      label="Search Influencer by Name, Instagram  Handle"
                      variant="outlined"
                      size="small"
                      type="text"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        style: { fontSize: 11 },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 11 },
                      }}
                    />
                  </Grid>
                  {/* <Grid item>
                <Button
                  className={classes.button}
                  color="primary"
                  startIcon={<ShareIcon color="primary" />}
                >
                  Share
                </Button>
              </Grid> */}
                  <Grid item>
                    <Button
                      onClick={downloadCampaignMixCsv}
                      className={classes.button}
                      color="primary"
                      startIcon={<GetAppIcon color="primary" />}
                    >
                      Download{" "}
                      {(isLoadingDownloadCsv ||
                        isLoadingYoutubeDownloadCsv) && (
                          <CircularProgress
                            color="primary"
                            style={{ marginLeft: "0.3rem" }}
                            size={13}
                          />
                        )}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleClickOpenAddInfluencer}
                      className={classes.button}
                      color="primary"
                      startIcon={<AddCircleOutline color="primary" />}
                    >
                      Add Influencer
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item>
            <IconButton size="small">
              <FilterListIcon color="primary" />
            </IconButton>
          </Grid> */
              }
            </Grid>
            <Box marginTop="23px">
              <Grid
                container
                justify="space-around"
                alignItems="center"
                className={classes.listHeader}
              >
                <Grid item xs={3} className={classes.listHeadItem}>
                  Profile
                </Grid>
                <Grid item xs={2} className={classes.listHeadItem}>
                  Assign Content{" "}
                  <IconButton size="small" onClick={handleClickOpen}>
                    <AddCircleIcon fontSize="small" color="primary" />
                  </IconButton>
                  {open && (
                    <Box position="relative">
                      <AssignContentCampaignAllBox
                        handleClose={handleClose}
                        open={open}
                        room={room}
                      />
                    </Box>
                  )}
                </Grid>
                {//pitchInfo.type_of_campaign[0] === "instagram" && (
                  pitchInfo.platform === "instagram" && (
                    <Grid
                      xs={1}
                      style={{ textAlign: "center" }}
                      item
                      className={classes.listHeadItem}
                    >
                      Est.
                    </Grid>
                  )}
                <Grid xs={1} item className={classes.listHeadItem}>
                  Offer
                  {/* <IconButton size="small">
                <AddCircleIcon fontSize="small" color="primary" />
              </IconButton> */}
                </Grid>
                <Grid xs={1} item className={classes.listHeadItem}>
                  {//pitchInfo.type_of_campaign[0] === "instagram" && "CPE"
                    pitchInfo.platform === "instagram" && "CPE"
                  }
                  {//pitchInfo.type_of_campaign[0] === "youtube" && "CPV"
                    pitchInfo.platform === "youtube" && "CPV"
                  }
                </Grid>
                <Grid xs={1} item className={classes.listHeadItem}>
                  Brand Cost
                  {/* <IconButton size="small">
                <AddCircleIcon fontSize="small" color="primary" />
              </IconButton> */}
                </Grid>
                <Grid xs={2} item className={classes.listHeadItem}>
                  Status
                </Grid>
                <Grid xs={1} item className={classes.listHeadItem}>
                  Notes
                </Grid>
              </Grid>
            </Box>
            {showInfD && camIdGet && filteredInfluencers.map((influencer) => (
              <CampaignMixInfluencer
                rating={true}
                influencer={influencer}
                room={room}
                handleInput={handleInput}
                handleBlur={handleBlur}
                handleSelect={handleSelect}
                handleBlurSelect={handleBlurSelect}
                handleRemoveContent={handleRemoveContent}
                handleRemoveInfluencer={handleRemoveInfluencer}
                campInfId={""}
              />
            ))}
          </Box>
        </Box>
      </TabPanel>
      {openAddInfluencer && (
        <AddInfluencerToCampaign
          open={openAddInfluencer}
          handleClose={handleCloseAddInfluencer}
        />
      )}
    </>
  );
}
