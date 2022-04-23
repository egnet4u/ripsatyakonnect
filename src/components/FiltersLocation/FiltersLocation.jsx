import React from "react";

import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Typography,
  IconButton,
  Collapse,
  Tooltip,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import { useDispatch, useSelector } from "react-redux";
import { getCityData } from "../../redux/citySlice";
import { getStateData } from "../../redux/stateSlice";
import { setFilterValues, resetValues } from "../../redux/filtersSlice";

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
export default function FiltersLocation({ openSecond, setOpenSecond }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filtersData = useSelector((state) => state.filtersData.filters);

  const countries = useSelector((state) => state.countryData.countries);
  const states = useSelector((state) => state.stateData.states);
  const cities = useSelector((state) => state.cityData.cities);

  const handleCountrySelect = (name) => {
    if (!name) {
      dispatch(resetValues({ name: "country" }));
      dispatch(resetValues({ name: "state" }));
      dispatch(resetValues({ name: "city" }));
    } else {
      dispatch(resetValues({ name: "state" }));
      dispatch(resetValues({ name: "city" }));
      const found = countries.find((country) => country.name === name);
      dispatch(getStateData(found.iso2));
      dispatch(getCityData(found.iso2));
      dispatch(
        setFilterValues({
          name: "country",
          value: found.name,
        })
      );
    }
  };
  return (
    <Box diplay="flex" margin="15px 0">
      <Box display="flex" alignItems="center">
        <IconButton
          size="small"
          onClick={() => setOpenSecond(!openSecond)}
          aria-label="expand"
        >
          {openSecond ? (
            <Tooltip title="Collapse">
              <RemoveCircleIcon color="primary" />
            </Tooltip>
          ) : (
            <Tooltip title="Expand">
              <AddCircleIcon color="primary" />
            </Tooltip>
          )}
        </IconButton>
        <Typography className={classes.filterCategory}>Location</Typography>
      </Box>
      <Collapse in={openSecond} timeout="auto" unmountOnExit>
        <Box
          marginLeft=".9rem"
          paddingLeft="15px"
          paddingRight="15px"
          borderLeft={openSecond ? "1px solid #2e75bb" : null}
        >
          <Grid container style={{ padding: "1rem 0" }}>
            <Grid item xs={12}>
              <Autocomplete
                style={{ margin: "0.5rem 0" }}
                value={filtersData.country}
                limitTags={2}
                name="country"
                onChange={(e, value) => handleCountrySelect(value)}
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
            <Grid item xs={12}>
              <Autocomplete
                style={{ margin: "0.5rem 0" }}
                value={filtersData.state}
                limitTags={2}
                name="state"
                onChange={(e, value) =>
                  dispatch(
                    setFilterValues({
                      name: "state",
                      value,
                    })
                  )
                }
                multiple
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
                id="tags-outlined-999"
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
            <Grid item xs={12}>
              <Autocomplete
                style={{ margin: "0.5rem 0" }}
                value={filtersData.city}
                limitTags={2}
                name="city"
                onChange={(e, value) =>
                  dispatch(
                    setFilterValues({
                      name: "city",
                      value,
                    })
                  )
                }
                multiple
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
                id="tags-outlined-44"
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
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
}
