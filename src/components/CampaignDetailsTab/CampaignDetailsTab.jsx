import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setField, setList } from "../../redux/createPitchSlice";
import TabPanel from "../TabPanel/TabPanel";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CreatePitchFileUpload from "../CreatePitchFileUpload/CreatePitchFileUpload";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
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

  options: {
    fontSize: "11px",
  },
}));

export default function CampaignDetailsTab({ value, index }) {
  const classes = useStyles();
  const data = useSelector((state) => state.createPitchData.data);
  const tiers = useSelector((state) => state.tierData.tiers);
  const content = useSelector((state) => state.contentPreferenceData.content);
  const requirement = useSelector((state) => state.requirementData.requirement);
  const dispatch = useDispatch();

  return (
    <TabPanel value={value} index={index}>
      <Grid container spacing={3}>
        <Grid item container xs={12} md={8} spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="number_of_influencers"
              value={data.number_of_influencers}
              /** Not store the value in redux of number_of_influencers see the code 
               * in createPitchSlice
               */
              onChange={(e) =>
                dispatch(
                  setField({ name: e.target.name, value: e.target.value })
                )
              }
              className={classes.input}
              label="Number of Influencers"
              variant="outlined"
              size="small"
              type="number"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel className={classes.option} id="tier">
                Tier Mix
              </InputLabel>
              <Select
                labelId="tier"
                multiple
                value={data.tier}
                onChange={(e) =>
                  dispatch(
                    setField({ name: e.target.name, value: e.target.value })
                  )
                }
                label="Tier Mix"
                className={classes.option}
                name="tier"
              >
                <MenuItem disabled className={classes.option} value="">
                  <em>None</em>
                </MenuItem>
                {tiers.map((tier) => (
                  <MenuItem
                    key={tier.id}
                    className={classes.option}
                    value={tier.tier}
                  >
                    {tier.tier}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
             {/* "Requirement" is not store in redux. Check the code "Requirement" is commented  */}
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel className={classes.option} id="requirement">
                Requirement
              </InputLabel>
              <Select
                labelId="requirement"
                value={data.requirement}
                onChange={(e) =>
                  dispatch(
                    setField({ name: e.target.name, value: e.target.value })
                  )
                }
                label="Requirement"
                className={classes.option}
                name="requirement"
              >
                <MenuItem disabled className={classes.option} value="">
                  <em>None</em>
                </MenuItem>
                {requirement.map((requirement) => (
                  <MenuItem
                    key={requirement.id}
                    className={classes.option}
                    value={requirement.requirement}
                  >
                    {requirement.requirement}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel required className={classes.option} id="platform">
                Platform
              </InputLabel>
              <Select
                labelId="platform"
                value={data.platform}
                onChange={(e) =>
                  dispatch(
                    setField({ name: e.target.name, value: e.target.value })
                  )
                }
                label="Platform"
                className={classes.option}
                name="platform"
              >
                <MenuItem className={classes.option} value={"instagram"}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography style={{ fontSize: "10px" }} variant="caption">
                      INSTAGRAM
                    </Typography>
                    <InstagramIcon
                      style={{ fontSize: "16px", marginLeft: "1rem" }}
                      fontSize="small"
                    />
                  </Box>
                </MenuItem>
                <MenuItem className={classes.option} value={"youtube"}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography style={{ fontSize: "10px" }} variant="caption">
                      YOUTUBE
                    </Typography>
                    <YouTubeIcon
                      style={{ fontSize: "16px", marginLeft: "1rem" }}
                      fontSize="small"
                    />
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Here we have two plateform data "Instagram" and "Youtube" according to the selection
             text field are avelable */}
            {data.platform === "instagram" && (
              <Autocomplete
                multiple
                onChange={(e, value) =>
                  dispatch(setField({ name: "content_preference", value }))
                }
                value={data.content_preference}
                limitTags={2}
                name="content_preference"
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
                id="content_preference"
                options={content.map((cont) => cont.content_preference)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    className={classes.input}
                    size="small"
                    {...params}
                    variant="outlined"
                    label="Content Preference"
                  />
                )}
              />
            )}
            {data.platform === "youtube" && (
              <Autocomplete
                multiple
                onChange={(e, value) =>
                  dispatch(setField({ name: "content_preference", value }))
                }
                value={data.content_preference}
                limitTags={2}
                name="content_preference"
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
                id="content_preference"
                options={["integrated_video", "dedicated_video"]}
                getOptionLabel={(option) =>
                  option.replace("_", " ").toUpperCase()
                }
                renderInput={(params) => (
                  <TextField
                    className={classes.input}
                    size="small"
                    {...params}
                    variant="outlined"
                    label="Content Preference"
                  />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="brief"
              value={data.brief}
              onChange={(e) =>
                dispatch(
                  setField({ name: e.target.name, value: e.target.value })
                )
              }
              rows={7}
              className={classes.input}
              multiline
              label="Brief"
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
        {/* Here we are create a new component to upload a file */}
        <CreatePitchFileUpload />
      </Grid>
    </TabPanel>
  );
}
