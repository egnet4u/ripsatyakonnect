import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import SingleTask from "../SingleTask/SingleTask";
import NoTaskSvg from "../../assets/no-tasks.svg";

const useStyles = makeStyles((theme) => ({
  taskHeader: {
    display: "flex",
    paddingBottom: "12px",
  },
  tasksHeading: {
    fontSize: "12px",
    lineHeight: 1.5,
    color: "rgba(0, 0, 0, 0.8)",
    marginRight: "10px",
  },
  count: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    border: "solid 1px #2e75bb",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    color: "rgba(0, 0, 0, 0.8)",
  },
  noTask: {
    fontSize: "12px",
    lineHeight: 1.5,
    fontFamily: "Poppins",
    color: "rgba(0, 0, 0, 0.8)",
    textAlign: "center",
    width: "88px",
    marginTop: "7.3px",
  },
  scroll: {
    overflowY: "scroll",
    height: `calc(100vh - ${320}px)`,
  },
}));

export default function TaskContainer({ task, title }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={9} md={6} lg={4}>
      <div className={classes.taskHeader}>
        <Typography className={classes.tasksHeading}>{title}</Typography>
        <span className={classes.count}>{task.length}</span>
      </div>
      {task.length === 0 ? (
        <Grid
          style={{ height: "100%" }}
          container
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={NoTaskSvg} alt="No tasks" />
            </div>
            <Typography className={classes.noTask}>
              There are no tasks here.
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.scroll}>
          {task.map((item) => (
            <SingleTask key={item.pitch_id} item={item} />
          ))}
        </div>
      )}
    </Grid>
  );
}
