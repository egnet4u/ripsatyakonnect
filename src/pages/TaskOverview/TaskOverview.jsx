import {
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Tooltip,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPitches } from "../../api";
import CommonBox from "../../components/CommonBox/CommonBox";
import CommonHead from "../../components/CommonHead/CommonHead";
import GlobalLoader from "../../components/GlobalLoader/GlobalLoader";
import TaskContainer from "../../components/TaskContainer/TaskContainer";
import { isCommunityAdmin } from "../../utils/permissions/checkUserRoles";
import { sortByDate } from "../../utils/sortByDate";

const useStyles = makeStyles((theme) => ({
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
  search: {
    width: "100%",
  },
  tasksContainer: {
    padding: "10px",
    marginTop: "11px",
  },
  taskTypes: {
    background: "#f8fcfd",
    minHeight: `calc(100vh - ${240}px)`,
    borderRadius: "6px",
    padding: "13px",
    [theme.breakpoints.down("md")]: {
      marginBottom: "13px",
    },
  },
}));

export default function TaskOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredActive, setFilteredActive] = useState([]);
  const [filteredCompleted, setFilteredCompleted] = useState([]);
  const [filteredCampaign, setFilteredCampaign] = useState([]);
  const user = useSelector((state) => state.userData.user);
  const status = useSelector((state) => state.userData.status);

  const classes = useStyles();
  const { data, isLoading } = useQuery("pitches", getAllPitches);

  const sortedActivePitches = () => {
    if (data && data.status) {
      return sortByDate(data.data.active_project);
    }
  };

  const sortedCompletedPitches = () => {
    if (data && data.status) {
      return sortByDate(data.data.waitlist_project);
    }
  };
  const sortedCampaignPitches = () => {
    if (data && data.status) {
      return sortByDate(data.data.campaign_related_project);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const queriedActive = sortedActivePitches().filter((pitch) => {
      return (
        pitch.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pitch.campaign_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    const queriedCompleted = sortedCompletedPitches().filter((pitch) => {
      return (
        pitch.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pitch.campaign_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    const queriedCampaign = sortedCampaignPitches().filter((pitch) => {
      return (
        pitch.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pitch.campaign_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredActive(queriedActive);
    setFilteredCompleted(queriedCompleted);
    setFilteredCampaign(queriedCampaign);
  };

  return (
    <div>
      <CommonHead title={"Pitch Overview"}>
        {/* {status === "success" && !isCommunityAdmin(user) && ( */}
        <div className={classes.create}>
          <Tooltip title="Create New Proposal">
            <Link to="/create">
              <IconButton component="span">
                <AddCircleIcon className={classes.plus} />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
        {/* )} */}
      </CommonHead>
      <CommonBox>
        <Grid container>
          <Grid item xs={12} md={8} lg={5}>
            <TextField
              onChange={handleSearch}
              className={classes.search}
              label="Search Task"
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
          </Grid>
        </Grid>
        <div className={classes.tasksContainer}>
          <Grid container spacing={2} className={classes.taskTypes}>
            {isLoading && <GlobalLoader size={20} color="primary" />}
            {data && data.status && (
              <>
                <TaskContainer
                  task={searchQuery ? filteredActive : sortedActivePitches()}
                  title={"ACTIVE"}
                />
                <TaskContainer
                  task={
                    searchQuery ? filteredCompleted : sortedCompletedPitches()
                  }
                  title={"WAITLIST"}
                />
                <TaskContainer
                  task={
                    searchQuery ? filteredCampaign : sortedCampaignPitches()
                  }
                  title={"CAMPAIGNS"}
                />
              </>
            )}
          </Grid>
        </div>
      </CommonBox>
    </div>
  );
}
