import { makeStyles, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";

import ClientDetailsTab from "../ClientDetailsTab/ClientDetailsTab";
import TimeBudgetDetailsTab from "../TimeBudgetDetailsTab/TimeBudgetDetailsTab";
import CampaignDetailsTab from "../CampaignDetailsTab/CampaignDetailsTab";

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  box: {},
  container: {
    paddingLeft: "17px",
    paddingTop: "7px",
    paddingBottom: "22px",
    borderBottom: "1px dashed #a7a7a7",
  },
  title: {
    color: "#414141",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: 1.56,
  },
  common: {
    padding: "31px 0 18.5px 17px",
  },
  input: {
    width: "100%",
  },
  tabsContainer: {
    borderBottom: "solid 1px #c7c7c7",
  },
  tabs: {},
  tab: {
    color: "#624e9a",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 500,
  },
  footer: {
    borderTop: "solid 1px rgba(167, 167, 167, 0.47)",
  },
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
  },
  upload: {
    borderRadius: "6px",
    boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.06)",
    height: "100%",
    padding: "14px",
  },
  text: {
    color: "#636363",
    fontSize: "11px",
    lineHeight: 1.64,
  },
  option: {
    fontSize: "12px",
  },
}));

export default function CreatePitchTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className={classes.tabsContainer}>
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
            label="Client Details"
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tab}
            label="Campaign Details"
            {...a11yProps(1)}
          />
          <Tab
            className={classes.tab}
            label="Time & Budget Details"
            {...a11yProps(2)}
          />
        </Tabs>
      </div>
      <ClientDetailsTab value={value} index={0} />
      <CampaignDetailsTab value={value} index={1} />
      <TimeBudgetDetailsTab value={value} index={2} />
    </div>
  );
}
