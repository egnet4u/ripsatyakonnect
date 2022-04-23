import {
  Button,
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCampaign, updateList, updatePitch, updateTask } from "../../api";
import { getCampaignDetails } from "../../redux/campaignSlice";
import { getListDetails } from "../../redux/listMixesSlice";
import { toast } from "react-toastify";
import {
  getPitchTasksDetailsData,
  setPitchField,
} from "../../redux/taskPageSlice";
import {
  isCommunityAdmin,
  isManagementAdmin,
} from "../../utils/permissions/checkUserRoles";
import CampaignDetailsBox from "../CampaignDetailsBox/CampaignDetailsBox";
import ClientDetailsBox from "../ClientDetailsBox/ClientDetailsBox";
import StatusBox from "../StatusBox/StatusBox";
import TabPanel from "../TabPanel/TabPanel";
import TeamDetailsBox from "../TeamDetailsBox/TeamDetailsBox";
import TimeAndBudgetDetailsBox from "../TimeAndBudgetDetailsBox/TimeAndBudgetDetailsBox";
const useStyles = makeStyles((theme) => ({
  box: {
    height: `calc(100vh - ${265}px)`,
    paddingTop: "13.5px",
  },
  container: {
    paddingLeft: "17px",
    paddingTop: "7px",
    paddingBottom: "16px",
    borderBottom: "1px dashed #a7a7a7",
  },
  title: {
    color: "#414141",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: 1.56,
    padding: "8px 0",
  },
  button: {
    fontSize: "12px",
  },
}));

export default function TaskDetailsTab({ value, index }) {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { mutateAsync, isLoading } = useMutation(updateTask);
  const {
    mutateAsync: mutateAsyncUpdatePitch,
    isLoading: isLoadingUpdatePitch,
  } = useMutation(updatePitch);
  const { mutateAsync: mutateAsyncUpdateList, isLoading: isLoadingUpdateList } =
    useMutation(updateList);
  const {
    mutateAsync: mutateAsyncUpdateCampaign,
    isLoading: isLoadingUpdateCampaign,
  } = useMutation(updateCampaign);
  const user = useSelector((state) => state.userData.user);
  const userStatus = useSelector((state) => state.userData.status);

  const [editable, setEditable] = useState(false);
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const status = useSelector((state) => state.pitchData.status);
  const listDetails = useSelector((state) => state.listMixesData.listDetails);
  const statusList = useSelector((state) => state.listMixesData.status);
  const campaignDetails = useSelector(
    (state) => state.campaignData.campaignDetails
  );
  const users = useSelector((state) => state.allUsersData.users);
  const usersStatus = useSelector((state) => state.allUsersData.status);

  const statusCampaign = useSelector((state) => state.campaignData.status);
  const pitchTasksDetails = useSelector(
    (state) => state.pitchData.pitchTasksDetails
  );

  const statusPitchTasks = useSelector((state) => state.pitchData.taskStatus);

  useEffect(() => {
    if (status === "success") {
      // dispatch(
      //   getCampaignDetails({ id: pitchInfo.list_link, email: user.email })
      // );
    }
  }, [dispatch, pitchInfo.list_link, user.email, status]);

  /** return the internal lead user id */
  function internalLead() {
    if (pitchInfo.internal_lead) {
      let start = pitchInfo.internal_lead.indexOf("(");
      let end = pitchInfo.internal_lead.indexOf(")");
      //return pitchInfo.internal_lead.slice(start + 1, end);
      let emailId = pitchInfo.internal_lead.slice(start + 1, end);
      const getUserEmailObject =  users.find((uidData)=> uidData.email === emailId);
      return getUserEmailObject.id;
    }
  }
  function teamMembers() {
    if (pitchInfo.team_members) {
      return pitchInfo.team_members.map((tm) => {
        let start = tm.indexOf("(");
        let end = tm.indexOf(")");
        return tm.slice(start + 1, end);
      });
    }
  }
  /** Extract the uname then find the id of the internal lead or team member etc. */
  function getUidByUname(internalLeadName){
       if (internalLeadName) {
         const uname = internalLeadName.split(' ');
         const getUidObject =  users.find((uidData)=> uidData.username === uname[0]);
         return getUidObject.id;
       }else{
         return 0;
       }
       
  }

  const handleSaveDetails = async () => {
    try {
      let listSharingTaskId;
      if (pitchInfo.brand_manager) {
        let taskToComplete = [];
        for (let i = 0; i < pitchTasksDetails.task_details.length; i++) {
          if (
            pitchTasksDetails.task_details[i].status === "COMPLETED" ||
            pitchTasksDetails.task_details[i].status === "REJECTED"
          ) {
            if (
              pitchTasksDetails.task_details[i].task_name ===
              "List sharing with Client"
            ) {
              break;
            }
          } else {
            if (
              pitchTasksDetails.task_details[i].task_name ===
              "List sharing with Client"
            ) {
              listSharingTaskId = pitchTasksDetails.task_details[i].task_id;
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
            dispatch(setPitchField({ name: "brand_manager", value: "" }));
            setEditable(false);
            return;
          }

          if (!pitchInfo.internal_lead) {
            window.alert(
              "Assign internal lead to automatically complete these tasks."
            );
            dispatch(setPitchField({ name: "brand_manager", value: "" }));
            setEditable(false);
            return;
          }

          for (let i = 0; i < taskToComplete.length; i++) {
            await mutateAsync({
              pitch_id: id,
              level: taskToComplete[i].task_id,
              campaign_given_name: pitchInfo.campaign_given_name,
            });
          }
          await dispatch(getPitchTasksDetailsData(id));
        }
      }
      //update the pitch
      const response = await mutateAsyncUpdatePitch(pitchInfo);
      await dispatch(getPitchTasksDetailsData(id));
      // if (response.team_creation_flag) {
      //   await mutateAsync({
      //     pitch_id: id,
      //     level: 2,
      //     campaign_given_name: pitchInfo.campaign_given_name,
      //   });
      //   await dispatch(getPitchTasksDetailsData(id));
      // }
      // if (response.list_sharing_with_client_flag) {
      //   await mutateAsync({
      //     pitch_id: id,
      //     level: listSharingTaskId,
      //     campaign_given_name: pitchInfo.campaign_given_name,
      //   });
      //   await dispatch(getPitchTasksDetailsData(id));
      // }

      if (
        //pitchInfo.team_members || // || listDetails.category_type
        pitchInfo.client_name || pitchInfo.brief || pitchInfo.internal_lead ||
        pitchInfo.campaign_given_name || pitchInfo.category_of_brand 
      ) {
        //update the list
        // await mutateAsyncUpdateList({
        //   campaign_manager: internalLead(),
        //   internal_status: pitchInfo.status_internal,
        //   client_name: pitchInfo.client_name,
        //   list_description: pitchInfo.brief,
        //   given_name: pitchInfo.campaign_given_name,
        //   category_of_brand: pitchInfo.category_of_brand,
        //   //team_members: teamMembers(),//category_type: listDetails.category_type,
        //   //list_name: pitchInfo.list_link,
          
        // });

        //await dispatch(getListDetails(id));

        // if (campaignDetails.flag) {
        //   await mutateAsyncUpdateCampaign({
        //     campaign_manager: internalLead(),
        //     //team_members: teamMembers(),
        //     client_name: pitchInfo.client_name,
        //     campaign_description: pitchInfo.brief,
        //     //campaign_type: listDetails.category_type,
        //     campaign_type: listDetails.category_type,
        //     // hashtags: this.tracking.hashtags,
        //     category_of_brand: pitchInfo.platform,
        //     //campaign_name: campaignDetails.data.campaign_name,
        //     campaign_name: pitchInfo.campaign_given_name,
        //   });
        //   await dispatch(
        //     getCampaignDetails({
        //       id: pitchInfo.list_link,
        //       email: user.email,
        //     })
        //   );
        // }
      }

      setEditable(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };


  function userCantEditDetais() {
    if (userStatus === "success" && status === "success") {
      if (isCommunityAdmin(user)) {
        if (pitchInfo.team_members.includes(`${user.name} (${user.email})`)) {
          return true;
        } else {
          return false;
        }
      } else if (isManagementAdmin(user)) {
        if (
          user.email !== pitchInfo.sales_lead ||
          `${user.name} (${user.email})` === pitchInfo.internal_lead ||
          pitchInfo.team_members.includes(`${user.name} (${user.email})`)
        ) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    }
  }

  return (
    <TabPanel pad={"0px"} value={value} index={index}>
      {status === "success" && (
        <Grid
          className={classes.container}
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography className={classes.title}>
                  {pitchInfo.campaign_given_name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {!userCantEditDetais() && (
            <Grid item>
              {editable && (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={handleSaveDetails}
                >
                  Save{" "}
                  {(isLoading ||
                    isLoadingUpdatePitch ||
                    isLoadingUpdateList ||
                    isLoadingUpdateCampaign ||
                    statusList === "loading" ||
                    statusPitchTasks === "loading" ||
                    statusCampaign === "loading") && (
                    <CircularProgress
                      style={{ color: "#fff", marginLeft: "0.3rem" }}
                      size={13}
                    />
                  )}
                </Button>
              )}
              {!editable && (
                <Button
                  onClick={() => {
                    setEditable(true);
                  }}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  Edit
                </Button>
              )}
            </Grid>
          )}
        </Grid>
      )}
      {status === "success" && (
        <div className={classes.box}>
          {/* {userStatus === "success" && */}
          {/* // (!isCommunityAdmin(user) || campaignDetails.flag) && ( */}
          <ClientDetailsBox editable={editable} />
          {/* // )} */}
          <Grid container justify="space-between" style={{ margin: "2rem 0" }}>
            <TimeAndBudgetDetailsBox editable={editable} />
            <CampaignDetailsBox editable={editable} />
          </Grid>
          <Grid
            container
            justify="space-between"
            style={{ margin: "2rem 0", paddingBottom: "3rem" }}
          >
            <TeamDetailsBox editable={editable} />
            <StatusBox editable={editable} />
          </Grid>
        </div>
      )}
    </TabPanel>
  );
}
