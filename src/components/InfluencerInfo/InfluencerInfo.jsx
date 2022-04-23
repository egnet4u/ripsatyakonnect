import {
  Box,
  Grid,
  Link,
  makeStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink, useParams } from "react-router-dom";
import React, { Suspense, useState } from "react";
import CommonBox from "../CommonBox/CommonBox";
import { getInfluencerInfo, getInfluencerInfoDataByHandel, youtubeDataGet } from "../../redux/influencerInfoSlice";
import { useLocation } from "react-router-dom";
import GlobalLoader from "../GlobalLoader/GlobalLoader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTierData } from "../../redux/tierSlice";
import { getCategoryData } from "../../redux/categorySlice";
import { getLanguageData } from "../../redux/languageSlice";
import { getStateData } from "../../redux/stateSlice";
import { getCityData } from "../../redux/citySlice";
import InfluencerInstagramSummary from "../InfluencerInstagramSummary/InfluencerInstagramSummary";
import InfluencerYoutubeSummary from "../InfluencerYoutubeSummary/InfluencerYoutubeSummary";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
const InfluencerInfoTabs = React.lazy(() =>
  import("../InfluencerInfoTabs/InfluencerInfoTabs")
);

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "12px",
  },
  link: {},
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
  goBack: {
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
    padding: `0 20px`,
    [theme.breakpoints.up("sm")]: {
      padding: `0 40px`,
    },
  },
  input: {
    width: "100%",
    backgroundColor: "#F8FCFF",
  },
  option: {
    fontSize: "10px",
  },
  inputItem: {
    padding: theme.spacing(1),
  },
}));

export default function InfluencerInfo({ platform, setPlatform }) {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const { handle , platform_type } = useParams();
  const infYoutueDataStatus = useSelector((state)=>state.influencerInfoData.youTubeDataStatus);
  useEffect(() => {
    // if (location.state) {
    //   const infLocationType  = location.state;
    //   const getInstaIdBoolean  = infLocationType.hasOwnProperty('instagram_id');
    //   const getyoutubeUrlBool = infLocationType.hasOwnProperty('youtube_url');
    //   if(getInstaIdBoolean){
    //     dispatch(getInfluencerInfo(location.state.instagram_id));
    //   }
    //   if(getyoutubeUrlBool){
    //     dispatch(youtubeDataGet(location.state.youtube_url));
    //   }
    // } 
  }, [dispatch, location, handle]);
 
  useEffect(()=>{
    if(platform_type === "youtube"){
      dispatch(youtubeDataGet(decodeURIComponent(handle)))
    }
    if(platform_type === "instagram"){
      dispatch(getInfluencerInfo(handle));
    }
  },[handle ,platform_type])

  useEffect(() => {
    dispatch(getTierData());
    dispatch(getLanguageData());
    dispatch(getCategoryData());
  }, [dispatch]);

  const influencerData = useSelector((state) => state.influencerInfoData.data);
  const status = useSelector((state) => state.influencerInfoData.status);
  const countries = useSelector((state) => state.countryData.countries);
  const youtubeInfDataStatus = useSelector((state) => state.influencerInfoData.youTubeDataStatus);

   useEffect(() => {
    if(platform_type === "instagram"){
      const getCountryCode = () => {
        if (!influencerData.country) return "IN";
        const found = countries.find(
          (country) =>
            country.name.toLowerCase() === influencerData.country.toLowerCase()
        );
        if (!found) return "IN";
        return found.iso2;
      };
      dispatch(getStateData(getCountryCode()));
      dispatch(getCityData(getCountryCode()));
    }
   }, [dispatch, influencerData , platform_type , countries]);


  //this use effect for youtube inf data
  useEffect(() => {
     if(platform_type === "instagram"){
       if (influencerData.youtube_url) {
       dispatch(youtubeDataGet(influencerData.youtube_url));
       }
     } 
  }, [influencerData ,platform_type]);

  return (
    <div>
      <Box display="flex" alignItems="center" height="100%" paddingTop="5px">
        <RouterLink to="/discover" style={{ textDecoration: "none" }}>
          <Link variant="h6" className={classes.goBack} color="primary">
            {"<"} Back to Influencers
          </Link>
        </RouterLink>
      </Box>
      {status === "loading" ? infYoutueDataStatus === "loading" ? <GlobalLoader /> : null : null}
      {infYoutueDataStatus === "loading" ? status === "loading" ? <GlobalLoader /> : null : null}

      {(status === "success" || infYoutueDataStatus === "success") && (
        <CommonBox marginTop="5px">
          { platform_type === "instagram" && influencerData.youtube_url && youtubeInfDataStatus === "success" && (
            null
            // <Box width="100%">
            //   <Grid container justify="flex-start">
            //     <Grid className={classes.inputItem} item xs={9} sm={4} md={2}>
            //       <FormControl
            //         size="small"
            //         variant="outlined"
            //         className={classes.input}
            //       >
            //         <InputLabel className={classes.option} id="platform">
            //           Platform
            //         </InputLabel>
            //         <Select
            //           onChange={(e) => setPlatform(e.target.value)}
            //           labelId="platform"
            //           label="Platform"
            //           className={classes.option}
            //           name="platform"
            //           value={platform}
            //         >
            //           <MenuItem className={classes.option} value={"instagram"}>
            //             <Box
            //               display="flex"
            //               justifyContent="space-between"
            //               alignItems="center"
            //             >
            //               <Typography
            //                 style={{ fontSize: "10px" }}
            //                 variant="caption"
            //               >
            //                 INSTAGRAM
            //               </Typography>
            //               <InstagramIcon
            //                 style={{ fontSize: "16px", marginLeft: "1rem" }}
            //                 fontSize="small"
            //               />
            //             </Box>
            //           </MenuItem>
            //           <MenuItem className={classes.option} value={"youtube"}>
            //             <Box
            //               display="flex"
            //               justifyContent="space-between"
            //               alignItems="center"
            //             >
            //               <Typography
            //                 style={{ fontSize: "10px" }}
            //                 variant="caption"
            //               >
            //                 YOUTUBE
            //               </Typography>
            //               <YouTubeIcon
            //                 style={{ fontSize: "16px", marginLeft: "1rem" }}
            //                 fontSize="small"
            //               />
            //             </Box>
            //           </MenuItem>
            //         </Select>
            //       </FormControl>
            //     </Grid>
            //   </Grid>
            // </Box>
          )}
          {(platform === "instagram" || platform_type === "instagram") && status === "success" && <InfluencerInstagramSummary />}
          {(platform === "youtube"  || platform_type ===  'youtube') && youtubeInfDataStatus === "success" && <InfluencerYoutubeSummary />}

          <Suspense fallback={<GlobalLoader />}>
            <InfluencerInfoTabs
              value={value}
              setValue={setValue}
              platform={platform}
              platform_type={platform_type}
            />
          </Suspense>
        </CommonBox>
      )}
    </div>
  );
}
