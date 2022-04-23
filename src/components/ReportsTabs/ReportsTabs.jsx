import {
  Box,
  CircularProgress,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import ReportsBenchmarkingContainer from "../ReportsBenchmarkingContainer/ReportsBenchmarkingContainer";
import ReportsDistributionContainer from "../ReportsDistributionContainer/ReportsDistributionContainer";
import ReportsMetricsContainer from "../ReportsMetricsContainer/ReportsMetricsContainer";

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderBottom: "1px solid #ccc",
  },
  tab: {
    color: "#2e75bb",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 500,
  },
  text: {
    fontSize: "12px",
    color: "#414141",
    paddingLeft: "13px",
  },
}));

export default function ReportsTabs() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const campaignDetails = useSelector(
    (state) => state.campaignData.campaignDetails
  );
  const status = useSelector((state) => state.campaignData.status);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {status === "loading" && <CircularProgress size={20} color="primary" />}
      {status === "success" && campaignDetails.flag && (
        <Box>
          <Box>
            <Tabs
              variant="scrollable"
              className={classes.tabs}
              indicatorColor="primary"
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab
                className={classes.tab}
                label="Campaign Metrics"
                {...a11yProps(0)}
              />
              <Tab
                className={classes.tab}
                label="Campaign Benchmarking"
                {...a11yProps(1)}
              />
              <Tab
                className={classes.tab}
                label="Dashboard 3"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <ReportsMetricsContainer value={value} index={0} />
          <ReportsBenchmarkingContainer value={value} index={1} />
          <ReportsDistributionContainer value={value} index={2} />
        </Box>
      )}
      {/* {status === "success" && !campaignDetails.flag && (
        <Typography className={classes.text}>{campaignDetails.data}</Typography>
      )} */}
    </>
  );
}
