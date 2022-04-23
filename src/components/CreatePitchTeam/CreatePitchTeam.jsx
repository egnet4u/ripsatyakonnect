import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import CreatePitchTeamTabs from "../CreatePitchTeamTabs/CreatePitchTeamTabs";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  common: {
    padding: "31px 0 18.5px 17px",
  },
  input: {
    width: "100%",
  },
  button: {
    fontSize: "12px",
    lineHeight: 1.5,
  },
}));

export default function CreatePitchTeam({ pitch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const classes = useStyles();
  // get the all members from redux
  const users = useSelector((state) => state.allUsersData.users);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getTeamMembers = () => {
    // return users
    //   ? users.filter(
    //     (tm) =>
    //       tm.roles.includes("super_admin") ||
    //       tm.roles.includes("management_admin") ||
    //       tm.roles.includes("community_admin")
    //   )
    //   : [];
    return users ? users : [];
  };

  /** Get list managers */
  const getListManagers = () => {
    /** 
     * In previous api we filter the data 
     * but in new api we not filter tha data because filter option not provide in new api
     * */

    // return users
    //   ? users.filter(
    //     (tm) =>
    //       tm.roles.includes("super_admin") ||
    //       tm.roles.includes("management_admin") ||
    //       tm.roles.includes("community_admin")
    //   )
    //   : [];

    return users ? users : [];
  };

  const filteredTeamMembers = () => {
    /** In privious api we filter the data but new api not provided */
    // return getTeamMembers().filter((tm) =>
    //   tm.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    return getTeamMembers();
  };

  /** filter List manager by search option*/
  const filteredListManagers = () => {
    /** In privious api we filter the data but in new api not filter */
    // return getListManagers().filter((lm) =>
    //   lm.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    return getListManagers();
  };

  return (
    <div>
      <Grid container className={classes.common} alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <TextField
            value={searchQuery}
            onChange={handleSearch}
            className={classes.input}
            label="Search by Manager,Team Member"
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
      </Grid>
      <CreatePitchTeamTabs
        pitch={pitch}
        value={value}
        handleChange={handleChange}
        listManagers={filteredListManagers()}
        teamMembers={filteredTeamMembers()}
      />
    </div>
  );
}
