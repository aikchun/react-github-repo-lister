import {
  FETCH_USER_REPOS_AND_ORGS_REQUEST,
  FETCH_USER_REPOS_AND_ORGS_SUCCESS,
  FETCH_USER_REPOS_AND_ORGS_FAILURE
} from "./types";

import api, { getError } from "../utils/api";

export const fetchUserReposAndOrgs = username => async dispatch => {
  dispatch({ type: FETCH_USER_REPOS_AND_ORGS_REQUEST });
  const reposResponse = await api.getUserRepos(username);
  const orgsResponse = await api.getUserOrgs(username);
  if (reposResponse.ok && orgsResponse.ok) {
    dispatch({
      type: FETCH_USER_REPOS_AND_ORGS_SUCCESS,
      repos: reposResponse.data,
      orgs: orgsResponse.data
    });
  } else {
    const errorResponse = !reposResponse.ok ? reposResponse : orgsResponse;
    dispatch({
      type: FETCH_USER_REPOS_AND_ORGS_FAILURE,
      error: getError(errorResponse)
    });
  }
};
