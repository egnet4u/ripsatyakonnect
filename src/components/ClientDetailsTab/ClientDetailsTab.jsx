import {
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../../redux/createPitchSlice";
import TabPanel from "../TabPanel/TabPanel";
import { Autocomplete } from "@material-ui/lab";
import { useDebounce } from "use-debounce/lib";
import { useMutation } from "react-query";
import { getCompanyHistory } from "../../api";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
  },
  option: {
    fontSize: "11px",
  },
  autocomplete: {
    "& label": {
      fontSize: "11px",
    },
    "& fieldset": {
      fontSize: "11px",
    },
  },
  options: {
    fontSize: "11px",
  },
}));

export default function ClientDetailsTab({ value, index }) {
  const classes = useStyles();
  const data = useSelector((state) => state.createPitchData.data);
  const dispatch = useDispatch();
  const location = useSelector((state) => state.locationData.location);
  const categoriesOfBrand = useSelector(
    (state) => state.categoryData.categoriesOfBrand
  );

  const { mutateAsync, isLoading } = useMutation(getCompanyHistory);

  const [text, setText] = React.useState("");
  const [companies, setCompanies] = React.useState([]);
  const [clients, setClients] = React.useState([]);

  /** Debounce used for a call api after certain of time when we enter keys in search input 
   * In below example after every 500 mili second API call and get the value of input box
   *  every 500 mili seconds and store it first "text" vareable then "debounceText"
   */
  const [debounceText] = useDebounce(text, 500);

  const handleSearch = (value) => {
    setText(value);
  };

  useEffect(() => {
    if (debounceText) {
      mutateAsync(debounceText)
        .then((data) => {
          //console.log("clientDetailsTab",data.data);
          //creatre a new array and filterit of company name
          const getComData = data.data
          const distinictFun = (value , index  , self) =>{
            return self.indexOf(value) == index;
          }
          /** extract the companeys from receving */
          const extractData  = getComData.map((val,index)=>{
              return val.company_name;
          })
          /** same companey consider only one time that mean filter it
           * and company value store it in "extractData" vareable
           */
          const distinict_companey = extractData.filter(distinictFun);
          //console.log("clientDetailsTab",distinict_companey);
          //setCompanies(data.company_unique_data);//in old api
          setCompanies(distinict_companey);       
          setClients(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [debounceText, mutateAsync]);

  const getClientNames = () => {
    if (clients.length === 0) return [];
    return clients.filter((company) => {
      return company.client_name !== null;
    });
  };

  const getClientPhone = (selectedClient) => {
    if (getClientNames().length !== 0) {
      const index = getClientNames().findIndex(
        (item) => item.client_name === selectedClient
      );
      if (index === -1) return "";
      const found = getClientNames()[index];
      if (found.client_phone !== null) {
        return found.client_phone;
      } else {
        return "";
      }
    }
    return "";
  };
  const getClientEmail = (selectedClient) => {
    if (getClientNames().length !== 0) {
      const index = getClientNames().findIndex(
        (item) => item.client_name === selectedClient
      );
      if (index === -1) return "";
      const found = getClientNames()[index];
      if (found.client_email !== null) {
        return found.client_email;
      } else {
        return "";
      }
    }
    return "";
  };

  const onClientNameSelect = (value) => {
    if (getClientPhone(value)) {
      dispatch(
        setField({ name: "client_phone", value: getClientPhone(value) })
      );
    } else {
      dispatch(setField({ name: "client_phone", value: "" }));
    }
    if (getClientEmail(value)) {
      dispatch(
        setField({ name: "client_email", value: getClientEmail(value) })
      );
    } else {
      dispatch(setField({ name: "client_email", value: "" }));
    }
  };

  return (
    <TabPanel value={value} index={index}>
      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={6} md={4} lg={4}>
          {/* In "Autocomplete" some required props are used like
             options , renderInput , 
          */}
          <Autocomplete
           /** Here data  get by redux storage */
            value={data.company_name}
            name="company_name"
            onChange={(e, value) => {
              handleSearch(value);//for storing a value of input in text variable when calling the function
              dispatch(setField({ name: "company_name", value }));
            }}
            freeSolo
            loading={isLoading}
            onInputChange={(e, value) => {
              handleSearch(value);
              dispatch(setField({ name: "company_name", value: value }));
            }}
            classes={{
              option: classes.options,
              input: classes.options,
            }}
            className={classes.autocomplete}
            size="small"
            id="company_name_id"
            options={companies}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                required
                size="small"
                {...params}
                variant="outlined"
                label="Company Name"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={12} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Autocomplete
            value={data.client_name}
            name="client_name"
            onChange={(e, value) => {
              onClientNameSelect(value);
              dispatch(setField({ name: "client_name", value }));
            }}
            freeSolo
            onInputChange={(e, value) => {
              dispatch(setField({ name: "client_name", value: value }));
            }}
            classes={{
              option: classes.options,
              input: classes.options,
            }}
            className={classes.autocomplete}
            size="small"
            id="client_name_id"
            options={getClientNames().map((company) => company.client_name)}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                variant="outlined"
                label="Client Name
                "
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Autocomplete
            value={data.brand_category}
            name="brand_category"
            onChange={(e, value) =>
              dispatch(setField({ name: "brand_category", value }))
            }
            classes={{
              option: classes.options,
              input: classes.options,
            }}
            className={classes.autocomplete}
            size="small"
            id="client_name_id"
            options={categoriesOfBrand.map(
              (category) => category.category_name
            )}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                variant="outlined"
                label="Category of Brand"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TextField
            name="client_phone"
            value={data.client_phone}
            onChange={(e) =>
              dispatch(setField({ name: e.target.name, value: e.target.value }))
            }
            className={classes.input}
            label="Client Phone"
            variant="outlined"
            size="small"
            type="text"
            InputProps={{
              style: { fontSize: 11 },
            }}
            InputLabelProps={{ style: { fontSize: 11 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TextField
            name="client_email"
            value={data.client_email}
            onChange={(e) =>
              dispatch(setField({ name: e.target.name, value: e.target.value }))
            }
            className={classes.input}
            label="Client Email"
            variant="outlined"
            size="small"
            type="text"
            InputProps={{
              style: { fontSize: 11 },
            }}
            InputLabelProps={{ style: { fontSize: 11 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TextField
            name="email_subject_line"
            value={data.email_subject_line}
            onChange={(e) =>
              dispatch(setField({ name: e.target.name, value: e.target.value }))
            }
            className={classes.input}
            label="Email Subject"
            variant="outlined"
            size="small"
            type="text"
            InputProps={{
              style: { fontSize: 11 },
            }}
            InputLabelProps={{ style: { fontSize: 11 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Autocomplete
            value={data.location}
            name="location"
            onChange={(e, value) =>
              dispatch(setField({ name: "location", value }))
            }
            classes={{
              option: classes.options,
              input: classes.options,
            }}
            className={classes.autocomplete}
            size="small"
            id="location_id"
            options={location.map((loc) => loc.location)}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                variant="outlined"
                label="Location"
              />
            )}
          />
        </Grid>
      </Grid>
    </TabPanel>
  );
}
