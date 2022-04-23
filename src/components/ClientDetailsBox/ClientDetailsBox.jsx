import {
  Box,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { setPitchField } from "../../redux/taskPageSlice";
import { setListField } from "../../redux/listMixesSlice";

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
  input: { width: "100%" },
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
}));
export default function ClientDetailsBox({ editable }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const categories = useSelector((state) => state.categoryData.categories);
  const categoriesOfBrand = useSelector(
    (state) => state.categoryData.categoriesOfBrand
  );
  const location = useSelector((state) => state.locationData.location);
  const users = useSelector((state) => state.allUsersData.users);
  const status = useSelector((state) => state.allUsersData.status);
  const listDetails = useSelector((state) => state.listMixesData.listDetails);

  const getBrandManagers = () => {
    /*
    if (status === "success") {
      return users
        .filter((user) => user.roles.includes("brand"))
        .map((user) => user.email);
    }
    */
    return [];
  };

  return (
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
        <Typography className={classes.heading}>CLIENT DETAILS</Typography>
      </Box>
      <Box
        component={Paper}
        margin="1rem "
        elevation={0}
        boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
      >
        <Grid container justify="space-between" style={{ padding: "15px" }}>
          <Grid item xs={6} style={{ paddingRight: "1.5rem" }}>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Company Name
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.company_name}
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
                    name="company_name"
                    value={pitchInfo.company_name}
                    className={classes.input}
                    label="Company Name"
                    variant="outlined"
                    size="small"
                    type="text"
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
          </Grid>
          <Grid item xs={6} style={{ paddingLeft: "1.5rem" }}>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Client Phone
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.client_phone}
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
                    name="client_phone"
                    value={pitchInfo.client_phone}
                    className={classes.input}
                    label="Client Phone"
                    variant="outlined"
                    size="small"
                    type="text"
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
          </Grid>
        </Grid>
      </Box>
      <Box
        component={Paper}
        margin="1rem "
        elevation={0}
        boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
      >
        <Grid container justify="space-between" style={{ padding: "15px" }}>
          <Grid item xs={6} style={{ paddingRight: "1.5rem" }}>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Category of Brand
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.brand_category}
                  </Typography>
                )}
                {editable && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(setPitchField({ name: "brand_category", value }))
                    }
                    value={pitchInfo.brand_category}
                    limitTags={2}
                    name="brand_category"
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
                    id="brand_category"
                    options={categoriesOfBrand.map(
                      (category) => category.category_name
                    )}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Category Of Brand"
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} style={{ paddingLeft: "1.5rem" }}>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Client Email
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.client_email}
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
                    name="client_email"
                    value={pitchInfo.client_email}
                    className={classes.input}
                    label="Client Email"
                    variant="outlined"
                    size="small"
                    type="text"
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
          </Grid>
        </Grid>
      </Box>
      <Box
        component={Paper}
        margin="1rem "
        elevation={0}
        boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
      >
        <Grid container justify="space-between" style={{ padding: "15px" }}>
          <Grid item xs={6} style={{ paddingRight: "1.5rem" }}>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Category Type
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.category_type &&
                      pitchInfo.category_type.map((category, i) => (
                        <Box key={category + i}>{category.toUpperCase()}</Box>
                      ))}
                  </Typography>
                )}
                {editable && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(setPitchField({ name: "category_type", value }))
                    }
                    multiple
                    value={pitchInfo.category_type}
                    limitTags={2}
                    name="category_type"
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
                    id="category_type"
                    options={Object.keys(categories)}
                    getOptionLabel={(option) => option.toUpperCase()}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Category Type"
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} style={{ paddingLeft: "1.5rem" }}>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Email Subject
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.email_subject_line}
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
                    name="email_subject_line"
                    value={pitchInfo.email_subject_line}
                    className={classes.input}
                    label="Email Subject"
                    variant="outlined"
                    size="small"
                    type="text"
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
          </Grid>
        </Grid>
      </Box>
      <Box
        component={Paper}
        margin="1rem "
        elevation={0}
        boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
      >
        <Grid container justify="space-between" style={{ padding: "15px" }}>
          <Grid item xs={6} style={{ paddingRight: "1.5rem" }}>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Client Name
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.client_name}
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
                    name="client_name"
                    value={pitchInfo.client_name}
                    className={classes.input}
                    label="Client Name"
                    variant="outlined"
                    size="small"
                    type="text"
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
          </Grid>
          <Grid item xs={6} style={{ paddingLeft: "1.5rem" }}>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Location
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.location}
                  </Typography>
                )}
                {editable && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(setPitchField({ name: "location", value }))
                    }
                    value={pitchInfo.location}
                    limitTags={2}
                    name="location"
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
                    id="location"
                    options={location.map((loc) => loc.location)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Location"
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        component={Paper}
        margin="1rem "
        elevation={0}
        boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
      >
        <Grid container justify="space-between" style={{ padding: "15px" }}>
          <Grid item xs={6} style={{ paddingRight: "1.5rem" }}>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="caption" className={classes.statsHeading}>
                  Brand Manager
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {!editable && (
                  <Typography variant="caption">
                    {pitchInfo.brand_manager}
                  </Typography>
                )}
                {editable && (
                  <Autocomplete
                    onChange={(e, value) =>
                      dispatch(setPitchField({ name: "brand_manager", value }))
                    }
                    value={pitchInfo.brand_manager}
                    limitTags={2}
                    name="brand_manager"
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
                    id="brand_manager"
                    options={getBrandManagers()}
                    getOptionLabel={(option) => option.toUpperCase()}
                    renderInput={(params) => (
                      <TextField
                        className={classes.input}
                        size="small"
                        {...params}
                        variant="outlined"
                        label="Brand Manager"
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ paddingRight: "0.5rem" }}></Grid>
        </Grid>
      </Box>
    </Box>
  );
}
