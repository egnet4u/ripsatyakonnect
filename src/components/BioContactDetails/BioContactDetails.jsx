import { Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../redux/influencerInfoSlice";
import { Autocomplete } from "@material-ui/lab";

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
  autocomplete: {
    "& label": {
      fontSize: "11px",
    },
    "& fieldset": {
      fontSize: "11px",
    },
  },
  options: {
    fontSize: "11px",
  },
}));

export default function BioContactDetails() {
  const influencerData = useSelector((state) => state.influencerInfoData.data);
  const dispatch = useDispatch();
  const classes = useStyles();
  const countries = useSelector((state) => state.countryData.countries);
  const states = useSelector((state) => state.stateData.states);
  const cities = useSelector((state) => state.cityData.cities);

  return (
    <Accordion elevation={0} classes={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography className={classes.heading}>CONTACT DETAILS</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              value={influencerData.email}
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              name="email"
              className={classes.input}
              label="Email"
              variant="outlined"
              size="small"
              type="text"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              value={influencerData.phone}
              name="phone"
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className={classes.input}
              label="Phone"
              variant="outlined"
              size="small"
              type="text"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
          </Grid>

          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              value={influencerData.scraper_email}
              name="scraper_email"
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className={classes.input}
              label="Channel Email"
              variant="outlined"
              size="small"
              type="text"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              value={influencerData.scraper_phone}
              name="scraper_phone"
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className={classes.input}
              label="Channel Phone"
              variant="outlined"
              size="small"
              type="text"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              value={influencerData.alternate_email}
              name="alternate_email"
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className={classes.input}
              label="Alt. Email"
              variant="outlined"
              size="small"
              type="text"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              value={influencerData.alternate_phone}
              name="alternate_phone"
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className={classes.input}
              label="Alt. Phone"
              variant="outlined"
              size="small"
              type="text"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              value={influencerData.address}
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              name="address"
              className={classes.input}
              label="Address"
              variant="outlined"
              size="small"
              type="text"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              value={influencerData.pincode}
              name="pincode"
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className={classes.input}
              label="Pincode"
              variant="outlined"
              size="small"
              type="text"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <Autocomplete
              value={influencerData.country}
              limitTags={2}
              name="country"
              onChange={(e, value) => {
                dispatch(
                  updateField({
                    name: "country",
                    value: value,
                  })
                );
              }}
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
              id="tags-outlined-889"
              options={countries.map((country) => country.name)}
              getOptionLabel={(option) => option.toUpperCase()}
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  variant="outlined"
                  label="Country"
                />
              )}
            />
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <Autocomplete
              value={influencerData.state}
              limitTags={2}
              name="state"
              onChange={(e, value) =>
                dispatch(
                  updateField({
                    name: "state",
                    value: value,
                  })
                )
              }
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
              id="tags-outlined-889"
              options={states.map((state) => state.name)}
              getOptionLabel={(option) => option.toUpperCase()}
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  variant="outlined"
                  label="State"
                />
              )}
            />
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <Autocomplete
              value={influencerData.city}
              limitTags={2}
              name="city"
              onChange={(e, value) =>
                dispatch(
                  updateField({
                    name: "city",
                    value: value,
                  })
                )
              }
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
              id="tags-outlined-889"
              options={cities.map((city) => city.name)}
              getOptionLabel={(option) => option.toUpperCase()}
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  variant="outlined"
                  label="City"
                />
              )}
            />
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              value={influencerData.region}
              name="region"
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className={classes.input}
              label="Region"
              variant="outlined"
              size="small"
              type="text"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
