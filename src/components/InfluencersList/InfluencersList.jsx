import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getInfluencers, searchInfluencerByNameAndHandle } from "../../api";
import { getYtInfluencers } from '../../new_api/api'
import CommonBox from "../../components/CommonBox/CommonBox";
import InfluencerCard from "../../components/InfluencerCard/InfluencerCard";
import GlobalLoader from "../../components/GlobalLoader/GlobalLoader";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useDebounce } from "use-debounce/lib";

const useStyles = makeStyles((theme) => ({
  search: {
    width: "100%",
  },
  container: {
    marginTop: "23px",
  },
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
  },
  option: {
    fontSize: "11px",
  },

  adornment: {
    color: "rgba(0, 0, 0, 0.36)",
    fontSize: "10px",
  },
}));

export default function InfluencersList({ platform }) {
  const [sortBy, setSortBy] = useState("-created_at");
  const [foundInfluencers, setFoundInfluencers] = useState([]);
  const [status, setStatus] = useState(true);
  const classes = useStyles();

  function getSortByObject(value) {
    if (value[0] === "-") {
      return { sort: value.slice(1), reverse: true };
    } else {
      return { sort: value, reverse: false };
    }
  }
  //Instagram influencers get data
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery(["influencers", getSortByObject(sortBy)], getInfluencers, {
      getNextPageParam: (lastPage, pages) => {
        if (Number(lastPage.data.page) < Math.ceil(lastPage.data.count / 48))
          return Number(lastPage.data.page) + 1;
        return false;
      },
    });
   
  //youtube influencers data get
  const { data: youtubeData, isLoading: youtubeLoading, isFetching: youtubeFetching, fetchNextPage: youtubeNP, hasNextPage: ytNP } =
    useInfiniteQuery(["", getSortByObject(sortBy)], getYtInfluencers, {
      getNextPageParam: (lastPage, pages) => {
        if (Number(lastPage.data.page) < Math.ceil(lastPage.data.count / 48))
          return Number(lastPage.data.page) + 1;
        return false;
      },
    })

    const [text, setText] = React.useState("");
    const [debounceText] = useDebounce(text, 250);
    const handleSearch = (e) => { setText(e.target.value); };

    useEffect(() => { 
      if(text.length === 0) {
        setStatus(true);
        setFoundInfluencers([]); 
      }
    }, [text]);

    useEffect(() => {
      if (debounceText) {
        searchInfluencerByNameAndHandle({
          search_string: debounceText,
          platforms: ["youtube"],
        })
          .then((data) => {
            setFoundInfluencers(data.data);
            setStatus(false);
          })
          .catch((err) => {
            setFoundInfluencers([]);
            console.log(err);
            setStatus(false);
          });
      }
    }, [debounceText]);

const loadMoreButtonRef = React.useRef();
useIntersectionObserver({
  target: loadMoreButtonRef,
  onIntersect: fetchNextPage,
  enabled: hasNextPage,
});
const loadMoreButtonRefYt = React.useRef();
useIntersectionObserver({
  target: loadMoreButtonRefYt,
  onIntersect: youtubeNP,
  enabled: ytNP,
});
return (
  <CommonBox>
    <Grid container justify="space-between">
      <Grid item xs={12} sm={7} md={7} lg={6}>
        <TextField
          onChange={handleSearch}
          className={classes.search}
          label="Search Influencer by Name or Handle"
          variant="outlined"
          size="small"
          type="text"
          InputProps={{
            endAdornment: (
              <SearchIcon color="primary" style={{ fontSize: "16px" }} />
            ),
            style: { fontSize: 11 },
          }}
          InputLabelProps={{ style: { fontSize: 11 } }}
        />
      </Grid>
      {text ? null : (
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <FormControl
            size="small"
            variant="outlined"
            className={classes.input}
          >
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <span className={classes.adornment}>Sort By:</span>
                </InputAdornment>
              }
              labelId="sortBy"
              className={classes.option}
              name="requirement"
            >
              <MenuItem className={classes.option} value="-created_at">
                Created (Last)
              </MenuItem>
              <MenuItem className={classes.option} value="created_at">
                Created (First)
              </MenuItem>
              <MenuItem
                className={classes.option}
                value="-instagram_followers"
              >
                Followers (Highest)
              </MenuItem>
              <MenuItem
                className={classes.option}
                value="instagram_followers"
              >
                Followers (Least)
              </MenuItem>
              <MenuItem className={classes.option} value="-image_engagement">
                Image Engagement (Highest)
              </MenuItem>
              <MenuItem className={classes.option} value="image_engagement">
                Image Engagement (Least)
              </MenuItem>
              <MenuItem
                className={classes.option}
                value="-image_engagement_rate"
              >
                Image Engagement Rate (Highest)
              </MenuItem>
              <MenuItem
                className={classes.option}
                value="image_engagement_rate"
              >
                Image Engagement Rate (Least)
              </MenuItem>
              <MenuItem
                className={classes.option}
                value="-engagement_updated_at"
              >
                Stats Updated (Newest)
              </MenuItem>
              <MenuItem
                className={classes.option}
                value="engagement_updated_at"
              >
                Stats Updated (Oldest)
              </MenuItem>
              <MenuItem className={classes.option} value="-video_engagement">
                Video Engagement (Highest)
              </MenuItem>
              <MenuItem className={classes.option} value="video_engagement">
                Video Engagement (Least)
              </MenuItem>
              <MenuItem
                className={classes.option}
                value="-video_engagement_rate"
              >
                Video Engagement Rate (Highest)
              </MenuItem>
              <MenuItem
                className={classes.option}
                value="video_engagement_rate"
              >
                Video Engagement Rate (Least)
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
    {platform === "instagram" ? <> {text && (
      <div className={classes.container}>
        <Grid container justify="start" wrap="wrap">
          {status && <GlobalLoader size={20} color="primary" />}
          {foundInfluencers.map((influencer) => (
            <Grid key={influencer.instagram_handle} item>
              <InfluencerCard influencer={influencer} platform={platform} />
            </Grid>
          ))}
          {foundInfluencers.length === 0 && (
            <Typography style={{ fontSize: "12px", color: "#414141" }}>
              No influencer found for this query.
            </Typography>
          )}
        </Grid>
      </div>
    )}
      {!text && (
        <div className={classes.container}>
          <Grid container justify="center" wrap="wrap">
            {isLoading && <GlobalLoader size={20} color="primary" />}
            {data &&
              data.pages &&
              data.pages.map((page) =>
                page.data.influencers.map((influencer) => (
                  <Grid key={influencer.instagram_handle} item>
                    <InfluencerCard influencer={influencer} platform={platform}
                    />
                  </Grid>
                ))
              )}
          </Grid>

          {hasNextPage && (
            <Box display="flex" justifyContent="center">
              <Button
                ref={loadMoreButtonRef}
                onClick={() => fetchNextPage()}
                variant="text"
                color="primary"
                className={classes.button}
                disabled={!hasNextPage}
              >
                {isFetching ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Load More"
                )}
              </Button>
            </Box>
          )}
        </div>
      )}</> : <>
      {text && (
        <div className={classes.container}>
          <Grid container justify="start" wrap="wrap">
            {status && <GlobalLoader size={20} color="primary" />}
            {foundInfluencers.map((influencer) => (
              <Grid key={influencer.instagram_id} item>
                <InfluencerCard influencer={influencer} platform={platform} />
              </Grid>
            ))}
            {foundInfluencers.length === 0 && (
              <Typography style={{ fontSize: "12px", color: "#414141" }}>
                No influencer found for this query.
              </Typography>
            )}
          </Grid>
        </div>
      )}
      {!text && (
        <div className={classes.container}>
          <Grid container justify="center" wrap="wrap">
            {youtubeLoading && <GlobalLoader size={20} color="primary" />}
            {youtubeData &&
              youtubeData.pages &&
              youtubeData.pages.map((page) =>
                page.data.influencer.map((influencer) => (
                  <Grid key={influencer.instagram_id} item>
                    <InfluencerCard influencer={influencer} platform={platform} />
                  </Grid>
                ))
              )}
          </Grid>

          {ytNP && (
            <Box display="flex" justifyContent="center">
              <Button
                ref={loadMoreButtonRefYt}
                onClick={() => youtubeNP()}
                variant="text"
                color="primary"
                className={classes.button}
                disabled={!ytNP}
              >
                {youtubeFetching ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Load More"
                )}
              </Button>
            </Box>
          )}
        </div>
      )}
    </>
    }
  </CommonBox>
);
}
