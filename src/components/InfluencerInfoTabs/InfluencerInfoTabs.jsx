import { CircularProgress, makeStyles, Tab, Tabs } from "@material-ui/core";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Suspense } from "react";

import { Link as RouterLink, useParams } from "react-router-dom";
import ContentAndEngagementTabYt from "../ContentAndEngagementTabYt/ContentAndEngagementTabYt";

const InfluencerProfileTab = React.lazy(() =>
  import("../InfluencerProfileTab/InfluencerProfileTab")
);
const ContentAndEngagementTab = React.lazy(() =>
  import("../ContentAndEngagementTab/ContentAndEngagementTab")
);
const AudienceDataTab = React.lazy(() =>
  import("../AudienceDataTab/AudienceDataTab")
);

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    marginTop: "20px",
  },
  tabs: {},
  tab: {
    color: "#624e9a",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 500,
  },
  content: {
    backgroundColor: "#f8fcff",
    minHeight: `calc(100vh - ${410}px)`,
    marginBottom: ".5rem",
    borderRadius: "6px",
  },
}));

export default function InfluencerInfoTabs({ value, setValue, platform  }) {
  const { handle , platform_type } = useParams();
  const youtubeInfDataStatus = useSelector((state) => state.influencerInfoData.youTubeDataStatus);
  const classes = useStyles();
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
          <Tab className={classes.tab} label="Profile" {...a11yProps(0)} />
          <Tab
            className={classes.tab}
            label="Content & Engagement"
            {...a11yProps(1)}
          />
          {(platform === "instagram" || platform_type === "instagram") && (
            <Tab
              className={classes.tab}
              label="Audience Data"
              {...a11yProps(2)}
            />
          )}
        </Tabs>
      </div>
      <div className={classes.content}>
        <Suspense fallback={<CircularProgress size={20} color="inherit" />}>
          <InfluencerProfileTab value={value} index={0} platform={platform} />
          {(platform === "youtube" || platform_type === "youtube") && youtubeInfDataStatus === "success" && (
            <ContentAndEngagementTabYt value={value} index={1} />
          )}
          {(platform === "instagram" || platform_type === "instagram") && (
            <ContentAndEngagementTab value={value} index={1} />
          )}
          {(platform === "instagram" || platform_type === "instagram") && (
            <AudienceDataTab setValue={setValue} value={value} index={2} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
