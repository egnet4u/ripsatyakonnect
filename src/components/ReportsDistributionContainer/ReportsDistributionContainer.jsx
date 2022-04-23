import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useRef } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getMapAndGenderData } from "../../new_api/api";
import TabPanel from "../TabPanel/TabPanel";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
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
}));

export default function ReportsDistributionContainer({ value, index }) {
  const classes = useStyles();
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
      pdfDOC.save(`${campaignDetails.data.campaign_name}-distribution.pdf`);
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
  const campaignDetails = useSelector(
    (state) => state.campaignData.campaignDetails
  );

  const { isLoading, data } = useQuery("distributions", () =>
    getMapAndGenderData(campaignDetails.data.campaign_name)
  );

  function chartOptionsGenderDistribution() {
    return {
      colors: [
        "#9c27b0",
        "#e91e63",
        "#4caf50",
        "#f44336",
        "#2196f3",
        "#ff9800",
      ],
      navigation: {
        buttonOptions: {
          align: "right",
          y: -15,
        },
      },
      chart: {
        type: "bar",
      },
      title: {
        text: "Stacked bar chart",
        style: {
          display: "none",
        },
      },
      xAxis: {
        categories: [
          "Number of Influencers",
          "Reach",
          "Reach per Influencer",
          "Engagement",
          "Engagement per Influencer",
          "Views",
          "Views per Influencer",
          "Likes",
          "Likes per Influencer",
          "Comments",
          "Comments per Influencer",
        ],
      },
      yAxis: {
        min: 0,
        title: {
          text: "Gender Distribution",
        },
      },
      legend: {
        reversed: true,
      },
      plotOptions: {
        series: {
          stacking: "percent",
          pointWidth: 25,
          // pointPadding: 0.25,
        },
      },
      series: [
        {
          name: "Male",
          data: [
            data.data[0].male_count,
            data.data[0].male_reach,
            Math.round(data.data[0].male_reach / data.data[0].male_count),
            data.data[0].male_engagement,
            Math.round(data.data[0].male_engagement / data.data[0].male_count),
            data.data[0].male_views,
            Math.round(data.data[0].male_views / data.data[0].male_count),
            data.data[0].male_likes,
            Math.round(data.data[0].male_likes / data.data[0].male_count),
            data.data[0].male_comments,
            Math.round(data.data[0].male_comments / data.data[0].male_count),
          ],
        },
        {
          name: "Female",
          data: [
            data.data[0].female_count,
            data.data[0].female_reach,
            Math.round(data.data[0].female_reach / data.data[0].female_count),
            data.data[0].female_engagement,
            Math.round(
              data.data[0].female_engagement / data.data[0].female_count
            ),
            data.data[0].female_views,
            Math.round(data.data[0].female_views / data.data[0].female_count),
            data.data[0].female_likes,
            Math.round(data.data[0].female_likes / data.data[0].female_count),
            data.data[0].female_comments,
            Math.round(
              data.data[0].female_comments / data.data[0].female_count
            ),
          ],
        },
      ],
    };
  }

  function tierData() {
    if (data.data[0] && data.data[0].tier_distribution_data) {
      let dataArray = [];
      let tiers = [
        "Not Assigned",
        "Nano",
        "Power",
        "Power Plus",
        "Premium",
        "Super Premium",
        "Celebrity B",
        "Celebrity A",
      ];
      let tierIndices = Object.keys(data.data[0].tier_distribution_data);
      for (let i = 0; i < tierIndices.length; i++) {
        if (tierIndices[i] !== "0") {
          let obj = {};
          let particularTier =
            data.data[0].tier_distribution_data[tierIndices[i]];
          obj.name = tiers[tierIndices[i]];
          obj.data = [
            particularTier.number_of_influencers,
            particularTier.reach,
            Math.round(
              particularTier.reach / particularTier.number_of_influencers
            ),
            particularTier.engagement,
            Math.round(
              particularTier.engagement / particularTier.number_of_influencers
            ),
            particularTier.views,
            Math.round(
              particularTier.views / particularTier.number_of_influencers
            ),
            particularTier.likes,
            Math.round(
              particularTier.likes / particularTier.number_of_influencers
            ),
            particularTier.comments,
            Math.round(
              particularTier.comments / particularTier.number_of_influencers
            ),
          ];
          dataArray.push(obj);
        }
      }
      return dataArray;
    }
    return [];
  }
  function categoryData() {
    if (data.data[0] && data.data[0].category_distribution_data) {
      let dataArray = [];

      let categories = Object.keys(data.data[0].category_distribution_data);
      for (let i = 0; i < categories.length; i++) {
        let obj = {};
        let particularCategory =
          data.data[0].category_distribution_data[categories[i]];

        obj.name = categories[i];
        obj.data = [
          particularCategory.number_of_influencers,
          particularCategory.reach,
          Math.round(
            particularCategory.reach / particularCategory.number_of_influencers
          ),
          particularCategory.engagement,
          Math.round(
            particularCategory.engagement /
              particularCategory.number_of_influencers
          ),
          particularCategory.views,
          Math.round(
            particularCategory.views / particularCategory.number_of_influencers
          ),
          particularCategory.likes,
          Math.round(
            particularCategory.likes / particularCategory.number_of_influencers
          ),
          particularCategory.comments,
          Math.round(
            particularCategory.comments /
              particularCategory.number_of_influencers
          ),
        ];
        dataArray.push(obj);
      }
      return dataArray;
    }
    return [];
  }

  function chartOptionsTierDistribution() {
    return {
      colors: [
        "#9c27b0",
        "#e91e63",
        "#4caf50",
        "#f44336",
        "#2196f3",
        "#ff9800",
      ],
      navigation: {
        buttonOptions: {
          align: "right",
          y: -15,
        },
      },
      chart: {
        type: "bar",
      },
      title: {
        text: "Stacked bar chart",
        style: {
          display: "none",
        },
      },
      xAxis: {
        categories: [
          "Number of Influencers",
          "Reach",
          "Reach per Influencer",
          "Engagement",
          "Engagement per Influencer",
          "Views",
          "Views per Influencer",
          "Likes",
          "Likes per Influencer",
          "Comments",
          "Comments per Influencer",
        ],
      },
      yAxis: {
        min: 0,
        title: {
          text: "Tier Distribution",
        },
      },
      legend: {
        reversed: true,
      },
      plotOptions: {
        series: {
          stacking: "percent",
          pointWidth: 25,
          // pointPadding: 0.25,
        },
      },
      series: tierData(),
    };
  }

  function chartOptionsCategoryDistribution() {
    return {
      colors: [
        "#9c27b0",
        "#e91e63",
        "#4caf50",
        "#f44336",
        "#2196f3",
        "#ff9800",
      ],
      navigation: {
        buttonOptions: {
          align: "right",
          y: -15,
        },
      },
      chart: {
        type: "bar",
      },
      title: {
        text: "Stacked bar chart",
        style: {
          display: "none",
        },
      },
      xAxis: {
        categories: [
          "Number of Influencers",
          "Reach",
          "Reach per Influencer",
          "Engagement",
          "Engagement per Influencer",
          "Views",
          "Views per Influencer",
          "Likes",
          "Likes per Influencer",
          "Comments",
          "Comments per Influencer",
        ],
      },
      yAxis: {
        min: 0,
        title: {
          text: "Category Distribution",
        },
      },
      legend: {
        reversed: true,
      },
      plotOptions: {
        series: {
          stacking: "percent",
          pointWidth: 25,
          // pointPadding: 0.25,
        },
      },
      series: categoryData(),
    };
  }

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
            <Box textAlign="center" py="2.5rem">
              <Typography className={classes.heading}>Distribution</Typography>
            </Box>
            <Grid container style={{ paddingBottom: "2.5rem" }}>
              <Grid item xs={12}>
                <Box className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Gender Distribution
                    </Typography>
                  </Box>
                  <Box>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptionsGenderDistribution()}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container style={{ paddingBottom: "2.5rem" }}>
              <Grid item xs={12}>
                <Box className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Tier Distribution
                    </Typography>
                  </Box>
                  <Box>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptionsTierDistribution()}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container style={{ paddingBottom: "2.5rem" }}>
              <Grid item xs={12}>
                <Box className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Category Distribution
                    </Typography>
                  </Box>
                  <Box>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptionsCategoryDistribution()}
                    />
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
