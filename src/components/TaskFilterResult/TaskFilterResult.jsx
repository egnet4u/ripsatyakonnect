import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedInfluencer,
  getAllInfluencerData,
  getFilterResultData,
  resetSelectedMix,
  resetTypeOfList,
  setSelectedMix,
  //getListMixes,
} from "../../redux/filterResultSlice";
import FilteredInfluencer from "../FilteredInfluencer/FilteredInfluencer";
import { useDebounce } from "use-debounce";
import { Box } from "@material-ui/core";
import FilterAddSelectedInfluencerModal from "../FilterAddSelectedInfluencerModal/FilterAddSelectedInfluencerModal";
import { useState } from "react";
import { resetFilters } from "../../redux/filtersSlice";
import { 
  getListMixes , 
  getListDetails , 
  mixListData ,
  addMixInfluencers,emptyMixesOfInf,emptyMixesListDetail  } from "../../redux/listMixesSlice";

const useStyles = makeStyles((theme) => ({
  list: {
    height: `calc(100vh - ${280}px)`,
    padding: "0.3rem 1rem",
    overflowY: "scroll",
  },

  border: {
    marginTop: "3.5px",
    borderBottom: "solid 1px #c7d9e6",
  },
  search: {
    width: "100%",
    margin: "0.5rem 0",
  },

  input: {
    width: "100%",
    margin: "0.5rem 0",
  },
  option: {
    fontSize: "11px",
  },

  adornment: {
    color: "rgba(0, 0, 0, 0.36)",
    fontSize: "10px",
  },
  listHeader: {
    background: "#f5f9fc",
    borderRadius: "6px",
  },
  listHeadItem: {
    fontFamily: "Poppins",
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#414141",
    padding: "10px 0",
  },
  listContent: {
    borderRadius: "6px",
    boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.07)",
    margin: "20px 0",
    padding: "10px 0",
  },
  img: {
    height: "80px",
    width: "80px",
    borderRadius: "3px",
    marginRight: "17px",
    marginLeft: "10px",
  },
  name: {
    letterSpacing: "-0.04px",
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#2e75bb",
  },
  handle: {
    marginTop: "3px",
    marginBottom: "9px",
    letterSpacing: "-0.04px",
    fontSize: "10px",
    lineHeight: 1.6,
    color: "#414141",
  },
  tier: {
    textAlign: "center",
    boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.07)",
    padding: "4px 0",
    borderRadius: "15px",
    border: "solid 1px #facd34",
    backgroundColor: "#ffcc33",
    fontSize: "10px",
    lineHeight: 1.6,
    color: "#463809",
  },
  category: {
    fontSize: "10px",
    lineHeight: 1.3,
    color: "#1d172e",
    padding: "8px 11px",
    borderRadius: "16px",
    backgroundColor: "#ece9f5",
    margin: "0.2rem",
  },
  entry: {
    fontSize: "13px",
    lineHeight: 1.54,
    color: "#414141",
  },
  checkboxContainer: {
    position: "relative",
  },
  checkbox: {
    position: "absolute",
    top: -20,
    left: -10,
  },
  selection: {
    backgroundColor: "#2e75bb",
    borderRadius: "6px",
    padding: "13px",
  },
  button: {
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: 1.5,
    // color: "#2e75bb",
  },
  checkboxLabel: {
    color: "#fff",
    "& span": {
      fontSize: "12px",
      lineHeight: 1.5,
    },
  },
  select: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
  },
  icon: {
    fill: "#fff",
  },
}));

export default function TaskFilterResult({
  setActiveStep,
  setIsInfluencersApi,
  isInfluencersApi,
}) {
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(1);
//  const [addInfluencersFinish , setFinishAddInf] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [cleared, setCleared] = React.useState(false);
  //Select pitch data which are store in redux
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  /** When Select influencer then "selectedInfluencers" state update*/
  const selectedInfluencers = useSelector(
    (state) => state.filterResultData.selectedInfluencers
  );
  

  const [text, setText] = React.useState("");
  /** "useDebounce" code execute after given time */
  const [debounceText] = useDebounce(text, 500);

  const handleSearch = (e) => {
    setIsInfluencersApi(false);
    setText(e.target.value);
  };

  /** "getFilterResultData" get the influencers list and update the state when
   *  we are search the influeencers */
  useEffect(() => {
    if (debounceText) {
      //console.log(debounceText.length);
      dispatch(
        getFilterResultData({
          search_string: debounceText,
         // platforms: pitchInfo.type_of_campaign,
          platforms: pitchInfo.platform,
        })
      );
    }else{
      setIsInfluencersApi(true);
      dispatch(
        getAllInfluencerData({sort:"created_at",page,platforms: "instagram",})
      );
    }
  }, [dispatch, debounceText, /*pitchInfo.type_of_campaign*/pitchInfo.platform  ,page]);
  
  /** All Infulancer Data */
  const influencers = useSelector(
    //(state) => state.filterResultData.influencers
    (state) => state.filterResultData.influencers.influencers
  );
  const loadInfDataStatus  = useSelector((state) => state.filterResultData.status);
  const status = useSelector((state) => state.filterResultData.status);
  const { typeOfList } = useSelector((state) => state.filterResultData);
  const tiers = useSelector((state) => state.tierData.tiers);
  const tierStatus = useSelector((state) => state.tierData.status);
  const selectedMix = useSelector(
    (state) => state.filterResultData.selectedMix
  );
  const listDetails = useSelector((state) => state.listMixesData.listDetails);
  /** Get all mix influencer ids */
  const MixInfIds = useSelector((state) => state.listMixesData.mixListDetails);
  const avlMixList = {"mix_name_1":"Mix 1","mix_name_2":"Mix 2","mix_name_3":"Mix 3",
  "mix_name_4":"Mix 4","mix_name_5":"Mix 5"}
  const avlMixListArray = ["Mix 1","Mix 2","Mix 3","Mix 4","Mix 5"];


  useEffect(() => {
    setIsInfluencersApi(true);
    dispatch(resetSelectedMix());
    dispatch(resetTypeOfList());
    dispatch(
      getAllInfluencerData({
        //sort: "-instagram_followers",
        sort:"created_at",
        page,
        //platforms: JSON.stringify(pitchInfo.type_of_campaign),
        platforms: "instagram",
      })
    );
    
  }, [dispatch, page, setIsInfluencersApi, /*pitchInfo.type_of_campaign*/pitchInfo.platform ]);
  
  /** Here we are use another slice that is "filterSlice" */
  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);
  
  function checkIfAllExists() {
    if (status === "success") {
      return influencers.some((item) => item.exists === false);
    }
  }

  /////////////////////////////////////// First Step ////////////////////////////////////
  /////////// Get the all mixes from the server and store in redux //////////////////////
  const listMixesAvl = useSelector((state) => state.listMixesData.mixDetails);
  const getListMixstatus =  useSelector((state)=>state.listMixesData.getListMixstatus);
  const [insertMixData , setMixInsertData] = useState(false);
  const [insertMixInfData , setInsertMixInfData] = useState(false);
  useEffect(()=>{
    dispatch(getListMixes(pitchInfo.project_id));
  },[dispatch , pitchInfo.project_id])

  ////////////////////////////////////// Second step ////////////////////////////////////
  //////////// Check in mix id in redux if any mix id present then state will change ////
  useEffect(()=>{
    if(getListMixstatus === "success"){
      if(listMixesAvl[0].id === 0 && listMixesAvl[1].id === 0 && listMixesAvl[2].id === 0
      && listMixesAvl[3].id === 0 && listMixesAvl[4].id === 0
      ){
        setMixInsertData(false);
      }else{
        setMixInsertData(true);
      }
    }
    
  },[listMixesAvl, getListMixstatus]);

/////////////////////////////////////// Third step //////////////////////////////////////
////// Get the influencer list by mix id on live server then store in redux /////////////
  useEffect(()=>{
    /** Get the influencers list which ara store in the mixes on live server */
     if(insertMixData){
       dispatch(mixListData({mixid:listMixesAvl[0].id,mixnum:listMixesAvl[0].mix_number}))
       dispatch(mixListData({mixid:listMixesAvl[1].id,mixnum:listMixesAvl[1].mix_number}))
       dispatch(mixListData({mixid:listMixesAvl[2].id,mixnum:listMixesAvl[2].mix_number}))
       dispatch(mixListData({mixid:listMixesAvl[3].id,mixnum:listMixesAvl[3].mix_number})) 
       dispatch(mixListData({mixid:listMixesAvl[4].id,mixnum:listMixesAvl[4].mix_number}))  
       /** When this value true then below another useEffect call it */
       setTimeout(() => {
         setInsertMixInfData(true);
       }, 500);
     }
  },[insertMixData])

 
  ///////////////////////////////////// Fourth Step /////////////////////////////////////
  ////////// Get the influencer details in the influencers data which are store in redux
  ////////// and add mix data then return the data ////////////////////////////////////
  const returnMixInfList = (mixListId , influencers , mixNumber) =>  {
    if (mixListId.length !== 0 && influencers.length !== 0) {
      var inf_data_list = [...mixListId];
      var obj = [];
      for (var i = 0; i < inf_data_list.length; i++) {
        if(inf_data_list[i].userid === mixListId[i].userid){
            var creat_data = {...inf_data_list[i] , mixdata:{...mixListId[i]} ,content_plan:[] };
            obj.push(creat_data);
          }
        }
      const list_Mix_influ = {"data":obj , "mixNum":mixNumber};
      return list_Mix_influ;
   }
   return {"data":[] , "mixNum":mixNumber};
  }

  ////////////////////////////////////////// Fifth Step //////////////////////////////////////
  /////////////////// Here we are add the influencer data in the Redux ///////////////////////
  useEffect(()=>{
     if(insertMixInfData && loadInfDataStatus === "success"){
        const Mix_list_inf_1 = MixInfIds.influencers_data_list_1;//This are store the influencers id
        const Mix_list_inf_2 = MixInfIds.influencers_data_list_2;
        const Mix_list_inf_3 = MixInfIds.influencers_data_list_3;
        const Mix_list_inf_4 = MixInfIds.influencers_data_list_4;
        const Mix_list_inf_5 = MixInfIds.influencers_data_list_5;
        const listMixOne = returnMixInfList(Mix_list_inf_1 ,influencers , 1 );
        const listMixtwo = returnMixInfList(Mix_list_inf_2 ,influencers , 2 );
        const listMixThr = returnMixInfList(Mix_list_inf_3 ,influencers , 3 );
        const listMixFou = returnMixInfList(Mix_list_inf_4 ,influencers , 4 );
        const listMixFiv = returnMixInfList(Mix_list_inf_5 ,influencers , 5 );
        dispatch(addMixInfluencers(listMixOne));
        dispatch(addMixInfluencers(listMixtwo));
        dispatch(addMixInfluencers(listMixThr));
        dispatch(addMixInfluencers(listMixFou));
        dispatch(addMixInfluencers(listMixFiv));
     }
  },[insertMixInfData , MixInfIds ,influencers ,loadInfDataStatus])


  return (
    <>
      <Grid item xs={12} md={9} className={classes.list}>
        <Grid
          container
          justify="space-between"
          style={{
            position: "sticky",
            top: "-10px",
            zIndex: 1000,
            background: "#ffffff",
          }}
        >
          <Grid item xs={9} style={{ paddingRight: "10px" }}>
            {typeOfList !== "handles" && (
              <TextField
                onChange={handleSearch}
                className={classes.search}
                label={
                  // pitchInfo.type_of_campaign[0] === "instagram"
                  //   ? "Search Influencer by Name, Instagram  Handle"
                  //   : "Search Influencer by Name"
                     pitchInfo.platform === "instagram"
                     ? "Search Influencer by Name, Instagram  Handle"
                     : "Search Influencer by Name"
                  
                }
                variant="outlined"
                size="small"
                type="text"
                InputProps={{
                  endAdornment: (
                    <SearchIcon color="primary" style={{ fontSize: "16px" }} />
                  ),
                  style: { fontSize: 11 },
                }}
                InputLabelProps={{ style: { fontSize: 11 } }}
              />
            )}
          </Grid>
          <Grid item xs={3} style={{ paddingLeft: "10px" }}>
            {/* <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <Select
                startAdornment={
                  <InputAdornment position="start">
                    <span className={classes.adornment}>Sort By:</span>
                  </InputAdornment>
                }
                labelId="sortBy"
                className={classes.option}
                name="requirement"
                value="-instagram_followers"
              >
                <MenuItem className={classes.option} value="-created">
                  Created (Last)
                </MenuItem>
                <MenuItem className={classes.option} value="created">
                  Created (First)
                </MenuItem>
                <MenuItem
                  className={classes.option}
                  value="-instagram_followers"
                >
                  Followers (Highest)
                </MenuItem>
                <MenuItem
                  className={classes.option}
                  value="instagram_followers"
                >
                  Followers (Least)
                </MenuItem>
                <MenuItem className={classes.option} value="-image_engagement">
                  Image Engagement (Highest)
                </MenuItem>
                <MenuItem className={classes.option} value="image_engagement">
                  Image Engagement (Least)
                </MenuItem>
              </Select>
            </FormControl> */}
          </Grid>
        </Grid>
        {/* When seleted Influencers length greter than zero then this grid content show */}
        <Grid
          container
          justify="space-between"
          style={{
            position: "sticky",
            top: typeOfList === "handles" ? "40px" : "90px",
            zIndex: 1001,
            background: "#ffffff",
          }}
        > 
          
          {selectedInfluencers.length > 0 && (
            <Grid item xs={12}>
              <Box>
                 {/* This Grid is Show infuencers List selection count and creating the mixes
                 options and buttons are show like cancel all and add mixes button  */}
                <Grid
                  container
                  justify="space-between"
                  className={classes.selection}
                  alignItems="center"
                >
                  <Grid item>
                    <Grid container alignItems={"center"}>
                      <Grid item style={{ width: "150px" }}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            margin: "0 1rem",
                            color: "#fff",
                          }}
                        >{`${selectedInfluencers.length} Selected`}</Typography>
                      </Grid>
                      {/* When influencer are selected then mix name and selection of
                      mix options are show */}
                      <Grid item style={{ width: "200px" }}>
                        <FormControl
                          size="small"
                          variant="outlined"
                          className={classes.input}
                          style={{ margin: 0 }}
                        >
                          <InputLabel
                            style={{ color: "#fff" }}
                            className={classes.option}
                            id="mix-label"
                          >
                            Select Mix
                          </InputLabel>
                          <Select
                            style={{ fontSize: "11px", color: "#fff" }}
                            inputProps={{
                              classes: {
                                icon: classes.icon,
                              },
                            }}
                            className={classes.select}
                            labelId="mix-label"
                            id="mix"
                            variant="outlined"
                            onChange={(e) =>
                              dispatch(
                                setSelectedMix({
                                  number: e.target.value,
                                  // name: listDetails[
                                  //   `mix_name_${e.target.value}`
                                  // ],
                                  name: listMixesAvl[e.target.value-1].mix_name,
                                  mixid: listMixesAvl[e.target.value-1].id
                                })
                              )
                            }
                            value={selectedMix.number}
                            label="Select Mix"
                          >
                            <MenuItem className={classes.option} value={1}>
                              {/* {listDetails.mix_name_1} */}
                              {/* {avlMixList.mix_name_1}listMixesAvl */}
                              {listMixesAvl[0].mix_name}
                            </MenuItem>
                            <MenuItem className={classes.option} value={2}>
                              {/* {listDetails.mix_name_2} */}
                              {/* {avlMixList.mix_name_2} */}
                              {listMixesAvl[1].mix_name}
                            </MenuItem>
                            <MenuItem className={classes.option} value={3}>
                              {/* {listDetails.mix_name_3} */}
                              {/* {avlMixList.mix_name_3} */}
                              {listMixesAvl[2].mix_name}
                            </MenuItem>
                            <MenuItem className={classes.option} value={4}>
                              {/* {listDetails.mix_name_4} */}
                              {/* {avlMixList.mix_name_4} */}
                              {listMixesAvl[3].mix_name}
                            </MenuItem>
                            <MenuItem className={classes.option} value={5}>
                              {/* {listDetails.mix_name_5} */}
                              {/* {avlMixList.mix_name_5} */}
                              {listMixesAvl[4].mix_name}
                              
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{
                            fontSize: "12px",
                            margin: "0 1rem",
                            color: "#fff",
                          }}
                        >
                          Or
                        </Typography>
                      </Grid>
                      {/* Create Mix Button are show here */}
                      <Grid item>
                        <TextField
                          name="mix_name"
                          value={selectedMix.name}
                          className={classes.select}
                          label="Mix Name"
                          variant="outlined"
                          size="small"
                          type="text"
                          onChange={(e) =>
                            dispatch(
                              setSelectedMix({
                                number: selectedMix.number,
                                name: e.target.value,
                                mixid: selectedMix.mixid
                              })
                            )
                          }
                          InputProps={{
                            style: {
                              fontSize: 11,
                              color: "#fff",
                            },
                          }}
                          InputLabelProps={{
                            style: { fontSize: 11, color: "#fff" },
                            shrink: true,
                          }}
                        />
                        {/* <Button
                          variant="outlined"
                          style={{
                            color: "#fff",
                            borderColor: "#fff",
                          }}
                          className={classes.button}
                        >
                          Create New Mix
                        </Button> */}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="text"
                      style={{ color: "#fff" }}
                      className={classes.button}
                      onClick={() => {
                        dispatch(clearSelectedInfluencer());
                        setCleared(!cleared);
                        setSelectAll(false);
                        dispatch(
                          setSelectedMix({
                            number: 1,
                            name: listDetails[`mix_name_1`],
                          })
                        );
                      }}
                    >
                      Clear All
                    </Button>
                    <Button
                      variant="contained"
                      style={{ color: "#2e75bb", background: "#fff" }}
                      className={classes.button}
                      onClick={handleClickOpen}
                    >
                      Add selected
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid container justify="space-between">
          <Grid item xs={12}>
            <Box marginTop="27px">
              <Grid
                container
                justify="space-around"
                alignItems="center"
                className={classes.listHeader}
                style={{
                  position: "sticky",
                  top: typeOfList === "handles" ? "-5px" : "40px",
                  zIndex: 1000,
                }}
              >
                <Grid item xs={4} className={classes.listHeadItem}>
                  {typeOfList === "handles" && !checkIfAllExists() && (
                    <Tooltip title="Select All">
                      <FormControlLabel
                        className={classes.checkboxLabel}
                        control={
                          <Checkbox
                            checked={selectAll}
                            color="primary"
                            size="small"
                            onChange={() => setSelectAll(!selectAll)}
                          />
                        }
                      />
                    </Tooltip>
                  )}
                  {typeOfList !== "handles" && (
                    <Tooltip title="Select All">
                      <FormControlLabel
                        className={classes.checkboxLabel}
                        control={
                          <Checkbox
                            checked={selectAll}
                            color="primary"
                            size="small"
                            onChange={() => setSelectAll(!selectAll)}
                          />
                        }
                      />
                    </Tooltip>
                  )}
                  Profile
                </Grid>
                <Grid item xs={2} className={classes.listHeadItem}>
                  Category
                </Grid>
                <Grid xs={1} item className={classes.listHeadItem}>
                  {/* {pitchInfo.type_of_campaign[0] === "instagram" && "Followers"}
                  {pitchInfo.type_of_campaign[0] === "youtube" && "Subscribers"} */}
                  {pitchInfo.platform === "instagram" && "Followers"}
                  {pitchInfo.platform === "youtube" && "Subscribers"}
                </Grid>
                <Grid item xs={4}>
                  {/* Only instagram part are show and when 
                  type of campagin get then these part are show */}
                  {//pitchInfo.type_of_campaign[0] === "instagram" && (
                    pitchInfo.platform === "instagram" && (
                    <Grid container>
                      <Grid
                        xs={4}
                        style={{ textAlign: "center" }}
                        item
                        className={classes.listHeadItem}
                      >
                        Eng.
                      </Grid>
                      <Grid
                        xs={4}
                        style={{ textAlign: "center" }}
                        item
                        className={classes.listHeadItem}
                      >
                        Rate
                      </Grid>
                      <Grid
                        xs={4}
                        style={{ textAlign: "center" }}
                        item
                        className={classes.listHeadItem}
                      >
                        Quality
                      </Grid>
                    </Grid>
                  )
                  }
                   {//pitchInfo.type_of_campaign[0] === "youtube" && (
                    pitchInfo.platform === "youtube" && (
                    <Grid container>
                      <Grid
                        xs={6}
                        style={{ textAlign: "center" }}
                        item
                        className={classes.listHeadItem}
                      >
                        Avg. Views
                      </Grid>
                      <Grid
                        xs={6}
                        style={{ textAlign: "center" }}
                        item
                        className={classes.listHeadItem}
                      >
                        Avg. Comments
                      </Grid>
                    </Grid>
                  )} 
                </Grid>
              </Grid>
              {status === "loading" && <CircularProgress size={20} />}
              {/* Use map method to print the all infuencers in list tab 
              show the all list data */}
              {status === "success" &&
                influencers.map((influencer, i) => (
                  <FilteredInfluencer
                    selectAll={selectAll}
                    cleared={cleared}
                    tierStatus={tierStatus}
                    tier={
                      //tierStatus === "success" && tiers[influencer.tier - 1]
                      (tierStatus === "success" && influencer.tier) ?  tiers[influencer.tier-1] : tiers[0]
                    }
                    key={influencer.instagram_handle + i}
                    influencer={influencer}
                  />
                ))}
              {isInfluencersApi && typeOfList === null && (
                <Grid
                  container
                  justify="flex-end"
                  style={{ padding: "1rem 0 2rem 0" }}
                >
                  <Grid item>
                    <Button
                      disabled={page === 1}
                      className={classes.button}
                      color="primary"
                      onClick={() => setPage(page - 1)}
                    >
                      Prev
                    </Button>
                    <Button
                      onClick={() => setPage(page + 1)}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* When open vareable value is true then "FilterAddSelectedInfluencerModal" this component work
         and modal are show which take a conformation to adding a list 
      */}
      {open && (
        <FilterAddSelectedInfluencerModal
          setActiveStep={setActiveStep}//setActiveStep is a function when call then change the value of step that mean which step is working
          handleClose={handleClose}//This is a function which are change the steps when value chaange
          open={open}//"open vareable are store the boolean value"
         
        />
      )}
    </>
  );
}
