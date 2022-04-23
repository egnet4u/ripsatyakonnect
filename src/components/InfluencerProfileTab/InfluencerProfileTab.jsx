import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import TabPanel from "../TabPanel/TabPanel";
import React, { useState } from "react";
import { Suspense } from "react";

const InfluencerBio = React.lazy(() =>
  import("../InfluencerBio/InfluencerBio")
);
const InfluencerCollab = React.lazy(() =>
  import("../InfluencerCollab/InfluencerCollab")
);
// const InfluencerEditHandle = React.lazy(() =>
//   import("../InfluencerEditHandle/InfluencerEditHandle")
// );
// const InfluencerPostingHabbit = React.lazy(() =>
//   import("../InfluencerPostingHabbit/InfluencerPostingHabbit")
// );
const InfluencerAccountDetails = React.lazy(() =>
  import("../InfluencerAccountDetails/InfluencerAccountDetails")
);

const useStyles = makeStyles((theme) => ({
  navBox: {
    cursor: "pointer",
    margin: "0 18px 12.5px",
    textAlign: "left",
  },
  navItem: {
    color: "#414141",
    fontSize: "12px",
    lineHeight: 1.5,
  },

  normal: {
    color: "#414141",
    fontSize: "10px",
    lineHeight: 1.6,
    marginRight: "1px",
  },
  bold: {
    color: "#414141",
    fontSize: "10px",
    lineHeight: 1.6,
    fontWeight: "bold",
    marginRight: "3px",
  },

  heading: {
    fontSize: "14px",
    lineHeight: 1.36,
    color: "#414141",
  },
  input: {
    width: "100%",
  },
  inputItem: {
    padding: theme.spacing(1),
  },
  text: {
    fontSize: "12px",
    color: "#414141",
    lineHeight: 1.36,
    marginLeft: "5px",
  },
  icon: {
    height: "17px",
    width: "17px",
  },
}));

export default function InfluencerProfileTab({ value, index, platform }) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState("bio");

  let profileSection;
  if (selectedTab === "bio") profileSection = <InfluencerBio platform={platform} />;
  else if (selectedTab === "account")
    profileSection = <InfluencerAccountDetails />;
  else if (selectedTab === "collab") profileSection = <InfluencerCollab />;
  // else if (selectedTab === "advanced")
  //   profileSection = <InfluencerEditHandle />;
  // else if (selectedTab === "posting")
  //   profileSection = <InfluencerPostingHabbit />;

  return (
    <TabPanel value={value} index={index}>
      <Box display="flex" borderBottom=".5px solid #b9cfe5" flexWrap="wrap">
        <Box className={classes.navBox} onClick={() => setSelectedTab("bio")}>
          <Typography
            style={
              selectedTab === "bio"
                ? { fontWeight: "bold", color: "#2e75bb" }
                : null
            }
            className={classes.navItem}
          >
            Bio
          </Typography>
        </Box>

        <Box
          className={classes.navBox}
          onClick={() => setSelectedTab("account")}
        >
          <Typography
            style={
              selectedTab === "account"
                ? { fontWeight: "bold", color: "#2e75bb" }
                : null
            }
            className={classes.navItem}
          >
            Account Details
          </Typography>
        </Box>

        <Box
          className={classes.navBox}
          onClick={() => setSelectedTab("collab")}
        >
          <Typography
            style={
              selectedTab === "collab"
                ? { fontWeight: "bold", color: "#2e75bb" }
                : null
            }
            className={classes.navItem}
          >
            Collaborations
          </Typography>
        </Box>

        {/* <Box
          className={classes.navBox}
          onClick={() => setSelectedTab("advanced")}
        >
          <Typography
            style={
              selectedTab === "advanced"
                ? { fontWeight: "bold", color: "#2e75bb" }
                : null
            }
            className={classes.navItem}
          >
            Edit Handle
          </Typography>
        </Box>

        <Box
          className={classes.navBox}
          onClick={() => setSelectedTab("posting")}
        >
          <Typography
            style={
              selectedTab === "posting"
                ? { fontWeight: "bold", color: "#2e75bb" }
                : null
            }
            className={classes.navItem}
          >
            Posting Habit
          </Typography>
        </Box> */}
      </Box>
      <Suspense fallback={<CircularProgress size={20} color="inherit" />}>
        <div>{profileSection}</div>
      </Suspense>
    </TabPanel>
  );
}
