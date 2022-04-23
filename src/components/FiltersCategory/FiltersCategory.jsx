import React from "react";

import {
  Box,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  IconButton,
  Collapse,
  FormControlLabel,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import { useDispatch, useSelector } from "react-redux";

import { setFilterValues, setCheckbox } from "../../redux/filtersSlice";

const useStyles = makeStyles((theme) => ({
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

  category: {
    fontSize: "10px",
    lineHeight: 1.3,
    color: "#1d172e",
    padding: "8px 11px",
    borderRadius: "16px",
    backgroundColor: "#ece9f5",
    margin: "0.2rem",
  },

  checkboxLabel: {
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

export default function FiltersCategory({ setOpenFirst, openFirst }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tiers = useSelector((state) => state.tierData.tiers);
  const tierStatus = useSelector((state) => state.tierData.status);
  const categories = useSelector((state) => state.categoryData.categories);
  const status = useSelector((state) => state.categoryData.status);
  const filtersData = useSelector((state) => state.filtersData.filters);

  /** Getting the all keys of categories */
  function getCategoryKeys() {
    if (status === "success") {
      return Object.keys(categories);
    }
    return [];
  }
  /** Getting the all subcategories */
  const getSubCategories = () => {
    const subCategories = [];
    if (filtersData.primary_categories) {
      filtersData.primary_categories.forEach((category) => {
        subCategories.push(...categories[category]);
      });
    }
    return subCategories;
  };

  return (
    <Box diplay="flex" margin="15px 0">
      <Box display="flex" alignItems="center">
        <IconButton
          size="small"
          onClick={() => setOpenFirst(!openFirst)}
          aria-label="expand"
        >
          {openFirst ? (
            <Tooltip title="Collapse">
              <RemoveCircleIcon color="primary" />
            </Tooltip>
          ) : (
            <Tooltip title="Expand">
              <AddCircleIcon color="primary" />
            </Tooltip>
          )}
        </IconButton>
        <Typography className={classes.filterCategory}>Category</Typography>
      </Box>
      <Collapse in={openFirst} timeout="auto" unmountOnExit>
        <Box
          marginLeft=".9rem"
          paddingLeft="15px"
          paddingRight="15px"
          borderLeft={openFirst ? "1px solid #2e75bb" : null}
        >
          <Grid container style={{ padding: "1rem 0" }}>
            <Grid item xs={12}>
              <Autocomplete
                value={filtersData.primary_categories}
                limitTags={2}
                name="primary_categories"
                onChange={(e, value) => {
                  dispatch(
                    setFilterValues({
                      name: "primary_categories",
                      value,
                    })
                  );
                  dispatch(
                    setFilterValues({
                      name: "sub_category",
                      value: "",
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
                multiple
                id="tags-outlined-65"
                options={getCategoryKeys()}
                getOptionLabel={(option) => option.toUpperCase()}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    variant="outlined"
                    label="Primary Categories"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                className={classes.checkboxLabel}
                control={
                  <Checkbox
                    checked={!!filtersData.secondary_categories}
                    onChange={(e, value) =>
                      dispatch(
                        setCheckbox({
                          name: "secondary_categories",
                          value,
                        })
                      )
                    }
                    size="small"
                    color="primary"
                  />
                }
                label="Include Secondary Category"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.input}
              >
                <InputLabel className={classes.option} id="sub_category">
                  Sub-Category
                </InputLabel>
                <Select
                  value={
                    filtersData.primary_categories &&
                    filtersData.primary_categories.length !== 0
                      ? filtersData.sub_category
                      : ""
                  }
                  onChange={(e) =>
                    dispatch(
                      setFilterValues({
                        name: "sub_category",
                        value: e.target.value,
                      })
                    )
                  }
                  labelId="sub_category"
                  label="Sub-Category"
                  className={classes.option}
                  name="sub_category"
                >
                  <MenuItem className={classes.option} value="">
                    <em>None</em>
                  </MenuItem>
                  {getSubCategories().map((cat, i) => (
                    <MenuItem
                      key={cat + i}
                      className={classes.option}
                      value={cat}
                    >
                      {cat.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.input}
              >
                <InputLabel className={classes.option} id="tier">
                  Tier
                </InputLabel>
                <Select
                  value={filtersData.tier}
                  onChange={(e) =>
                    dispatch(
                      setFilterValues({
                        name: "tier",
                        value: e.target.value,
                      })
                    )
                  }
                  labelId="tier"
                  label="Tier"
                  className={classes.option}
                  name="tier"
                >
                  <MenuItem className={classes.option} value="">
                    None
                  </MenuItem>
                  {tierStatus === "success" &&
                    tiers.map((t, i) => (
                      <MenuItem
                        key={t.tier + i}
                        className={classes.option}
                        value={i + 1}
                      >
                        {t.tier}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
}
