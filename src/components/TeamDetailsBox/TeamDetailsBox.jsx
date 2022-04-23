import {
  Box,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPitchField } from "../../redux/taskPageSlice";
import { isCommunityAdmin } from "../../utils/permissions/checkUserRoles";
const useStyles = makeStyles((theme) => ({
  statsHeading: {
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#414141",
  },
  heading: {
    fontSize: "14px",
    lineHeight: 1.36,
    color: "#414141",
  },
  input: {
    width: "100%",
  },
  option: {
    fontSize: "11px",
  },
  autocomplete: {
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
  },
}));
export default function TeamDetailsBox({ editable }) {
  //"editable" contain a boolean value
  const classes = useStyles();
  const dispatch = useDispatch();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const pitchStatus = useSelector((state) => state.pitchData.status);
  const users = useSelector((state) => state.allUsersData.users);
  const status = useSelector((state) => state.allUsersData.status);
  const user = useSelector((state) => state.userData.user);
  const userStatus = useSelector((state) => state.userData.status);
  

    /** return the user id */
    function internalLead(InternalLeadId) {
      if (InternalLeadId) {
        let start = InternalLeadId.indexOf("(");
        let end = InternalLeadId.indexOf(")");
        //return pitchInfo.internal_lead.slice(start + 1, end);
        let emailId = InternalLeadId.slice(start + 1, end);
        const getUserEmailObject =  users.find((uidData) => uidData.email == emailId);
        console.log(users ,emailId , getUserEmailObject ,InternalLeadId );
        return getUserEmailObject.id;
      }
    }

    //return  user id of team members
    function TeamMembers(TeamLeadId) {
      const size  = TeamLeadId.length;
      if(size !== 0){
       const teamId =   TeamLeadId.map((InternalLeadId)=>{
          let start = InternalLeadId.indexOf("(");
          let end = InternalLeadId.indexOf(")");
          let emailId = InternalLeadId.slice(start + 1, end);
          const getUserEmailObject =  users.find((uidData) => uidData.email == emailId);
          return getUserEmailObject.id;
        })

        return teamId;
      }
    
    }

  /***/
  const teamMemberEmailId = (uids) =>{
    if(uids){
      const uidSize = uids.length;
      if(uidSize !== 0 ){
        const teamMemEmail = uids.map((uid)=>{
          const fIndE = users.find((e)=>e.id === uid);
          return `${fIndE.username} (${fIndE.email})`; 
        })
        return teamMemEmail;
      } 
    }
  }

  /** Find email address By UserID */
  function getEmailId(uid){
      if(uid === null){
        return ;
      }
      const fIndE = users.find((e)=>e.id === uid);
      return fIndE.email;  
  }
 /** Return array of user id */
  function returnUsersId() {
    if (status === "success") {
      return users.map((user) => {
       //`${user.name} (${user.email})`
        return user.id;
      });
    }
    return [];
  }  

  function adminUsers() {
    if (status === "success") {
      return users.map((user) => {
        return `${user.username} (${user.email})`;
      });
    }
    return [];
  }
  function filteredAdminUsers() {
    if (status === "success") {
      return returnUsersId().filter((admin) => admin !== pitchInfo.internal_lead);
    }
    return [];
  }

  function isInternalLeadCommunityAdmin() {
    if (userStatus === "success" && pitchStatus === "success") {
      if (isCommunityAdmin(user)) {
        if (`${user.name} (${user.email})` === pitchInfo.internal_lead) {
        return true;
        } else {
          return false;
        }
      }
      return false;
    }
  }

  return (
    <Grid item xs={6} style={{ paddingRight: ".5rem" }}>
      {pitchStatus === "success" && (
        <Box
          boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
          border="1px solid #dce5ed"
          style={{ background: "#f8fcff" }}
          borderRadius="6px"
          overflow="hidden"
        >
          <Box
            padding="1rem 0"
            textAlign="center"
            style={{ background: "#edf2f7" }}
          >
            <Typography className={classes.heading}>TEAM DETAILS</Typography>
          </Box>
          <Box
            component={Paper}
            margin="1rem "
            elevation={0}
            boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
            padding="15px"
          >
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Sales Lead
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {getEmailId(pitchInfo.sales_lead)}
                  </Typography>
                )}
                {editable && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(setPitchField({ name: "sales_lead", value : internalLead(value) }))
                    }
                    value={getEmailId(pitchInfo.sales_lead)}
                    limitTags={2}
                    name="sales_lead"
                    ChipProps={{
                      size: "small",
                      style: {
                        fontSize: "10px",
                      },
                    }}
                    classes={{
                      option: classes.options,
                      input: classes.options,
                    }}
                    className={classes.autocomplete}
                    size="small"
                    id="tags-outlin-659"
                    options={adminUsers()}
                    //getOptionLabel={(option) => option.toUpperCase()}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Sales Lead"
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
          <Box
            component={Paper}
            margin="1rem "
            elevation={0}
            boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
            padding="15px"
          >
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Internal Lead
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {/* {pitchInfo.internal_lead}*/}
                    {getEmailId(pitchInfo.internal_lead)}
                  </Typography>
                )}
                {editable && isInternalLeadCommunityAdmin() && (
                  <Typography variant="caption">
                    {getEmailId(pitchInfo.internal_lead)}
                  </Typography>
                )}
                {editable && !isInternalLeadCommunityAdmin() && (
                  <Autocomplete
                    onChange={(e, value) =>{ 
                      dispatch(setPitchField({ name: "internal_lead", value:internalLead(value) }))}
                    }
                    value={ getEmailId(pitchInfo.internal_lead)}
                    limitTags={2}
                    name="internal_lead"
                    ChipProps={{
                      size: "small",
                      style: {
                        fontSize: "10px",
                      },
                    }}
                    classes={{
                      option: classes.options,
                      input: classes.options,
                    }}
                    className={classes.autocomplete}
                    size="small"
                    id="tags-9"
                    options={adminUsers()}
                    //getOptionLabel={(option) => option.toUpperCase()}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Internal Lead"
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
          <Box
            component={Paper}
            margin="1rem "
            elevation={0}
            boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
            padding="15px"
          >
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Team Members
                </Typography>
              </Grid>
               <Grid item xs={6}>
                {!editable && pitchInfo.team_members &&
                  pitchInfo.team_members.map((team) => (
                    <Box>
                      <Typography variant="caption" key={team}>
                        {getEmailId(team)}
                      </Typography>
                    </Box>
                  ))}
                {editable &&
                  isInternalLeadCommunityAdmin() &&  pitchInfo.team_members &&
                  pitchInfo.team_members.map((team) => (
                    //adminUsers().map((team) => (
                    <Box>
                      <Typography variant="caption" key={team}>
                        {team}
                      </Typography>
                    </Box>
                  ))}
                {editable && !isInternalLeadCommunityAdmin()  && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(setPitchField({ name: "team_members", value:TeamMembers(value) }))
                    }
                    multiple
                    value={
                      teamMemberEmailId( pitchInfo.team_members)                     
                    }
                    limitTags={2}
                    name="team_members"
                    ChipProps={{
                      size: "small",
                      style: {
                        fontSize: "10px",
                      },
                    }}
                    classes={{
                      option: classes.options,
                      input: classes.options,
                    }}
                    className={classes.autocomplete}
                    size="small"
                    id="ta-9"
                    options={
                     // filteredAdminUsers()
                        adminUsers()
                    }
                   // getOptionLabel={(option) => option.toUpperCase()}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Team Members"
                      />
                    )}
                  />
                )}
              </Grid> 
            </Grid>
          </Box>
        </Box>
      )}
    </Grid>
  );
}
