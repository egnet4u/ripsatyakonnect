import React, { useCallback, useMemo, useState } from "react";
import UploadSvg from "../../assets/upload.svg";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";
import { deleteFile, downloadUploadedFile, uploadFile } 
from "../../api";
import { useParams } from "react-router-dom";
import SuccessSvg from "../../assets/success.svg";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import {
  addPitchAttachment,
  removePitchAttachment,
} from "../../redux/taskPageSlice";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
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
  text: {
    color: "#636363",
    fontSize: "11px",
    lineHeight: 1.64,
  },
  fileText: {
    color: "#222222",
    fontSize: "11px",
    lineHeight: 1.64,
    cursor: "pointer",
  },
  SubFileText: {
    color: "#888888",
    fontSize: "9px",
    lineHeight: 2,
  },
}));

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#2e75bb",
  backgroundColor: "rgba(46, 117, 187, 0.1)",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function TaskDetailsFileUpload() {
  const classes = useStyles();
  const { id } = useParams();
  const { mutateAsync, isLoading } = useMutation(uploadFile);
  const { mutateAsync: mutateAsyncGetFile } = useMutation(downloadUploadedFile);

  const deleteFileMutation = useMutation(deleteFile);
  const dispatch = useDispatch();
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const [show, setShow] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        let formData = new FormData();
        formData.append("attachment", file);
        mutateAsync({ formData, project_id: id, size: file.size , name:file.name })
          .then((res) => {
            dispatch(addPitchAttachment({ name: file.name, size: file.size }));
          })
          .catch((err) => console.log(err));
      });
    },
    [id, mutateAsync, dispatch]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const handleFileDelete = (e, file) => {
    e.stopPropagation();
    let formData = new FormData();
    formData.append("attachment", file);
    deleteFileMutation
      .mutateAsync({ formData, project_id: id })
      .then((res) => {
        dispatch(removePitchAttachment({ name: file }));
      })
      .catch((err) => console.log(err));
  };
  const downloadFile = (e, file) => {
    e.stopPropagation();
    mutateAsyncGetFile({ file_name: file, project_id: id })
      .then((res) => {
        window.location.replace(res);
      })
      .catch((err) => console.log(err));
  };

  const files = (
    <Grid container style={{ padding: "10px 0" }}>
      {pitchInfo.attachment_filename &&
        pitchInfo.attachment_filename.map((file, i) => (
          <Grid
            key={"key-" + file.name + i}
            container
            style={{ padding: "5px 0" }}
            justify="space-between"
          >
            <Grid item>
              <Box display="flex" alignItems="center">
                <AttachFileIcon
                  color="secondary"
                  style={{ marginRight: "10px" }}
                />
                <Box>
                  <Typography
                    onClick={(e) => downloadFile(e, file.name)}
                    className={classes.fileText}
                  >
                    {file.name}
                  </Typography>
                  <Typography className={classes.SubFileText}>
                    {(file.size / 1024).toFixed(2)} KB
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Box display="flex" alignItems="center">
                {show && (
                  <CancelIcon
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleFileDelete(e, file.name)}
                    onMouseOut={() => setShow(false)}
                    color="secondary"
                    fontSize="small"
                  />
                )}
                {!show && (
                  <img
                    onMouseOver={() => setShow(true)}
                    src={SuccessSvg}
                    alt="upload successful"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        ))}
      {isLoading && <CircularProgress size={15} color="primary" />}
    </Grid>
  );

  return (
    <Grid item xs={12}>
      <Grid {...getRootProps({ style })} container className={classes.upload}>
        <Grid item container justify="space-between">
          <Grid item>
            <Typography className={classes.text}>Documents</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>
              File type: PDF, 20 MB (max)
            </Typography>
          </Grid>
        </Grid>
        {files}
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          style={{ paddingTop: "1.5rem" }}
        >
          <div style={{ textAlign: "center" }}>
            <div className={classes.removeFile}>
              <img src={UploadSvg} alt="Upload a file" />
            </div>
            <div style={{ paddingTop: "11px" }}>
              <input {...getInputProps()} />
              <Typography className={classes.text}>
                Drag and Drop a File
              </Typography>
              <Typography className={classes.text}>OR</Typography>
            </div>
            <div>
              <Button
                style={{
                  color: "#15598e",
                  fontWeight: "bold",
                  lineHeight: 1.5,
                  letterSpacing: ".72px",
                }}
                className={classes.button}
                variant="text"
              >
                Browse
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
