//value, => task Tab Values
//index, => Task List Tab Index 2
//activeStep =>  get active step value that mean which step is open inside the list tab and values like 0 , 1, 
//setActiveStep   =>  setActiveStep is a function which are change the state value when Inside the list taab when we are change the steps

import {
  CircularProgress,
  Grid,
  makeStyles,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React, { useEffect ,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMixInfluencers  } from "../../redux/listMixesSlice";
import { 
  getListMixes , 
  getListDetails , 
  mixListData ,emptyMixesOfInf,emptyMixesListDetail  } from "../../redux/listMixesSlice";

import TabPanel from "../TabPanel/TabPanel";
import { Suspense } from "react";
const TaskFilterResult = React.lazy(() =>
  import("../../components/TaskFilterResult/TaskFilterResult")
);
const TaskFilters = React.lazy(() =>
  import("../../components/TaskFilters/TaskFilters")
);
const ListMixes = React.lazy(() =>
  import("../../components/ListMixes/ListMixes")
);

const useStyles = makeStyles((theme) => ({
  box: {
    height: `calc(100vh - ${265}px)`,
    paddingTop: "13.5px",
  },
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
  label: {
    "& span": {
      color: "#414141",
      fontSize: "12px",
      lineHeight: 1.5,
    },
  },
  stepper: {
    padding: "0px",
    width: "380px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "10px",
      width: "250px",
    },
  },
}));

export default function TaskListTab({
  value, //task Tab Values
  index, // Task List Tab Index 2
  activeStep,   // get active step value
  setActiveStep,//set the activeStep
}) {

  const [isInfluencersApi, setIsInfluencersApi] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);


  return (
    <TabPanel pad={"0px"} value={value} index={index}>
      <Grid
        className={classes.container}
        container
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title}>
            {pitchInfo.campaign_given_name}
          </Typography>
        </Grid>
        <Grid item>
          <Stepper
            activeStep={activeStep}
            color="primary"
            className={classes.stepper}
            nonLinear
          >
            <Step>
              <StepButton onClick={() => setActiveStep(0)}>
                <StepLabel className={classes.label}>Short List</StepLabel>
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => setActiveStep(1)}>
                <StepLabel className={classes.label}>Mixes</StepLabel>
              </StepButton>
            </Step>
          </Stepper>
        </Grid>
      </Grid>
      <Suspense fallback={<CircularProgress size={20} color="inherit" />}>
        <div className={classes.box}>
          {activeStep === 0 && (
            <Grid container>
              <TaskFilters setIsInfluencersApi={setIsInfluencersApi} /> 
              <TaskFilterResult
                isInfluencersApi={isInfluencersApi}
                setIsInfluencersApi={setIsInfluencersApi}
                setActiveStep={setActiveStep}
              />
            </Grid>
          )}
          {activeStep === 1 && <ListMixes />}
        </div>
      </Suspense>
    </TabPanel>
  );
}
