import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TabPanel from "../TabPanel/TabPanel";
import { rejectTask, updateTask } from "../../api";
import { useParams } from "react-router-dom";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { format } from "date-fns";
import { useMutation } from "react-query";

import { getPitchTasksDetailsData } from "../../redux/taskPageSlice";
import { Suspense } from "react";
import { toast } from "react-toastify";
const WorkflowSummary = React.lazy(() =>
  import("../WorkflowSummary/WorkflowSummary")
);

const Accordion = withStyles({
  root: {
    border: "1px solid #dce5ed",
    borderRadius: "6px",
    backgroundColor: "#edf2f7",
    boxShadow: "none",
    marginBottom: "20px",

    "&:not(:last-child)": {
      borderBottom: "1px solid #dce5ed",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
      marginBottom: "20px",
      borderBottom: "1px solid #dce5ed",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "#edf2f7",
    borderBottom: "1px solid #dce5ed",
    borderRadius: "6px",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: "#f8fcff",
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  box: {
    // height: `calc(100vh - ${265}px)`,
    paddingTop: "20.5px",
  },
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

  chip: {},
  root: {
    width: "100%",
    marginTop: "21px",
  },
  heading: {
    fontSize: "14px",
    lineHeight: 1.36,
    color: "#414141",
  },
  statsHeading: {
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#414141",
  },

  row: {
    padding: "15px",
  },

  completeButton: {
    fontSize: "11px",
  },
}));

export default function TaskWorkflowTab({ value, index }) {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { mutateAsync: mutateAsyncUpdateTask, isLoading: isLoadingUpdateTask } =
    useMutation(updateTask);
  const {
    mutateAsync: mutateAsyncRejectTaskSeniorTeam,
    isLoading: isLoadingRejectTaskSeniorTeam,
  } = useMutation(rejectTask);
  const {
    mutateAsync: mutateAsyncRejectTaskClientTeam,
    isLoading: isLoadingRejectTaskClientTeam,
  } = useMutation(rejectTask);
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const status = useSelector((state) => state.pitchData.status);
  const pitchTasksDetails = useSelector(
    (state) => state.pitchData.pitchTasksDetails
  );
  const taskStatus = useSelector((state) => state.pitchData.taskStatus);

  const setTaskStatusColor = (status) => {
    switch (status) {
      case "LOST":
        return {
          color: "#4B5563",
        };
      case "IN PROGRESS":
        return {
          color: "#1C75BB",
        };
      case "LIST SHARED WITH CLIENT":
        return {
          color: "#F59E0B",
        };
      case "COMPLETED":
        return {
          color: "#059669",
        };
      case "DELAYED":
        return {
          color: "#c42f30",
        };
      case "REJECTED":
        return {
          color: "#c42f30",
        };
      case "NOT STARTED":
        return {
          color: "#9CA3AF",
        };
      default:
        return {};
    }
  };

  function allTasks() {
    if (taskStatus === "success") {
      return pitchTasksDetails[0].task_details.slice(0).sort((a, b) => {
        return a.task_id - b.task_id;
      });
    } else {
      return [];
    }
  }

  function campaignRequestTasks() {
    if (taskStatus === "success") {
      return pitchTasksDetails[0].task_details
        .filter((task) => task.milestone_name === "Campaign Request")
        .sort((a, b) => {
          return a.task_id - b.task_id;
        });
    } else {
      return [];
    }
  }
  function ListCreationTasks() {
    if (taskStatus === "success") {
      return pitchTasksDetails[0].task_details
        .filter((task) => task.milestone_name === "List Creation")
        .sort((a, b) => {
          return a.task_id - b.task_id;
        });
    } else {
      return [];
    }
  }
  function campaignInitiationTasks() {
    if (taskStatus === "success") {
      return pitchTasksDetails[0].task_details
        .filter((task) => task.milestone_name === "Campaign Initiation")
        .sort((a, b) => {
          return a.task_id - b.task_id;
        });
    } else {
      return [];
    }
  }

  function hideButton(id, tasks) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task_id === id) {
        if (tasks[i].status === "COMPLETED" || tasks[i].status === "REJECTED") {
          return true;
        } else if (
          tasks[i].task_name === "Influencer Outreach- Cost and Intent" ||
          tasks[i].task_name === "Content Go-Live"
        ) {
          if (
            tasks[i - 2].status === "COMPLETED" ||
            tasks[i - 2].status === "REJECTED"
          ) {
            return false;
          } else {
            return true;
          }
        } else if (tasks[i].task_name === "Senior Team Approval") {
          if (
            (tasks[i - 1].status === "COMPLETED" ||
              tasks[i - 1].status === "REJECTED") &&
            (tasks[i - 2].status === "COMPLETED" ||
              tasks[i - 2].status === "REJECTED")
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          if (
            tasks[i - 1].status === "REJECTED" ||
            tasks[i - 1].status === "COMPLETED"
          ) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  }

  function disabledButton() {
    if (status === "success") {
      if (pitchInfo.internal_lead) {
        return false;
      }
      return false;
    }
  }

  const handleUpdateTask = async (level) => {
    try {
      var confirmation = window.confirm(
        `Click 'Ok' to complete task ${level}.`
      );
      if (!confirmation) {
        return;
      }
      const response = await mutateAsyncUpdateTask({
        task_id: level,
        project_id: id,
        campaign_name: pitchInfo.campaign_given_name,
        update_id: 0,
      });
      if (response.status) {
        toast.success(response.message);
        dispatch(getPitchTasksDetailsData(id));
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleRejectTask = async (level, name) => {
    try {
      var confirmation = window.confirm(`Click 'Ok' to reject task ${level}.`);
      if (!confirmation) {
        return;
      }
      if (name === "Senior Team Approval") {
        const response = await mutateAsyncRejectTaskSeniorTeam({
          task_id: level,
          project_id: id,
          campaign_name: pitchInfo.campaign_given_name,
          update_id: 1,
        });
        if (response.status) {
          toast.success(response.message);
          dispatch(getPitchTasksDetailsData(id));
        }
      }
      if (name === "Client Approval") {
        const response = await mutateAsyncRejectTaskClientTeam({
          task_id: level,
          project_id: id,
          campaign_name: pitchInfo.campaign_given_name,
          update_id: 2,
        });

        if (response.status) {
          toast.success(response.message);
          dispatch(getPitchTasksDetailsData(id));
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  return (
    <TabPanel pad={"0px"} value={value} index={index}>
      <Suspense fallback={<CircularProgress size={20} color="inherit" />}>
        {taskStatus === "success" && status === "success" && (
          <WorkflowSummary />
        )}
      </Suspense>
      {taskStatus === "loading" && (
        <CircularProgress size={20} color="inherit" />
      )}
      {taskStatus === "success" && (
        <div className={classes.box}>
          <Box>
            <Grid container justify="space-around" className={classes.row}>
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={1}>
                    <Typography
                      className={classes.statsHeading}
                      variant="caption"
                    >
                      #
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      className={classes.statsHeading}
                      variant="caption"
                    >
                      Tasks
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography
                      className={classes.statsHeading}
                      variant="caption"
                    >
                      Days
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={1}>
                <Typography className={classes.statsHeading} variant="caption">
                  Start Date
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography className={classes.statsHeading} variant="caption">
                  End Date
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.statsHeading} variant="caption">
                  Responsible
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography className={classes.statsHeading} variant="caption">
                  Status
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.statsHeading} variant="caption">
                  Actions
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Accordion
            elevation={0}
            classes={classes.accordion}
            defaultExpanded={
              pitchTasksDetails[0].milestone_name === "Campaign Request"
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {`Campaign Request - ${
                  campaignRequestTasks().length
                } Tasks`.toUpperCase()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box width="100%">
                {campaignRequestTasks().map((task) => (
                  <Box
                    key={task.task_id}
                    component={Paper}
                    margin="1rem 0"
                    elevation={0}
                    boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
                    border="1px solid #dce5ed"
                  >
                    <Grid
                      container
                      justify="space-around"
                      className={classes.row}
                    >
                      <Grid item xs={3}>
                        <Grid container>
                          <Grid item xs={1}>
                            <Typography variant="caption">
                              {task.task_id}
                            </Typography>
                          </Grid>
                          <Grid item xs={10}>
                            <Typography
                              variant="caption"
                              className={classes.statsHeading}
                            >
                              {task.task_name}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography variant="caption">
                              {task.baselineDays}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant="caption">
                          {task.start_date &&
                            format(new Date(task.start_date), "dd MMM yyyy")}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant="caption">
                          {task.end_date &&
                            format(new Date(task.end_date), "dd MMM yyyy")}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        {/* <Typography variant="caption">
                        {task.responsible.length !== 0 &&
                          task.responsible.map((manager) => (
                            <Box key={manager}>{manager}</Box>
                          ))}
                      </Typography> */}
                      </Grid>

                      <Grid item xs={1}>
                        <Typography
                          variant="caption"
                          style={setTaskStatusColor(task.status)}
                        >
                          {task.status}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Grid container>
                          {!hideButton(task.task_id, allTasks()) && (
                            <Grid item>
                              <Button
                                size="small"
                                onClick={() => handleUpdateTask(task.task_id)}
                                disabled={disabledButton()}
                                color="primary"
                                className={classes.completeButton}
                                variant="contained"
                              >
                                Complete{" "}
                                {isLoadingUpdateTask && (
                                  <CircularProgress
                                    style={{
                                      color: "#fff",
                                      marginLeft: "0.3rem",
                                    }}
                                    size={13}
                                  />
                                )}
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={0}
            defaultExpanded={
              pitchTasksDetails[0].milestone_name === "List Creation"
            }
            classes={classes.accordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {`List Creation - ${
                  ListCreationTasks().length
                } Tasks`.toUpperCase()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box width="100%">
                {ListCreationTasks().map((task) => (
                  <Box
                    key={task.task_id}
                    component={Paper}
                    margin="1rem 0"
                    elevation={0}
                    boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
                    border="1px solid #dce5ed"
                  >
                    <Grid
                      container
                      justify="space-around"
                      className={classes.row}
                    >
                      <Grid item xs={3}>
                        <Grid container>
                          <Grid item xs={1}>
                            <Typography variant="caption">
                              {task.task_id}
                            </Typography>
                          </Grid>
                          <Grid item xs={10}>
                            <Typography
                              variant="caption"
                              className={classes.statsHeading}
                            >
                              {task.task_name}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography variant="caption">
                              {task.baselineDays}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant="caption">
                          {task.start_date &&
                            format(new Date(task.start_date), "dd MMM yyyy")}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant="caption">
                          {task.end_date &&
                            format(new Date(task.end_date), "dd MMM yyyy")}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        {/* <Typography variant="caption">
                          {task.responsible.length !== 0 &&
                            task.responsible.map((manager) => (
                              <Box key={manager}>{manager}</Box>
                            ))}
                        </Typography> */}
                      </Grid>

                      <Grid item xs={1}>
                        <Typography
                          variant="caption"
                          style={setTaskStatusColor(task.status)}
                        >
                          {task.status}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        {!hideButton(task.task_id, allTasks()) && (
                          <Grid container>
                            <Grid item>
                              <Button
                                size="small"
                                onClick={() => handleUpdateTask(task.task_id)}
                                style={{ margin: ".3rem 1rem" }}
                                disabled={disabledButton()}
                                color="primary"
                                className={classes.completeButton}
                                variant="contained"
                              >
                                {task.task_name === "Senior Team Approval" ||
                                task.task_name === "Client Approval"
                                  ? "Accept"
                                  : "Complete"}{" "}
                                {isLoadingUpdateTask && (
                                  <CircularProgress
                                    style={{
                                      color: "#fff",
                                      marginLeft: "0.3rem",
                                    }}
                                    size={13}
                                  />
                                )}
                              </Button>
                            </Grid>
                            <Grid item>
                              {(task.task_name === "Senior Team Approval" ||
                                task.task_name === "Client Approval") && (
                                <Button
                                  size="small"
                                  onClick={() =>
                                    handleRejectTask(
                                      task.task_id,
                                      task.task_name
                                    )
                                  }
                                  style={{ margin: ".3rem 1rem" }}
                                  className={classes.completeButton}
                                  disabled={disabledButton()}
                                  color="secondary"
                                  variant="contained"
                                >
                                  Reject{" "}
                                  {(isLoadingRejectTaskSeniorTeam ||
                                    isLoadingRejectTaskClientTeam) && (
                                    <CircularProgress
                                      style={{
                                        color: "#fff",
                                        marginLeft: "0.3rem",
                                      }}
                                      size={13}
                                    />
                                  )}
                                </Button>
                              )}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={0}
            defaultExpanded={
              pitchTasksDetails[0].milestone_name === "Campaign Initiation"
            }
            classes={classes.accordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {`Campaign Initiation - ${
                  campaignInitiationTasks().length
                } Tasks`.toUpperCase()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box width="100%">
                {campaignInitiationTasks().map((task) => (
                  <Box
                    key={task.task_id}
                    component={Paper}
                    margin="1rem 0"
                    elevation={0}
                    boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
                    border="1px solid #dce5ed"
                  >
                    <Grid
                      container
                      justify="space-around"
                      className={classes.row}
                    >
                      <Grid item xs={3}>
                        <Grid container>
                          <Grid item xs={1}>
                            <Typography variant="caption">
                              {task.task_id}
                            </Typography>
                          </Grid>
                          <Grid item xs={10}>
                            <Typography
                              variant="caption"
                              className={classes.statsHeading}
                            >
                              {task.task_name}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography variant="caption">
                              {task.baselineDays}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant="caption">
                          {task.start_date &&
                            format(new Date(task.start_date), "dd MMM yyyy")}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant="caption">
                          {task.end_date &&
                            format(new Date(task.end_date), "dd MMM yyyy")}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        {/* <Typography variant="caption">
                          {task.responsible.length !== 0 &&
                            task.responsible.map((manager) => (
                              <Box key={manager}>{manager}</Box>
                            ))}
                        </Typography> */}
                      </Grid>

                      <Grid item xs={1}>
                        <Typography
                          style={setTaskStatusColor(task.status)}
                          variant="caption"
                        >
                          {task.status}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Grid container>
                          {!hideButton(task.task_id, allTasks()) && (
                            <Grid item>
                              <Button
                                size="small"
                                onClick={() => handleUpdateTask(task.task_id)}
                                disabled={disabledButton()}
                                color="primary"
                                className={classes.completeButton}
                                variant="contained"
                              >
                                Complete{" "}
                                {isLoadingUpdateTask && (
                                  <CircularProgress
                                    style={{
                                      color: "#fff",
                                      marginLeft: "0.3rem",
                                    }}
                                    size={13}
                                  />
                                )}
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </TabPanel>
  );
}
