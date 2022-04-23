import {
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../redux/influencerInfoSlice";

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
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
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
  inputItem: {
    padding: theme.spacing(1),
  },
  bold: {
    color: "#414141",
    fontSize: "10px",
    lineHeight: 1.6,
    fontWeight: "bold",
    marginRight: "3px",
  },
  border: {
    [theme.breakpoints.up("sm")]: {
      borderRight: ".5px solid #b9cfe5",
    },
  },
}));
export default function BioChildrenDetails() {
  const influencerData = useSelector((state) => state.influencerInfoData.data);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Accordion elevation={0} classes={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>CHILDREN DETAILS</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3} className={classes.inputItem}>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel className={classes.option} id="no_of_child">
                No. of Children
              </InputLabel>
              <Select
                value={influencerData.number_of_children}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                labelId="no_of_child"
                label="No. of Children"
                className={classes.option}
                name="number_of_children"
              >
                <MenuItem className={classes.option} value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem className={classes.option} value={"1"}>
                  1
                </MenuItem>
                <MenuItem className={classes.option} value={"2"}>
                  2
                </MenuItem>
                <MenuItem className={classes.option} value={"3"}>
                  3
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {influencerData.number_of_children >= 1 && (
            <Grid
              className={classes.inputItem}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <TextField
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                value={
                  influencerData.dob_of_child_1
                    ? format(
                        new Date(influencerData.dob_of_child_1),
                        "yyyy-MM-dd"
                      )
                    : null
                }
                name="dob_child_1"
                className={classes.input}
                label="DOB of Child 1"
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
            </Grid>
          )}
          {influencerData.number_of_children >= 2 && (
            <Grid
              className={classes.inputItem}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <TextField
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                value={
                  influencerData.dob_of_child_2
                    ? format(
                        new Date(influencerData.dob_of_child_2),
                        "yyyy-MM-dd"
                      )
                    : null
                }
                name="dob_child_2"
                className={classes.input}
                label="DOB of Child 2"
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
            </Grid>
          )}
          {influencerData.number_of_children >= 3 && (
            <Grid
              className={classes.inputItem}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <TextField
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                value={
                  influencerData.dob_of_child_3
                    ? format(
                        new Date(influencerData.dob_of_child_3),
                        "yyyy-MM-dd"
                      )
                    : null
                }
                name="dob_of_child_3"
                className={classes.input}
                label="DOB of Child 3"
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
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
