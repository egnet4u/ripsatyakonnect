import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import FileUploadInPitch from '../../contexts/FileUploadInPitch';
import { createNewProject, updateTask ,uploadFile } from "../../api";
import { reset , addAttachment } from "../../redux/createPitchSlice";
import Switch from "@material-ui/core/Switch";
import { Typography } from "@material-ui/core";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
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
    fontSize: "12px",
    lineHeight: 1.5,
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
})); 

export default function CreatePitchModal({ handleClose, open }) {
  const classes = useStyles();
  const  {getFileUpload , setFileUpload}  = useContext(FileUploadInPitch);
  const [listToggle, setListToggle] = useState(true);
  const data = useSelector((state) => state.createPitchData.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const { mutateAsync, isLoading } = useMutation(createNewProject);
  const { mutateAsync:fileUploadData, isLoading:fileUploadIsLoading } = useMutation(uploadFile);

  const updateTaskMutate = useMutation(updateTask);

  const onSubmit = async () => {
    try {
      const response = await mutateAsync(data);
       //file get here//file upload code here 
      let formData = new FormData();
      formData.append("attachment", getFileUpload);
      const file = getFileUpload;
      if(getFileUpload){
       const pid = response.data.project_id;
        fileUploadData({ formData, project_id: pid, size: file.size , name:file.name })
        .then((res) => {
          console.log(res.data);
          dispatch(addAttachment({ name: file.name, size: file.size }));
        })
        .catch((err) => console.log(err));
      }
      
      // when data enter successfully in db then it return "project id" which are used 
      //in workflow api that check the task that is how much task are completed 
       if (data.internal_lead) {
         await updateTaskMutate.mutateAsync({
           /* In flask api our payload is pitch_id and level but 
            * In new djangi api these apyload are change pitch_id => project_id & level => task_id &
            * campaign_given_name => campaign_name
            *  pitch_id: response.data.project_id,
            *  level: 2
            * campaign_given_name: data.campaign_given_name,
            */
         
           project_id :response.data.project_id,
           task_id: 2,
           campaign_name: data.campaign_given_name,
           update_id:0
         });
       }
       dispatch(reset());
       toast.success("Pitch created successfully");
       handleClose();
       if (listToggle) {
         return history.push("/projects/" + response.data.project_id);
       } else {
         return history.push("/");
       }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Dialog
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
        <DialogTitle className={classes.title} id="alert-dialog-title">
          Would you like to Publish Pitch Request?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className={classes.text}
            id="alert-dialog-description"
          >
            Note:Action Cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="caption" style={{ paddingLeft: "20px" }}>
                Create List
              </Typography>
              <Switch
                onChange={() => setListToggle(!listToggle)}
                size="small"
                checked={listToggle}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                onClick={handleClose}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                className={classes.button}
                onClick={onSubmit}
                color="secondary"
                variant="contained"
                autoFocus
              >
                {isLoading || updateTaskMutate.isLoading ? (
                  <CircularProgress size={16} style={{ color: "#fff" }} />
                ) : (
                  "Publish"
                )}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
