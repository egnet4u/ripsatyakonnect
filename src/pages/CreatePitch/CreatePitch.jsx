import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { movePitchToRecycleBin } from "../../api";
import FileUploadInPitch from '../../contexts/FileUploadInPitch'
import CommonBox from "../../components/CommonBox/CommonBox";
import CommonHead from "../../components/CommonHead/CommonHead";
import CreatePitchDetails from "../../components/CreatePitchDetails/CreatePitchDetails";
import CreatePitchModal from "../../components/CreatePitchModal/CreatePitchModal";
import CreatePitchTeam from "../../components/CreatePitchTeam/CreatePitchTeam";
import { getAllUsersData } from "../../redux/allUsersSlice";
import {
  getCategoryData,
  getCategoryOfBrandData,
} from "../../redux/categorySlice";
import { getContentPreference } from "../../redux/contentPreferenceSlice";
import { reset } from "../../redux/createPitchSlice";
import { getLocationData } from "../../redux/locationSlice";
import { getRequirementData } from "../../redux/requirementSlice";
import { getTierData } from "../../redux/tierSlice";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: `calc(100vh - ${186}px)`,
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
    paddingTop: "10px",
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "10px",
    },
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
  stepper: {
    padding: "0px",
    width: "380px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "10px",
      width: "250px",
    },
  },
  label: {
    "& span": {
      color: "#414141",
      fontSize: "12px",
      lineHeight: 1.5,
    },
  },
}));

export default function CreatePitch() {
  const [getFileUpload,setFileUpload] =  useState();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const data = useSelector((state) => state.createPitchData.data);
  const [open, setOpen] = React.useState(false);

  const { mutateAsync, isLoading } = useMutation(movePitchToRecycleBin);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    history.push("/");
  };

  useEffect(() => {
    /** get the auth token */
    const token = localStorage.getItem("authToken");
    const GetAuthToken = "Bearer ".concat(token);

    //const GetAuthToken = 'Bearer ' + token;
    dispatch(getRequirementData());
    dispatch(getLocationData());
    dispatch(getTierData());

    dispatch(getAllUsersData(GetAuthToken)); /**Here pass the auth token */
    dispatch(getCategoryOfBrandData());
    dispatch(getContentPreference());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div>
      <FileUploadInPitch.Provider value={{getFileUpload , setFileUpload}}>
        {/* CommonHead is a component of header of the the pitch where publish 
          and cancel button are show */}
        <CommonHead title={"Create Pitch"}>
          <div>
            
            <Button
              onClick={handleCancel}
              style={{ marginRight: "10px" }}
              className={classes.button}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              disabled={
                data.company_name === null ||
                data.campaign_given_name.length === 0 ||
                data.company_name.length === 0 ||
                data.platform.length === 0
              }
              type="submit"
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
            >
              Publish
            </Button>
          </div>
        </CommonHead>
        <CommonBox>
          <div className={classes.box}>
            {/* In the common box first div show the heading or steps 
                and content related to tabs like "CreatePitchDetails"
            */}
            <div>
              <Grid
                className={classes.container}
                container
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography className={classes.title}>Enter Details</Typography>
                </Grid>
                <Grid item>
                  <Stepper
                    activeStep={activeStep}
                    color="primary"
                    className={classes.stepper}
                  >
                    <Step>
                      <StepLabel className={classes.label}>
                        Create Campaign
                      </StepLabel>
                    </Step>
                    <Step>
                      <StepLabel className={classes.label}>
                        Assign Team (Optional)
                      </StepLabel>
                    </Step>
                  </Stepper>
                </Grid>
              </Grid>
              {/* Here we are create a pitch form where all data fill by user
                  inside the "CreatePitchDetails" component we are use another component inside the 
                  "CreatePitchDetails" that is "CreatePitchTabs" components 
                  And again inside the "CreatePitchTabs" we are use three more component are use that is
                  "ClientDetailsTab" , "CampaignDetailsTab" , "TimeBudgetDetailsTab"
              */}
              {activeStep === 0 && <CreatePitchDetails />}
              {/* When second step are active then "CreatePitchTeam" component are work 
                */}
              {activeStep === 1 && <CreatePitchTeam />}
            </div>
            {/* second div contain a common box bottom in which back and next button */}
            <div> 
              <Grid container className={classes.footer} justify="flex-end">
                {activeStep === 1 ? (
                  <Grid item>
                    <Button
                      className={classes.button}
                      variant="text"
                      color="primary"
                      onClick={handleBack}
                      style={{ marginRight: "10px" }}
                    >
                      Back
                    </Button>
                  </Grid>
                ) : null}
                <Grid item>
                  <Button
                    disabled={activeStep === 1}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </CommonBox>
        {/* When Modal are show or final submit  then campaign are created */}
        {open && <CreatePitchModal handleClose={handleClose} open={open} />}
      </FileUploadInPitch.Provider>
    </div>
  );
}
