import React from "react";
import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  Tooltip,
} from "@material-ui/core";

import { movePitchToRecycleBin } from "../../api";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Chip from "@material-ui/core/Chip";
import { useMutation } from "react-query";
import { format } from "date-fns";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: "17px",
    paddingTop: "15px",
    paddingBottom: "25px",
    borderBottom: "1px dashed #a7a7a7",
  },
  title: {
    color: "#414141",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: 1.56,
    padding: "8px 0",
  },
  label: {
    color: "#414141",
    fontSize: "12px",
    lineHeight: 1.5,
  },
  text: {
    fontSize: "14px",
    padding: ".5rem 3.5rem",
  },

  chip: {},
}));

export default function WorkflowSummary() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const { mutateAsync } = useMutation(movePitchToRecycleBin);

  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const pitchTasksDetails = useSelector(
    (state) => state.pitchData.pitchTasksDetails
  );

  const setStatusColor = (status) => {
    switch (status) {
      case "LOST":
        return {
          backgroundColor: "#4B5563",
        };
      case "IN PROGRESS":
        return {
          backgroundColor: "#1C75BB",
        };
      case "LIST SHARED WITH CLIENT":
        return {
          backgroundColor: "#F59E0B",
        };
      case "COMPLETED":
        return {
          backgroundColor: "#059669",
        };
      case "DELAYED":
        return {
          backgroundColor: "#c42f30",
        };
      default:
        return {};
    }
  };
  const handlePitchDelete = async () => {
    try {
      var confirmation = window.confirm(
        `Click 'Ok' to move ${pitchInfo.campaign_given_name} to recycle bin.`
      );
      if (!confirmation) {
        return;
      }
      const response = await mutateAsync(id);
      if (response.status) {
        console.log(response);
        toast.success(response.message);
        history.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  return (
    <Box className={classes.container}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Chip
            className={classes.chip}
            style={setStatusColor(pitchTasksDetails[0].status)}
            label={pitchTasksDetails[0].status}
            color="primary"
          />
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography className={classes.title}>
                <span style={{ fontSize: "14px", fontWeight: 300 }}>
                  Campaign Name:
                </span>{" "}
                {pitchInfo.campaign_given_name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography className={classes.title}>
                <span style={{ fontSize: "14px", fontWeight: 300 }}>
                  Company Name:
                </span>{" "}
                {pitchInfo.company_name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Tooltip title="Delete Pitch">
            <IconButton onClick={handlePitchDelete}>
              <DeleteOutlineIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid
        container
        justify="space-between"
        style={{ marginTop: "1rem", marginBottom: ".5rem" }}
        alignItems="center"
      >
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography className={classes.label}>
                Start Date:{" "}
                <span style={{ fontWeight: 500 }}>
                  {pitchTasksDetails[0].start_date &&
                    format(
                      new Date(pitchTasksDetails[0].start_date),
                      "dd MMM yyyy"
                    )}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            style={{
              border: "1px solid #dce5ed",
              borderRadius: "18px",
              overflow: "hidden",
            }}
          >
            <Grid
              item
              style={{
                background:
                  pitchTasksDetails[0].milestone_name === "Campaign Request"
                    ? "#edf2f7"
                    : null,
              }}
            >
              <Typography className={classes.text}>Campaign Request</Typography>
            </Grid>
            <Grid
              item
              style={{
                borderRight: "1px solid #dce5ed",
                borderLeft: "1px solid #dce5ed",
                background:
                  pitchTasksDetails[0].milestone_name === "List Creation"
                    ? "#edf2f7"
                    : null,
              }}
            >
              <Typography className={classes.text}>List Creation</Typography>
            </Grid>
            <Grid
              item
              style={{
                background:
                  pitchTasksDetails[0].milestone_name === "Campaign Initiation"
                    ? "#edf2f7"
                    : null,
              }}
            >
              <Typography className={classes.text}>
                Campaign Initiation
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography className={classes.label}>
                End Date:{" "}
                <span style={{ fontWeight: 500 }}>
                  {" "}
                  {pitchTasksDetails[0].end_date &&
                    format(
                      new Date(pitchTasksDetails[0].end_date),
                      "dd MMM yyyy"
                    )}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
