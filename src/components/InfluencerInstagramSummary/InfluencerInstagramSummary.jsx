import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import CatImg from "../../assets/cat.jpg";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LanguageIcon from "@material-ui/icons/Language";
import { getInfluencerInfo } from "../../redux/influencerInfoSlice";
import { useParams, useHistory } from "react-router";
import { convertNumberToBMK } from "../../utils/converNumberToBMK";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import { useMutation } from "react-query";
import { addToInfluencerQueue, removeInfluencerFromQueue } from "../../api";
import {addInfToQueuedInNew ,influencerDataUpdate} from "../../new_api/api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "12px",
  },
  img: {
    width: "142px",
    height: "142px",
    borderRadius: "18px",
  },
  name: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#2e75bb",
    lineHeight: 1.5,
    marginTop: "6px",
  },
  handle: {
    marginTop: "6px",
    fontSize: "12px",
    color: "#414141",
  },
  tag: {
    color: "#4f3a88",
    fontSize: "11px",
    lineHeight: 1.55,
    backgroundColor: "#f4f0fd",
    padding: "4px 10px",
    borderRadius: "14px",
    margin: "19px 0",
    marginRight: "10px",
  },
  text: {
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#414141",
  },
  icon: {
    marginRight: "3px",
  },
  number: {
    color: "#414141",
    fontSize: "22px",
    fontWeight: 500,
    lineHeight: 1.56,
  },
  numberTitle: {
    lineHeight: 1.55,
    color: "#6e6e6e",
    fontSize: "13px",
    marginTop: "5px",
  },
  status: {
    fontSize: "13px",
    lineHeight: "1.54",
    color: "#414141",
  },
  btn: {
    fontSize: "12px",
    fontWeight: 500,
  },
}));

export default function InfluencerInstagramSummary() {
  const { handle } = useParams();
  const history = useHistory();

  const classes = useStyles();
  const dispatch = useDispatch();
  const { mutateAsync, isLoading } = useMutation(addToInfluencerQueue);
  const {mutateAsync:addInfInQueuedData , isLoading:addInfToQueuedIsLoading} = useMutation(addInfToQueuedInNew);
  const { mutateAsync: mutateAsyncUnqueue, isLoading: isLoadingUnqueue } = useMutation(removeInfluencerFromQueue);
  const {mutateAsync: unqueueInfluencerData , isLoading: unqueueInfDataIsLoading}  =  useMutation(influencerDataUpdate);
  const influencerData = useSelector((state) => state.influencerInfoData.data);

  const addDefaultUrl = (e) => {
    e.target.src = CatImg;
  };

  const handleFetchStats = async (e) => {
    e.preventDefault();
    try {
      //const res = await mutateAsync(handle);
      const instagram_id = influencerData.instagram_id;
      await addInfInQueuedData({instagram_id:instagram_id , refresh:"soft"}).then((data)=>{
        const res = data.data;
        if(res.status){
          toast.success(res.message);
          dispatch(getInfluencerInfo(instagram_id));
          //history.push(`/discover/${handle}`);
        }else{
          toast.success(res.message);
          dispatch(getInfluencerInfo(instagram_id));
        }
      }).catch((err)=>{
          toast.error("Something went wrong. Please try again");
      })
      
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  const handleUnqueueInfluencer = async (e) => {
    e.preventDefault();
    try {
      //const res = await mutateAsyncUnqueue(handle);
      const instagram_id = influencerData.instagram_id;
      await unqueueInfluencerData({instagram_id:instagram_id ,  queued:false}).then((res)=>{
         if(res.status){
          toast.success("Profile queued successfully");
          dispatch(getInfluencerInfo(instagram_id));
         }else{
          toast.error("Something went wrong. Please try again");
         }
      }).catch((error)=>{
        toast.error("Something went wrong. Please try again");
      })
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  return (
    <Grid container justify="space-between" className={classes.container}>
      <Grid item xs={12} sm={4} md={2}>
        <Box display="flex" justifyContent="center">
          <img
            className={classes.img}
            src={influencerData.instagram_profile_pic_url}
            onError={addDefaultUrl}
            loading="lazy"
            alt={influencerData.name}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={3}>
        <Box>
          <Typography className={classes.name}>
            {influencerData.name}
          </Typography>
          <a
            style={{ textDecoration: "none", color: "#414141" }}
            href={`https://instagram.com/${influencerData.instagram_handle}`}
            target="_blank"
            rel="noreferrer"
          >
            <Typography className={classes.handle}>
              @{influencerData.instagram_handle}
            </Typography>
          </a>
          <Box width="90%" padding="10px 0">
            <Typography
              style={{ marginBottom: "8px" }}
              className={classes.text}
            >
              {influencerData.instagram_bio}
            </Typography>
            <Link href={influencerData.external_url} variant="caption">
              {influencerData.external_url}
            </Link>
          </Box>
          <Box display="flex">
            <Box display="flex">
              <LocationOnIcon
                style={{ fontSize: "18px" }}
                className={classes.icon}
              />
              <Typography className={classes.text}>
                {influencerData.city}
              </Typography>
            </Box>
            <Box display="flex" marginLeft={"30px"}>
              <LanguageIcon
                style={{ fontSize: "17px" }}
                className={classes.icon}
              />
              <Typography className={classes.text}>
                {influencerData.language &&
                  influencerData.language.map((lang, i) => (
                    <Typography
                      variant="caption"
                      className={classes.text}
                      key={i}
                    >
                      {i === 0 ? null : lang === "" || i === 2 ? null : ","}{" "}
                      {lang}
                    </Typography>
                  ))}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          marginTop="30px"
          marginBottom="30px"
        >
          <Box>
            <Typography className={classes.number}>
              {influencerData.instagram_followers &&
                convertNumberToBMK(influencerData.instagram_followers)}
            </Typography>
            <Typography className={classes.numberTitle}>Followers</Typography>
          </Box>
          <Box>
            <Typography className={classes.number}>
              {influencerData.instagram_following &&
                convertNumberToBMK(influencerData.instagram_following)}
            </Typography>
            <Typography className={classes.numberTitle}>Following</Typography>
          </Box>
          <Box>
            <Typography className={classes.number}>
              {influencerData.instagram_post_count &&
                influencerData.instagram_post_count}
            </Typography>
            <Typography className={classes.numberTitle}>Posts</Typography>
          </Box>
          <Box>
            <Typography className={classes.number}>
              {influencerData.instagram_branded_percentage
                ? influencerData.instagram_branded_percentage
                : 0}
              %
            </Typography>
            <Typography className={classes.numberTitle}>
              Branded Posts
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <Box>
          <Typography className={classes.status}>Status Updated</Typography>
          <Typography className={classes.numberTitle}>
            {format(new Date(influencerData.updated_at), "dd MMM yyyy")}
          </Typography>
        </Box>
        <Box marginTop="16px">
          {!influencerData.queued && (
            <Button
              onClick={handleFetchStats}
              className={classes.btn}
              variant="contained"
              color="primary"
            >
              Refresh{" "}
              {//isLoading &&
               addInfToQueuedIsLoading && (
                <CircularProgress
                  style={{ color: "white", marginLeft: "0.3rem" }}
                  size={13}
                />
              )}
            </Button>
          )}
          {influencerData.queued && (
            <Button
              onClick={handleUnqueueInfluencer}
              className={classes.btn}
              variant="contained"
              color="secondary"
            >
              Unqueue{" "}
              {//isLoadingUnqueue && 
              unqueueInfDataIsLoading && (
                <CircularProgress
                  style={{ color: "white", marginLeft: "0.3rem" }}
                  size={13}
                />
              )}
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
