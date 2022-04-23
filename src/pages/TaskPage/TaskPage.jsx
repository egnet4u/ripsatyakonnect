import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    makeStyles,
    Tab,
    Tabs,
    Tooltip,
} from "@material-ui/core";
import { toast } from "react-toastify";
import React, { useState, Suspense, useEffect } from "react";
import CommonHead from "../../components/CommonHead/CommonHead";
import CommonBox from "../../components/CommonBox/CommonBox";
import { useDispatch, useSelector } from "react-redux";
import {
    getPitchData,
    getPitchTasksDetailsData,
} from "../../redux/taskPageSlice";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { getTierData } from "../../redux/tierSlice";
import { getLanguageData } from "../../redux/languageSlice";
import {
    getCategoryData,
    getCategoryOfBrandData,
} from "../../redux/categorySlice";
import { getAllUsersData } from "../../redux/allUsersSlice";
import { emptyUpdateMixInfData } from "../../redux/listMixesSlice";
import {
    getListMixes,
    getListDetails,
    mixListData, emptyMixesOfInf,
    emptyMixesListDetail, emptyMixesDetail,
    emptyContentUpdateRedux, emptyRemoveContentRedux
} from "../../redux/listMixesSlice";
import { useParams } from "react-router-dom";
import {
    updateList,
    updateCampaign,
    createCampaign,
    updateTask,
    fetchCampaignDetails,
} from "../../api";

import {
    mixInfluencerDataUpdateApi, mixContentUpdate,
    mixContentRemoveData, createFinalCampaign
    , getCampaginContentData, updateCampaignInfluencerData,
    campaignContentUpdate, removeCampaignContentData,postCampaignContentData
} from "../../new_api/api";
import {
    getCampaignDetails, getCampaignDetailsData, emptyCampaignContentUpdateData,
    emptyCampaignInfUpdateData, emptyCampaignContentRemoveData,addContentInInfluencers
} from "../../redux/campaignSlice";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import { useMutation } from "react-query";
import { getStateData } from "../../redux/stateSlice";
import { getCityData } from "../../redux/citySlice";
import { getLocationData } from "../../redux/locationSlice";
import { getRequirementData } from "../../redux/requirementSlice";
import { getContentPreference } from "../../redux/contentPreferenceSlice";
const TaskListTab = React.lazy(() =>
    import("../../components/TaskListTab/TaskListTab")
);
const TaskCampaignTab = React.lazy(() =>
    import("../../components/TaskCampaignTab/TaskCampaignTab")
);

const TaskWorkflowTab = React.lazy(() =>
    import("../../components/TaskWorkflowTab/TaskWorkflowTab")
);
const TaskDetailsTab = React.lazy(() =>
    import("../../components/TaskDetailsTab/TaskDetailsTab")
);

const TaskReportsTab = React.lazy(() =>
    import("../../components/TaskReportsTab/TaskReportsTab")
);

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        "aria-controls": `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    tabsContainer: {
        padding: `0 20px`,
        [theme.breakpoints.up("sm")]: {
            padding: `0 40px`,
        },
    },
    tabs: {},
    tab: {
        color: "#624e9a",
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 500,
    },
    button: {
        fontSize: "12px",
    },
    create: {
        position: "absolute",
        right: 30,
        top: 85,
    },
    plus: {
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.06)",
        padding: "2px",
        background: "#ffffff",
        borderRadius: "50%",
        fontSize: "30px",
        color: "#2e75bb",
    },
}));

export default function TaskPage() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useDispatch();
    const { id } = useParams();
    const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
    const user = useSelector((state) => state.userData.user);
    const listDetails = useSelector((state) => state.listMixesData.listDetails);

  const mixDetails = useSelector((state) => state.listMixesData.mixDetails);
  const mixeslistDetails = useSelector((state) => state.listMixesData.mixListDetails);
  const mixUpdateDataGet = useSelector((state)=> state.listMixesData.mixInfluencerDataUpdate);
  const mixInfuencerData = useSelector((state)=> state.listMixesData.mixInflencerData);
  const mixContentUpdateDataGet = useSelector((state)=> state.listMixesData.mixInfContentUpdate);
  const mixRemoveContentDataGet = useSelector((state)=> state.listMixesData.mixInfContentRemove);
  const selectedMixNumber = useSelector(
    (state) => state.listMixesData.selectedMixNumber
    );
    /** Extract the mix id */ 
    const mixIdArr = mixDetails.map((ele)=> ({getMixId:ele.id,getMixNum:ele.mix_number}));
    const status = useSelector((state) => state.listMixesData.status);
        const infDataUpdateLength =  mixUpdateDataGet[`inf_update_data_mix_${selectedMixNumber}`];
    const infContentDataUpdateLength = mixContentUpdateDataGet[`influencer_content_data_update_${selectedMixNumber}`];
    const infContentDataRemove = mixRemoveContentDataGet[`influencer_content_remove_data_${selectedMixNumber}`];
    const pitchTasksDetails = useSelector( (state) => state.pitchData.pitchTasksDetails[0] );
    //get campaignUpdateData 
    const campaignInfUpdateDataGet = useSelector((state)=>state.campaignData.campaignInfDataUpdate);
    const campaignInfConDataUpdate  = useSelector((state)=>state.campaignData.campaignInfContentDataUpdate);
    const campaignInfConDataRemove = useSelector((state)=>state.campaignData.campaignInfContentDataRemove);
    const campSecondData  = useSelector((state)=>state.campaignData.campaignDetails.campaignSecondData);
    //const { mutateAsync, isLoading } = useMutation(updateList);
   const { mutateAsync: mutateAsyncUpdateTask, isLoading: isLoadingUpdateTask } = useMutation(updateTask);
   const { mutateAsync: mutateAsyncUpdateList, isLoading: isLoadingUpdateList } = useMutation(updateList);
   //content update data//

   //const { mutateAsync: mutateAsyncCampaign, isLoading: isLoadingCampaign } = useMutation(createCampaign);
   const { mutateAsync: mutateAsyncCampaign, isLoading: isLoadingCampaign } = useMutation(createFinalCampaign);
   const {mutateAsync: mutateAsyncCampaignDetails,isLoading: isLoadingCampaignDetails} = useMutation(fetchCampaignDetails);
   const { mutateAsync: mutateAsyncUpdateCampaign, isLoading: isLoadingUpdateCampaign} = useMutation(updateCampaign);
   /** new backend api add  */
   const { mutateAsync: updateMixInfData, isLoading: isLoadingMixInfData } = useMutation(mixInfluencerDataUpdateApi);
   const { mutateAsync: getCampaignContentData, isLoading: campaignContentDataIsLoading } = useMutation(getCampaginContentData);
   const { mutateAsync: updateCampInfData, isLoading: updateCampInfDataIsLoading } = useMutation(updateCampaignInfluencerData);
   const { mutateAsync: contentUpdatePutReq, isLoading: contentUpdateIsLoading } = useMutation(mixContentUpdate);
   const { mutateAsync: removeConData, isLoading: removeContentIsLoading } = useMutation(mixContentRemoveData);
   const { mutateAsync: rmvCampContentData, isLoading: rmvCampConDataIsLoading } = useMutation(removeCampaignContentData);
   const { mutateAsync:postCampaignContent , isLoading:postCampaignContentIsLoading}  =  useMutation(postCampaignContentData);
   const { mutateAsync: campaignContentUpdateData, isLoading: campaignContentUpdateDataIsLoading } = useMutation(campaignContentUpdate);
   const campaignDetails = useSelector(
       (state) => state.campaignData.campaignDetails
   );
    const [value, setValue] = useState(0);
    const [open, setOpen] = React.useState(false);
    // const [campaignTabValue, setCampaignTabValue] = useState(0);
    const [campaignTabValue, setCampaignTabValue] = useState(0);
    // const listMixGet = (mixIdArr) => {
    //     for (let i = 0; i < mixIdArr.length; i++) {
    //         let mix_number = mixIdArr[i].getMixNum;
    //         let mix_id_number = mixIdArr[i].getMixId;
    //         //console.log("mixnumber",mix_number,"mixid",mix_id_number);
    //         if (mix_id_number !== 0) {
    //             //dispatch(mixListData({mixid:mix_id_number,mixnum:mix_number})) 
    //         }
    //     }
    // }

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCampaignTabChange = (event, newValue) => {
    setCampaignTabValue(newValue);
  };

  useEffect(()=>{
    /** first we are remove the all influencers of the mixes and all data rest of related to mixes */
    dispatch(emptyMixesDetail({mixNumber:0}));dispatch(emptyMixesDetail({mixNumber:1}));
    dispatch(emptyMixesDetail({mixNumber:2}));dispatch(emptyMixesDetail({mixNumber:3}));
    dispatch(emptyMixesDetail({mixNumber:4}));
    dispatch(emptyMixesOfInf({mixNumber:1}));
    dispatch(emptyMixesOfInf({mixNumber:2}));
    dispatch(emptyMixesOfInf({mixNumber:3}));
    dispatch(emptyMixesOfInf({mixNumber:4}));
    dispatch(emptyMixesOfInf({mixNumber:5}));
    dispatch(emptyMixesListDetail({mixNumber:1}));
    dispatch(emptyMixesListDetail({mixNumber:2}));
    dispatch(emptyMixesListDetail({mixNumber:3}));
    dispatch(emptyMixesListDetail({mixNumber:4}));
    dispatch(emptyMixesListDetail({mixNumber:5}));
  },[dispatch]);

  //Check campign is creaated or not
  useEffect(()=>{
    dispatch(getCampaignDetailsData(id));
  },[id])
  useEffect(() => {
    dispatch(getPitchData(id));
    dispatch(getPitchTasksDetailsData(id));
  }, [dispatch, id]);

  useEffect(() => {
    //dispatch(getListDetails(id));
  }, [dispatch, id]);
  
   useEffect(()=>{
    // console.log("taskPage",mixIdArr);
    // dispatch(mixListData({mixid:mixIdArr[0].getMixId,mixnum:mixIdArr[0].getMixNum}))
    // dispatch(mixListData({mixid:mixIdArr[1].getMixId,mixnum:mixIdArr[1].getMixNum}))
    // dispatch(mixListData({mixid:mixIdArr[2].getMixId,mixnum:mixIdArr[2].getMixNum}))
    // dispatch(mixListData({mixid:mixIdArr[3].getMixId,mixnum:mixIdArr[3].getMixNum}))
    // dispatch(mixListData({mixid:mixIdArr[4].getMixId,mixnum:mixIdArr[4].getMixNum}))
    //   listMixGet(mixIdArr);
    //   mixGetdata(mixIdArr);
   },[dispatch,mixIdArr])
    

        useEffect(() => {
            /** first we are remove the all influencers of the mixes and all data rest of related to mixes */
            dispatch(emptyMixesDetail({ mixNumber: 0 })); dispatch(emptyMixesDetail({ mixNumber: 1 }));
            dispatch(emptyMixesDetail({ mixNumber: 2 })); dispatch(emptyMixesDetail({ mixNumber: 3 }));
            dispatch(emptyMixesDetail({ mixNumber: 4 }));
            dispatch(emptyMixesOfInf({ mixNumber: 1 }));
            dispatch(emptyMixesOfInf({ mixNumber: 2 }));
            dispatch(emptyMixesOfInf({ mixNumber: 3 }));
            dispatch(emptyMixesOfInf({ mixNumber: 4 }));
            dispatch(emptyMixesOfInf({ mixNumber: 5 }));
            dispatch(emptyMixesListDetail({ mixNumber: 1 }));
            dispatch(emptyMixesListDetail({ mixNumber: 2 }));
            dispatch(emptyMixesListDetail({ mixNumber: 3 }));
            dispatch(emptyMixesListDetail({ mixNumber: 4 }));
            dispatch(emptyMixesListDetail({ mixNumber: 5 }));
        }, [dispatch]);

        //Check campign is creaated or not
        useEffect(() => {
            dispatch(getCampaignDetailsData(id));
        }, [id])
        useEffect(() => {
            dispatch(getPitchData(id));
            dispatch(getPitchTasksDetailsData(id));
        }, [dispatch, id]);

        useEffect(() => {
            //dispatch(getListDetails(id));
        }, [dispatch, id]);

        useEffect(() => {
            // console.log("taskPage",mixIdArr);
            // dispatch(mixListData({mixid:mixIdArr[0].getMixId,mixnum:mixIdArr[0].getMixNum}))
            // dispatch(mixListData({mixid:mixIdArr[1].getMixId,mixnum:mixIdArr[1].getMixNum}))
            // dispatch(mixListData({mixid:mixIdArr[2].getMixId,mixnum:mixIdArr[2].getMixNum}))
            // dispatch(mixListData({mixid:mixIdArr[3].getMixId,mixnum:mixIdArr[3].getMixNum}))
            // dispatch(mixListData({mixid:mixIdArr[4].getMixId,mixnum:mixIdArr[4].getMixNum}))
            //   listMixGet(mixIdArr);
            //   mixGetdata(mixIdArr);
        }, [dispatch, mixIdArr])


    useEffect(() => {
        dispatch(getCategoryData());
        dispatch(getCategoryOfBrandData());
        dispatch(getLocationData());
        dispatch(getTierData());
        dispatch(getLanguageData());
        dispatch(getAllUsersData());
        dispatch(getRequirementData());
        dispatch(getContentPreference());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getStateData("IN"));
        dispatch(getCityData("IN"));
    }, [dispatch]);

    /** New backend code */
    /** Function which are call when update the mix influencer data update */
    const upFunMixInf = async () => {
        // for (let i = 0; i < 5; i++) {}
        const update_data = mixUpdateDataGet[`inf_update_data_mix_${selectedMixNumber}`];
        const inf_data_get_mix = mixInfuencerData[`mix_influencers_data_${selectedMixNumber}`];
        if (update_data.length !== 0) {
            for (let j = 0; j < update_data.length; j++) {
                // setTimeout(()=>{  },1000*j)
                const arangeObject = {
                    mix_influencer_id: update_data[j].id,
                    mix_id: update_data[j].mix_id,
                    influencer_id: update_data[j].influencer_id,
                    assigned_to: update_data[j].assigned_to,
                    margin: update_data[j].margin,
                    cpe: update_data[j].cpe,
                    est_cost: update_data[j].est_cost,
                    offer_cost: update_data[j].offer_cost,
                    brand_cost: update_data[j].brand_cost,
                    status: update_data[j].status,
                    instagram_handle: update_data[j].instagram_handle
                };
                await updateMixInfData(arangeObject).catch((err) => {
                    toast.error("Something is wrong in Updation of mix");
                    console.log("taskpage", err);
                })
                if (j === update_data.length - 1) {
                    setTimeout(() => {
                        toast.success("Mix Update Successfully");
                        dispatch(emptyUpdateMixInfData({ mixNumber: selectedMixNumber }));
                    }, 200);
                }
            }
        }

        //create a update request for content update 
        const getContentUpdateData = mixContentUpdateDataGet[`influencer_content_data_update_${selectedMixNumber}`];
        if (getContentUpdateData.length > 0) {
            for (let i = 0; i < getContentUpdateData.length; i++) {
                const conData = { ...getContentUpdateData[i], mix_influencer_content_id: getContentUpdateData[i].id };
                await contentUpdatePutReq(conData).then((res) => {
                    console.log("Content qunt update TaskPage")
                }).catch((err) => {
                    toast.error("Something is wrong");
                })

                if (i === getContentUpdateData.length - 1) {
                    toast.success("Mix Content Data Update Successfully");
                    setTimeout(() => {
                        dispatch(emptyContentUpdateRedux({ mixNumber: selectedMixNumber }));
                    }, 1000);
                }
            }
        }

        // create a request for remove content from database
        const getRemConData = mixRemoveContentDataGet[`influencer_content_remove_data_${selectedMixNumber}`];
        if (getRemConData.length > 0) {
            for (let i = 0; i < getRemConData.length; i++) {
                const conData = { ...getRemConData[i], mix_influencer_content_id: getRemConData[i].mix_content_id };
                await removeConData(conData).then((res) => {
                    console.log("content delete TaskPage");
                }).catch((err) => {
                    toast.error("Something is wrong check");
                })
                if (i === getRemConData.length - 1) {
                    toast.success("Mix Content Data Delete Successfully");
                    setTimeout(() => {
                        dispatch(emptyRemoveContentRedux({ mixNumber: selectedMixNumber }));
                    }, 1000);
                }
            }
        }
    }

    /** This function run before the creating of campain and update the value of mix influencer data */
    const createCampignInfDataUpdate = async (mixnumber) => {
        const update_data = mixUpdateDataGet[`inf_update_data_mix_${mixnumber}`];
        if (update_data.length !== 0) {
            for (let j = 0; j < update_data.length; j++) {
                if ((update_data[j].status === "contacted") || (update_data[j].status === "accepted")) {
                    const arangeObject = { ...update_data[j], mix_influencer_id: update_data[j].id };
                    updateMixInfData(arangeObject)
                        .catch((err) => {
                            toast.error("Something is wrong in Updation of mix");
                        })
                }
                if (j + 1 === update_data.length) {
                    toast.success("Mix update successfully");
                    dispatch(emptyUpdateMixInfData({ mixNumber: mixnumber }));
                    return true;
                }
            }
        }
        return false;
    }

    const saveMix = () => {
        /** Old backend code hide */
        // const updateObject = {};
        // updateObject[`influencers_data_list_${selectedMixNumber}`] =
        //   listDetails[`influencers_data_list_${selectedMixNumber}`];
        // updateObject.list_name = pitchInfo.list_link;
        // updateObject.master_margin = 10;
        // mutateAsync(updateObject)
        //   .then((res) => {
        //     dispatch(getListDetails(id));
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });

        /** New backend code */
        upFunMixInf();
    };

    const canBeConvertedToCampaign = () => {
        // return listDetails[`influencers_data_list_${selectedMixNumber}`].some(
        //   (influencer) => {
        //     return (
        //       influencer.status === "contacted" || influencer.status === "accepted"
        //     );
        //   }
        // );
        return mixInfuencerData[`mix_influencers_data_${selectedMixNumber}`].some(
            (influencer) => {
                return (
                    influencer.mixdata.status === "contacted" || influencer.mixdata.status === "accepted"
                );
            }
        );
    };

    const convertToCampaign = async () => {
        var managementApprovalId;
        let taskToComplete = [];
        const getResponse = await createCampignInfDataUpdate(selectedMixNumber);

        for (let i = 0; i < pitchTasksDetails.task_details.length; i++) {
            if (
                pitchTasksDetails.task_details[i].status === "COMPLETED" ||
                pitchTasksDetails.task_details[i].status === "REJECTED"
            ) {
            } else {
                if (
                    pitchTasksDetails.task_details[i].task_name === "Management Approval"
                ) {
                    managementApprovalId = pitchTasksDetails.task_details[i].task_id;
                    break;
                }
                taskToComplete.push(pitchTasksDetails.task_details[i]);
            }
        }
        if (taskToComplete.length !== 0) {
            var confirmation = window.confirm(
                `Click 'Ok' to automatically complete previous tasks.`
            );
            if (!confirmation) {
                return;
            }
            // if (!pitchInfo.internal_lead) {
            //   window.alert(
            //     "Assign internal lead to automatically complete these tasks."
            //   );
            //   return;
            // }
            for (let i = 0; i < taskToComplete.length; i++) {
                // await mutateAsyncUpdateTask({
                //   pitch_id: id,
                //   level: taskToComplete[i].task_id,
                //   campaign_given_name: pitchInfo.campaign_given_name,
                // });
                await mutateAsyncUpdateTask({
                    task_id: taskToComplete[i].task_id,
                    project_id: id,
                    campaign_name: pitchInfo.campaign_given_name,
                    update_id: 0,
                });
            }
        }

        // const updateObject = {};
        // updateObject[`influencers_data_list_${selectedMixNumber}`] =
        // listDetails[`influencers_data_list_${selectedMixNumber}`];
        // updateObject.list_name = pitchInfo.list_link;
        // updateObject.master_margin = 10;
        // await mutateAsyncUpdateList(updateObject);
        // await mutateAsyncUpdateList({
        //   list_name: pitchInfo.list_link,
        //   chosen_data_list_id: selectedMixNumber,
        // });
        const campaignObject = {};
        campaignObject.platform = pitchInfo.platform;
        campaignObject.mix_id = mixDetails[selectedMixNumber - 1].id;
        campaignObject.project_id = id;
        campaignObject.campaign_name = pitchInfo.campaign_given_name;
        campaignObject.mix_number = selectedMixNumber;

        /** Here we are call the createCampaign API */
        // const response = await mutateAsyncCampaign({
        //   list_name: pitchInfo.list_link,
        // });
        if (getResponse) {
            console.log(campaignObject);
        }

        const response = await mutateAsyncCampaign(campaignObject);
        console.log(response.status);
        if (response.status) {
            // await mutateAsyncUpdateTask({
            //   pitch_id: id,
            //   level: managementApprovalId,
            //   campaign_given_name: pitchInfo.campaign_given_name,
            // });
            await mutateAsyncUpdateTask({
                task_id: managementApprovalId,
                project_id: id,
                campaign_name: pitchInfo.campaign_given_name,
                update_id: 0,
            });
            setValue(3);
        }
        await dispatch(getPitchTasksDetailsData(id));

        // data: {campaign_id: 9}
        // error: ""
        // message: "Campaign Created Successfully.."
        // status: true


        // await dispatch(
        //   getCampaignDetails({
        //     id: pitchInfo.list_link,
        //     email: user.email,
        //   })
        // );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    /** This function create to check influencers  are present in mix or not .
     * it return true and false */
    const isMixAvailable = () => {
        if (status === "success") {
            if (
                // listDetails.influencers_data_list_1.length === 0 &&
                // listDetails.influencers_data_list_2.length === 0 &&
                // listDetails.influencers_data_list_3.length === 0 &&
                // listDetails.influencers_data_list_4.length === 0 &&
                // listDetails.influencers_data_list_5.length === 0
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
    };

    const handleSaveCampaign = async () => {
        const camInfUpdateDataGet = campaignInfUpdateDataGet;
        const camInfUpdateConGet = campaignInfConDataUpdate;
        const camInfConDataRmv = campaignInfConDataRemove;
        //Update Campaign Influencer Data
        if (camInfUpdateDataGet.length > 0) {
            var camInfUpdateError = 0;
            for (let j = 0; j < camInfUpdateDataGet.length; j++) {
                //setTimeout(()=>{ },1000*j);
                const arangeObject = {
                    campaign_influencer_id: camInfUpdateDataGet[j].id,
                    influencer_id: camInfUpdateDataGet[j].influencer_id,
                    assigned_to: camInfUpdateDataGet[j].assigned_to,
                    margin: camInfUpdateDataGet[j].margin,
                    cpe: camInfUpdateDataGet[j].cpe,
                    est_cost: camInfUpdateDataGet[j].est_cost,
                    offer_cost: camInfUpdateDataGet[j].offer_cost,
                    brand_cost: camInfUpdateDataGet[j].brand_cost,
                    status: camInfUpdateDataGet[j].status,
                    instagram_handle: camInfUpdateDataGet[j].instagram_handle,
                    campaign_id: camInfUpdateDataGet[j].campaign_id
                };
                await updateCampInfData(arangeObject).catch((err) => {
                    camInfUpdateError++;
                })

                if (j === camInfUpdateDataGet.length - 1) {
                    if(camInfUpdateError !== 0){
                        toast.error("Something is wrong in Updation of mix");
                    }else{
                        toast.success("Campaign Influencer Data Update");
                    }
                    setTimeout(() => {
                        dispatch(emptyCampaignInfUpdateData());
                    }, 1000);

                }

            }
        }
        // Update Campaign Contant Data
        if (camInfUpdateConGet.length > 0) {
            for (let i = 0; i < camInfUpdateConGet.length; i++) {
                const conData = { ...camInfUpdateConGet[i], campaign_influencer_content_id: camInfUpdateConGet[i].id };
                if(camInfUpdateConGet[i].id === 0){
                    postCampaignContent(conData);
                }else{
                    await campaignContentUpdateData(conData).then((res) => {
                        console.log("Campaign Content quantaty update TaskPage")
                    }).catch((err) => {
                        toast.error("Something is wrong");
                    })
                }
                if (i === camInfUpdateConGet.length - 1) {
                    //again content get after adding the content// 
                    var error_campInfConUpdate = 0;
                    for(let i=0;i<campSecondData.length;i++){
                       const camInfId = campSecondData[i].id;
                       getCampaignContentData(camInfId).then((res)=>{
                           const contet_plan = res;
                           dispatch(addContentInInfluencers({camInfId , contet_plan}))
                       }).catch((err)=>{
                           error_campInfConUpdate++; 
                       })
                       if(i === campSecondData.length-1){
                           if(error_campInfConUpdate !== 0){
                               toast.error("Something is Wrong In Geeting The Content");
                           }else{
                               toast.success("Campaign Content Data Update Successfully");
                           }
                       }
                    }
                    setTimeout(() => {
                        dispatch(emptyCampaignContentUpdateData());
                    }, 500);
                }
            }
        }
        // Remove Campaign influencer content data;
        // create a request for remove content from database
        if (camInfConDataRmv.length > 0) {
            var error_content_rmv = 0;
            for (let i = 0; i < camInfConDataRmv.length; i++) {
                const conData = camInfConDataRmv[i];
                await rmvCampContentData(conData).catch((err) => {
                    error_content_rmv++;
                })

                if (i === camInfConDataRmv.length - 1) {
                    if(error_content_rmv !== 0){
                        toast.error("Something is wrong check");
                    }else{
                        toast.success("Campaign Content Data Delete Successfully");
                    }
                    setTimeout(() => {
                        dispatch(emptyCampaignContentRemoveData());
                    }, 1000);
                }
            }
        }
        // await mutateAsyncUpdateCampaign({
        //   campaign_name: campaignDetails.data.campaign_name,
        //   campaign_influencer_data: campaignDetails.data.campaign_influencer_data,
        //   master_margin: 0,
        // });

        // const response = await mutateAsyncCampaignDetails({
        //   id: pitchInfo.list_link,
        //   email: user.email,
        // });

        // dispatch(
        //   getCampaignDetails({ id: pitchInfo.list_link, email: user.email })
        // );

        // if (!response.flag) {
        //   return;
        // }

        // if (response.content_all_live_flag) {
        //   var contentGoLiveId;
        //   let taskToComplete = [];
        //   for (let i = 0; i < pitchTasksDetails.task_details.length; i++) {
        //     if (
        //       pitchTasksDetails.task_details[i].status === "COMPLETED" ||
        //       pitchTasksDetails.task_details[i].status === "REJECTED"
        //     ) {
        //     } else {
        //       if (
        //         pitchTasksDetails.task_details[i].task_name === "Content Go-Live"
        //       ) {
        //         contentGoLiveId = pitchTasksDetails.task_details[i].task_id;
        //         break;
        //       }
        //       taskToComplete.push(pitchTasksDetails.task_details[i]);
        //     }
        //   }

        //   if (taskToComplete.length !== 0) {
        //     for (let i = 0; i < taskToComplete.length; i++) {
        //       await mutateAsyncUpdateTask({
        //         pitch_id: id,
        //         level: taskToComplete[i].task_id,
        //         campaign_given_name: pitchInfo.campaign_given_name,
        //       });
        //     }
        //     await dispatch(getPitchTasksDetailsData(id));
        //   }
        // }

        // if (response.final_blocking_flag) {
        //   var finalBlockingId;

        //   for (let i = 0; i < pitchTasksDetails.task_details.length; i++) {
        //     if (
        //       pitchTasksDetails.task_details[i].task_name ===
        //       "Final blocking / edits of list with deliverables and cost"
        //     ) {
        //       finalBlockingId = pitchTasksDetails.task_details[i].task_id;
        //     }
        //   }

        //   await mutateAsyncUpdateTask({
        //     pitch_id: id,
        //     level: finalBlockingId,
        //     campaign_given_name: pitchInfo.campaign_given_name,
        //   });

        //   await dispatch(getPitchTasksDetailsData(id));
        // }

        // if (response.content_all_live_flag) {
        //   await mutateAsyncUpdateTask({
        //     pitch_id: id,
        //     level: contentGoLiveId,
        //     campaign_given_name: pitchInfo.campaign_given_name,
        //   });

        //   await dispatch(getPitchTasksDetailsData(id));
        // }

    };

    return (
        <>
            <div>
                <CommonHead title={value === 2 ? "Create List" : "Campaign"}>
                    {value === 3 && campaignTabValue === 1 && (
                        <div className={classes.create}>
                            <Tooltip title="Add Post">
                                <IconButton onClick={handleClickOpen} component="span">
                                    <AddCircleIcon className={classes.plus} />
                                </IconButton>
                            </Tooltip>
                        </div>
                    )}
                    <Grid container>
                        <Grid item>
                            {value === 2 && activeStep === 1 && isMixAvailable() && (
                                <Grid container>
                                    <Grid item>
                                        <Button
                                            disabled={campaignDetails.flag}
                                            size="small"
                                            className={classes.button}
                                            color="secondary"
                                            onClick={saveMix}
                                        >
                                            Save Mix{" "}
                                            {isLoadingMixInfData && (
                                                <CircularProgress
                                                    color="secondary"
                                                    style={{ marginLeft: "0.3rem" }}
                                                    size={13}
                                                />
                                            )}
                                        </Button>
                                    </Grid>
                                    <Grid item style={{ marginLeft: "10px" }}>
                                        <Button
                                            disabled={
                                                !canBeConvertedToCampaign() ||
                                                campaignDetails.flag ||
                                                infDataUpdateLength.length !== 0 ||
                                                infContentDataUpdateLength.length !== 0 ||
                                                infContentDataRemove.length !== 0
                                            }
                                            size="small"
                                            className={classes.button}
                                            variant="contained"
                                            color="secondary"
                                            onClick={convertToCampaign}
                                        >
                                            Convert to Campaign{" "}
                                            {(isLoadingCampaign ||
                                                isLoadingUpdateList ||
                                                isLoadingUpdateTask) && (
                                                    <CircularProgress
                                                        color="secondary"
                                                        style={{ color: "#fff", marginLeft: "0.3rem" }}
                                                        size={13}
                                                    />
                                                )}
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                            {value === 3 && campaignTabValue === 0 && campaignDetails.flag && (
                                <Grid container>
                                    <Grid item>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            className={classes.button}
                                            color="secondary"
                                            onClick={handleSaveCampaign}
                                            disabled = { (campaignInfUpdateDataGet.length === 0) ? (campaignInfConDataUpdate.length ===  0) ? (campaignInfConDataRemove.length === 0)? true : false  :false : false                  
                                                         || (campaignInfConDataUpdate.length ===  0) ? (campaignInfUpdateDataGet.length === 0)?(campaignInfConDataRemove.length === 0)?true:false:false : false 
                                                         || (campaignInfConDataRemove.length === 0)? (campaignInfUpdateDataGet.length === 0)? (campaignInfConDataUpdate.length ===  0)?true :false :false : false
                                                       }
                                        >
                                            Save Campaign{" "}
                                            {(isLoadingUpdateCampaign || isLoadingUpdateTask || isLoadingCampaignDetails || 
                                            postCampaignContentIsLoading|| updateCampInfDataIsLoading||
                                                campaignContentUpdateDataIsLoading || rmvCampConDataIsLoading) && (
                                                    <CircularProgress
                                                        color="#fff"
                                                        style={{ color: "#fff", marginLeft: "0.3rem" }}
                                                        size={13}
                                                    />
                                                )}
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </CommonHead>
                <div className={classes.tabsContainer}>
                    <Tabs
                        variant="scrollable"
                        className={classes.tabs}
                        indicatorColor="primary"
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                    >
                        <Tab className={classes.tab} label="Workflow" {...a11yProps(0)} />
                        <Tab className={classes.tab} label="Details" {...a11yProps(1)} />
                        <Tab className={classes.tab} label="List" {...a11yProps(2)} />
                        <Tab className={classes.tab} label="Campaign" {...a11yProps(3)} />
                        <Tab className={classes.tab} label="Reports" {...a11yProps(4)} />
                    </Tabs>
                </div>
                <CommonBox marginTop="0px" height={185}>
                    <Suspense fallback={<CircularProgress size={20} color="inherit" />}>
                        <TaskWorkflowTab
                            value={value}
                            index={0}
                            setActiveStep={setActiveStep}
                            activeStep={activeStep}
                        />
                        <TaskDetailsTab
                            value={value}
                            index={1}
                            setActiveStep={setActiveStep}
                            activeStep={activeStep}
                        />
                        <TaskListTab
                            value={value} //that is a state which are contain a value 0 1 2 3 4 
                            index={2} // Tab Index
                            setActiveStep={setActiveStep} // that active state is a function which are change the state
                            activeStep={activeStep}
                        />
                        <TaskCampaignTab
                            handleCampaignTabChange={handleCampaignTabChange}
                            campaignTabValue={campaignTabValue}
                            value={value}
                            index={3}
                        />
                        <TaskReportsTab value={value} index={4} /> 
                    </Suspense>
                </CommonBox>
            </div>
            {open && <AddPostModal handleClose={handleClose} open={open} />}
        </>
    );
}
