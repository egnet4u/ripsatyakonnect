import {
  Button,
  CircularProgress,
  Grid,
  Icon,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Info } from "@material-ui/icons";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateInfluencer } from "../../api";
import {
  getInfluencerInfo,
  updateField,
} from "../../redux/influencerInfoSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "21px",
  },
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
  },
  input: {
    width: "100%",
  },
  inputItem: {
    padding: theme.spacing(1),
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

export default function InfluencerAccountDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const influencerData = useSelector((state) => state.influencerInfoData.data);
  const { mutateAsync, isLoading } = useMutation(updateInfluencer);

  const handleSave = async () => {
    try {
      
      const obj =  {...influencerData};
      for(const key in obj){
        if(obj[key] === null || obj[key]  === ""){
          delete obj[key];
        }
      }
     // console.log(obj);
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
        style={{
          padding: "15px 0 8px 0",
          borderBottom: "0.5px dashed #5c6c7c",
        }}
      >
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Icon color="disabled">
                <Info className={classes.icon} />
              </Icon>
            </Grid>
            <Grid item>
              <Typography className={classes.text} variant="caption">
                Edit the details and save
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {/* <Button
            style={{ marginRight: "9px" }}
            className={classes.button}
            variant="text"
            onClick={() => dispatch(getInfluencerInfo(handle))}
            color="secondary"
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
        <Grid container>
          <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={3}>
            <TextField
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              name="pan_number"
              value={influencerData.pan_number}
              className={classes.input}
              label="PAN"
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
            <TextField
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              value={influencerData.holders_name}
              name="holders_name"
              className={classes.input}
              label="Account Holder Name"
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
            <TextField
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              value={influencerData.account_number}
              name="account_number"
              className={classes.input}
              label="Account Number"
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
            <TextField
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              value={influencerData.ifsc_code}
              name="ifsc_code"
              className={classes.input}
              label="IFSC"
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
            <TextField
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              value={influencerData.account_type}
              name="account_type"
              className={classes.input}
              label="Account Type"
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
            <TextField
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              value={influencerData.bank_name}
              name="bank_name"
              className={classes.input}
              label="Bank Name"
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
            <TextField
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              value={influencerData.bank_city}
              name="bank_city"
              className={classes.input}
              label="Bank City"
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
            <TextField
              onChange={(e) =>
                dispatch(
                  updateField({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              value={influencerData.bank_address}
              name="bank_address"
              className={classes.input}
              label="Bank Address"
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
      </div>
    </div>
  );
}
