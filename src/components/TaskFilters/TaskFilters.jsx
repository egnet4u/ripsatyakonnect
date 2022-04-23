import React, { useState } from "react";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
  getFilterSearchResultData,
  resetTypeOfList,
} from "../../redux/filterResultSlice";
import FiltersTab from "../FiltersTab/FiltersTab";
import AddFromListTab from "../AddFromListTab/AddFromListTab";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "10px",
    lineHeight: 1.5,
    letterSpacing: "-0.04px",
  },

  label: {
    "& span": {
      color: "#414141",
      fontSize: "12px",
      lineHeight: 1.5,
    },
  },
  filter: {
    background: "#e7f0f8",
    borderRadius: "6px",
    border: "1px solid #e7f0f8",
    height: `calc(100vh - ${280}px)`,
    overflowY: "scroll",
    padding: "0 5px 2px 7px",
  },

  heading: {
    lineHeight: 1.5,
    fontSize: "12px",
    fontWeight: 500,
    color: "#414141",
    letterSpacing: "-0.04px",
  },
  border: {
    borderBottom: "solid 1px #c7d9e6",
    marginBottom: "1.5rem",
  },
  navBox: {
    cursor: "pointer",
    textAlign: "left",
    marginRight: ".5rem",
    width: "110px",
    display: "flex",
    justifyContent: "center",
    padding: "5px 0",
  },
  navItem: {
    color: "#414141",
    fontSize: "13px",
    lineHeight: 1.5,
  },
}));

export default function TaskFilters({ setIsInfluencersApi }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const filtersData = useSelector((state) => state.filtersData.filters);
  const [activeTab, setActiveTab] = useState("filter");

  const handleApplyFilters = () => {
    //setIsInfluencersApi(false);// "setIsInfluencersApi" is a state which contain a boolean value
    //dispatch(resetTypeOfList());
    dispatch(
      getFilterSearchResultData({
        ...filtersData,
        platforms: pitchInfo.platform,
        //cap: 500,
        //list_name: pitchInfo.list_link,
      })
    );
  };

  return (
    <Grid item xs={12} md={3} className={classes.filter}>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        style={{
          position: "sticky",
          background: "#e7f0f8",
          top: "0px",
          zIndex: 1000,
          padding: "16px 10px 0 10px",
        }}
      >
        <Grid item>
          <Box display="flex">
            <Box
              style={
                activeTab === "filter"
                  ? { borderBottom: "3px solid #2E75BB" }
                  : {}
              }
              className={classes.navBox}
              onClick={() => {
                setActiveTab("filter");
              }}
            >
              <Typography
                style={
                  activeTab === "filter"
                    ? { fontWeight: "bold", color: "#2e75bb" }
                    : null
                }
                className={classes.navItem}
              >
                Find with Filters
              </Typography>
            </Box>
             {//pitchInfo.type_of_campaign[0] === "instagram" && (
               pitchInfo.platforms === "instagram" && (
              <Box
                style={
                  activeTab === "list"
                    ? { borderBottom: "3px solid #2E75BB" }
                    : {}
                }
                className={classes.navBox}
                onClick={() => {
                  setActiveTab("list");
                }}
              >
                <Typography
                  style={
                    activeTab === "list"
                      ? { fontWeight: "bold", color: "#2e75bb" }
                      : null
                  }
                  className={classes.navItem}
                >
                  Add a list
                </Typography>
              </Box>
            )} 
            
            {/* //When we get  a type of campaign then above code show// */}
            <Box
                style={
                  activeTab === "list"
                    ? { borderBottom: "3px solid #2E75BB" }
                    : {}
                }
                className={classes.navBox}
                onClick={() => {
                  setActiveTab("list");
                }}
              >
                <Typography
                  style={
                    activeTab === "list"
                      ? { fontWeight: "bold", color: "#2e75bb" }
                      : null
                  }
                  className={classes.navItem}
                >
                  Add a list
                </Typography>
            </Box>  
            
          </Box>
        </Grid>
        <Grid item>
          {activeTab === "filter" && (
            <Button
              onClick={handleApplyFilters}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Apply
            </Button>
          )}
        </Grid>
      </Grid>
      <Box className={classes.border}></Box>
      {activeTab === "filter" && <FiltersTab />}
      {activeTab === "list" && <AddFromListTab />}
    </Grid>
  );
}
