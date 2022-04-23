import {
  Box,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { format } from "date-fns";
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
}));
export default function TimeAndBudgetDetailsBox({ editable }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const status = useSelector((state) => state.pitchData.status);

  return (
    <Grid item xs={6} style={{ paddingRight: ".5rem" }}>
      {status === "success" && (
        <Box
          boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
          border="1px solid #dce5ed"
          style={{ background: "#f8fcff" }}
          borderRadius="6px"
        >
          <Box
            padding="1rem 0"
            textAlign="center"
            style={{ background: "#edf2f7" }}
          >
            <Typography className={classes.heading}>
              TIME AND BUDGET DETAILS
            </Typography>
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
                  Budget
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">{pitchInfo.budget}</Typography>
                )}
                {editable && (
                  <TextField
                    onChange={(e) =>
                      dispatch(
                        setPitchField({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      )
                    }
                    name="budget"
                    value={pitchInfo.budget}
                    className={classes.input}
                    label="Budget"
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 11 },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 11 },
                    }}
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
                  Request Date
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">
                  {pitchInfo.request_date &&
                    format(new Date(pitchInfo.request_date), "dd MMM yyyy")}
                </Typography>
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
                  Delivery Date
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.delivery_date &&
                      format(new Date(pitchInfo.delivery_date), "dd MMM yyyy")}
                  </Typography>
                )}
                {editable && (
                  <TextField
                    onChange={(e) =>
                      dispatch(
                        setPitchField({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      )
                    }
                    name="delivery_date"
                    value={
                      pitchInfo.delivery_date
                        ? format(
                            new Date(pitchInfo.delivery_date),
                            "yyyy-MM-dd"
                          )
                        : null
                    }
                    className={classes.input}
                    label="Delivery Date"
                    variant="outlined"
                    size="small"
                    type="date"
                    InputProps={{
                      style: { fontSize: 11 },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 11 },
                      shrink: true,
                    }}
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
