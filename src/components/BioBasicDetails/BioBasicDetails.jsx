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
import {
  updateField,
  updateLanguage,
  updateSecondaryCategories,
} from "../../redux/influencerInfoSlice";

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
export default function BioBasicDetails({ platform }) {
  const influencerData = useSelector((state) => state.influencerInfoData.data);
  const status = useSelector((state) => state.influencerInfoData.status);
  const dispatch = useDispatch();
  const classes = useStyles();
  const tiers = useSelector((state) => state.tierData.tiers);
  const categories = useSelector((state) => state.categoryData.categories);

  const languages = useSelector((state) => state.languageData.languages);

  const getSubCategories = () => {
    if (status === "success" && influencerData.primary_category) {
      if (categories) {
        return categories[influencerData.primary_category];
      }
      return [];
    }
    return [];
  };

  return (
    <Accordion elevation={0} classes={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>BASIC DETAILS</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              name="name"
              value={influencerData.name}
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className={classes.input}
              label="Name"
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
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel className={classes.option} id="gender">
                Gender
              </InputLabel>
              <Select
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                value={influencerData.gender}
                labelId="gender"
                label="Gender"
                className={classes.option}
                name="gender"
              >
                <MenuItem className={classes.option} value="">
                  <em>None</em>
                </MenuItem>
                {[
                  "female",
                  "male",
                  "non-binary",
                  "couple",
                  "not-applicable",
                ].map((gen, i) => (
                  <MenuItem
                    key={gen + i}
                    className={classes.option}
                    value={gen}
                  >
                    {gen.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              name="dob"
              value={
                influencerData.dob
                  ? format(new Date(influencerData.dob), "yyyy-MM-dd")
                  : null
              }
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className={classes.input}
              label="Date of Birth"
              variant="outlined"
              size="small"
              type="date"
              InputProps={{
                style: { fontSize: 11 },
              }}
              InputLabelProps={{ style: { fontSize: 11 }, shrink: true }}
            />
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel className={classes.option} id="language_one">
                Language 1
              </InputLabel>
              <Select
                onChange={(e) =>
                  dispatch(updateLanguage({ index: 0, value: e.target.value }))
                }
                value={influencerData.language && influencerData.language[0]}
                labelId="language_one"
                label="Language 1"
                className={classes.option}
                name="language_one"
              >
                <MenuItem className={classes.option} value="">
                  <em>None</em>
                </MenuItem>
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.id}
                    className={classes.option}
                    value={lang.language}
                  >
                    {lang.language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel className={classes.option} id="language_two">
                Language 2
              </InputLabel>
              <Select
                onChange={(e) =>
                  dispatch(updateLanguage({ index: 1, value: e.target.value }))
                }
                value={influencerData.language && influencerData.language[1]}
                labelId="language_two"
                label="Language 2"
                className={classes.option}
                name="language_two"
              >
                <MenuItem className={classes.option} value="">
                  <em>None</em>
                </MenuItem>
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.id}
                    className={classes.option}
                    value={lang.language}
                  >
                    {lang.language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel className={classes.option} id="language_three">
                Language 3
              </InputLabel>
              <Select
                onChange={(e) =>
                  dispatch(updateLanguage({ index: 2, value: e.target.value }))
                }
                value={influencerData.language && influencerData.language[2]}
                labelId="language_three"
                label="Language 3"
                className={classes.option}
                name="language_three"
              >
                <MenuItem className={classes.option} value="">
                  <em>None</em>
                </MenuItem>
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.id}
                    className={classes.option}
                    value={lang.language}
                  >
                    {lang.language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel className={classes.option} id="tier">
                Tier
              </InputLabel>
              <Select
                value={influencerData.tier}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                labelId="tier"
                label="Tier"
                className={classes.option}
                name="tier"
              >
                <MenuItem className={classes.option} value="0">
                  <em>None</em>
                </MenuItem>
                {tiers.map((tier, i) => (
                  <MenuItem
                    key={tier.id}
                    className={classes.option}
                    value={tier.id}
                  >
                    {tier.tier}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel className={classes.option} id="primary_categories">
                Primary Category
              </InputLabel>
              <Select
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                value={
                  influencerData.primary_category &&
                  influencerData.primary_category
                }
                labelId="primary_categories"
                label="Primary Category"
                className={classes.option}
                name="primary_category"
              >
                <MenuItem className={classes.option} value="">
                  <em>None</em>
                </MenuItem>
                {categories &&
                  Object.keys(categories).map((cat) => (
                    <MenuItem key={cat} className={classes.option} value={cat}>
                      {cat.toUpperCase()}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel className={classes.option} id="sub_category">
                Sub Category
              </InputLabel>
              <Select
                onChange={(e) =>
                  dispatch(
                    updateField({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                value={influencerData.sub_category}
                labelId="sub_category"
                label="Sub Category"
                className={classes.option}
                name="sub_category"
              >
                <MenuItem className={classes.option} value="">
                  <em>None</em>
                </MenuItem>
                {getSubCategories() &&
                  getSubCategories().map((sub, i) => (
                    <MenuItem
                      key={sub + i}
                      className={classes.option}
                      value={sub}
                    >
                      {sub.toUpperCase()}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel
                className={classes.option}
                id="secondary_category_one"
              >
                Secondary Category 1
              </InputLabel>
              <Select
                onChange={(e) => {
                  dispatch(
                    updateSecondaryCategories({
                      index: 0,
                      value: e.target.value,
                    })
                  );
                }}
                value={
                  influencerData.secondary_categories &&
                  influencerData.secondary_categories[0]
                }
                labelId="secondary_category_one"
                label="Secondary Category 1"
                className={classes.option}
                name="secondary_category_one"
              >
                <MenuItem className={classes.option} value="">
                  <em>None</em>
                </MenuItem>
                {categories &&
                  Object.keys(categories).map((cat) => (
                    <MenuItem key={cat} className={classes.option} value={cat}>
                      {cat.toUpperCase()}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.input}
            >
              <InputLabel
                className={classes.option}
                id="secondary_category_two"
              >
                Secondary Category 2
              </InputLabel>
              <Select
                onChange={(e) => {
                  dispatch(
                    updateSecondaryCategories({
                      index: 1,
                      value: e.target.value,
                    })
                  );
                }}
                value={
                  influencerData.secondary_categories &&
                  influencerData.secondary_categories[1]
                }
                labelId="secondary_category_two"
                label="Secondary Category 2"
                className={classes.option}
                name="secondary_category_two"
              >
                <MenuItem className={classes.option} value="">
                  <em>None</em>
                </MenuItem>
                {categories &&
                  Object.keys(categories).map((cat) => (
                    <MenuItem key={cat} className={classes.option} value={cat}>
                      {cat.toUpperCase()}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              name="youtube_url"
              // value={influencerData.youtube_url}
              value={platform === "youtube" ? influencerData.instagram_url : influencerData.youtube_url}
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className={classes.input}
              label={platform === "youtube" ? "Instagram Url" : "Youtube Url"}
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
