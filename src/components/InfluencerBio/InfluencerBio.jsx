import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

import { format } from "date-fns";
import { updateInfluencer } from "../../api";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getInfluencerInfo } from "../../redux/influencerInfoSlice";
import BioBasicDetails from "../BioBasicDetails/BioBasicDetails";
import BioContactDetails from "../BioContactDetails/BioContactDetails";
import BioChildrenDetails from "../BioChildrenDetails/BioChildrenDetails";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "21px",
  },
  button: {
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
  btnContainer: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: "10px",
    },
  },
  border: {
    [theme.breakpoints.up("sm")]: {
      borderRight: ".5px solid #b9cfe5",
    },
  },
}));
export default function InfluencerBio({ platform }) {
  const influencerData = useSelector((state) => state.influencerInfoData.data);
  const dispatch = useDispatch();
  const classes = useStyles();

  const { mutateAsync, isLoading } = useMutation(updateInfluencer);

  const isParenting = () => {
    if (
      influencerData.primary_categories &&
      influencerData.primary_categories.includes("parenting")
    ) {
      return true;
    }
    if (
      influencerData.secondary_categories &&
      influencerData.secondary_categories.includes("parenting")
    ) {
      return true;
    }
    return false;
  };

  const handleSave = async () => {
    try {
      //null data are remove it form object
      const obj = { ...influencerData };
      for (const key in obj) {
        if (obj[key] === null || obj[key] === "") {
          delete obj[key];
        }
      }
      //const changeTearValue = {...obj , tier:obj.tier};
      const res = await mutateAsync(obj);
      if (res.status) {
        toast.success(res.message);
        dispatch(getInfluencerInfo(influencerData.instagram_id));
      } else {
        toast.error("Something went wrong. Please try again");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  return (
    <div>
      <Grid
        container
        justify="space-between"
        style={{ padding: "15px 0", borderBottom: "0.5px dashed #5c6c7c" }}
      >
        <Grid item>
          <Grid container>
            <Grid
              item
              className={classes.border}
              style={{
                padding: "0 12px",
              }}
            >
              <Typography className={classes.normal} variant="caption">
                Created:
              </Typography>
              <Typography className={classes.bold} variant="caption">
                {
                 //format(new Date(influencerData.created_at), "dd MMM yyyy")
                }
              </Typography>
              <Typography className={classes.normal} variant="caption">
                by
              </Typography>
              <Typography className={classes.bold} variant="caption">
                {influencerData.source}
              </Typography>
            </Grid>
            <Grid item style={{ padding: "0 12px" }}>
              <Typography className={classes.normal} variant="caption">
                Last Updated:
              </Typography>
              <Typography className={classes.bold} variant="caption">
                {
                 //format(new Date(influencerData.updated_at), "dd MMM yyyy")
                }
              </Typography>
              <Typography className={classes.normal} variant="caption">
                by
              </Typography>
              <Typography className={classes.bold} variant="caption">
                {influencerData.updated_by}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.btnContainer}>
          {/* <Button
            style={{ marginRight: "9px" }}
            className={classes.button}
            variant="text"
            color="secondary"
            onClick={() => dispatch(getInfluencerInfo(handle))}
          >
            Reset
          </Button> */}
          <Button
            onClick={handleSave}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Save Details{" "}
            {isLoading && (
              <CircularProgress
                style={{ color: "white", marginLeft: "0.3rem" }}
                size={13}
              />
            )}
          </Button>
        </Grid>
      </Grid>
      <div className={classes.root}>
        <BioBasicDetails platform={platform} />
        <BioContactDetails />
        {isParenting() && <BioChildrenDetails />}
      </div>
    </div>
  );
}
