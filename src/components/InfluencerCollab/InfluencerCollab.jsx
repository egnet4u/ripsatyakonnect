import {
  Box,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { getInfluencerHistory } from "../../api";
import { format } from "date-fns";
import { sortByDateCollab } from "../../utils/sortByDate";

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
  root: {
    width: "100%",
    marginTop: "21px",
  },
  heading: {
    fontSize: "14px",
    lineHeight: 1.36,
    color: "#414141",
  },
  statsHeading: {
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#414141",
  },

  row: {
    padding: "15px",
  },
}));

export default function InfluencerCollab() {
  const { handle } = useParams();
  const classes = useStyles();
  const { data, isLoading } = useQuery(
    ["influencerHistory", handle],
    getInfluencerHistory
  );

  function getTotalOfferCost() {
    let total = 0;
    if (data && data.campaign_data) {
      data.campaign_data.forEach((campaign) => {
        if (campaign.influencer_data && campaign.influencer_data[0]) {
          total += campaign.influencer_data[0].offer_cost;
        }
      });
    }
    return total;
  }
  return (
    <div className={classes.root}>
      <Accordion elevation={0} classes={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>CAMPAIGNS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box width="100%">
            <Box>
              <Grid container justify="space-around" className={classes.row}>
                <Grid item xs={2}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Content Plan
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    CPE
                  </Typography>
                </Grid>

                <Grid item xs={1}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Offer Cost
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Updated
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {isLoading && <CircularProgress size={20} color="inherit" />}
            {data &&
              data.campaign_data &&
              sortByDateCollab(data.campaign_data).map((campaign) => (
                <Box
                  component={Paper}
                  margin="1rem 0"
                  elevation={0}
                  boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
                >
                  <Grid
                    container
                    justify="space-around"
                    className={classes.row}
                  >
                    <Grid item xs={2}>
                      {campaign.pitch_id ? (
                        <Link
                          to={`/tasks/${campaign.pitch_id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            variant="caption"
                            className={classes.statsHeading}
                          >
                            {campaign.campaign_source_name
                              ? campaign.campaign_source_name
                              : campaign.campaign_name}
                          </Typography>
                        </Link>
                      ) : (
                        <Typography
                          variant="caption"
                          className={classes.statsHeading}
                        >
                          {campaign.campaign_source_name
                            ? campaign.campaign_source_name
                            : campaign.campaign_name}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="caption">
                        {campaign.influencer_data &&
                          campaign.influencer_data[0] &&
                          campaign.influencer_data[0].content_plan &&
                          campaign.influencer_data[0].content_plan.map(
                            (plan, i) => (
                              <Typography variant="caption">
                                {plan.pieces} {plan.type}
                                {i ===
                                campaign.influencer_data[0].content_plan
                                  .length -
                                  1
                                  ? null
                                  : ", "}
                              </Typography>
                            )
                          )}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="caption">
                        ₹
                        {campaign.influencer_data &&
                          campaign.influencer_data[0] &&
                          campaign.influencer_data[0].cpe}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="caption">
                        ₹
                        {campaign.influencer_data &&
                          campaign.influencer_data[0] &&
                          campaign.influencer_data[0].offer_cost}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="caption">
                        {campaign.influencer_data &&
                          campaign.influencer_data[0] &&
                          campaign.influencer_data[0].status}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="caption">
                        {campaign.updated_at &&
                          format(new Date(campaign.updated_at), "dd MMM yyyy")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            {data && data.campaign_data && (
              <Box
                component={Paper}
                margin="1rem 0"
                elevation={0}
                boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
              >
                <Grid container justify="space-around" className={classes.row}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={1}>
                    <Typography
                      className={classes.statsHeading}
                      variant="caption"
                    >
                      Total
                    </Typography>
                  </Grid>

                  <Grid item xs={1}>
                    <Typography
                      className={classes.statsHeading}
                      variant="caption"
                    >
                      ₹{getTotalOfferCost()}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0} classes={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>LISTS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box width="100%">
            <Box>
              <Grid container justify="space-around" className={classes.row}>
                <Grid item xs={2}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Content Plan
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    CPE
                  </Typography>
                </Grid>

                <Grid item xs={1}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Offer Cost
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography
                    className={classes.statsHeading}
                    variant="caption"
                  >
                    Updated
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {isLoading && <CircularProgress size={20} color="inherit" />}
            {data &&
              data.list_data &&
              sortByDateCollab(data.list_data).map((list) => (
                <Box
                  component={Paper}
                  margin="1rem 0"
                  elevation={0}
                  boxShadow="0 3px 8px 0 rgba(0, 0, 0, 0.06)"
                >
                  <Grid
                    container
                    justify="space-around"
                    className={classes.row}
                  >
                    <Grid item xs={2}>
                      {list.pitch_id ? (
                        <Link
                          to={`/tasks/${list.pitch_id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            variant="caption"
                            className={classes.statsHeading}
                          >
                            {list.list_given_name
                              ? list.list_given_name
                              : list.list_name}
                          </Typography>
                        </Link>
                      ) : (
                        <Typography
                          variant="caption"
                          className={classes.statsHeading}
                        >
                          {list.list_given_name
                            ? list.list_given_name
                            : list.list_name}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="caption">
                        {list.influencer_data &&
                          list.influencer_data[0] &&
                          list.influencer_data[0].content_plan &&
                          list.influencer_data[0].content_plan.map(
                            (plan, i) => (
                              <Typography variant="caption">
                                {plan.pieces} {plan.type}
                                {i ===
                                list.influencer_data[0].content_plan.length - 1
                                  ? null
                                  : ", "}
                              </Typography>
                            )
                          )}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="caption">
                        ₹
                        {list.influencer_data &&
                          list.influencer_data[0] &&
                          list.influencer_data[0].cpe}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="caption">
                        ₹
                        {list.influencer_data &&
                          list.influencer_data[0] &&
                          list.influencer_data[0].offer_cost}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="caption">
                        {list.influencer_data &&
                          list.influencer_data[0] &&
                          list.influencer_data[0].status}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="caption">
                        {list.updated_at &&
                          format(new Date(list.updated_at), "dd MMM yyyy")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
