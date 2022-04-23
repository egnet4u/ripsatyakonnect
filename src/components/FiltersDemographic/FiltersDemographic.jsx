import React from "react";

import {
  Box,
  FormControl,
  Grid,
  makeStyles,
  Typography,
  Checkbox,
  IconButton,
  Collapse,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Tooltip,
  TextField,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import { useDispatch, useSelector } from "react-redux";
import {
  setFilterValues,
  setLanguage,
  setMutlipleCheckbox,
} from "../../redux/filtersSlice";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  label: {
    "& span": {
      color: "#414141",
      fontSize: "12px",
      lineHeight: 1.5,
    },
  },

  filterCategory: {
    letterSpacing: "-0.04px",
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#414141",
  },

  input: {
    width: "100%",
    background: "#fff",
    margin: "0.5rem 0",
  },
  option: {
    fontSize: "11px",
  },

  name: {
    letterSpacing: "-0.04px",
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#2e75bb",
  },

  checkbox: {
    position: "absolute",
    top: -20,
    left: -10,
  },

  control: {
    "& span": {
      fontSize: "11px",
      lineHeight: 1.5,
    },
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

  options: {
    fontSize: "11px",
  },
}));

export default function FiltersDemographic({ setOpenThird, openThird }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filtersData = useSelector((state) => state.filtersData.filters);
  const languages = useSelector((state) => state.languageData.languages);
  const languageStatus = useSelector((state) => state.languageData.status);

  return (
    <Box diplay="flex" margin="15px 0">
      <Box display="flex" alignItems="center">
        <IconButton
          size="small"
          onClick={() => setOpenThird(!openThird)}
          aria-label="expand"
        >
          {openThird ? (
            <Tooltip title="Collapse">
              <RemoveCircleIcon color="primary" />
            </Tooltip>
          ) : (
            <Tooltip title="Expand">
              <AddCircleIcon color="primary" />
            </Tooltip>
          )}
        </IconButton>
        <Typography className={classes.filterCategory}>Demographic</Typography>
      </Box>
      <Collapse in={openThird} timeout="auto" unmountOnExit>
        <Box
          marginLeft=".9rem"
          paddingLeft="15px"
          paddingRight="15px"
          borderLeft={openThird ? "1px solid #2e75bb" : null}
        >
          <Grid container style={{ padding: "1rem 0" }}>
            <Grid item xs={12}>
              <Autocomplete
                style={{ margin: "0.5rem 0" }}
                limitTags={2}
                name="language"
                onChange={(e, value) =>
                  dispatch(
                    setLanguage({
                      name: "language",
                      value,
                    })
                  )
                }
                value={filtersData.language[0]}
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
                options={
                  languageStatus === "success"
                    ? //languages.map((lang) => lang.name)
                    languages.map((lang) => lang.language)
                    : []
                }
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    variant="outlined"
                    label="Language"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                style={{ margin: "0.5rem 0" }}
                limitTags={2}
                name="gender"
                onChange={(e, value) =>
                  dispatch(
                    setFilterValues({
                      name: "gender",
                      value,
                    })
                  )
                }
                value={filtersData.gender}
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
                id="tags-out"
                options={[
                  "female",
                  "male",
                  "couple",
                  "non-binary",
                  "not-applicable",
                ]}
                getOptionLabel={(option) => option.toUpperCase()}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    variant="outlined"
                    label="Gender"
                  />
                )}
              />
            </Grid>
            <Grid item xs="12">
              <FormControl component="fieldset" style={{ margin: "0.5rem 0" }}>
                <FormLabel
                  component="legend"
                  className={classes.option}
                  style={{ color: "#414141" }}
                >
                  Available Contact Details
                </FormLabel>
                <FormGroup>
                  <Box display="flex">
                    <FormControlLabel
                      className={classes.control}
                      control={
                        <Checkbox
                          size="small"
                          color="primary"
                          onChange={(e, value) =>
                            dispatch(
                              setMutlipleCheckbox({
                                name: "available_contact_options",
                                checked: value,
                                value: e.target.value,
                              })
                            )
                          }
                          checked={
                            filtersData.available_contact_options
                              ? filtersData.available_contact_options.includes(
                                  "email"
                                )
                              : false
                          }
                          name="email"
                          value="email"
                        />
                      }
                      label="Email"
                    />
                    <FormControlLabel
                      className={classes.control}
                      control={
                        <Checkbox
                          size="small"
                          color="primary"
                          onChange={(e, value) =>
                            dispatch(
                              setMutlipleCheckbox({
                                name: "available_contact_options",
                                checked: value,
                                value: e.target.value,
                              })
                            )
                          }
                          checked={
                            filtersData.available_contact_options
                              ? filtersData.available_contact_options.includes(
                                  "phone"
                                )
                              : false
                          }
                          name="phone"
                          value="phone"
                        />
                      }
                      label="Phone"
                    />
                  </Box>
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
}
