import { Avatar, Chip, makeStyles, Tab, Tabs } from "@material-ui/core";
import React from "react";
import TabPanel from "../TabPanel/TabPanel";

import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setField, setTeam } from "../../redux/createPitchSlice";

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  box: {},
  container: {
    paddingLeft: "17px",
    paddingTop: "7px",
    paddingBottom: "22px",
    borderBottom: "1px dashed #a7a7a7",
  },
  title: {
    color: "#414141",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: 1.56,
  },
  common: {
    padding: "31px 0 18.5px 17px",
  },
  input: {
    width: "100%",
  },
  tabsContainer: {
    borderBottom: "solid 1px #c7c7c7",
  },
  tabs: {},
  tab: {
    color: "#624e9a",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 500,
  },
  footer: {
    borderTop: "solid 1px rgba(167, 167, 167, 0.47)",
  },
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
  },
  upload: {
    borderRadius: "6px",
    boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.06)",
    height: "100%",
    padding: "14px",
  },
  text: {
    color: "#636363",
    fontSize: "11px",
    lineHeight: 1.64,
  },
  option: {
    fontSize: "12px",
  },
  chip: {
    marginRight: "17px",
    marginBottom: "17px",
    color: " #2e75bb",
    fontSize: "12px",
  },
  group: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default function CreatePitchTeamTabs({
  pitch,
  value,
  handleChange,
  teamMembers,
  listManagers,
}) {
  const classes = useStyles();
  const pitchData = useSelector((state) => state.createPitchData.data);

  const dispatch = useDispatch();

  return (
    <div>
      {/* Here we are create a two tabs 
           1 = first tab List managers
           2 = second is a Team members 
        */}
      <div className={classes.tabsContainer}>
        <Tabs
          className={classes.tabs}
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            className={classes.tab}
            label="List Managers"
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tab}
            label={`Team Members (${
              pitchData && pitchData.team_members.length
            })`}
            {...a11yProps(1)}
          />
        </Tabs>
      </div>

      {/* here in this session we are creaate a tab panels of all tabes */}
      {/* first tab panel */}
      <TabPanel value={value} index={0}>
        <FormControl component="fieldset">
          <RadioGroup
            className={classes.group}
            name="internal_lead"
            value={pitchData.internal_lead}
            onChange={(e) =>
              dispatch(setField({ name: e.target.name, value: e.target.value }))
            }
          >
            {/* 
             Here we are create  the all name of listmembers
             */}
            {listManagers.map((member) => (
              <FormControlLabel
                key={member.id}
                //value={`${member.first_name} (${member.email})`}
                value={member.id}
                control={<Radio style={{ display: "none" }} />}
                label={
                  /** pitchData is a data which are getting from redux */
                  pitchData.internal_lead ===
                 // `${member.first_name} (${member.email})` 
                 //`${member.username}`
                 `${member.id}`
                  ? (
                    <Chip
                      className={classes.chip}
                      color="primary"
                      style={{ color: "#FFF" }}
                      variant="default"
                      size="medium"
                      avatar={
                        <Avatar>
                          {member.username.slice(0, 2).toUpperCase()}
                        </Avatar>
                      }
                      label={member.username}
                    />
                  ) : (
                    <Chip
                      className={classes.chip}
                      color="primary"
                      variant="outlined"
                      size="medium"
                      avatar={
                        <Avatar>
                          {member.username.slice(0, 2).toUpperCase()}
                        </Avatar>
                      }
                      label={member.username}
                    />
                  )
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </TabPanel>
      {/* second tab panel for team members */}
      <TabPanel value={value} index={1}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup className={classes.group}>
            {teamMembers.map((member) => (
              <FormControlLabel
                key={member.id}
                control={
                  <Checkbox
                    onChange={(e) =>
                      dispatch(
                        setTeam({ name: e.target.name, value: e.target.value })
                      )
                    }
                    style={{ display: "none" }}
                   // value={`${member.first_name} (${member.email})`}
                    value={member.id}
                    name="team_members"
                  />
                }
                label={
                  /** pitch data is a data which are store in a redux */
                  pitchData &&
                  pitchData.team_members &&
                  pitchData.team_members.includes(
                    //`${member.first_name} (${member.email})`
                    //`${member.username}`
                    `${member.id}`
                  ) ? (
                    <Chip
                      className={classes.chip}
                      color="primary"
                      style={{ color: "#FFF" }}
                      variant="default"
                      size="medium"
                      avatar={
                        <Avatar>
                          {member.username.slice(0, 2).toUpperCase()}
                        </Avatar>
                      }
                      label={member.username}
                    />
                  ) : (
                    <Chip
                      className={classes.chip}
                      color="primary"
                      variant="outlined"
                      size="medium"
                      avatar={
                        <Avatar>
                          {member.username.slice(0, 2).toUpperCase()}
                        </Avatar>
                      }
                      label={member.username}
                    />
                  )
                }
              />
            ))}
          </FormGroup>
        </FormControl>
      </TabPanel>
    </div>
  );
}
