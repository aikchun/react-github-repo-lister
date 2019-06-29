import {
  FETCH_USER_REPOS_AND_ORGANIZATIONS_REQUEST,
  FETCH_USER_REPOS_AND_ORGANIZATIONS_SUCCESS,
  FETCH_USER_REPOS_AND_ORGANIZATIONS_FAILURE
} from "./types";

import api, { getError } from "../utils/api";

export const fetchUserReposAndOrganizations = username => async dispatch => {
  dispatch({ type: FETCH_USER_REPOS_AND_ORGANIZATIONS_REQUEST });
  const reposResponse = await api.getUserRepos(username);
  const orgsResponse = await api.getUserOrgs(username);
  if (reposResponse.ok && orgsResponse.ok) {
    dispatch({
      type: FETCH_USER_REPOS_AND_ORGANIZATIONS_SUCCESS,
      repos: reposResponse.data,
      orgs: orgsResponse.data
    });
  } else {
    const errorResponse = !reposResponse.ok ? reposResponse : orgsResponse;
    dispatch({
      type: FETCH_USER_REPOS_AND_ORGANIZATIONS_FAILURE,
      error: getError(errorResponse)
    });
  }
};
