import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { fetchUserReposAndOrganizations } from "../../actions/app-actions";

const useStyles = makeStyles(theme => {
  const desktopBreakpoint = theme.breakpoints.up("md");
  return {
    root: {
      padding: "56px 16px",
      display: "flex",
      justifyContent: "center",
      minWidth: "320px",
      [desktopBreakpoint]: {
        paddingTop: "64px"
      }
    },
    content: {
      width: "100%",
      maxWidth: "395px",
      marginTop: theme.spacing(2),
      [desktopBreakpoint]: {
        maxWidth: "504px"
      }
    },
    textFieldTitle: {
      marginBottom: theme.spacing(1)
    }
  };
});

const App = ({ fetchUserRepos }) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = e => {
    setSearchQuery(e.target.value);
    fetchUserRepos(e.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Github Repo Lister
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Typography variant="h6" className={classes.textFieldTitle}>
          Enter Github Username
        </Typography>
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          onChange={handleInputChange}
          value={searchQuery}
          fullWidth
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchUserRepos: username => {
    dispatch(fetchUserReposAndOrganizations(username));
  }
});
const withConnect = connect(
  null,
  mapDispatchToProps
);
export default compose(withConnect)(App);
