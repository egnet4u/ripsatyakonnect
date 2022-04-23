import { Grid, Input } from "@material-ui/core";
import { IconButton, makeStyles, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import CancelIcon from "@material-ui/icons/Cancel";
import { useState } from "react";
import { parseHandle } from "../../utils/parseHandle";
import { useMutation } from "react-query";
import { addToInfluencerQueue, createInfluencer } from "../../api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

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

export default function AddInfluencerModal({ handleClose, open, platform }) {
  const history = useHistory();
  const classes = useStyles();
  const [handle, setHandle] = useState("");
  const { mutateAsync, isLoading } = useMutation(createInfluencer);
  const { mutateAsync: mutateAsyncQueue, isLoading: isLoadingQueue } =
    useMutation(addToInfluencerQueue);

  const onSubmit = async () => {
    try {
      const parsedHandle = parseHandle(handle);
      const response = await mutateAsync({ handle: parsedHandle });
      if (response.status) {
        toast.success(response.message);
        await mutateAsyncQueue({
          refresh: "hard",
          instagram_id: response.data.instagram_id,
        });
        history.push({
          pathname: "/discover/" + parsedHandle,
          state: { instagram_id: response.data.instagram_id },
        });
        handleClose();
      } else {
        toast.error(response.error.instagram_id[0]);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
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
                onChange={(e) => setHandle(e.target.value)}
                disableUnderline
                style={{ border: "none" }}
                size="small"
                className={classes.input}
                placeholder={`${platform === "instagram" ? "Add Instagram Handle/URL" : "Add Youtube Channel/URL"}`}
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
                onClick={onSubmit}
                disabled={handle.length === 0}
                color="primary"
                size="small"
                variant="contained"
                className={classes.button}
              >
                Add Influencer{" "}
                {(isLoading || isLoadingQueue) && (
                  <CircularProgress
                    size={12}
                    style={{ color: "#fff", marginLeft: "0.3rem" }}
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
