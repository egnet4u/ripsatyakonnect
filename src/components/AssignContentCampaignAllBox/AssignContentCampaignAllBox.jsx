import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import { ReactComponent as Image } from "../../assets/image.svg";
import { ReactComponent as Video } from "../../assets/video.svg";
import { ReactComponent as Carousel } from "../../assets/carousel.svg";
import { ReactComponent as Reels } from "../../assets/reels.svg";
import { ReactComponent as IGTV } from "../../assets/igtv.svg";
import { ReactComponent as StaticStory } from "../../assets/story.svg";
import { ReactComponent as VideoStory } from "../../assets/video_story.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addContentToCampaignAllInfluencers } from "../../redux/campaignSlice";
import { addContentToAll } from "../../socket";

const useStyles = makeStyles((theme) => ({
  box: {
    boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    padding: "17px 10px 10px 10px",
    position: "absolute",
    zIndex: "101",
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
  background: {
    borderRadius: "3px",
    backgroundColor: "#ededed",
    padding: "5px 6px",
  },
  input: {
    backgroundColor: "#fff",
  },
}));

export default function AssignContentCampaignAllBox({ handleClose, room }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [content, setContent] = useState([]);
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);

  const handleChange = (e, type , platform) => {
    let index = content.findIndex((item) => item.content_type === type);
    const exists = index !== -1;
    let newContent = [...content];
    const plan = {};
    plan.num_posts = e.target.value;
    plan.content_type = type;
    plan.platform = platform;
    if (exists) {
      newContent.splice(index, 1);
      if (plan.num_posts !== "") {
        newContent.push(plan);
      }
      setContent(newContent);
    } else {
      newContent.push(plan);
      setContent(newContent);
    }
  };
  const handleAddContent = () => {
    addContentToAll(room, { content, room_name: room });
  };
  const onSubmit = async () => {
    dispatch(addContentToCampaignAllInfluencers({ content }));
    handleClose();
  };
  return (
    <Box width="500px" className={classes.box}>
      {pitchInfo.platform === "instagram" && (
        <Grid container>
          <Grid item xs={4} style={{ padding: "4px 5px" }}>
            <Box className={classes.background}>
              <Grid container alignItems="center" justify="space-around">
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Image">
                    <Image />
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    onChange={(e) => handleChange(e, "image")}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
                    name="pieces"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4} style={{ padding: "4px 5px" }}>
            <Box className={classes.background}>
              <Grid container alignItems="center" justify="space-around">
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Video">
                    <Video />
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    onChange={(e) => handleChange(e, "video")}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
                    name="pieces"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4} style={{ padding: "4px 5px" }}>
            <Box className={classes.background}>
              <Grid container alignItems="center" justify="space-around">
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Carousel">
                    <Carousel />
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    onChange={(e) => handleChange(e, "carousel")}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
                    name="pieces"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4} style={{ padding: "4px 5px" }}>
            <Box className={classes.background}>
              <Grid container alignItems="center" justify="space-around">
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Reels">
                    <Reels />
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    onChange={(e) => handleChange(e, "reels")}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
                    name="pieces"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4} style={{ padding: "4px 5px" }}>
            <Box className={classes.background}>
              <Grid container alignItems="center" justify="space-around">
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="IGTV">
                    <IGTV />
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    onChange={(e) => handleChange(e, "igtv")}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
                    name="pieces"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4} style={{ padding: "4px 5px" }}>
            <Box className={classes.background}>
              <Grid container alignItems="center" justify="space-around">
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Static Story">
                    <StaticStory />
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    onChange={(e) => handleChange(e, "static_story")}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
                    name="pieces"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4} style={{ padding: "4px 5px" }}>
            <Box className={classes.background}>
              <Grid container alignItems="center" justify="space-around">
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Video Story">
                    <VideoStory />
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    onChange={(e) => handleChange(e, "video_story")}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
                    name="pieces"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}

      {pitchInfo.platform === "youtube" && (
        <Grid container>
          <Grid item xs={4} style={{ padding: "4px 5px" }}>
            <Box className={classes.background}>
              <Grid container alignItems="center" justify="space-around">
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Integrated Video">
                    <Video />
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    onChange={(e) => handleChange(e, "integrated_video")}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
                    name="pieces"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4} style={{ padding: "4px 5px" }}>
            <Box className={classes.background}>
              <Grid container alignItems="center" justify="space-around">
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Dedicated Video">
                    <Reels />
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    onChange={(e) => handleChange(e, "dedicated_video")}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
                    name="pieces"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}

      <Grid
        container
        justify="space-between"
        style={{
          borderTop: "1px dashed #c6c6c6",
          marginTop: "21.5px",
          paddingTop: "8.5px",
        }}
        alignItems="center"
      >
        <Grid item>
          <Grid container alignItems="center">
            <Grid
              item
              style={{
                display: "flex",
                placeItems: "center",
                paddingRight: "5px",
              }}
            >
              <InfoOutlined fontSize="small" />
            </Grid>
            <Grid item>
              <Typography className={classes.text}>
                You’re assigning content for all influencers
              </Typography>
            </Grid>
          </Grid>
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
            onClick={() => {
              onSubmit();
              //handleAddContent();
            }}
            color="secondary"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
