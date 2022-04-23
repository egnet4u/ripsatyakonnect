import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import React, { useRef } from "react";
import TabPanel from "../TabPanel/TabPanel";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import VennModule from "highcharts/modules/venn.js";
import { useQuery } from "react-query";
import { getCampaignDeliverables, getCampaignReportsMetrics } from "../../new_api/api";
import { useSelector } from "react-redux";
import GetAppIcon from "@material-ui/icons/GetApp";

VennModule(Highcharts);

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
}));

const chartColors = [
  "#4caf50",
  "#f44336",
  "#2196f3",
  "#ff9800",
  "#9c27b0",
  "#e91e63",
];

export default function ReportsMetricsContainer({ value, index }) {
  const classes = useStyles();
  const campaignDetails = useSelector(
    (state) => state.campaignData.campaignDetails
  );
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
      pdfDOC.save(`${campaignDetails.data.campaign_name}-metrics.pdf`);
    });
  }

  function downdloadPNG() {
    html2canvas(downloadRef.current).then((canvas) => {
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = `${campaignDetails.data.campaign_name}-metrics.png`;
      link.href = canvas.toDataURL("image/png");
      link.target = "_blank";
      link.click();
    });
  }
  const { isLoading, data } = useQuery("deliverables", () =>
    getCampaignDeliverables(campaignDetails.campaignFirstData[0].id)
  );

  const { isLoading: isLoadingReports, data: dataReports } = useQuery(
    "reports",
    () => getCampaignReportsMetrics({ id: campaignDetails.campaignFirstData[0].id, platform: campaignDetails.campaignFirstData[0].platform })
  );
  function campaignCompletionRate() {
    let completed =

      data.data[0].carousel_delivered +
      data.data[0].custom_delivered +
      data.data[0].igtv_delivered +
      data.data[0].image_delivered +
      data.data[0].reels_delivered +
      data.data[0].sstory_delivered +
      data.data[0].video_delivered +
      data.data[0].vstory_delivered;
    console.log("🚀 ~ file: ReportsMetricsContainer.jsx ~ line 115 ~ campaignCompletionRate ~ completed", completed)
    let total =
      data.data[0].carousel_total +
      data.data[0].custom_total +
      data.data[0].igtv_total +
      data.data[0].image_total +
      data.data[0].reels_total +
      data.data[0].sstory_total +
      data.data[0].video_total +
      data.data[0].vstory_total;
    console.log("🚀 ~ file: ReportsMetricsContainer.jsx ~ line 126 ~ campaignCompletionRate ~ total", total)

    if (completed === 0) {
      return 0;
    }
    return (completed / total) * 100;
  }

  function chartOptionsCompletion() {
    return {
      colors: chartColors,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: `${campaignCompletionRate().toFixed(2)}%`,
        align: "center",
        style: {
          fontSize: "1.5rem",
          fontWeight: "bold",
        },
        verticalAlign: "middle",
        y: 80,
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        style: {
          fontSize: "1.2rem",
        },
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
            distance: -50,
            style: {
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "white",
            },
          },
          startAngle: -90,
          endAngle: 90,
          center: ["50%", "75%"],
          size: "140%",
        },
      },
      series: [
        {
          type: "pie",
          name: "Campaign Completion",
          innerSize: "50%",
          data: [
            ["Completed", campaignCompletionRate()],
            ["Remaining", 100 - campaignCompletionRate()],
          ],
        },
      ],
    };
  }

  function chartOptionsDeliverables() {
    return {
      colors: [
        "#f44336",
        "#4caf50",
        "#2196f3",
        "#ff9800",
        "#9c27b0",
        "#e91e63",
      ],
      chart: {
        type: "bar",
      },
      tooltip: {
        style: {
          fontSize: "1.2rem",
        },
      },
      title: {
        text: "Stacked bar chart",
        style: {
          display: "none",
        },
      },
      xAxis: {
        categories: [
          "Image",
          "Video",
          "Carousel",
          "Igtv",
          "Reels",
          "S-Story",
          "V-Story",
          "Custom",
        ],
        tickInterval: 1,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Number of Deliverables",
        },
      },
      legend: {
        reversed: false,
      },
      plotOptions: {
        series: {
          stacking: "normal",
        },
        bar: {
          pointWidth: 35,
        },
      },
      series: [
        {
          name: "Remaining",
          data: [
            Number(data.data[0].image_total) -
            Number(data.data[0].image_delivered),
            Number(data.data[0].video_total) -
            Number(data.data[0].video_delivered),
            Number(data.data[0].carousel_total) -
            Number(data.data[0].carousel_delivered),
            Number(data.data[0].igtv_total) -
            Number(data.data[0].igtv_delivered),
            Number(data.data[0].reels_total) -
            Number(data.data[0].reels_delivered),
            Number(data.data[0].sstory_total) -
            Number(data.data[0].sstory_delivered),
            Number(data.data[0].vstory_total) -
            Number(data.data[0].vstory_delivered),
            Number(data.data[0].custom_total) -
            Number(data.data[0].custom_delivered),
          ],
        },
        {
          name: "Completed",
          data: [
            Number(data.data[0].image_delivered),
            Number(data.data[0].video_delivered),
            Number(data.data[0].carousel_delivered),
            Number(data.data[0].igtv_delivered),
            Number(data.data[0].reels_delivered),
            Number(data.data[0].sstory_delivered),
            Number(data.data[0].vstory_delivered),
            Number(data.data[0].custom_delivered),
          ],
        },
      ],
    };
  }

  function chartOptionsFunnel() {
    return {
      colors: [
        "#2196f3",
        "#4caf50",
        "#9c27b0",
        "#e91e63",
        "#ff9800",
        "#f44336",
      ],
      accessibility: {
        point: {
          valueDescriptionFormat: "{point.name}: {point.value}.",
        },
      },
      series: [
        {
          type: "venn",
          data: [
            {
              sets: ["A"],
              value: dataReports.data[0].achieved_reach,
              name: "Achieved Reach",
            },
            {
              sets: ["B"],
              value: dataReports.data[0].achieved_engagement,
              name: "Achieved Engagement",
            },
            {
              sets: ["A", "B"],
              value:
                dataReports.data[0].achieved_reach +
                dataReports.data[0].achieved_engagement,
            },
          ],
        },
      ],
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,

            style: {
              fontSize: "1.2rem",
            },
          },
        },
      },
      tooltip: {
        headerFormat:
          '<span style="color:{point.color}">\u2022</span> ' +
          '<span style="font-size: 14px"> {point.point.name}</span><br/>',
        pointFormat: "Value: {point.value}",
        style: {
          fontSize: "1.2rem",
        },
      },
      title: {
        text: "Relationship between Euler and Venn diagrams",
        style: {
          display: "none",
        },
      },
    };
  }

  function chartOptionsPie() {
    return {
      colors: [
        "#2196f3",
        "#ff9800",
        "#9c27b0",
        "#e91e63",
        "#4caf50",
        "#f44336",
      ],
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Views, Likes and Comments",
        style: {
          fontWeight: "bold",
          color: "#555",
        },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        style: {
          fontSize: "1.2rem",
        },
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            formatter: function () {
              if (this.y > 0) {
                return (
                  this.point.name +
                  ": " +
                  Highcharts.numberFormat(this.point.percentage, 1) +
                  " %"
                );
              }
            },
            style: {
              fontSize: "1.2rem",
            },
          },
          showInLegend: true,
          center: ["60%", "50%"],
          size: "95%",
        },
      },
      series: [
        {
          name: "Engagement",
          colorByPoint: true,
          data: [
            {
              name: "Views",
              y: dataReports.data[0].views_count,
            },
            {
              name: "Likes",
              y: dataReports.data[0].likes_count,
            },
            {
              name: "Comments",
              y: dataReports.data[0].comments_count,
            },
          ],
        },
      ],
    };
  }

  return (
    <TabPanel value={value} index={index} pad={"0px"}>
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
            <Typography className={classes.heading}>
              Campaign Performance
            </Typography>
          </Box>
          <Grid container style={{ paddingBottom: "2.5rem" }}>
            <Grid item xs={6}>
              <Box height="100%" className={classes.box}>
                <Box className={classes.header}>
                  <Typography className={classes.boxTitle}>
                    Campaign Attributes
                  </Typography>
                </Box>
                {isLoadingReports && (
                  <CircularProgress size={20} color="primary" />
                )}
                {dataReports && dataReports.status && (
                  <Box paddingTop="2rem">
                    <Grid
                      container
                      style={{
                        borderBottom: "2px solid #eee",
                        textAlign: "center",
                      }}
                    >
                      <Grid
                        item
                        xs={6}
                        style={{
                          borderRight: "2px solid #eee",
                          padding: "3rem 0",
                        }}
                      >
                        <Typography className={classes.title}>
                          Number of Influencers
                        </Typography>
                        <Typography className={classes.number}>
                          {dataReports.data[0].influencers_count &&
                            dataReports.data[0].influencers_count}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} style={{ padding: "3rem 0" }}>
                        <Typography className={classes.title}>
                          Planned Content
                        </Typography>
                        <Typography className={classes.number}>
                          {dataReports.data[0].plannned_content &&
                            dataReports.data[0].plannned_content}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Grid
                        item
                        xs={6}
                        style={{
                          borderRight: "2px solid #eee",
                          padding: "3rem 0",
                        }}
                      >
                        <Typography className={classes.title}>
                          Verified Accounts
                        </Typography>
                        <Typography className={classes.number}>
                          {" "}
                          {dataReports.data[0].verified_account &&
                            dataReports.data[0].verified_account}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} style={{ padding: "3rem 0" }}>
                        <Typography className={classes.title}>
                          Business Accounts
                        </Typography>
                        <Typography className={classes.number}>
                          {" "}
                          {dataReports.data[0].business_account &&
                            dataReports.data[0].business_account}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.box}>
                <Box className={classes.header}>
                  <Typography className={classes.boxTitle}>
                    Campaign Completion Rate
                  </Typography>
                </Box>
                <Box>
                  {isLoading && <CircularProgress size={20} color="primary" />}
                  {data && data.status && (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptionsCompletion()}
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
                    Campaign Status
                  </Typography>
                </Box>
                <Box>
                  {isLoading && <CircularProgress size={20} color="primary" />}
                  {data && data.status && (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptionsDeliverables()}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container style={{ paddingBottom: "2.5rem" }}>
            <Grid item xs={6}>
              <Box className={classes.box}>
                <Box className={classes.header}>
                  <Typography className={classes.boxTitle}>
                    Reach And Engagement
                  </Typography>
                </Box>
                <Box>
                  {isLoadingReports && (
                    <CircularProgress size={20} color="primary" />
                  )}
                  {dataReports && dataReports.status && (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptionsFunnel()}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
            {isLoadingReports && <CircularProgress size={20} color="primary" />}
            {dataReports && dataReports.status && (
              <Grid item xs={6}>
                <Box height="50%" className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>Reach</Typography>
                  </Box>
                  <Typography className={classes.percentage}>
                    {dataReports.data[0].expected_react === 0 ||
                      dataReports.data[0].achieved_reach === 0 ? "0" :
                      Math.round(
                        (dataReports.data[0].expected_reach /
                          dataReports.data[0].achieved_reach) *
                        100
                      )
                    }
                    %
                  </Typography>
                  <Grid container style={{ textAlign: "center" }}>
                    <Grid
                      item
                      xs={6}
                      style={{
                        padding: "0rem 0",
                        borderRight: "2px solid #eee",
                      }}
                    >
                      <Typography className={classes.title}>
                        Achieved
                      </Typography>
                      <Typography className={classes.number}>
                        {dataReports.data[0].achieved_reach &&
                          dataReports.data[0].achieved_reach}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ padding: "0rem 0" }}>
                      <Typography className={classes.title}>
                        Expected
                      </Typography>
                      <Typography className={classes.number}>
                        {dataReports.data[0].expected_reach &&
                          dataReports.data[0].expected_reach}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box height="50%" className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Engagement
                    </Typography>
                  </Box>
                  <Typography className={classes.percentage}>
                    {dataReports.data[0].achieved_engagement === 0 ||
                      dataReports.data[0].expected_engagement === 0 ? "0" :
                      Math.round(
                        (dataReports.data[0].achieved_engagement /
                          dataReports.data[0].expected_engagement) *
                        100
                      )
                    }
                    %
                  </Typography>
                  <Grid container style={{ textAlign: "center" }}>
                    <Grid
                      item
                      xs={6}
                      style={{
                        padding: "0rem 0",
                        borderRight: "2px solid #eee",
                      }}
                    >
                      <Typography className={classes.title}>
                        Achieved
                      </Typography>
                      <Typography className={classes.number}>
                        {dataReports.data[0].achieved_engagement &&
                          dataReports.data[0].achieved_engagement}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ padding: "0rem 0" }}>
                      <Typography className={classes.title}>
                        Expected
                      </Typography>
                      <Typography className={classes.number}>
                        {dataReports.data[0].expected_engagement &&
                          dataReports.data[0].expected_engagement}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}
          </Grid>

          <Grid container style={{ paddingBottom: "2.5rem" }}>
            <Grid item xs={12}>
              <Box className={classes.box}>
                <Box className={classes.header}>
                  <Typography className={classes.boxTitle}>
                    Engagement Split
                  </Typography>
                </Box>
                {isLoading && <CircularProgress size={20} color="primary" />}
                {dataReports && dataReports.status && (
                  <Grid container>
                    <Grid item xs={6}>
                      <Grid
                        container
                        style={{ height: "97%", textAlign: "center" }}
                      >
                        <Grid
                          className={classes.box}
                          style={{ marginTop: "1rem", padding: "10px" }}
                          item
                          xs={12}
                        >
                          <Typography className={classes.title}>
                            Views
                          </Typography>
                          <Typography
                            style={{ paddingTop: "10px", fontSize: "24px" }}
                          >
                            {dataReports.data[0].views_count &&
                              dataReports.data[0].views_count}
                          </Typography>
                        </Grid>
                        <Grid
                          className={classes.box}
                          style={{ marginTop: "1rem", padding: "10px" }}
                          item
                          xs={12}
                        >
                          <Typography className={classes.title}>
                            Likes
                          </Typography>
                          <Typography
                            style={{ paddingTop: "10px", fontSize: "24px" }}
                          >
                            {dataReports.data[0].likes_count &&
                              dataReports.data[0].likes_count}
                          </Typography>
                        </Grid>
                        <Grid
                          className={classes.box}
                          style={{ marginTop: "1rem", padding: "10px" }}
                          item
                          xs={12}
                        >
                          <Typography className={classes.title}>
                            Comments
                          </Typography>
                          <Typography
                            style={{ paddingTop: "10px", fontSize: "24px" }}
                          >
                            {dataReports.data[0].comments_count &&
                              dataReports.data[0].comments_count}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={chartOptionsPie()}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </TabPanel>
  );
}
