import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AddCircleOutline } from "@material-ui/icons";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Divider from "@material-ui/core/Divider";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes, saveNotes, updateNotes } from "../../new_api/api";
import { addNote, getNotes, updateNoteValues } from "../../redux/notesSlice";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { toast } from "react-toastify";
const differenceBy = require('lodash/differenceBy')

const useStyles = makeStyles((theme) => ({
  title: {
    borderTop: "7px solid #2e75bb",
    paddingTop: "17px",
    [theme.breakpoints.up("sm")]: {
      minWidth: "464px",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "600px",
    },
    "& h2": {
      color: "#41414",
      fontWeight: 500,
      fontSize: "14px",
    },
  },
  noteTitle: {
    color: "#41414",
    fontSize: "13px",
    marginBottom: "6px",
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
  input: {
    width: "100%",
  },
}));

export default function InfluencerNotesModal({
  handleClose,
  open,
  source_name,
  instagram_handle,
  name,
  mixName,
  campaignName,
  source_type,
  mix_number,
  project_id,
  mix_influencer_id
}) {
  const classes = useStyles();
  const { status, notes, headers } = useSelector((state) => state.note);
  const { mutateAsync, isLoading } = useMutation(saveNotes);
  const { mutateAsync: mutateAsyncDelete } = useMutation(deleteNotes);
  const { mutateAsync: mutateAsyncUpdate } = useMutation(updateNotes);
  const dispatch = useDispatch();
  mix_number = String(mix_number);
  useEffect(() => {
    dispatch(
      getNotes({ instagram_handle, source_name, mix_number, source_type, project_id, mix_influencer_id })
    );
  }, [instagram_handle, source_name, dispatch, mix_number, source_type, mix_influencer_id, project_id]);

  // console.log("notes", notes)

  useEffect(() => {
    if (status === "success" && notes && notes.length === 0) {
      if (headers && headers.length !== 0) {
        headers.forEach((header) => {
          dispatch(
            addNote({
              header_number: header.header_number,
              mix_influencer_id,
              project_id,
              header_name: `${header.header_name}`,
              content: "",
              mix_id: mix_number
            })
          );
        });
      } else {
        dispatch(
          addNote({
            header_number: 1,
            header_name: `Note 1`,
            content: "",
            mix_influencer_id,
            project_id,
            mix_id: mix_number
          })
        );
      }
    }
    else {
      let found = [];
      if (headers && headers.length !== 0) {
        headers.forEach((header) => {
          const index = notes.findIndex(
            (note) => note.header_number === header.header_number
          );

          if (index === -1) {
            found.push(header);
          }
        });
      }
      found.forEach((item) => {
        dispatch(
          addNote({
            header_number: item.header_number,
            header_name: item.header_name,
            content: "",
            mix_influencer_id,
            project_id,
            mix_id: mix_number
          })
        );
      });
    }
  }, [
    dispatch,
    status,
    notes,
    headers,
    project_id,
    mix_influencer_id,
    mix_number,
  ]);



  function getHeaderTitle() {
    if (status === "success" && notes.length !== 0) {
      return `Note ${notes[notes.length - 1].header_number + 1}`;
    } else {
      return `Note ${notes.length + 1}`;
    }
  }

  const addNewNote = async (content) => {
    dispatch(
      addNote({
        header_number:
          notes.length !== 0
            ? notes[notes.length - 1].header_number + 1
            : notes.length + 1,
        header_name: getHeaderTitle(),
        content,
        mix_influencer_id,
        project_id,
        mix_id: mix_number
      })
    );
  };


  const handleSaveNotes = async () => {


    let isSomethingWrong = false;
    let updateReponse;
    let postResponse;
    for (const note of notes) {
      if (note.id) {
        updateReponse = await mutateAsyncUpdate(note);
        if (!updateReponse.status) {
          isSomethingWrong = true;
        }
      } else {
        postResponse = await mutateAsync(note);
        if (!postResponse.status) {
          isSomethingWrong = true;
        }
      }
    }

    if (isSomethingWrong) {
      toast.error("Something wrong with API")
    } else {
      toast.success("Notes added Successfully")
      handleClose()
    }


  };

  const handleDeleteNotes = async (note) => {
    if (!note.id) {
      toast.info("This Note not saved yet.");
      return;
    }

    const confirmation = window.confirm(`Click 'OK' to delete this note`);
    if (!confirmation) {
      return;
    }

    const response = await mutateAsyncDelete({
      mix_influencer_note_id: note.id
    });
    if (response.status) {
      dispatch(
        getNotes({ project_id, mix_influencer_id, mix_number })

      );
      toast.success("Note deleted successfully.");
    } else {
      toast.error("Something went wrong.");
    }
  };

  // console.log("notes from backend", notes)

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
          <Grid container justify="flex-end" alignItems="center">
            <Grid item>
              <Tooltip title="Close" placement="left">
                <IconButton
                  onClick={handleClose}
                  size="small"
                  color="secondary"
                >
                  <HighlightOffIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Typography style={{ fontSize: "20px" }}>Notes</Typography>
            <Typography>{`${name} - ${campaignName} - ${mixName}`}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box>
            {status === "loading" && (
              <CircularProgress color="primary" size="20" />
            )}
            <Grid container>
              {status === "success" &&
                notes.map((note) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ padding: "0 6px", marginBottom: "10px" }}
                  >
                    <Box
                      border="1px solid #ccc"
                      borderRadius="6px"
                      style={{ backgroundColor: "#F8FCFF" }}
                    >
                      <Box position="relative" width="100%">
                        <TextField
                          onChange={(e) =>
                            dispatch(
                              updateNoteValues({
                                name: e.target.name,
                                value: e.target.value,
                                header_name: note.header_name,
                                content: note.content,
                                header_number: note.header_number,
                                mix_influencer_id,
                                mix_id: mix_number
                              })
                            )
                          }
                          name="header_name"
                          className={classes.input}
                          variant="filled"
                          size="small"
                          type="text"
                          InputProps={{
                            style: { fontSize: 11 },
                            disableUnderline: true,
                          }}
                          InputLabelProps={{ style: { fontSize: 11 } }}
                          value={note.header_name}
                        />
                        <Tooltip title="delete note">
                          <IconButton
                            style={{
                              position: "absolute",
                              right: "0",
                              top: "6px",
                            }}
                            onClick={() =>
                              handleDeleteNotes(note)
                            }
                            size="small"
                            color="secondary"
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Divider style={{ backgroundColor: "#ccc" }} />
                      <TextField
                        name="content"
                        onChange={(e) =>
                          dispatch(
                            updateNoteValues({
                              name: e.target.name,
                              value: e.target.value,
                              content: note.content,
                              header_name: note.header_name,
                              header_number: note.header_number,
                              mix_influencer_id,
                              mix_id: mix_number
                            })
                          )
                        }
                        className={classes.input}
                        multiline
                        rows="5"
                        variant="filled"
                        size="small"
                        type="text"
                        InputProps={{
                          style: { fontSize: 11 },
                          disableUnderline: true,
                        }}
                        value={note.content}
                        InputLabelProps={{ style: { fontSize: 11 } }}
                        label={`Note ${note.header_number}`}
                      />
                    </Box>
                  </Grid>
                ))}
              <Grid
                item
                xs={12}
                sm={6}
                style={{ padding: "0 6px", marginBottom: "10px" }}
              >
                <Box
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #ccc"
                  borderRadius="6px"
                  style={{ backgroundColor: "#F8FCFF" }}
                >
                  <Box textAlign="center" padding="2.5rem 0">
                    <Typography style={{ fontSize: "12px" }}>
                      Add a note
                    </Typography>
                    <Tooltip title="Add new note" placement="left">
                      <IconButton
                        onClick={() => addNewNote("")}
                        size="small"
                        color="primary"
                      >
                        <AddCircleOutline />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions
          style={{ paddingRight: "1.5rem", paddingBottom: "1rem" }}
        >
          <Grid container justify="flex-end" alignItems="center">
            <Grid item>
              <Button
                className={classes.button}
                onClick={handleClose}
                color="secondary"
                size="small"
              >
                Close
              </Button>
              <Button
                onClick={handleSaveNotes}
                size="small"
                className={classes.button}
                color="secondary"
                variant="contained"
                autoFocus
              >
                Save{" "}
                {isLoading && (
                  <CircularProgress
                    style={{ marginLeft: "0.3rem", color: "#fff" }}
                    size={13}
                  />
                )}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
