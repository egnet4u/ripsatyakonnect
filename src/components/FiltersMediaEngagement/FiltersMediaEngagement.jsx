import React from "react";

import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Typography,
  IconButton,
  Collapse,
  Slider,
  Tooltip,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import { useDispatch, useSelector } from "react-redux";

import {
  setMinMaxRange,
  setRangeOnInputChange,
} from "../../redux/filtersSlice";

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

  range: {
    fontSize: "10px",
    lineHeight: 1.6,
    fontWeight: 600,
    letterSpacing: "-0.04px",
    color: "#414141",
  },
}));

function valuetext(value) {
  return `${value}`;
}

export default function FiltersMediaEngagement({ openFourth, setOpenFourth }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filtersData = useSelector((state) => state.filtersData.filters);
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);

  const handleRangeChange = (event, newValue, name) => {
    dispatch(setMinMaxRange({ value: newValue, name }));
  };
  const handleInputRangeChange = (e, type) => {
    dispatch(
      setRangeOnInputChange({
        type,
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  return (
    <>
      <Box diplay="flex" margin="15px 0">
        <Box display="flex" alignItems="center">
          <IconButton
            size="small"
            onClick={() => setOpenFourth(!openFourth)}
            aria-label="expand"
          >
            {openFourth ? (
              <Tooltip title="Collapse">
                <RemoveCircleIcon color="primary" />
              </Tooltip>
            ) : (
              <Tooltip title="Expand">
                <AddCircleIcon color="primary" />
              </Tooltip>
            )}
          </IconButton>
          <Typography className={classes.filterCategory}>
            Media Engagement
          </Typography>
        </Box>
        <Collapse in={openFourth} timeout="auto" unmountOnExit>
          <Box
            marginLeft=".9rem"
            paddingLeft="15px"
            paddingRight="15px"
            borderLeft={openFourth ? "1px solid #2e75bb" : null}
          >
            {/* When type of campaign get then data shows like youtube and instagram
             only intagram part show */}

            {/* 
            {pitchInfo.type_of_campaign[0] === "youtube" && (
              <Grid container style={{ padding: "1rem 0" }}>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Subscribers
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="subscribers"
                              value={
                                filtersData.min_subscribers
                                  ? filtersData.min_subscribers
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="subscribers"
                              value={
                                filtersData.max_subscribers
                                  ? filtersData.max_subscribers
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_subscribers
                        ? filtersData.min_subscribers
                        : 0,
                      filtersData.max_subscribers
                        ? filtersData.max_subscribers
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "subscribers")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={6000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>
                      60,00,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Age Range
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="age"
                              value={
                                filtersData.min_age ? filtersData.min_age : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="age"
                              value={
                                filtersData.max_age ? filtersData.max_age : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_age ? filtersData.min_age : 0,
                      filtersData.max_age ? filtersData.max_age : 0,
                    ]}
                    onChange={(e, value) => handleRangeChange(e, value, "age")}
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={1}
                    max={100}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>100</Typography>
                  </Box>
                </Grid>
              </Grid>
            )} */}
            {//pitchInfo.type_of_campaign[0] === "instagram" && (
              <Grid container style={{ padding: "1rem 0" }}>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Followers
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="followers"
                              value={
                                filtersData.min_followers
                                  ? filtersData.min_followers
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="followers"
                              value={
                                filtersData.max_followers
                                  ? filtersData.max_followers
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_followers ? filtersData.min_followers : 0,
                      filtersData.max_followers ? filtersData.max_followers : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "followers")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={6000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>
                      60,00,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Image Engagement
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="image_engagement"
                              value={
                                filtersData.min_image_engagement
                                  ? filtersData.min_image_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="image_engagement"
                              value={
                                filtersData.max_image_engagement
                                  ? filtersData.max_image_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_image_engagement
                        ? filtersData.min_image_engagement
                        : 0,
                      filtersData.max_image_engagement
                        ? filtersData.max_image_engagement
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "image_engagement")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={6000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>
                      60,00,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Image Engagement Rate
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="image_engagement_rate"
                              value={
                                filtersData.min_image_engagement_rate
                                  ? filtersData.min_image_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="image_engagement_rate"
                              min="0"
                              value={
                                filtersData.max_image_engagement_rate
                                  ? filtersData.max_image_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_image_engagement_rate
                        ? filtersData.min_image_engagement_rate
                        : 0,
                      filtersData.max_image_engagement_rate
                        ? filtersData.max_image_engagement_rate
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "image_engagement_rate")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0%</Typography>
                    <Typography className={classes.option}>100%+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Image CPE Range
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="image_cpe"
                              value={
                                filtersData.min_image_cpe
                                  ? filtersData.min_image_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="image_cpe"
                              min="0"
                              value={
                                filtersData.max_image_cpe
                                  ? filtersData.max_image_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_image_cpe ? filtersData.min_image_cpe : 0,
                      filtersData.max_image_cpe ? filtersData.max_image_cpe : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "image_cpe")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>100+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Image Pricing
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="image_pricing"
                              value={
                                filtersData.min_image_pricing
                                  ? filtersData.min_image_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="image_pricing"
                              min="0"
                              value={
                                filtersData.max_image_pricing
                                  ? filtersData.max_image_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_image_pricing
                        ? filtersData.min_image_pricing
                        : 0,
                      filtersData.max_image_pricing
                        ? filtersData.max_image_pricing
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "image_pricing")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={2000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>₹0</Typography>
                    <Typography className={classes.option}>₹2000000</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Video Engagement
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="video_engagement"
                              value={
                                filtersData.min_video_engagement
                                  ? filtersData.min_video_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="video_engagement"
                              value={
                                filtersData.max_video_engagement
                                  ? filtersData.max_video_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_video_engagement
                        ? filtersData.min_video_engagement
                        : 0,
                      filtersData.max_video_engagement
                        ? filtersData.max_video_engagement
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "video_engagement")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={7000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>
                      70,00,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Video Engagement Rate
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="video_engagement_rate"
                              value={
                                filtersData.min_video_engagement_rate
                                  ? filtersData.min_video_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="video_engagement_rate"
                              min="0"
                              value={
                                filtersData.max_video_engagement_rate
                                  ? filtersData.max_video_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_video_engagement_rate
                        ? filtersData.min_video_engagement_rate
                        : 0,
                      filtersData.max_video_engagement_rate
                        ? filtersData.max_video_engagement_rate
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "video_engagement_rate")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0%</Typography>
                    <Typography className={classes.option}>100%+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Video CPE Range
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="video_cpe"
                              value={
                                filtersData.min_video_cpe
                                  ? filtersData.min_video_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="video_cpe"
                              min="0"
                              value={
                                filtersData.max_video_cpe
                                  ? filtersData.max_video_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_video_cpe ? filtersData.min_video_cpe : 0,
                      filtersData.max_video_cpe ? filtersData.max_video_cpe : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "video_cpe")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>100+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Video Pricing
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="video_pricing"
                              value={
                                filtersData.min_video_pricing
                                  ? filtersData.min_video_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="video_pricing"
                              min="0"
                              value={
                                filtersData.max_video_pricing
                                  ? filtersData.max_video_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_video_pricing
                        ? filtersData.min_video_pricing
                        : 0,
                      filtersData.max_video_pricing
                        ? filtersData.max_video_pricing
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "video_pricing")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={2000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>₹0</Typography>
                    <Typography className={classes.option}>₹2000000</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Reels Engagement
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="reels_engagement"
                              value={
                                filtersData.min_reels_engagement
                                  ? filtersData.min_reels_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="reels_engagement"
                              value={
                                filtersData.max_reels_engagement
                                  ? filtersData.max_reels_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_reels_engagement
                        ? filtersData.min_reels_engagement
                        : 0,
                      filtersData.max_reels_engagement
                        ? filtersData.max_reels_engagement
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "reels_engagement")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={1000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>
                      10,00,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Reels Engagement Rate
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="reels_engagement_rate"
                              value={
                                filtersData.min_reels_engagement_rate
                                  ? filtersData.min_reels_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="reels_engagement_rate"
                              min="0"
                              value={
                                filtersData.max_reels_engagement_rate
                                  ? filtersData.max_reels_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_reels_engagement_rate
                        ? filtersData.min_reels_engagement_rate
                        : 0,
                      filtersData.max_reels_engagement_rate
                        ? filtersData.max_reels_engagement_rate
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "reels_engagement_rate")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0%</Typography>
                    <Typography className={classes.option}>100%+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Reels CPE Range
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="reels_cpe"
                              value={
                                filtersData.min_reels_cpe
                                  ? filtersData.min_reels_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="reels_cpe"
                              min="0"
                              value={
                                filtersData.max_reels_cpe
                                  ? filtersData.max_reels_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_reels_cpe ? filtersData.min_reels_cpe : 0,
                      filtersData.max_reels_cpe ? filtersData.max_reels_cpe : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "reels_cpe")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>100+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Reels Pricing
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="reels_pricing"
                              value={
                                filtersData.min_reels_pricing
                                  ? filtersData.min_reels_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="reels_pricing"
                              min="0"
                              value={
                                filtersData.max_reels_pricing
                                  ? filtersData.max_reels_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_reels_pricing
                        ? filtersData.min_reels_pricing
                        : 0,
                      filtersData.max_reels_pricing
                        ? filtersData.max_reels_pricing
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "reels_pricing")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={2000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>₹0</Typography>
                    <Typography className={classes.option}>₹2000000</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Carousel Engagement
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="carousel_engagement"
                              value={
                                filtersData.min_carousel_engagement
                                  ? filtersData.min_carousel_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="carousel_engagement"
                              value={
                                filtersData.max_carousel_engagement
                                  ? filtersData.max_carousel_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_carousel_engagement
                        ? filtersData.min_carousel_engagement
                        : 0,
                      filtersData.max_carousel_engagement
                        ? filtersData.max_carousel_engagement
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "carousel_engagement")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={1000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>
                      10,00,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Carousel Engagement Rate
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="carousel_engagement_rate"
                              value={
                                filtersData.min_carousel_engagement_rate
                                  ? filtersData.min_carousel_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="carousel_engagement_rate"
                              min="0"
                              value={
                                filtersData.max_carousel_engagement_rate
                                  ? filtersData.max_carousel_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_carousel_engagement_rate
                        ? filtersData.min_carousel_engagement_rate
                        : 0,
                      filtersData.max_carousel_engagement_rate
                        ? filtersData.max_carousel_engagement_rate
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "carousel_engagement_rate")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0%</Typography>
                    <Typography className={classes.option}>100%+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Carousel CPE Range
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="carousel_cpe"
                              value={
                                filtersData.min_carousel_cpe
                                  ? filtersData.min_carousel_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="carousel_cpe"
                              min="0"
                              value={
                                filtersData.max_carousel_cpe
                                  ? filtersData.max_carousel_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_carousel_cpe
                        ? filtersData.min_carousel_cpe
                        : 0,
                      filtersData.max_carousel_cpe
                        ? filtersData.max_carousel_cpe
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "carousel_cpe")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>100+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Carousel Pricing
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="carousel_pricing"
                              value={
                                filtersData.min_carousel_pricing
                                  ? filtersData.min_carousel_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="carousel_pricing"
                              min="0"
                              value={
                                filtersData.max_carousel_pricing
                                  ? filtersData.max_carousel_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_carousel_pricing
                        ? filtersData.min_carousel_pricing
                        : 0,
                      filtersData.max_carousel_pricing
                        ? filtersData.max_carousel_pricing
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "carousel_pricing")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={2000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>₹0</Typography>
                    <Typography className={classes.option}>₹2000000</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    IGTV Engagement
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="igtv_engagement"
                              value={
                                filtersData.min_igtv_engagement
                                  ? filtersData.min_igtv_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="igtv_engagement"
                              value={
                                filtersData.max_igtv_engagement
                                  ? filtersData.max_igtv_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_igtv_engagement
                        ? filtersData.min_igtv_engagement
                        : 0,
                      filtersData.max_igtv_engagement
                        ? filtersData.max_igtv_engagement
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "igtv_engagement")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={1000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>
                      10,00,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    IGTV Engagement Rate
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="igtv_engagement_rate"
                              value={
                                filtersData.min_igtv_engagement_rate
                                  ? filtersData.min_igtv_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="igtv_engagement_rate"
                              min="0"
                              value={
                                filtersData.max_igtv_engagement_rate
                                  ? filtersData.max_igtv_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_igtv_engagement_rate
                        ? filtersData.min_igtv_engagement_rate
                        : 0,
                      filtersData.max_igtv_engagement_rate
                        ? filtersData.max_igtv_engagement_rate
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "igtv_engagement_rate")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0%</Typography>
                    <Typography className={classes.option}>100%+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    IGTV CPE Range
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="igtv_cpe"
                              value={
                                filtersData.min_igtv_cpe
                                  ? filtersData.min_igtv_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="igtv_cpe"
                              min="0"
                              value={
                                filtersData.max_igtv_cpe
                                  ? filtersData.max_igtv_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_igtv_cpe ? filtersData.min_igtv_cpe : 0,
                      filtersData.max_igtv_cpe ? filtersData.max_igtv_cpe : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "igtv_cpe")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>100+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    IGTV Pricing
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="igtv_pricing"
                              value={
                                filtersData.min_igtv_pricing
                                  ? filtersData.min_igtv_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="igtv_pricing"
                              min="0"
                              value={
                                filtersData.max_igtv_pricing
                                  ? filtersData.max_igtv_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_igtv_pricing
                        ? filtersData.min_igtv_pricing
                        : 0,
                      filtersData.max_igtv_pricing
                        ? filtersData.max_igtv_pricing
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "igtv_pricing")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={2000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>₹0</Typography>
                    <Typography className={classes.option}>₹2000000</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Static Story Engagement
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="static_story_engagement"
                              value={
                                filtersData.min_static_story_engagement
                                  ? filtersData.min_static_story_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="static_story_engagement"
                              value={
                                filtersData.max_static_story_engagement
                                  ? filtersData.max_static_story_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_static_story_engagement
                        ? filtersData.min_static_story_engagement
                        : 0,
                      filtersData.max_static_story_engagement
                        ? filtersData.max_static_story_engagement
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "static_story_engagement")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={1000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>
                      10,00,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Static Story Engagement Rate
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="static_story_engagement_rate"
                              value={
                                filtersData.min_static_story_engagement_rate
                                  ? filtersData.min_static_story_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="static_story_engagement_rate"
                              min="0"
                              value={
                                filtersData.max_static_story_engagement_rate
                                  ? filtersData.max_static_story_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_static_story_engagement_rate
                        ? filtersData.min_static_story_engagement_rate
                        : 0,
                      filtersData.max_static_story_engagement_rate
                        ? filtersData.max_static_story_engagement_rate
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(
                        e,
                        value,
                        "static_story_engagement_rate"
                      )
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0%</Typography>
                    <Typography className={classes.option}>100%+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Static Story CPE Range
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="static_story_cpe"
                              value={
                                filtersData.min_static_story_cpe
                                  ? filtersData.min_static_story_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="static_story_cpe"
                              min="0"
                              value={
                                filtersData.max_static_story_cpe
                                  ? filtersData.max_static_story_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_static_story_cpe
                        ? filtersData.min_static_story_cpe
                        : 0,
                      filtersData.max_static_story_cpe
                        ? filtersData.max_static_story_cpe
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "static_story_cpe")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>100+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Static Story Pricing
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="static_story_pricing"
                              value={
                                filtersData.min_static_story_pricing
                                  ? filtersData.min_static_story_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="static_story_pricing"
                              min="0"
                              value={
                                filtersData.max_static_story_pricing
                                  ? filtersData.max_static_story_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_static_story_pricing
                        ? filtersData.min_static_story_pricing
                        : 0,
                      filtersData.max_static_story_pricing
                        ? filtersData.max_static_story_pricing
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "static_story_pricing")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={2000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>₹0</Typography>
                    <Typography className={classes.option}>₹2000000</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Video Story Engagement
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="video_story_engagement"
                              value={
                                filtersData.min_video_story_engagement
                                  ? filtersData.min_video_story_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="video_story_engagement"
                              value={
                                filtersData.max_video_story_engagement
                                  ? filtersData.max_video_story_engagement
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_video_story_engagement
                        ? filtersData.min_video_story_engagement
                        : 0,
                      filtersData.max_video_story_engagement
                        ? filtersData.max_video_story_engagement
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "video_story_engagement")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={1000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>
                      10,00,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Video Story Engagement Rate
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="video_story_engagement_rate"
                              value={
                                filtersData.min_video_story_engagement_rate
                                  ? filtersData.min_video_story_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="video_story_engagement_rate"
                              min="0"
                              value={
                                filtersData.max_video_story_engagement_rate
                                  ? filtersData.max_video_story_engagement_rate
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_video_story_engagement_rate
                        ? filtersData.min_video_story_engagement_rate
                        : 0,
                      filtersData.max_video_story_engagement_rate
                        ? filtersData.max_video_story_engagement_rate
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "video_story_engagement_rate")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0%</Typography>
                    <Typography className={classes.option}>100%+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Video Story CPE Range
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="video_story_cpe"
                              value={
                                filtersData.min_video_story_cpe
                                  ? filtersData.min_video_story_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="video_story_cpe"
                              min="0"
                              value={
                                filtersData.max_video_story_cpe
                                  ? filtersData.max_video_story_cpe
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_video_story_cpe
                        ? filtersData.min_video_story_cpe
                        : 0,
                      filtersData.max_video_story_cpe
                        ? filtersData.max_video_story_cpe
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "video_story_cpe")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={0.1}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>100+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Video Story Pricing
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="video_story_pricing"
                              value={
                                filtersData.min_video_story_pricing
                                  ? filtersData.min_video_story_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{
                                style: { fontSize: 11 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="video_story_pricing"
                              min="0"
                              value={
                                filtersData.max_video_story_pricing
                                  ? filtersData.max_video_story_pricing
                                  : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_video_story_pricing
                        ? filtersData.min_video_story_pricing
                        : 0,
                      filtersData.max_video_story_pricing
                        ? filtersData.max_video_story_pricing
                        : 0,
                    ]}
                    onChange={(e, value) =>
                      handleRangeChange(e, value, "video_story_pricing")
                    }
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={100}
                    max={2000000}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>₹0</Typography>
                    <Typography className={classes.option}>₹2000000</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{ margin: "0.5rem 0" }}
                    id="range-slider"
                    gutterBottom
                    className={classes.range}
                  >
                    Age Range
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    margin="0.5rem 0"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography className={classes.option}>
                              From
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "min")}
                              name="age"
                              value={
                                filtersData.min_age ? filtersData.min_age : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center">
                          <Grid item xs={3}>
                            <Typography
                              className={classes.option}
                              style={{ paddingLeft: "10px" }}
                            >
                              To
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              onChange={(e) => handleInputRangeChange(e, "max")}
                              name="age"
                              value={
                                filtersData.max_age ? filtersData.max_age : ""
                              }
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              type="number"
                              InputProps={{
                                style: { fontSize: 11 },
                                inputProps: { min: 0 },
                              }}
                              InputLabelProps={{ style: { fontSize: 11 } }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Slider
                    style={{ margin: "0.5rem 0 0 0" }}
                    value={[
                      filtersData.min_age ? filtersData.min_age : 0,
                      filtersData.max_age ? filtersData.max_age : 0,
                    ]}
                    onChange={(e, value) => handleRangeChange(e, value, "age")}
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    step={1}
                    max={100}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography className={classes.option}>0</Typography>
                    <Typography className={classes.option}>100</Typography>
                  </Box>
                </Grid>
              </Grid>
           // )
            }
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
