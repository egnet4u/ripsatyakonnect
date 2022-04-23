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
export default function StatusBox({ editable }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const status = useSelector((state) => state.pitchData.status);
  return (
    <Grid item xs={6} style={{ paddingLeft: ".5rem" }}>
      {status === "success" && (
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
            <Typography className={classes.heading}>STATUS </Typography>
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
                  Sales Status
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.status_sales}
                  </Typography>
                )}
                {editable && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(setPitchField({ name: "status_sales", value }))
                    }
                    value={pitchInfo.status_sales}
                    limitTags={2}
                    name="status_sales"
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
                    id="status_sales"
                    options={["waiting clarity", "sent to client"]}
                    getOptionLabel={(option) => option.toUpperCase()}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Sales Status"
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
                  Internal Status
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.status_internal}
                  </Typography>
                )}
                {editable && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(
                        setPitchField({ name: "status_internal", value })
                      )
                    }
                    value={pitchInfo.status_internal}
                    limitTags={2}
                    name="status_internal"
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
                    id="status_internal"
                    options={["assigned", "wip", "need clarity", "complete"]}
                    getOptionLabel={(option) => option.toUpperCase()}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Internal Status"
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
                  Final Status
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.status_final}
                  </Typography>
                )}
                {editable && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(setPitchField({ name: "status_final", value }))
                    }
                    value={pitchInfo.status_final}
                    limitTags={2}
                    name="status_final"
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
                    id="status_final"
                    options={["won", "lost"]}
                    getOptionLabel={(option) => option.toUpperCase()}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Final Status"
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
