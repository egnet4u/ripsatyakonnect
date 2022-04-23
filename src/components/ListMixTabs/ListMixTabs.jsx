//This function is use in socket
// handleBlur  , handleDeleteMix , handleRemoveInfluencer , handleBlurSelect 
// handleInput , handleRemoveContent , handleSelect 

import {
  Box,
  CircularProgress,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect, useCallback  } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import {
  addContentToAllInfluencers,
  addContentToOneInfluencer,
  addNewMix,
  getListDetails,
  removeInfluencerContent,
  removeInfluencerFromMix,
  setMixNumber,
  synchronizeMixData,
  updateContentValues,
  updateValues,getListMixes,mixListData,addMixInfluencers,emptyMixesOfInf,
  emptyMixesListDetail,emptyMixesDetail,mixInfConData
} from "../../redux/listMixesSlice";
import ListMixContainer from "../ListMixContainer/ListMixContainer";
import {
  deleteMix,        //use socket
  disconnectSocket,
  initiateSocket,
  removeContent,    //use socket
  removeInfluencer, //use socket
  sendMessage,      //use Socket
  sendNewMixData,
  subscribeToAddContent,
  subscribeToAddContentAll,
  subscribeToChanges,
  subscribeToDeleteMix,
  subscribeToNewMix,
  subscribeToRemoveContent,
  subscribeToRemoveInfluencer,
  subscribeToSync,
  subscribeToUpdate,
  syncData,
  updateData,
} from "../../socket";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { updateList } from "../../api";
import { useParams } from "react-router";

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderBottom: "1px solid #ccc",
  },
  tab: {
    color: "#2e75bb",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 500,
  },
  text: {
    fontSize: "12px",
    color: "#414141",
    paddingLeft: "13px",
  },
}));

export default function ListMixTabs() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [getMixesData , setMixesData] = useState(false);
  const [insertMixData , setMixInsertData] = useState(false);
  const [insertMixInfData , setInsertMixInfData] = useState(false);
  const [showMixInStep  , setShowMixStep] = useState(false);

  const { mutateAsync } = useMutation(updateList);
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  // const { isNewlyCreated } = useSelector((state) => state.filterResultData);

  const listDetails = useSelector((state) => state.listMixesData.listDetails);
  const status = useSelector((state) => state.listMixesData.status);
  const user = useSelector((state) => state.userData.user);
  
  const selectMixNumber = useSelector((state)=>state.filterResultData.selectedMix); 
  /** Get the influencer data of which are store in the redux */
  const mixeslistDetails = useSelector((state) => state.listMixesData.mixListDetails);
  const influencerMixData = useSelector((state) => state.listMixesData.mixInflencerData);
  const mixesDetails = useSelector((state) => state.listMixesData.mixDetails);
  const mixLoadStatus  = useSelector((state)=>state.listMixesData.getListMixstatus);
  const selectedMixNumber = useSelector(
    (state) => state.listMixesData.selectedMixNumber
  );

  useEffect(()=>{
    if(mixLoadStatus === "success"){
      if(Object.keys(selectMixNumber).length === 0 ){
        const mixId =  mixesDetails.find((mixDataGet)=> mixDataGet.id !== 0);
        if(mixId){
        dispatch(setMixNumber({value:mixId.mix_number}));
        setValue(mixId.mix_number-1)
        }
      } 
    }   
  },[selectMixNumber ,influencerMixData ,mixLoadStatus])

   /** All Infulancer Data */
   const influencers = useSelector(
    //(state) => state.filterResultData.influencers
    (state) => state.filterResultData.influencers.influencers
  );

  useEffect(()=>{
    /** first we are remove the all influencers of the mixes */
  
    dispatch(emptyMixesDetail({mixNumber:0}));dispatch(emptyMixesDetail({mixNumber:1}));
    dispatch(emptyMixesDetail({mixNumber:2}));dispatch(emptyMixesDetail({mixNumber:3}));
    dispatch(emptyMixesDetail({mixNumber:4}));
    dispatch(emptyMixesOfInf({mixNumber:1}));dispatch(emptyMixesOfInf({mixNumber:2}));
    dispatch(emptyMixesOfInf({mixNumber:3}));dispatch(emptyMixesOfInf({mixNumber:4}));
    dispatch(emptyMixesOfInf({mixNumber:5}));
    dispatch(emptyMixesListDetail({mixNumber:1}));dispatch(emptyMixesListDetail({mixNumber:2}));
    dispatch(emptyMixesListDetail({mixNumber:3}));dispatch(emptyMixesListDetail({mixNumber:4}));
    dispatch(emptyMixesListDetail({mixNumber:5}));
    
  },[dispatch]);

  
  const MixInfIds = useSelector((state) => state.listMixesData.mixListDetails);
  const [value, setValue] = useState(selectedMixNumber - 1);
  useEffect(()=>{
    dispatch(getListMixes(pitchInfo.project_id));
    //setInsertMixInfData(true);
    //setTimeout(()=>{},500)
      setMixesData(true);
      // if(mixesDetails[0].id !== 0){
      //   dispatch(setMixNumber({ value: 1 }));
      //   setValue(0);
      // }else if(mixesDetails[1].id !== 0){
      //   dispatch(setMixNumber({ value: 2 }));
      //   setValue(1);
      // }else if(mixesDetails[2].id !== 0){
      //   dispatch(setMixNumber({ value: 3 }));
      //   setValue(2);
      // }else if(mixesDetails[3].id !== 0){
      //   dispatch(setMixNumber({ value: 4 }));
      //   setValue(3);
      // }else if(mixesDetails[4].id !== 0){
      //   dispatch(setMixNumber({ value: 5 }));
      //   setValue(4);
      // }else{
      //  return false;
      // }
    
  },[dispatch , setValue,pitchInfo.project_id])
  
 
  //const [room, setRoom] = useState(`mix_${selectedMixNumber}_${id}`);
  /** Create a new room for new name name generate format mix_1_projectid_15  */
  const [room, setRoom] = useState(`mix_${selectedMixNumber}_projectid_${id}`);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setMixNumber({ value: newValue + 1 }));
    setRoom(`mix_${newValue + 1}_${id}`);
  };

  const isMixAvailable = () => {
    if(getMixesData){
      if (
        mixeslistDetails.influencers_data_list_1.length === 0 &&
        mixeslistDetails.influencers_data_list_2.length === 0 &&
        mixeslistDetails.influencers_data_list_3.length === 0 &&
        mixeslistDetails.influencers_data_list_4.length === 0 &&
        mixeslistDetails.influencers_data_list_5.length === 0
      ) {
        return false;
      }
      return true;
    }
    return false;
  };

  async function deleteMixOnSubscription(data) {
    const res = await mutateAsync({
      master_margin: 10,
      [`influencers_data_list_${data.mixNumber}`]: [],
      list_name: pitchInfo.list_link,
    });
    if (res.status) {
      toast.success(`Mix deleted by ${data.user_name}`);
      dispatch(getListDetails(id));
    } else {
      toast.error("Something went wrong. Please try again");
    }
  }

  console.log(
    "isNewlyCreated",
    store.getState().filterResultData.isNewlyCreated
  );
  useEffect(() => {
    if (store.getState().filterResultData.isNewlyCreated.type === "mix") {
      initiateSocket("global");
      sendNewMixData("global", {
        data: store.getState().filterResultData.isNewlyCreated.data,
        mixNumber: store.getState().filterResultData.isNewlyCreated.mixNumber,
      });
    }

    subscribeToNewMix((err, data) => {
      if (err) return;
      toast.success("Recieved new mix data");
      dispatch(addNewMix({ mixNumber: data.mixNumber, data: data.data }));
    });
  }, [dispatch]);

  useEffect(() => {
    if (room) {
      initiateSocket(room);
      syncData(room, "sender");
    }

    subscribeToSync((err, data) => {
      if (err) return;
      const mixData =
        store.getState().listMixesData.listDetails[
          `influencers_data_list_${value + 1}`
        ];
      updateData(room, mixData);
    });

    subscribeToUpdate((err, data) => {
      if (err) return;
      toast.success("Recieved updated data");
      dispatch(synchronizeMixData({ mixNumber: value + 1, data }));
    });

    subscribeToChanges((err, data) => {
      if (err) return;
      let elem = document.getElementById(data.elem_id);
      if (elem) {
        if (data.name) {
          if (data.name === "pieces" || data.name === "final_pricing") {
            dispatch(
              updateContentValues({
                type: data.type,
                name: data.name,
                value: data.value,
                mixNumber: value + 1,
                instagram_handle: data.instagram_handle,
              })
            );
          } else {
            dispatch(
              updateValues({
                name: data.name,
                value: data.value,
                mixNumber: value + 1,
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
        addContentToOneInfluencer({
          mixNumber: data.mixNumber,
          content: data.content,
          instagram_handle: data.instagram_handle,
        })
      );
    });

    subscribeToAddContentAll((err, data) => {
      if (err) return;
      dispatch(
        addContentToAllInfluencers({
          mixNumber: data.mixNumber,
          content: data.content,
        })
      );
    });

    subscribeToRemoveContent((err, data) => {
      if (err) return;
      dispatch(
        removeInfluencerContent({
          type: data.type,
          mixNumber: data.mixNumber,
          instagram_handle: data.instagram_handle,
        })
      );
    });

    subscribeToRemoveInfluencer((err, data) => {
      if (err) return;
      dispatch(
        removeInfluencerFromMix({
          mixNumber: data.mixNumber,
          instagram_handle: data.instagram_handle,
        })
      );
    });

    subscribeToDeleteMix((err, data) => {
      if (err) return;
      deleteMixOnSubscription(data);
    });

    return () => {
      disconnectSocket();
    };
  }, [room, dispatch, value]);

  const handleInput = (e, type, mixNumber, instagram_handle) => {
    sendMessage(room, {
      elem_id: e.target.id,
      name: e.target.name,
      value: e.target.value,
      isFocus: true,
      room_name: `mix_${mixNumber}`,
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
      room_name: `mix_${mixNumber}`,
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
      room_name: `mix_${mixNumber}`,
      instagram_handle: instagram_handle,
      user_name: user.name,
    });
  };
  const handleBlurSelect = (e, name, value, mixNumber, instagram_handle) => {
    sendMessage(room, {
      elem_id: `mix-${mixNumber}-${instagram_handle}-${name}`,
      isFocus: false,
      instagram_handle: instagram_handle,
      room_name: `mix_${mixNumber}`,
      user_name: user.name,
    });
  };

  const handleRemoveContent = (type, instagram_handle, mixNumber) => {
    removeContent(room, {
      mixNumber,
      type,
      instagram_handle,
      user_name: user.name,
      room_name: `mix_${mixNumber}`,
    });
  };

  const handleRemoveInfluencer = (instagram_handle, mixNumber) => {
    removeInfluencer(room, {
      mixNumber,
      instagram_handle,
      user_name: user.name,
      room_name: `mix_${mixNumber}`,
    });
  };

  const handleDeleteMix = (mixNumber) => {
    deleteMix(room, {
      mixNumber,
      user_name: user.name,
      room_name: `mix_${mixNumber}`,
    });
  };

  return (
    <>
      {status === "loading" && <CircularProgress color="primary" size={20} />}
      {status === "success"  && isMixAvailable() && (
        <Box>
          <Box>
            <Tabs
              variant="scrollable"
              className={classes.tabs}
              indicatorColor="primary"
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              { //listDetails.influencers_data_list_1.length !== 0 && (
                mixeslistDetails.influencers_data_list_1.length !== 0  && (
                <Tab
                  className={classes.tab}
                  label={
                    //listDetails.mix_name_1
                    mixesDetails[0].mix_name
                  }
                  {...a11yProps(0)}
                  value={0}
                />
              )}
              {//listDetails.influencers_data_list_2.length !== 0 && (
                mixeslistDetails.influencers_data_list_2.length !== 0 && (
                <Tab
                  className={classes.tab}
                  label={
                    //listDetails.mix_name_2
                    mixesDetails[1].mix_name
                  }
                  {...a11yProps(1)}
                  value={1}
                />
              )}
              {//listDetails.influencers_data_list_3.length !== 0 && (
                mixeslistDetails.influencers_data_list_3.length !== 0 && (
                <Tab
                  className={classes.tab}
                  label={
                    //listDetails.mix_name_3
                    mixesDetails[2].mix_name
                  }
                  {...a11yProps(2)}
                  value={2}
                />
              )}
              {//listDetails.influencers_data_list_4.length !== 0 && (
                mixeslistDetails.influencers_data_list_4.length !== 0 && (
                <Tab
                  className={classes.tab}
                  label={
                   // listDetails.mix_name_4
                   mixesDetails[3].mix_name
                  }
                  {...a11yProps(3)}
                  value={3}
                />
              )}
              {//listDetails.influencers_data_list_5.length !== 0 && (
                mixeslistDetails.influencers_data_list_5.length !== 0 && (
                <Tab
                  className={classes.tab}
                  label={
                   // listDetails.mix_name_5
                   mixesDetails[4].mix_name
                  }
                  {...a11yProps(4)}
                  value={4}
                />
              )}
            </Tabs>
          </Box>
           {value === 0 && (
            <ListMixContainer
              room={room}
              handleBlur={handleBlur}  //use for socket
              handleDeleteMix={handleDeleteMix}  //use for socket
              handleRemoveInfluencer={handleRemoveInfluencer} //use for socket
              handleBlurSelect={handleBlurSelect} //use for socket
              handleInput={handleInput}   //use for socket
              handleRemoveContent={handleRemoveContent} //use for socket
              handleSelect={handleSelect} //use for socket
              value={0}
              index={0}
              setValue={setValue}
              influencersData={
                //listDetails[`influencers_data_list_${value + 1}`]
                influencerMixData[`mix_influencers_data_${value + 1}`]
              }
            />
          )} 
           {value === 1 && (
            <ListMixContainer
              room={room}
              handleBlur={handleBlur}
              handleDeleteMix={handleDeleteMix}
              handleRemoveInfluencer={handleRemoveInfluencer}
              handleBlurSelect={handleBlurSelect}
              handleInput={handleInput}
              handleRemoveContent={handleRemoveContent}
              handleSelect={handleSelect}
              value={1}
              index={1}
              setValue={setValue}
              influencersData={
                //listDetails[`influencers_data_list_${value + 1}`]
                influencerMixData[`mix_influencers_data_${value + 1}`]
              }
            />
          )} 
          {value === 2 && (
            <ListMixContainer
              room={room}
              handleBlur={handleBlur}
              handleDeleteMix={handleDeleteMix}
              handleRemoveInfluencer={handleRemoveInfluencer}
              handleBlurSelect={handleBlurSelect}
              handleInput={handleInput}
              handleRemoveContent={handleRemoveContent}
              handleSelect={handleSelect}
              value={2}
              index={2}
              setValue={setValue}
              influencersData={
                //listDetails[`influencers_data_list_${value + 1}`]
                influencerMixData[`mix_influencers_data_${value + 1}`]
              }
            />
          )} 
          {value === 3 && (
            <ListMixContainer
              room={room}
              handleBlur={handleBlur}
              handleDeleteMix={handleDeleteMix}
              handleRemoveInfluencer={handleRemoveInfluencer}
              handleBlurSelect={handleBlurSelect}
              handleInput={handleInput}
              handleRemoveContent={handleRemoveContent}
              handleSelect={handleSelect}
              value={3}
              index={3}
              setValue={setValue}
              influencersData={
                //listDetails[`influencers_data_list_${value + 1}`]
                influencerMixData[`mix_influencers_data_${value + 1}`]
              }
            />
          )} 
           {value === 4 && (
            <ListMixContainer
              room={room}
              handleBlur={handleBlur}
              handleDeleteMix={handleDeleteMix}
              handleRemoveInfluencer={handleRemoveInfluencer}
              handleBlurSelect={handleBlurSelect}
              handleInput={handleInput}
              handleRemoveContent={handleRemoveContent}
              handleSelect={handleSelect}
              value={4}
              index={4}
              setValue={setValue}
              influencersData={
               // listDetails[`influencers_data_list_${value + 1}`]
               influencerMixData[`mix_influencers_data_${value + 1}`]
              }
            />
          )} 
        </Box>
      )}
      {status === "success" && !isMixAvailable() && (
        <Typography className={classes.text}>
          No mixes associated with this list
        </Typography>
      )}
    </>
  );
}
