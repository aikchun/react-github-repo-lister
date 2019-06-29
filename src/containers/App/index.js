import _ from "lodash";
import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import { fetchUserReposAndOrganizations } from "../../actions/app-actions";
import GithubIcon from "./GithubIcon";

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
    title: {
      color: "white"
    },
    content: {
      width: "100%",
      maxWidth: "504px",
      marginTop: theme.spacing(2)
    },
    textFieldTitle: {
      marginBottom: theme.spacing(1)
    },
    repos: {
      marginTop: theme.spacing(2),
      display: "flex",
      justifyContent: "center"
    }
  };
});

export const App = ({ fetchUserRepos, isFetching, error, repos, orgs }) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = e => {
    setSearchQuery(e.target.value);
    fetchUserRepos(e.target.value);
  };

  const renderRepos = () => {
    return (
      <List subheader={<ListSubheader>Repositories</ListSubheader>}>
        {repos.map(repo => (
          <ListItem
            button
            component="a"
            href={repo.html_url}
            target="_blank"
            key={repo.name}
          >
            <ListItemIcon>
              <GithubIcon />
            </ListItemIcon>
            <ListItemText primary={repo.name} />
          </ListItem>
        ))}
      </List>
    );
  };

  const renderOrgs = () => {
    return (
      <List subheader={<ListSubheader>Organizations</ListSubheader>}>
        {orgs.map(org => (
          <ListItem
            button
            component="a"
            target="_blank"
            href={`https://github.com/${org.login}`}
            key={org.login}
          >
            <ListItemIcon>
              <GithubIcon />
            </ListItemIcon>
            <ListItemText primary={org.login} />
          </ListItem>
        ))}
      </List>
    );
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
        <Typography
          variant="h6"
          color="primary"
          className={classes.textFieldTitle}
        >
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
        <div className={classes.repos}>
          {isFetching ? <CircularProgress color="primary" /> : null}
          {error && (
            <Typography variant="h6" color="error">
              {error.message}
            </Typography>
          )}
          {repos && renderRepos()}
          {orgs && renderOrgs()}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchUserRepos: _.debounce(username => {
    dispatch(fetchUserReposAndOrganizations(username));
  }, 500)
});

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
  error: state.app.error,
  repos: state.app.repos,
  orgs: state.app.orgs
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(withConnect)(App);
