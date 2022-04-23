import { Box, Grid, makeStyles, TextField, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { ReactComponent as Image } from "../../assets/image.svg";
import { ReactComponent as Video } from "../../assets/video.svg";
import { ReactComponent as Carousel } from "../../assets/carousel.svg";
import { ReactComponent as Reels } from "../../assets/reels.svg";
import { ReactComponent as IGTV } from "../../assets/igtv.svg";
import { ReactComponent as StaticStory } from "../../assets/story.svg";
import { ReactComponent as VideoStory } from "../../assets/video_story.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addContentToCampaignOneInfluencer } from "../../redux/campaignSlice";
import { addContent } from "../../socket";
import {getCampaginContentData, postCampaignContentData ,campaignContentUpdate} from "../../new_api/api";
import { useMutation } from "react-query";
const useStyles = makeStyles((theme) => ({
  box: {
    boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    padding: "17px 10px 10px 10px",
    position: "absolute",
    zIndex: "100",
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

export default function AssignContentCampaignOneBox({
  handleClose,
  instagram_handle,
  room,infMixData
}) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [content, setContent] = useState([]);
  const pitchInfo = useSelector((state) => state.pitchData.pitchInfo);
  const { mutateAsync:getCampaignContentDataUpdate  ,  isLoading:campaignContentDataIsLoading } =  useMutation(getCampaginContentData);
  const { mutateAsync:postCampaignContent , isLoading:postCampaignContentIsLoading}  =  useMutation(postCampaignContentData);
  const { mutateAsync:updateCampaignContent  ,  isLoading:updateCampaignContentIsLoading} = useMutation(campaignContentUpdate);

  const handleChange = (e, type ,mixInfId , platform) => {
    let index = content.findIndex((item) => item.content_type === type);
    const exists = index !== -1;
    let newContent = [...content];
    const plan = {};
    
    plan.num_posts = e.target.value;
    plan.content_type = type;
    plan.campaign_influencer_id = mixInfId;
    plan.platform = platform;
    plan.price = 0;
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
    addContent(room, {
      content,
      instagram_handle,
      room_name: room,
    });
  };
  const onSubmit = async (mixInfId) => {
    const content_platform =  pitchInfo.platform;
    // Content value store in a array then check if  array is not empty then code run 
    if(content.length>0){
      //Content are store in a array
      await getCampaignContentDataUpdate(mixInfId).then((data)=>{
        const len = data.length;
        if(len > 0){
          for(let i= 0;i<content.length ; i++){
            const updatecontent_type  = content[i].content_type;
            const sendDataObj = content[i];
            const len = data.length;
            const findIndex  = data.findIndex((gId)=> gId.content_type === updatecontent_type);
              if(findIndex !== -1){
                  const contentId = data[findIndex].id;
                  const createDataObj = {...sendDataObj , campaign_influencer_content_id:contentId};
                  updateCampaignContent(createDataObj);
              }else{
                  postCampaignContent(sendDataObj);
              }
          }
        }else{
          for(let i= 0;i<content.length ; i++){
            const sendDataObj = content[i];
            postCampaignContent(sendDataObj);
          }
        }        
      });
    
    }
    dispatch(addContentToCampaignOneInfluencer({ content, instagram_handle ,content_platform }));
    handleClose();
  };
  return (
    <Box width="500px" className={classes.box}>
      {//pitchInfo.type_of_campaign[0] === "instagram" && (
        pitchInfo.platform === "instagram" && (
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
                    onChange={(e) => handleChange(e, "image" ,infMixData.id , pitchInfo.platform  )}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
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
                    onChange={(e) => handleChange(e, "video",infMixData.id , pitchInfo.platform )}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
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
                    onChange={(e) => handleChange(e, "carousel",infMixData.id , pitchInfo.platform )}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
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
                    onChange={(e) => handleChange(e, "reels",infMixData.id , pitchInfo.platform )}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
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
                    onChange={(e) => handleChange(e, "igtv",infMixData.id , pitchInfo.platform )}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
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
                    onChange={(e) => handleChange(e, "static_story",infMixData.id , pitchInfo.platform )}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
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
                    onChange={(e) => handleChange(e, "video_story",infMixData.id , pitchInfo.platform )}
                    className={classes.input}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      style: { fontSize: 10 },
                    }}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    label="Qty"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}

      {//pitchInfo.type_of_campaign[0] === "youtube" && (
         pitchInfo.platform === "youtube" && (
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
                    onChange={(e) => handleChange(e, "integrated_video",infMixData.id , pitchInfo.platform )}
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
                    onChange={(e) => handleChange(e, "dedicated_video",infMixData.id , pitchInfo.platform )}
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
        justify="flex-end"
        style={{
          borderTop: "1px dashed #c6c6c6",
          marginTop: "21.5px",
          paddingTop: "8.5px",
        }}
        alignItems="center"
      >
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
              onSubmit(infMixData.id);
              handleAddContent();
            }}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
