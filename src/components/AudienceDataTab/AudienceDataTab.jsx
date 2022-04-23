import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import TabPanel from "../TabPanel/TabPanel";
import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import GetAppIcon from "@material-ui/icons/GetApp";
import RefreshIcon from "@material-ui/icons/Refresh";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  downloadAudienceData,
  fetchAudienceData,
  getAudienceData,
} from "../../api";
import {deleteAudienceInfData} from '../../new_api/api';

const useStyles = makeStyles((theme) => ({
  main: {},
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
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
  },
}));

const chartColors = [
  "#2196f3",
  "#9c27b0",
  "#ff9800",
  "#e91e63",
  "#4caf50",
  "#f44336",
];

export default function AudienceDataTab({ value, index, setValue }) {
  const queryClient = useQueryClient();
  const classes = useStyles();
  const influencerData = useSelector((state) => state.influencerInfoData.data);
  const { mutateAsync, isLoading } = useMutation(fetchAudienceData);
  
  const { isLoading: isLoadingGetAudienceData, data , refetch  } = useQuery(["audienceData" , influencerData.instagram_id],
  () => getAudienceData(influencerData.instagram_id) ,{refetchOnWindowFocus: false,enabled: false});
  const { mutateAsync: mutateAsyncCSV, isLoading: isLoadingCSV } =useMutation(downloadAudienceData);
  const {mutateAsync: deleteAudianceData , isLaading:deleteAudianceDataIsLoading} = useMutation(deleteAudienceInfData);
  useEffect(() => { refetch()}, [influencerData.instagram_id])
  
  function getGenderData() {
    return data.data.audience_genders.map((gender) => {
      return [gender.code, gender.weight];
    });
  }

  function genderSplitOptions() {
    return {
      colors: chartColors,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: `Browser Shares`,
        align: "center",
        style: {
          fontSize: "1.5rem",
          fontWeight: "bold",
          display: "none",
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
          startAngle: -360,
          endAngle: 360,
        },
      },
      series: [
        {
          type: "pie",
          name: "Gender Split",
          innerSize: "50%",
          data: getGenderData(),
        },
      ],
    };
  }

  function getAgeData() {
    return data.data.audience_ages.map((age) => {
      return [age.code, age.weight * 100];
    });
  }

  function ageSplitOptions() {
    return {
      colors: chartColors,
      chart: {
        type: "column",
      },
      title: {
        style: {
          display: "none",
        },
      },
      subtitle: {
        style: {
          display: "none",
        },
      },

      xAxis: {
        type: "category",
        labels: {
          style: {
            fontSize: "16px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Percentage %",
          style: {
            fontSize: "16px",
          },
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        pointFormat: "Percentage <b>{point.y:.1f}%</b>",
        style: {
          fontSize: "1.2rem",
        },
      },
      series: [
        {
          name: "Age Split",
          data: getAgeData(),
          dataLabels: {
            enabled: true,
            // rotation: -90,
            color: "#FFFFFF",
            align: "center",
            format: "{point.y:.1f}",
            style: {
              fontSize: "1.2rem",
              fontFamily: "Verdana, sans-serif",
            },
          },
        },
      ],
    };
  }

  function getCities() {
    return data.data.audience_cities.slice(0, 7);
  }
  function getCountries() {
    return data.data.audience_countries.slice(0, 7);
  }
  function getBrandAffinity() {
    return data.data.audience_brand_affinity.slice(0, 7);
  }
  function getInterestAffinity() {
    return data.data.audience_interests.slice(0, 7);
  }

  const handleFetchData = async () => {

       deleteAudianceData({instagram_id: influencerData.instagram_id}).then((res)=>{
          mutateAsync({
            instagram_id: influencerData.instagram_id,
          }).then((response)=>{
            toast.success("Data Fetched Successfully");
            setValue(2);
            refetch();
          }).catch((err)=>{
            toast.error("Something went wrong. Please try again");
          })
       })
       .catch((error)=>{
             const error_status = error.response.data.status;
             if(!error_status){
              //if data is already deleted then show the error so that reason again we are post the data and get tha
                mutateAsync({
                  instagram_id: influencerData.instagram_id,
                }).then((response)=>{
                  toast.success("Data Fetched Successfully");
                  setValue(2);
                  refetch();
                }).catch((err)=>{
                  toast.error("Something went wrong. Please try again");
                })
            }
      
       })
      

  }

  async function handleDownloadCSV() {
    try {
      const response = await mutateAsyncCSV(influencerData.instagram_id);
      if (response.status) {
        window.location.replace(response.data);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  }

  return (
    <TabPanel value={value} index={index}>
      {isLoadingGetAudienceData && <CircularProgress size={18} />}
      <Box className={classes.main}>
        <Box textAlign="right">
          <Button
            onClick={handleDownloadCSV}
            startIcon={<GetAppIcon color="primary" />}
            color="primary"
            variant="text"
            className={classes.button}
          >
            Download{" "}
            {isLoadingCSV && (
              <CircularProgress
                color="primary"
                style={{ marginLeft: "0.3rem" }}
                size={13}
              />
            )}
          </Button>
          <Button
            onClick={handleFetchData}
            style={{ marginLeft: ".5rem" }}
            color="primary"
            variant="contained"
            className={classes.button}
          >
            {!isLoading && <RefreshIcon fontSize="small" />}
            {isLoading  && (
              <CircularProgress
                style={{ color: "#fff", marginLeft: "0.3rem" }}
                size={18}
              />
            )}
          </Button>
        </Box>
        {!data && (
          <Box textAlign="center" pt="5rem">
            <Typography color="textSecondary" variant="h5">
              Data not fetched yet
            </Typography>
          </Box>
        )}

        {data && data.data.audience_credibility && (
          <Box>
            <Box textAlign="center" pb="2.5rem">
              <Typography className={classes.heading}>Audience Data</Typography>
            </Box>
            <Grid container style={{ paddingBottom: "2.5rem" }}>
              <Grid item xs={6}>
                <Box height="100%" className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Credibility
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="80%"
                  >
                    {data.data.audience_credibility && (
                      <Typography
                        //   style={{ padding: "2rem 0" }}
                        variant="h3"
                        color="textPrimary"
                      >
                        {(data.data.audience_credibility * 100).toFixed(2)}%
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box height="100%" className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Gender Split
                    </Typography>
                  </Box>
                  <Box>
                    {data.data.audience_genders &&
                      data.data.audience_genders.length !== 0 && (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={genderSplitOptions()}
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
                      Age Split
                    </Typography>
                  </Box>
                  <Box>
                    {data.data.audience_ages &&
                      data.data.audience_ages.length !== 0 && (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={ageSplitOptions()}
                        />
                      )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid container style={{ paddingBottom: "2.5rem" }}>
              <Grid item xs={6}>
                <Box height="100%" className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Location By Cities
                    </Typography>
                  </Box>

                  {data.data.audience_cities &&
              
                    data.data.audience_cities.length !== 0 && (
                      <Box>
                        {getCities().map((city, i) => (
                          <Grid
                            key={city + i}
                            container
                            justify="space-between"
                            style={{
                              padding: "10px 0",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            <Grid item xs={6} style={{ textAlign: "center" }}>
                              <Typography color="textSecondary" variant="h6">
                                {city.city_name}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: "center" }}>
                              <Typography color="textSecondary" variant="h6">
                                {(city.city_weight * 100).toFixed(2)}%
                              </Typography>
                            </Grid>
                          </Grid>
                        ))}
                      </Box>
                    )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box height="100%" className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Location By Countries
                    </Typography>
                  </Box>

                  {data.data.audience_countries &&
                    data.data.audience_countries.length !== 0 && (
                      <Box>
                        {getCountries().map((country, i) => (
                          <Grid
                            key={country + i}
                            container
                            justify="space-between"
                            style={{
                              padding: "10px 0",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            <Grid item xs={6} style={{ textAlign: "center" }}>
                              <Typography color="textSecondary" variant="h6">
                                {country.country_name}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: "center" }}>
                              <Typography color="textSecondary" variant="h6">
                                {(country.country_weight * 100).toFixed(2)}%
                              </Typography>
                            </Grid>
                          </Grid>
                        ))}
                      </Box>
                    )}
                </Box>
              </Grid>
            </Grid>
            <Grid container style={{ paddingBottom: "2.5rem" }}>
              <Grid item xs={6}>
                <Box height="100%" className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Audience Brand Affinity
                    </Typography>
                  </Box>

                  {data.data.audience_brand_affinity &&
                    data.data.audience_brand_affinity.length !== 0 && (
                      <Box>
                        {getBrandAffinity().map((item) => (
                          <Grid
                            container
                            justify="space-between"
                            style={{
                              padding: "10px 0",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            <Grid item xs={6} style={{ textAlign: "center" }}>
                              <Typography color="textSecondary" variant="h6">
                                {item.brand_name}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: "center" }}>
                              <Typography color="textSecondary" variant="h6">
                                {(item.brand_weight * 100).toFixed(2)}%
                              </Typography>
                            </Grid>
                          </Grid>
                        ))}
                      </Box>
                    )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box height="100%" className={classes.box}>
                  <Box className={classes.header}>
                    <Typography className={classes.boxTitle}>
                      Audience Interest Affinity
                    </Typography>
                  </Box>
                  <Box>
                    {data.data.audience_interests &&
                      data.data.audience_interests.length !== 0 && (
                        <Box>
                          {getInterestAffinity().map((item) => (
                            <Grid
                              container
                              justify="space-between"
                              style={{
                                padding: "10px 0",
                                borderBottom: "1px solid #eee",
                              }}
                            >
                              <Grid item xs={6} style={{ textAlign: "center" }}>
                                <Typography color="textSecondary" variant="h6">
                                  {item.interest_name}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} style={{ textAlign: "center" }}>
                                <Typography color="textSecondary" variant="h6">
                                  {(item.interest_weight * 100).toFixed(2)}%
                                </Typography>
                              </Grid>
                            </Grid>
                          ))}
                        </Box>
                      )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </TabPanel>
  );
}
