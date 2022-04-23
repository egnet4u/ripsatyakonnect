import { IconButton, makeStyles, Toolbar, Tooltip, Tabs, Tab } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React from "react";
import { Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import CommonHead from "../../components/CommonHead/CommonHead";
import GlobalLoader from "../../components/GlobalLoader/GlobalLoader";
import AddInfluencerModal from "../../components/AddInfluencerModal/AddInfluencerModal";
import { ImportantDevices, Instagram, YouTube } from "@material-ui/icons";
const InfluencersList = React.lazy(() =>
  import("../../components/InfluencersList/InfluencersList")
);
const InfluencerInfo = React.lazy(() =>
  import("../../components/InfluencerInfo/InfluencerInfo")
);

const useStyles = makeStyles((theme) => ({
  create: {
    position: "absolute",
    right: 30,
    top: 85,
  },
  plus: {
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.06)",
    padding: "2px",
    background: "#ffffff",
    borderRadius: "50%",
    fontSize: "30px",
    color: "#2e75bb",
  },
  tabs: {
    marginLeft: "38px",
    height: "10px !important",
    padding: "0px !important",
    minWidth: "200px"

  },
  tab: {
    minWidth: "10px !important",
  }
}));

export default function Influencers() {
  const classes = useStyles();
  let location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [platform, setPlatform] = React.useState("instagram")

  const handlePlatform = (event, newValue) => {
    setPlatform(newValue)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <CommonHead title={"Influencers"}>
        <div className={classes.create}>
          <Tooltip title="Add Influencer">
            <IconButton onClick={handleClickOpen} component="span">
              <AddCircleIcon className={classes.plus} />
            </IconButton>
          </Tooltip>
        </div>
      </CommonHead>
      {location.pathname === "/discover" && <Tabs
        value={platform}
        onChange={handlePlatform}
        textColor={`${platform === "youtube" ? "secondary" : "primary"}`}
        indicatorColor={`${platform === "youtube" ? "secondary" : "primary"}`}
        className={classes.tabs}
        aria-label="icon tabs example"
      >
        <Tab value="instagram" label="" icon={<Instagram />} className={classes.tab} style={{ width: "20px !important" }} />
        <Tab value="youtube" label="" icon={<YouTube />} className={classes.tab} />
      </Tabs>}
      <Suspense fallback={<GlobalLoader />}>
        <Switch>
          <Route exact path="/discover">
            <InfluencersList platform={platform} />
          </Route>
          <Route path="/discover/:handle/:platform_type">
            <InfluencerInfo platform={platform} setPlatform={setPlatform} />
          </Route>
        </Switch>
      </Suspense>
      {open && <AddInfluencerModal handleClose={handleClose} open={open} platform={platform} />}
    </div >
  );
}
