import { Grid, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../../redux/createPitchSlice";
import TabPanel from "../TabPanel/TabPanel";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
  },
}));
export default function TimeBudgetDetailsTab({ value, index }) {
  const classes = useStyles();
  const data = useSelector((state) => state.createPitchData.data);
  const dispatch = useDispatch();

  return (
    <TabPanel value={value} index={index}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TextField
            name="budget"
            value={data.budget}
            onChange={(e) =>
              dispatch(setField({ name: e.target.name, value: e.target.value }))
            }
            className={classes.input}
            label="Budget"
            variant="outlined"
            size="small"
            type="number"
            InputProps={{
              style: { fontSize: 11 },
            }}
            InputLabelProps={{ style: { fontSize: 11 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TextField
            name="request_date"
            value={data.request_date}
            onChange={(e) =>
              dispatch(setField({ name: e.target.name, value: e.target.value }))
            }
            className={classes.input}
            label="Request Date"
            variant="outlined"
            size="small"
            type="date"
            InputProps={{
              style: { fontSize: 11 },
            }}
            InputLabelProps={{ style: { fontSize: 11 }, shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TextField
            name="delivery_date"
            value={data.delivery_date}
            onChange={(e) =>
              dispatch(setField({ name: e.target.name, value: e.target.value }))
            }
            className={classes.input}
            label="Delivery Date"
            variant="outlined"
            size="small"
            type="date"
            InputProps={{
              style: { fontSize: 11 },
            }}
            InputLabelProps={{ style: { fontSize: 11 }, shrink: true }}
          />
        </Grid>
      </Grid>
    </TabPanel>
  );
}
