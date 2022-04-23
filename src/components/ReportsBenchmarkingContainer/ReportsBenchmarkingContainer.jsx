import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import Highcharts from "highcharts";
import CatImg from "../../assets/cat.jpg";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";

import HighchartsReact from "highcharts-react-official";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCampaignBenchmarks } from "../../new_api/api";
import { convertNumberToBMK } from "../../utils/converNumberToBMK";
import TabPanel from "../TabPanel/TabPanel";
import { useDebounce } from "use-debounce/lib";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) => ({
  box: {
    boxShadow: theme.shadows[1],
    overflow: "hidden",
    borderRadius: "12px",
    border: "1px solid #eee",
    margin: "0 .5rem",
    backgroundColor: "#f8fcff",
  },
  boxTitle: {
    fontSize: "22px",
    fontWeight: "500",
    color: "#414141",
  },
  header: {
    textAlign: "center",
    padding: "1rem 0",
    backgroundColor: "#edf2f7",
  },
  heading: {
    fontSize: "28px",
    color: "#414141",
    fontWeight: 500,
  },
  title: {
    color: "#414141",
    fontSize: "20px",
    fontWeight: 500,
  },
  number: {
    fontSize: "24px",
  },
  percentage: {
    fontSize: "30px",
    padding: "10px 0",
    fontWeight: "500",
    textAlign: "center",
  },
  tableHeader: {
    fontSize: "12px",
    fontWeight: "500",
  },
  item: {
    fontSize: "12px",
    color: "#414141",
  },
  img: {
    height: "48px",
    width: "48px",
    borderRadius: "3px",
    marginRight: "17px",
  },
  name: {
    letterSpacing: "-0.04px",
    fontSize: "12px",
    lineHeight: 1.5,
    color: "#2e75bb",
  },

  option: {
    fontSize: "11px",
  },
  handle: {
    marginTop: "3px",
    marginBottom: "9px",
    letterSpacing: "-0.04px",
    fontSize: "11px",
    lineHeight: 1.6,
    color: "#414141",
  },
  input: {
    width: "100%",
  },
  list: {
    borderRadius: "12px",
    position: "relative",
  },
  listItem: {},
  listItemText: {
    color: "#fff",
  },
}));

export default function ReportsBenchmarkingContainer({ value, index }) {
  const classes = useStyles();
  const [benchmarkType, setBenchmarkType] = useState("cpe");
  const [text, setText] = React.useState("15");
  const [debounceText] = useDebounce(text, 500);

  const downloadRef = useRef(null);
  function downloadPDF() {
    const divHeight = downloadRef.current.clientHeight;
    const divWidth = downloadRef.current.clientWidth;
    const ratio = divHeight / divWidth;
    html2canvas(downloadRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdfDOC = new jsPdf();
      const width = pdfDOC.internal.pageSize.getWidth();
      let height = pdfDOC.internal.pageSize.getHeight();
      height = ratio * width;

      pdfDOC.addImage(imgData, "PNG", 0, 0, width, height);
      pdfDOC.save(`${campaignDetails.data.campaign_name}-benchmarks.pdf`);
    });
  }

  function downdloadPNG() {
    html2canvas(downloadRef.current).then((canvas) => {
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = `${campaignDetails.data.campaign_name}-distribution.png`;
      link.href = canvas.toDataURL("image/png");
      link.target = "_blank";
      link.click();
    });
  }

  const addDefaultUrl = (e) => {
    e.target.src = CatImg;
  };
  const campaignDetails = useSelector(
    (state) => state.campaignData.campaignDetails
  );

  const { isLoading, data } = useQuery(["benchmarks", debounceText], () =>
    getCampaignBenchmarks({
      campaign_name: campaignDetails.data.campaign_name,
      viral_margin: debounceText || "0",
    })
  );

  function belowBenchMarkCPE() {
    if (data.data && data.data.influencer_data) {
      return data.data.influencer_data.filter(
        (influencer) =>
          influencer.current_influencer_cpe < 0.8 * influencer.last_average_cpe
      );
    }
    return [];
  }

  function atBenchMarkCPE() {
    if (data.data && data.data.influencer_data) {
      return data.data.influencer_data.filter(
        (influencer) =>
          influencer.current_influencer_cpe <=
            1.2 * influencer.last_average_cpe &&
          influencer.current_influencer_cpe >= 0.8 * influencer.last_average_cpe
      );
    }
    return [];
  }

  function aboveBenchMarkCPE() {
    if (data.data && data.data.influencer_data) {
      return data.data.influencer_data.filter(
        (influencer) =>
          influencer.current_influencer_cpe > 1.2 * influencer.last_average_cpe
      );
    }
    return [];
  }

  function belowBenchMarkReach() {
    if (data.data && data.data.influencer_data) {
      return data.data.influencer_data.filter(
        (influencer) =>
          influencer.current_influencer_reach <
          0.8 * influencer.last_average_reach
      );
    }
    return [];
  }

  function atBenchMarkReach() {
    if (data.data && data.data.influencer_data) {
      return data.data.influencer_data.filter(
        (influencer) =>
          influencer.current_influencer_reach <=
            1.2 * influencer.last_average_reach &&
          influencer.current_influencer_reach >=
            0.8 * influencer.last_average_reach
      );
    }
    return [];
  }

  function aboveBenchMarkReach() {
    if (data.data && data.data.influencer_data) {
      return data.data.influencer_data.filter(
        (influencer) =>
          influencer.current_influencer_reach >
          1.2 * influencer.last_average_reach
      );
    }
    return [];
  }

  function belowBenchMarkEngagement() {
    if (data.data && data.data.influencer_data) {
      return data.data.influencer_data.filter(
        (influencer) =>
          influencer.current_influencer_engagement <
          0.8 * influencer.last_average_engagement
      );
    }
    return [];
  }

  function atBenchMarkEngagement() {
    if (data.data && data.data.influencer_data) {
      return data.data.influencer_data.filter(
        (influencer) =>
          influencer.current_influencer_engagement <=
            1.2 * influencer.last_average_engagement &&
          influencer.current_influencer_engagement >=
            0.8 * influencer.last_average_engagement
      );
    }
    return [];
  }

  function aboveBenchMarkEngagement() {
    if (data.data && data.data.influencer_data) {
      return data.data.influencer_data.filter(
        (influencer) =>
          influencer.current_influencer_engagement >
          1.2 * influencer.last_average_engagement
      );
    }
    return [];
  }

  function chartOptionsBenchmarks() {
    return {
      chart: {
        type: "column",
      },
      title: {
        text: "Influencer Benchmark",
        style: {
          display: "none",
        },
      },
      tooltip: {
        style: {
          fontSize: "1.2rem",
        },
      },
      plotOptions: {
        column: {
          pointPadding: 0.25,
          borderWidth: 0,
          pointWidth: 45,
        },
      },
      xAxis: {
        categories: [
          "CPE Performance",
          "Reach Performance",
          "Engagement Performance",
        ],
      },
      series: [
        {
          type: "column",
          name: "Below",
          color: "#f44336",
          data: [
            belowBenchMarkCPE().length,
            belowBenchMarkReach().length,
            belowBenchMarkEngagement().length,
          ],
        },
        {
          type: "column",
          name: "At",
          color: "#2196f3",
          data: [
            atBenchMarkCPE().length,
            atBenchMarkReach().length,
            atBenchMarkEngagement().length,
          ],
        },
        {
          type: "column",
          name: "Above",
          color: "#4caf50",
          data: [
            aboveBenchMarkCPE().length,
            aboveBenchMarkReach().length,
            aboveBenchMarkEngagement().length,
          ],
        },
      ],
    };
  }
  console.log("report bench mark",data);
  return (
    <TabPanel value={value} index={index} pad={"0px"}>
      {isLoading && <CircularProgress size="20" color="primary" />}
      {data && data.status && (
        <Box>
          <Grid container justify="flex-end" style={{ padding: "1rem" }}>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Button
                    onClick={downloadPDF}
                    color="primary"
                    startIcon={<GetAppIcon color="primary" />}
                    className={classes.button}
                  >
                    PDF
                  </Button>
                </Grid>
                <Grid item style={{ marginLeft: "10px" }}>
                  <Button
                    onClick={downdloadPNG}
                    color="primary"
                    startIcon={<GetAppIcon color="primary" />}
                    className={classes.button}
                  >
                    PNG
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box ref={downloadRef}>
            <Box textAlign="center" pt="1.5rem" pb="2.5rem">
              <Typography className={classes.heading}>
                Campaign Performance
              </Typography>
            </Box>
            <Grid container style={{ paddingBottom: "2.5rem" }}>
              <Grid item xs={12}>
                <Box className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Campaign Benchmarks
                    </Typography>
                  </Box>
                  <Box padding="2rem 1rem">
                    {isLoading && (
                      <CircularProgress size={20} color="primary" />
                    )}
                    {data && data.status && (
                      <Grid spacing="3" container>
                        <Grid item xs="4">
                          <Box
                            borderRadius="12px"
                            padding="1rem"
                            style={{ backgroundColor: "#2196f3" }}
                          >
                            <Typography
                              className={classes.title}
                              style={{
                                textAlign: "center",
                                color: "#eee",
                                marginBottom: "1rem",
                              }}
                            >
                              CPE Performance
                            </Typography>
                            <Typography
                              className={classes.number}
                              style={{ textAlign: "center" }}
                            >
                              ₹ {data.data.current_cpe}
                            </Typography>
                            <Typography
                              style={{ textAlign: "right", color: "#eee" }}
                            >
                              ₹ {data.data.average_cpe}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs="4">
                          <Box
                            borderRadius="12px"
                            padding="1rem"
                            style={{ backgroundColor: "#2196f3" }}
                          >
                            <Typography
                              className={classes.title}
                              style={{
                                textAlign: "center",
                                color: "#eee",
                                marginBottom: "1rem",
                              }}
                            >
                              Reach Performance
                            </Typography>
                            <Typography
                              className={classes.number}
                              style={{ textAlign: "center" }}
                            >
                              {convertNumberToBMK(data.data.current_reach)}
                            </Typography>
                            <Typography
                              style={{ textAlign: "right", color: "#eee" }}
                            >
                              {convertNumberToBMK(data.data.average_reach)}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs="4">
                          <Box
                            borderRadius="12px"
                            padding="1rem"
                            style={{ backgroundColor: "#2196f3" }}
                          >
                            <Typography
                              className={classes.title}
                              style={{
                                textAlign: "center",
                                color: "#eee",
                                marginBottom: "1rem",
                              }}
                            >
                              Engagement Performance
                            </Typography>
                            <Typography
                              className={classes.number}
                              style={{ textAlign: "center" }}
                            >
                              {convertNumberToBMK(data.data.current_engagement)}
                            </Typography>
                            <Typography
                              style={{ textAlign: "right", color: "#eee" }}
                            >
                              {convertNumberToBMK(data.data.average_engagement)}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid container style={{ paddingBottom: "2.5rem" }}>
              <Grid item xs={12}>
                <Box className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Influencer Benchmarks
                    </Typography>
                  </Box>
                  <Box>
                    {isLoading && (
                      <CircularProgress size={20} color="primary" />
                    )}
                    {data && data.status && (
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptionsBenchmarks()}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid container style={{ paddingBottom: "2.5rem" }}>
              <Grid item xs={12}>
                <Box className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Influencer Performance
                    </Typography>
                  </Box>
                  <Box padding="2rem 1rem">
                    <Box display="flex" justifyContent="flex-end">
                      <Box>
                        <FormControl
                          size="small"
                          variant="outlined"
                          style={{ width: "260px" }}
                        >
                          <InputLabel className={classes.option} id="benchmark">
                            Benchmark
                          </InputLabel>
                          <Select
                            labelId="benchmark"
                            label="Benchmark"
                            className={classes.option}
                            name="benchmark"
                            onChange={(e) => setBenchmarkType(e.target.value)}
                            value={benchmarkType}
                          >
                            {["cpe", "reach", "engagement"].map((type, i) => (
                              <MenuItem
                                key={type + i}
                                className={classes.option}
                                value={type}
                              >
                                {type.toUpperCase()}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                    {benchmarkType === "cpe" && (
                      <Box padding="0 1.5rem">
                        <Typography
                          style={{
                            textAlign: "center",
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            color: "#414141",
                            margin: "2rem 0",
                          }}
                        >
                          CPE Benchmark
                        </Typography>
                        <Grid container spacing="5">
                          <Grid item xs={4}>
                            <List
                              style={{ backgroundColor: "#f44336" }}
                              className={classes.list}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                position="absolute"
                                width="50px"
                                height="50px"
                                top="-40px"
                                left="-30px"
                                borderRadius="12px"
                                style={{ backgroundColor: "#ED950A" }}
                              >
                                <Typography>
                                  {belowBenchMarkCPE().length}
                                </Typography>
                              </Box>
                              {belowBenchMarkCPE().length === 0 && (
                                <ListItem>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    No influencers below benchmark.
                                  </ListItemText>
                                </ListItem>
                              )}
                              {belowBenchMarkCPE().map((influencer, i) => (
                                <ListItem className={classes.listItem} key={i}>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    {influencer.instagram_handle} (₹
                                    {influencer.current_influencer_cpe.toFixed(
                                      2
                                    )}{" "}
                                    / ₹{influencer.last_average_cpe.toFixed(2)})
                                  </ListItemText>
                                </ListItem>
                              ))}
                            </List>
                            <Typography
                              style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                fontWeight: "500",
                                color: "#414141",
                              }}
                            >
                              Below Benchmark
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <List
                              style={{ backgroundColor: "#2196f3" }}
                              className={classes.list}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                position="absolute"
                                width="50px"
                                height="50px"
                                top="-40px"
                                left="-30px"
                                borderRadius="12px"
                                style={{ backgroundColor: "#ED950A" }}
                              >
                                <Typography>
                                  {atBenchMarkCPE().length}
                                </Typography>
                              </Box>
                              {atBenchMarkCPE().length === 0 && (
                                <ListItem>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    No influencers at benchmark.
                                  </ListItemText>
                                </ListItem>
                              )}
                              {atBenchMarkCPE().map((influencer, i) => (
                                <ListItem className={classes.listItem} key={i}>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    {influencer.instagram_handle} (₹
                                    {influencer.current_influencer_cpe.toFixed(
                                      2
                                    )}{" "}
                                    / ₹{influencer.last_average_cpe.toFixed(2)})
                                  </ListItemText>
                                </ListItem>
                              ))}
                            </List>
                            <Typography
                              style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                fontWeight: "500",
                                color: "#414141",
                              }}
                            >
                              At Benchmark
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <List
                              style={{ backgroundColor: "#4caf50" }}
                              className={classes.list}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                position="absolute"
                                width="50px"
                                height="50px"
                                top="-40px"
                                left="-30px"
                                borderRadius="12px"
                                style={{ backgroundColor: "#ED950A" }}
                              >
                                <Typography>
                                  {aboveBenchMarkCPE().length}
                                </Typography>
                              </Box>
                              {aboveBenchMarkCPE().length === 0 && (
                                <ListItem>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    No influencers above benchmark.
                                  </ListItemText>
                                </ListItem>
                              )}
                              {aboveBenchMarkCPE().map((influencer, i) => (
                                <ListItem className={classes.listItem} key={i}>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    {influencer.instagram_handle} (₹
                                    {influencer.current_influencer_cpe.toFixed(
                                      2
                                    )}{" "}
                                    / ₹{influencer.last_average_cpe.toFixed(2)})
                                  </ListItemText>
                                </ListItem>
                              ))}
                            </List>
                            <Typography
                              style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                fontWeight: "500",
                                color: "#414141",
                              }}
                            >
                              Above Benchmark
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                    {benchmarkType === "reach" && (
                      <Box padding="0 1.5rem">
                        <Typography
                          style={{
                            textAlign: "center",
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            color: "#414141",
                            margin: "2rem 0",
                          }}
                        >
                          Reach Benchmark
                        </Typography>
                        <Grid container spacing="5">
                          <Grid item xs={4}>
                            <List
                              style={{ backgroundColor: "#f44336" }}
                              className={classes.list}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                position="absolute"
                                width="50px"
                                height="50px"
                                top="-40px"
                                left="-30px"
                                borderRadius="12px"
                                style={{ backgroundColor: "#ED950A" }}
                              >
                                <Typography>
                                  {belowBenchMarkReach().length}
                                </Typography>
                              </Box>
                              {belowBenchMarkReach().length === 0 && (
                                <ListItem>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    No influencers below benchmark.
                                  </ListItemText>
                                </ListItem>
                              )}
                              {belowBenchMarkReach().map((influencer, i) => (
                                <ListItem className={classes.listItem} key={i}>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    {influencer.instagram_handle} (
                                    {Math.round(
                                      influencer.current_influencer_reach
                                    )}{" "}
                                    /{" "}
                                    {Math.round(influencer.last_average_reach)})
                                  </ListItemText>
                                </ListItem>
                              ))}
                            </List>
                            <Typography
                              style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                fontWeight: "500",
                                color: "#414141",
                              }}
                            >
                              Below Benchmark
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <List
                              style={{ backgroundColor: "#2196f3" }}
                              className={classes.list}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                position="absolute"
                                width="50px"
                                height="50px"
                                top="-40px"
                                left="-30px"
                                borderRadius="12px"
                                style={{ backgroundColor: "#ED950A" }}
                              >
                                <Typography>
                                  {atBenchMarkReach().length}
                                </Typography>
                              </Box>
                              {atBenchMarkReach().length === 0 && (
                                <ListItem>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    No influencers at benchmark.
                                  </ListItemText>
                                </ListItem>
                              )}
                              {atBenchMarkReach().map((influencer, i) => (
                                <ListItem className={classes.listItem} key={i}>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    {influencer.instagram_handle} (
                                    {Math.round(
                                      influencer.current_influencer_reach
                                    )}{" "}
                                    /{" "}
                                    {Math.round(influencer.last_average_reach)})
                                  </ListItemText>
                                </ListItem>
                              ))}
                            </List>
                            <Typography
                              style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                fontWeight: "500",
                                color: "#414141",
                              }}
                            >
                              At Benchmark
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <List
                              style={{ backgroundColor: "#4caf50" }}
                              className={classes.list}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                position="absolute"
                                width="50px"
                                height="50px"
                                top="-40px"
                                left="-30px"
                                borderRadius="12px"
                                style={{ backgroundColor: "#ED950A" }}
                              >
                                <Typography>
                                  {aboveBenchMarkReach().length}
                                </Typography>
                              </Box>
                              {aboveBenchMarkReach().length === 0 && (
                                <ListItem>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    No influencers above benchmark.
                                  </ListItemText>
                                </ListItem>
                              )}
                              {aboveBenchMarkReach().map((influencer, i) => (
                                <ListItem className={classes.listItem} key={i}>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    {influencer.instagram_handle} (
                                    {Math.round(
                                      influencer.current_influencer_reach
                                    )}{" "}
                                    /{" "}
                                    {Math.round(influencer.last_average_reach)})
                                  </ListItemText>
                                </ListItem>
                              ))}
                            </List>
                            <Typography
                              style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                fontWeight: "500",
                                color: "#414141",
                              }}
                            >
                              Above Benchmark
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                    {benchmarkType === "engagement" && (
                      <Box padding="0 1.5rem">
                        <Typography
                          style={{
                            textAlign: "center",
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            color: "#414141",
                            margin: "2rem 0",
                          }}
                        >
                          Engagement Benchmark
                        </Typography>
                        <Grid container spacing="5">
                          <Grid item xs={4}>
                            <List
                              style={{ backgroundColor: "#f44336" }}
                              className={classes.list}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                position="absolute"
                                width="50px"
                                height="50px"
                                top="-40px"
                                left="-30px"
                                borderRadius="12px"
                                style={{ backgroundColor: "#ED950A" }}
                              >
                                <Typography>
                                  {belowBenchMarkEngagement().length}
                                </Typography>
                              </Box>
                              {belowBenchMarkEngagement().length === 0 && (
                                <ListItem>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    No influencers below benchmark.
                                  </ListItemText>
                                </ListItem>
                              )}
                              {belowBenchMarkEngagement().map(
                                (influencer, i) => (
                                  <ListItem
                                    className={classes.listItem}
                                    key={i}
                                  >
                                    <ListItemText
                                      className={classes.listItemText}
                                    >
                                      {influencer.instagram_handle} (
                                      {Math.round(
                                        influencer.current_influencer_engagement
                                      )}{" "}
                                      /{" "}
                                      {Math.round(
                                        influencer.last_average_engagement
                                      )}
                                      )
                                    </ListItemText>
                                  </ListItem>
                                )
                              )}
                            </List>
                            <Typography
                              style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                fontWeight: "500",
                                color: "#414141",
                              }}
                            >
                              Below Benchmark
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <List
                              style={{ backgroundColor: "#2196f3" }}
                              className={classes.list}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                position="absolute"
                                width="50px"
                                height="50px"
                                top="-40px"
                                left="-30px"
                                borderRadius="12px"
                                style={{ backgroundColor: "#ED950A" }}
                              >
                                <Typography>
                                  {atBenchMarkEngagement().length}
                                </Typography>
                              </Box>
                              {atBenchMarkEngagement().length === 0 && (
                                <ListItem>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    No influencers at benchmark.
                                  </ListItemText>
                                </ListItem>
                              )}
                              {atBenchMarkEngagement().map((influencer, i) => (
                                <ListItem className={classes.listItem} key={i}>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    {influencer.instagram_handle} (
                                    {Math.round(
                                      influencer.current_influencer_engagement
                                    )}{" "}
                                    /{" "}
                                    {Math.round(
                                      influencer.last_average_engagement
                                    )}
                                    )
                                  </ListItemText>
                                </ListItem>
                              ))}
                            </List>
                            <Typography
                              style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                fontWeight: "500",
                                color: "#414141",
                              }}
                            >
                              At Benchmark
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <List
                              style={{ backgroundColor: "#4caf50" }}
                              className={classes.list}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                position="absolute"
                                width="50px"
                                height="50px"
                                top="-40px"
                                left="-30px"
                                borderRadius="12px"
                                style={{ backgroundColor: "#ED950A" }}
                              >
                                <Typography>
                                  {aboveBenchMarkEngagement().length}
                                </Typography>
                              </Box>
                              {aboveBenchMarkEngagement().length === 0 && (
                                <ListItem>
                                  <ListItemText
                                    className={classes.listItemText}
                                  >
                                    No influencers above benchmark.
                                  </ListItemText>
                                </ListItem>
                              )}
                              {aboveBenchMarkEngagement().map(
                                (influencer, i) => (
                                  <ListItem
                                    className={classes.listItem}
                                    key={i}
                                  >
                                    <ListItemText
                                      className={classes.listItemText}
                                    >
                                      {influencer.instagram_handle} (
                                      {Math.round(
                                        influencer.current_influencer_engagement
                                      )}{" "}
                                      /{" "}
                                      {Math.round(
                                        influencer.last_average_engagement
                                      )}
                                      )
                                    </ListItemText>
                                  </ListItem>
                                )
                              )}
                            </List>
                            <Typography
                              style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                fontWeight: "500",
                                color: "#414141",
                              }}
                            >
                              Above Benchmark
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid container style={{ paddingBottom: "2.5rem" }}>
              <Grid item xs={12}>
                <Box className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Top Performers
                    </Typography>
                  </Box>
                  <Box padding="2rem 1rem">
                    {isLoading && (
                      <CircularProgress size={20} color="primary" />
                    )}
                    {data && data.status && (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        marginBottom="2rem"
                      >
                        <Box>
                          <Typography style={{ fontSize: "14px" }}>
                            Number of Influencers:{" "}
                            {data.data.viral_influencers &&
                              data.data.viral_influencers.length}
                          </Typography>
                        </Box>
                        <Box>
                          <TextField
                            onChange={(e) => setText(e.target.value)}
                            defaultValue={data.data.viral_margin}
                            value={text}
                            variant="outlined"
                            label="Margin %"
                            size="small"
                            type="number"
                            InputProps={{
                              style: { fontSize: 12 },
                              inputProps: { min: 0 },
                            }}
                            InputLabelProps={{ style: { fontSize: 12 } }}
                          />
                        </Box>
                      </Box>
                    )}
                    <Box>
                      <Grid
                        container
                        justify="space-between"
                        style={{
                          padding: "1rem 0",
                        }}
                      >
                        <Grid item xs="4">
                          <Typography className={classes.tableHeader}>
                            Profile
                          </Typography>
                        </Grid>

                        <Grid item xs={2}>
                          <Typography className={classes.tableHeader}>
                            Reach
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.tableHeader}>
                            Engagement
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.tableHeader}>
                            Followers
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.tableHeader}>
                            Engagement Rate
                          </Typography>
                        </Grid>
                      </Grid>
                      {data &&
                        data.status &&
                        data.data.viral_influencers.map((influencer) => (
                          <Grid
                            container
                            justify="space-between"
                            alignItems="center"
                            style={{
                              padding: "1rem 0",
                              borderTop: "1px solid #eee",
                            }}
                          >
                            <Grid item xs={4}>
                              <Grid container alignItems="center">
                                <Grid item>
                                  <img
                                    onError={addDefaultUrl}
                                    className={classes.img}
                                    src={influencer.instagram_profile_pic_url}
                                    alt={"profile"}
                                  />
                                </Grid>

                                <Grid item>
                                  {/* <Typography
                                className={classes.name}
                                style={{
                                  textDecoration: "none",
                                  overflowWrap: "break-word",
                                }}
                              >
                                {influencer.name}
                              </Typography> */}
                                  <Link
                                    style={{
                                      textDecoration: "none",
                                      overflowWrap: "break-word",
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    to={`/discover/${influencer.instagram_handle}`}
                                  >
                                    <Typography className={classes.handle}>
                                      @{influencer.instagram_handle}
                                    </Typography>
                                  </Link>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item xs={2}>
                              <Typography className={classes.item}>
                                {convertNumberToBMK(
                                  influencer.viral_influencer_reach
                                )}
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography className={classes.item}>
                                {convertNumberToBMK(
                                  influencer.viral_influencer_engagement
                                )}
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography className={classes.item}>
                                {convertNumberToBMK(
                                  influencer.instagram_followers
                                )}
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography className={classes.item}>
                                {influencer.instagram_total_engagement_rate}
                              </Typography>
                            </Grid>
                          </Grid>
                        ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </TabPanel>
  );
}
