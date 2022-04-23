import {
  Button,
  Grid,
  makeStyles,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateInstagramHandle } from "../../api";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "31px",
    width: "100%",
  },
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
    [theme.breakpoints.up("xs")]: {
      marginLeft: "1.5rem",
    },
  },

  input: {
    width: "100%",
  },
}));

export default function InfluencerEditHandle() {
  const history = useHistory();
  const [newHandle, setNewHandle] = useState("");
  const classes = useStyles();
  const influencerData = useSelector((state) => state.influencerInfoData.data);
  const { mutateAsync, isLoading } = useMutation(updateInstagramHandle);

  const updateHandle = () => {
    mutateAsync({
      instagram_handle: influencerData.instagram_handle,
      new_instagram_handle: newHandle,
    })
      .then((data) => {
        if (data && data.status === "success") {
          history.push(`/discover/${newHandle}`);
        } else if (data) {
          console.log(data.message);
        } else {
          console.log("Error while updating handle.");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid className={classes.inputItem} item xs={12} sm={6} md={4} lg={4}>
          <TextField
            onChange={(e) => setNewHandle(e.target.value)}
            name="handle"
            className={classes.input}
            label="Edit Instagram Handle"
            variant="outlined"
            size="small"
            type="text"
            InputProps={{
              style: { fontSize: 11 },
            }}
            InputLabelProps={{ style: { fontSize: 11 } }}
          />
        </Grid>
        <Grid item>
          <Button
            disabled={!newHandle.length}
            onClick={updateHandle}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Update{" "}
            {isLoading && (
              <CircularProgress
                style={{ color: "white", marginLeft: "0.3rem" }}
                size={13}
              />
            )}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
