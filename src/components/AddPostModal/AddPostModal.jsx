import { CircularProgress, Grid, Input } from "@material-ui/core";
import { IconButton, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import CancelIcon from "@material-ui/icons/Cancel";
import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getPostInfo, updateCampaign } from "../../api";
import { addPostManually, getCampaignDetails } from "../../redux/campaignSlice";
import { parseShortCode } from "../../utils/parseShortcode";

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: "absolute",
    top: 44,
    right: "-10px",
  },
  title: {
    borderTop: "7px solid #2e75bb",
    paddingTop: "37px",
    [theme.breakpoints.up("sm")]: {
      width: "464px",
    },
    "& h2": {
      color: "#41414",
      fontWeight: 500,
      fontSize: "14px",
    },
  },
  button: {
    fontSize: "10px",
    lineHeight: 1.5,
    marginRight: "0.3rem",
    borderRadius: "14px",
  },
  input: {
    width: "100%",
    "& input::placeholder": {
      fontSize: "12px",
    },
    fontSize: "12px",
    marginLeft: "1.5rem",
  },
  text: {
    fontSize: "12px",
    fontStyle: "italic",
    textAlign: "left",
    color: "#414141",
    lineHeight: 1.5,
  },
  backdrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0, 0, 0, 0.28)",
  },
  plus: {
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.06)",
    padding: "2px",
    background: "#ffffff",
    borderRadius: "50%",
    fontSize: "30px",
    color: "#2e75bb",
  },
}));

export default function AddPostModal({ handleClose, open }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mutateAsync, isLoading } = useMutation(getPostInfo);
  const { mutateAsync: mutateAsyncCampaign, isLoading: isLoadingCampaign } =
    useMutation(updateCampaign);
  const campaignDetails = useSelector(
    (state) => state.campaignData.campaignDetails
  );
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const user = useSelector((state) => state.userData.user);
  const [postUrl, setPostUrl] = useState("");

  const onSubmit = () => {
    const shortcode = parseShortCode(postUrl);
    if (!shortcode) {
      console.log("Invalid post url.");
      handleClose();
    } else {
      mutateAsync({ shortcode })
        .then((res) => {
          dispatch(addPostManually({ post: res.data }));
        })
        .then(() => {
          mutateAsyncCampaign({
            campaign_name: campaignDetails.data.campaign_name,
            campaign_posts: campaignDetails.data.campaign_posts,
            campaign_videos: campaignDetails.data.campaign_videos,
          })
            .then((res) => {
              dispatch(
                getCampaignDetails({
                  id: pitchInfo.list_link,
                  email: user.email,
                })
              );
              handleClose();
            })
            .catch((err) => {
              console.log(err);
              handleClose();
            });
        })
        .catch((err) => {
          console.log(err);
          handleClose();
        });
    }
  };
  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        classes={{
          paper: classes.dialog,
        }}
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{
              width: "600px",
              background: "#FFF",
              borderRadius: "24px",
              border: "solid 0.5px #2e75bb",
              padding: "3px 0",
            }}
          >
            <Grid item xs={8}>
              <Input
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                disableUnderline
                style={{ border: "none" }}
                size="small"
                type="text"
                className={classes.input}
                placeholder="Enter Post URL"
                InputProps={{
                  style: { fontSize: 11 },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: 11,
                    textAlign: "center",
                    paddingLeft: "10px",
                  },
                  required: true,
                }}
              />
            </Grid>
            <Grid item>
              <Button
                disabled={postUrl.length === 0}
                color="primary"
                size="small"
                variant="contained"
                className={classes.button}
                onClick={onSubmit}
              >
                Add a post{" "}
                {(isLoading || isLoadingCampaign) && (
                  <CircularProgress
                    style={{ color: "#fff", marginLeft: "0.3rem" }}
                    size={13}
                  />
                )}
              </Button>
            </Grid>
          </Grid>
          <div>
            <IconButton onClick={handleClose} component="span">
              <CancelIcon className={classes.plus} />
            </IconButton>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
