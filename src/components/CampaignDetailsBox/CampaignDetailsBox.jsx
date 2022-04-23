import {
  Box,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TaskDetailsFileUpload from "../TaskDetailsFileUpload/TaskDetailsFileUpload";

import { useDispatch, useSelector } from "react-redux";
import { setPitchField } from "../../redux/taskPageSlice";
import { useMutation } from "react-query";
import { downloadUploadedFile } from "../../api";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useParams } from "react-router-dom";

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
  control: {
    "& span": {
      fontSize: "11px",
      lineHeight: 1.5,
    },
  },

  options: {
    fontSize: "11px",
  },
  fileText: {
    color: "#222222",
    fontSize: "11px",
    lineHeight: 1.64,
    cursor: "pointer",
  },
  SubFileText: {
    color: "#888888",
    fontSize: "9px",
    lineHeight: 2,
  },
}));
export default function CampaignDetailsBox({ editable }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const status = useSelector((state) => state.pitchData.status);
  const requirements = useSelector(
    (state) => state.requirementData.requirement
  );
  const tiers = useSelector((state) => state.tierData.tiers);
  const contents = useSelector((state) => state.contentPreferenceData.content);

  const { mutateAsync: mutateAsyncGetFile } = useMutation(downloadUploadedFile);

  const downloadFile = (e, file) => {
    e.stopPropagation();
    mutateAsyncGetFile({ file_name: file, pitch_id: id })
      .then((res) => {
        window.location.replace(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid item xs={6} style={{ paddingLeft: "0.5rem" }}>
      {status === "success" && (
        <Box
          boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
          border="1px solid #dce5ed"
          style={{ background: "#f8fcff" }}
          borderRadius="6px"
          overflow="hidden"
        >
          <Box
            padding="1rem 0"
            textAlign="center"
            style={{ background: "#edf2f7" }}
          >
            <Typography className={classes.heading}>
              CAMPAIGN DETAILS
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
                  Number of Influencers
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.number_of_influencers}
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
                    name="number_of_influencers"
                    value={pitchInfo.number_of_influencers}
                    className={classes.input}
                    label="Number of Influencers"
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
                  Requirement
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.requirement}
                  </Typography>
                )}
                {editable && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(setPitchField({ name: "requirement", value }))
                    }
                    value={pitchInfo.requirement}
                    limitTags={2}
                    name="requirement"
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
                    id="requirement"
                    options={requirements.map(
                      (requirement) => requirement.requirement
                    )}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Requirement"
                      />
                    )}
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
                  Tier Mix
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable &&
                  pitchInfo.tier &&
                  pitchInfo.tier.map((t) => (
                    <Typography
                      style={{ marginRight: "1rem", marginBottom: "1rem" }}
                      key={t}
                      variant="caption"
                    >
                      {t}
                    </Typography>
                  ))}
                {editable && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(setPitchField({ name: "tier", value }))
                    }
                    multiple
                    value={pitchInfo.tier}
                    limitTags={2}
                    name="tier"
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
                    id="tier"
                    options={tiers.map((tier) => tier.tier)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Tier Mix"
                      />
                    )}
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
                  Content Preference
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable &&
                  pitchInfo.content_preference &&
                  pitchInfo.content_preference.map((t) => (
                    <Typography
                      style={{ marginRight: "1rem", marginBottom: "1rem" }}
                      key={t}
                      variant="caption"
                    >
                      {t}
                    </Typography>
                  ))}
                {editable && pitchInfo.platform === "instagram" && (
                  <Autocomplete
                    multiple
                    onChange={(e, value) =>
                      dispatch(
                        setPitchField({
                          name: "content_preference",
                          value,
                        })
                      )
                    }
                    value={pitchInfo.content_preference}
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
                    options={contents.map(
                      (content) => content.content_preference
                    )}
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
                {editable && pitchInfo.platform === "youtube" && (
                  <Autocomplete
                    multiple
                    onChange={(e, value) =>
                      dispatch(
                        setPitchField({
                          name: "content_preference",
                          value,
                        })
                      )
                    }
                    value={pitchInfo.content_preference}
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
                  Brief
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">{pitchInfo.brief}</Typography>
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
                    name="brief"
                    value={pitchInfo.brief}
                    multiline
                    rows={3}
                    className={classes.input}
                    label="Brief"
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
                  Documents
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable &&
                  pitchInfo.attachment_filename &&
                  pitchInfo.attachment_filename.map((file, i) => (
                    <Grid
                      key={"key-" + file.name + i}
                      container
                      style={{ padding: "5px 0" }}
                      justify="space-between"
                    >
                      <Grid item>
                        <Box display="flex" alignItems="center">
                          <AttachFileIcon
                            color="secondary"
                            style={{ marginRight: "10px" }}
                          />

                          <Box>
                            <Typography
                              onClick={(e) => downloadFile(e, file.name)}
                              className={classes.fileText}
                            >
                              {file.name}
                            </Typography>
                            <Typography className={classes.SubFileText}>
                              {(file.size / 1024).toFixed(2)} KB
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  ))}

                {editable && <TaskDetailsFileUpload />}
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
                  Priority
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.priority}
                  </Typography>
                )}
                {editable && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(setPitchField({ name: "priority", value }))
                    }
                    value={pitchInfo.priority}
                    limitTags={2}
                    name="priority"
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
                    id="priority"
                    options={["1", "2", "3"]}
                    getOptionLabel={(option) => `P${option}`}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Priority"
                      />
                    )}
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
