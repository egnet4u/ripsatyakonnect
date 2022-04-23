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
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MixInfluencer from "../MixInfluencer/MixInfluencer";
import MixStats from "../MixStats/MixStats";
import AssignContentAllBox from "../AssignContentAllBox/AssignContentAllBox";
import { useMutation } from "react-query";
import { getListMixCsv, getYoutubeListMixCsv, updateList } from "../../api";
import { deleteMixInList } from "../../new_api/api"
import { getListDetails, getListMixes, mixListData, emptyMixesListDetail, deleteMixesToRedux, emptyMixesDetail, setMixNumber }
  from "../../redux/listMixesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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

export default function ListMixContainer({
  value,//This value use for finding the mix and value is 0 ,1 , 2, 3, 4
  index,//Index value that mean which mix tab open
  influencersData, //This variable store the all influencers list of  mixes
  room,
  handleBlur,
  handleBlurSelect,
  handleInput,
  handleRemoveContent,
  handleSelect,
  handleRemoveInfluencer,
  handleDeleteMix,
  setValue,
}) {
  //console.log("🚀 ~ file: ListMixContainer.jsx ~ line 63 ~ influencersData", influencersData)
  const [searchQuery, setSearchQuery] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();

  const classes = useStyles();
  const { mutateAsync, isLoading } = useMutation(updateList);
  const { mutateAsync: deleteMixFromList, isLoading: isLoadingDeleteMix } = useMutation(deleteMixInList);
  const {
    mutateAsync: mutateAsyncDownloadCsv,
    isLoading: isLoadingDownloadCsv,
  } = useMutation(getListMixCsv);
  const {
    mutateAsync: mutateAsyncYoutubeDownloadCsv,
    isLoading: isLoadingYoutubeDownloadCsv,
  } = useMutation(getYoutubeListMixCsv);
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);

  const [open, setOpen] = React.useState(false);
  //  const listDetails = useSelector((state) => state.listMixesData.listDetails);
  const listDetails = useSelector((state) => state.listMixesData.mixDetails);
  const mixesDetails = useSelector((state) => state.listMixesData.mixDetails);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const queriedInfluencers = (influencersData) => {
    //console.log("ListMixContainerData",influencersData);
    // return influencersData.filter(
    //   (influencer) =>
    //     influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     influencer.instagram_handle
    //       .toLowerCase()
    //       .includes(searchQuery.toLowerCase())
    // ); 
    return influencersData;
  }

  const onDeleteMix = async () => {
    var confirmation = window.confirm(
      `Click 'Ok' to discard ${listDetails[value][`mix_name`]} ${listDetails[value][`id`]} 
      and mix number is ${listDetails[value][`mix_number`]}  .`
    );
    if (!confirmation) {
      return;
    }
    /** Update the list when call this function */
    // const res = await mutateAsync({
    //   master_margin: 10,
    //   [`influencers_data_list_${value + 1}`]: [],
    //   list_name: pitchInfo.list_link,
    // });
    const res = await deleteMixFromList({
      mix_id: listDetails[value][`id`]
    });
    if (res.status) {
      //  handleDeleteMix(value + 1); // use socket
      toast.success("Mix deleted");
      //  dispatch(getListDetails(id));

      //dispatch(getListMixes(pitchInfo.project_id));
      // Delete the mix from redux
      await dispatch(deleteMixesToRedux({ mixNumber: listDetails[value][`mix_number`] })); //delete the influencers data which are used in mixes
      await dispatch(emptyMixesDetail({ mixNumber: listDetails[value][`mix_number`] - 1 })); //delete the mix number from the redux
      await dispatch(emptyMixesListDetail({ mixNumber: listDetails[value][`mix_number`] }))//delete the data from redux of mixess influeencers and mixInfids
      const mixId = listDetails.find((mixDataGet) => mixDataGet.id !== 0);
      const SelDifMixNum = listDetails.find((againFind) => againFind.id !== 0 && againFind.mix_number !== mixId.mix_number)
      dispatch(setMixNumber({ value: SelDifMixNum.mix_number }));
      setValue(SelDifMixNum.mix_number - 1);


      //dispatch(mixListData({mixid:listDetails[0].id,mixnum:listDetails[0].mix_number}))
      //dispatch(mixListData({mixid:listDetails[1].id,mixnum:listDetails[1].mix_number}))
      //dispatch(mixListData({mixid:listDetails[2].id,mixnum:listDetails[2].mix_number}))
      //dispatch(mixListData({mixid:listDetails[3].id,mixnum:listDetails[3].mix_number})) 
      //dispatch(mixListData({mixid:listDetails[4].id,mixnum:listDetails[4].mix_number})) 
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  /** Download mix list  and format is csv */
  const downloadListMixCsv = async () => {
    try {
      if (pitchInfo.platform === "youtube") {
        const response = await mutateAsyncYoutubeDownloadCsv({
          list_name: pitchInfo.list_link,
          mix_number: value + 1,
        });
        if (response) {
          return window.location.replace(response);
        }
      } else {
        const response = await mutateAsyncDownloadCsv({
          list_name: pitchInfo.list_link,
          mix_number: value + 1,
        });
        if (response) {
          return window.location.replace(response);
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };
  console.log("🚀 ~ file: ListMixContainer.jsx ~ line 179 ~ value", value)
  return (
    <>
      {/* Here we are use show the top info header which are show the detail of mix */}

      <MixStats mixNumber={value + 1} />

      <TabPanel value={value} index={index} pad={"0px"}>
        <Box style={{ overflowX: "scroll" }}>
          <Box style={{ minWidth: "1400px" }}>
            <Grid
              container
              style={{ marginTop: "23px" }}
              alignItems="center"
              justify="space-between"
            >
              <Grid item xs={10}>
                <Grid container alignItems="center">
                  <Grid item xs={9}>
                    <TextField
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={classes.input}
                      label="Search Influencer by Name, Instagram  Handle"
                      variant="outlined"
                      size="small"
                      type="text"
                      InputProps={{
                        style: { fontSize: 11 },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 11 },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={onDeleteMix}
                      className={classes.button}
                      color="primary"
                      startIcon={<DeleteIcon color="primary" />}
                    >
                      Delete{" "}
                      {isLoading && (
                        <CircularProgress
                          color="primary"
                          style={{ marginLeft: "0.3rem" }}
                          size={13}
                        />
                      )}
                    </Button>
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
                      onClick={downloadListMixCsv}
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
                </Grid>
              </Grid>
              {/* <Grid item>
            <IconButton size="small">
              <FilterListIcon color="primary" />
            </IconButton>
          </Grid> */}
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
                  Assign Content{/*" "*/}
                  <IconButton size="small" onClick={handleClickOpen}>
                    <AddCircleIcon fontSize="small" color="primary" />
                  </IconButton>
                  {open && (
                    <Box position="relative">
                      <AssignContentAllBox
                        room={room}
                        mixNumber={value + 1}
                        handleClose={handleClose}
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
            {queriedInfluencers(influencersData).map((influencer) => (
              <MixInfluencer
                room={room}
                handleBlur={handleBlur}
                handleRemoveInfluencer={handleRemoveInfluencer}
                handleBlurSelect={handleBlurSelect}
                handleInput={handleInput}
                handleRemoveContent={handleRemoveContent}
                handleSelect={handleSelect}
                key={influencer.instagram_handle}
                influencer={influencer}
                mixNumber={value + 1}
              />
            ))}
          </Box>
        </Box>
      </TabPanel>
    </>
  );
}
