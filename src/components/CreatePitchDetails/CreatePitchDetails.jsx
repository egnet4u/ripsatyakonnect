import { Grid, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../../redux/createPitchSlice";
import CreatePitchTabs from "../CreatePitchTabs/CreatePitchTabs";

const useStyles = makeStyles((theme) => ({
  common: {
    padding: "31px 0 18.5px 17px",
  },
  input: {
    width: "100%",
  },
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
  },
}));

export default function CreatePitchDetails() {
  const data = useSelector((state) => state.createPitchData.data);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.common} alignItems="center">
        <Grid item xs={7} sm={8}>
          {/* campaign name input field */}
          <TextField
            value={data.campaign_given_name}
            name="campaign_given_name"
            onChange={(e) =>
              dispatch(setField({ name: e.target.name, value: e.target.value }))
            }
            className={classes.input}
            label="Campaign Name"
            variant="outlined"
            size="small"
            type="text"
            InputProps={{
              style: { fontSize: 11 },
            }}
            InputLabelProps={{ style: { fontSize: 11 }, required: true }}
          />
        </Grid>
      </Grid>
      {/* Another component that is "CreatePitchTabs"  */}
      <CreatePitchTabs />
    </div>
  );
}
