import { CircularProgress, Grid, makeStyles, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateList } from "../../api";
/** New django API imported */
import { createMix , updateMix ,getInfluencerListMix ,mixInfluencerContent ,mixInfluencerNote,updateMixValue } from "../../new_api/api";
import {
  clearSelectedInfluencer,
  setNewlyCreated,
} from "../../redux/filterResultSlice";
import { setMixNumber } from "../../redux/listMixesSlice";
import { getListMixes , mixListData } from "../../redux/listMixesSlice";

const useStyles = makeStyles((theme) => ({
  title: {
    borderTop: "7px solid #2e75bb",
    paddingTop: "37px",
    [theme.breakpoints.up("sm")]: {
      width: "464px",
    },
    "& h2": {
      color: "#41414",
      fontWeight: 500,
      fontSize: "14px",
    },
  },
  button: {
    fontSize: "12px",
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
}));

export default function FilterAddSelectedInfluencerModal({
  handleClose,
  setActiveStep,
  open,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [counter , setCounter] = useState();
  /** Select the influencer data from redux which are inserted when we are select influencer in 
   * task list first step
   */
  
  const selectedInfluencers = useSelector(
    (state) => state.filterResultData.selectedInfluencers
  );
  /** Select pitch data from redux */
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  /** mix list detail get from redux */
  const listDetails = useSelector((state) => state.listMixesData.listDetails);
  /** Get mix id  */
  const mixIDgetFromRedux = useSelector((state) => state.listMixesData.mixDetails);
  /** Select mix from redux */
  const selectedMix = useSelector(
    (state) => state.filterResultData.selectedMix
  );
  /** Create api request to update the list of old flask api */
  const { mutateAsync, isLoading } = useMutation(updateList);
  const {mutateAsync:callCreateMixApi , isLoading:isLoadingCreateMixApi} = useMutation(createMix);
  const {mutateAsync:addInfluencersInMix , isLoading:isLoadingUpdateMix} = useMutation(updateMix);
  const {mutateAsync:getMixInfluencerList,isLoading:isLoadingListInfluencer} = useMutation(getInfluencerListMix);
  const {mutateAsync:mixNameChange ,  isLoading:isLoadingMixNameChange} = useMutation(updateMixValue);


  //Add influencers code//
  const callInsetApi = async (infuencer , updateObject , mixid) =>{
    for (let i = 0; i < infuencer.length; i++) {
      
        //{infid:influencer.id , infhandel:influencer.instagram_handle};
        const get_influencer_id = infuencer[i].infid;
        const influencerhandel = infuencer[i].infhandel;
        updateObject.mix_id = mixid;
        updateObject.influencer_id = get_influencer_id;
        updateObject.instagram_handle = influencerhandel;
       await addInfluencersInMix(updateObject).then((response)=>{
        }).catch((err)=>console.log("FilterAddSelectedInfluencerModal",err));
        if(i+1 === infuencer.length){
          //setFinishAddInf(true);
          //Again get the mix data and store it
          dispatch(clearSelectedInfluencer());
          dispatch(setMixNumber({ value: selectedMix.number }));
          toast.success("All Influencers Inserted Successfully In Mix");
          setTimeout(function(){
            setActiveStep(1);
            handleClose();
          },1000)
        }  
      
    }
  }

  const onSubmit = async () => {
    /** create a new object for payload when post request apply to creating a mix */
    const updateObject = {};
    /** Select the all influencer from redux and create new array by map functiion */
    const updatedSelectedInfluencers = selectedInfluencers.map((influencer) => {
      return {
        ...influencer,
        offer_cost: 0,
        status: "master",
        content_plan: [],
      };
    });
    // const alreadyExistsHandles = [];
    // /** Select list mix data which are already created in server and save by user. 
    //  * If data avelable the if block code run */
    // ////////// In new api "influencers_data_list_" not found //////////////
    // if (listDetails[`influencers_data_list_${selectedMix.number}`]) {
    //   // if (
    //   //   listDetails[`influencers_data_list_${selectedMix.number}`].length === 0
    //   // ) {
    //   //   dispatch(
    //   //     setNewlyCreated({
    //   //       type: "mix",
    //   //       mixNumber: selectedMix.number,
    //   //       data: updatedSelectedInfluencers,
    //   //     })
    //   //   );
    //   // }
    //   const finalSelectedInfluencers = [];
    //   for (let i = 0; i < updatedSelectedInfluencers.length; i++) {
    //     const foundIndex = listDetails[
    //       `influencers_data_list_${selectedMix.number}`
    //     ].findIndex(
    //       (item) =>
    //         item.instagram_handle ===
    //         updatedSelectedInfluencers[i].instagram_handle
    //     );

    //     if (foundIndex === -1) {
    //       finalSelectedInfluencers.push(updatedSelectedInfluencers[i]);
    //     } else {
    //       alreadyExistsHandles.push(
    //         updatedSelectedInfluencers[i].instagram_handle
    //       );
    //     }
    //   }
    //   updateObject[`influencers_data_list_${selectedMix.number}`] = [
    //     ...listDetails[`influencers_data_list_${selectedMix.number}`],
    //     ...finalSelectedInfluencers,
    //   ];
    // } else {
    //   updateObject[`influencers_data_list_${selectedMix.number}`] =
    //     updatedSelectedInfluencers;
    // }

    /** In old API */
    //updateObject[`mix_name_${selectedMix.number}`] = selectedMix.name;
    //updateObject.list_name = pitchInfo.list_link;
    //updateObject.master_margin = 10;
    /////////////////////////////
    //other data for mnew api  //
    /////////////////////////////
    //updateObject.mix_influencer_id  = selectedMix.name;
    //updateObject.platform = pitchInfo.platform;
    //updateObject.content_type = "data";
    //updateObject.num_posts = 1;
    //updateObject.price = 0;
    
    // if (alreadyExistsHandles.length !== 0) {
    //   window.confirm(
    //     `${alreadyExistsHandles} already exists in the ${
    //       listDetails[`mix_name_${selectedMix.number}`]
    //     }`
    //   );
    // }

    /*************************************************************/
    /** For new djando api we are add some more new payload data */
    //When we call MIX api then In payload "name and project_id" will use////
    updateObject.project_id = pitchInfo.project_id;
    //get mix id from server id if id already avelable then use put request otherwise use post request
    const mixIdGet = selectedMix.mixid;
    const mixName = selectedMix.name; //During Change Mix Name
    const sel_mix_Number  =  selectedMix.number;
    //all influencers are selected to redux which is user are selected
    const influencerId = selectedInfluencers.map((influencer) => {
          return {infid:influencer.id , infhandel:influencer.instagram_handle};
    });
    
    

    // When mix id is zero that mean  mix is not created and mix id get in the server and store is redux
    if(mixIdGet != 0){
       const findIndexOfMix =  mixIDgetFromRedux.findIndex((mData)=>mData.mix_number === sel_mix_Number);
       const selectRealMixName =  mixIDgetFromRedux[findIndexOfMix].mix_name;
       if(selectRealMixName  !== mixName){
         mixNameChange({mix_name:mixName , mix_number:sel_mix_Number , mix_id:mixIdGet});
       }
       //mix already created so  only insert influencers
       // Here we are check list are avelable in the mix or not, 
       getMixInfluencerList(mixIdGet).then(({data})=>{
          //list is not avelable then if block run otherwise else block run
          if(data.length === 0){
            callInsetApi(influencerId , updateObject , mixIdGet);
          }else{
            // If list avelable in the mix then we are only insert those influencers which are 
            // not avelable in the mix  
            const dbInfluencers = data.map((inf)=> inf.influencer_id);//Here we create a array of influencers id 
            var insertedInfluencers = [];//Create a empty array and store those influencer ids which are not inserts in the mix in live server
            for (var i = 0; i < influencerId.length; i++) {
              const ans = dbInfluencers.indexOf(influencerId[i].infid);
              if(ans === -1){
                insertedInfluencers.push(influencerId[i]);
              }
            }
            if(insertedInfluencers.length != 0) { 
                 callInsetApi(insertedInfluencers , updateObject , mixIdGet)
            }else{
             alert("Selected Influencer Already Insert In Selected Mix");
             setTimeout(()=>{handleClose();},200)
            } 
          }
       }).catch((error)=>{
        console.log("FilterAddSelectedInfluencerModal",error);
       });
       
    }else{
      // Here we are created a mix and then inserted a influencers
       /**we are call when create a Mix */
       updateObject.mix_name = selectedMix.name;
       updateObject.mix_number = selectedMix.number;
       // "callCreateMixApi" this function create a mix in server
       callCreateMixApi(updateObject).then((response)=>{
        // When we get succcess response then again get mixes details
        if(response.data.status){
            const mix_id_get_sever = response.data.data.mix_id;
            const prv_mix_number = selectedMix.number;
            callInsetApi(influencerId , updateObject , mix_id_get_sever);
            /** get the all mixes from server when mix create successfully */
            dispatch(getListMixes(pitchInfo.project_id)); 
        }
      }).catch((err)=>console.log(err));
    }
   
   
    
    /** Update a mix and insert influencers in mix */
    /** 
    updateObject.mix_id = 1;
    updateObject.influencer_id = 24;
    addInfluencersInMix(updateObject).then((response)=>{
       console.log(response.data);
    }).catch((err)=>console.log(err));
    */

    /** 
    mutateAsync(updateObject)
      .then((response) => {
        if (!response) {
          return handleClose();
        } else {
          dispatch(clearSelectedInfluencer());
          dispatch(setMixNumber({ value: selectedMix.number }));
          setActiveStep(1);
          handleClose();
        }
      })
      .catch((err) => console.log(err));
    */
  };

 

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
          Would you like to add Selected {selectedInfluencers.length}{" "}
          Influencer(s) in {selectedMix.name} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className={classes.text}
            id="alert-dialog-description"
          >
            Note:Action Cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justify="flex-end" alignItems="center">
            <Grid item>
              <Button
                className={classes.button}
                onClick={handleClose}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                className={classes.button}
                onClick={onSubmit}
                color="secondary"
                variant="contained"
                autoFocus
              >
                Add{" "}
                {isLoadingUpdateMix && (
                  <>
                    <CircularProgress
                    style={{ color: "white", marginLeft: "0.3rem" }}
                    size={13}
                    />
                    <Typography variant="body" size={13} style={{ color: "white", marginLeft: "0.3rem" }}>
                    </Typography>
                  </>
                )}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
