import {
  FETCH_USER_REPOS_AND_ORGANIZATIONS_REQUEST,
  FETCH_USER_REPOS_AND_ORGANIZATIONS_SUCCESS,
  FETCH_USER_REPOS_AND_ORGANIZATIONS_FAILURE
} from "./types";

import api from "../utils/api";

export const fetchUserReposAndOrganizations = username => async dispatch => {
  dispatch({ type: FETCH_USER_REPOS_AND_ORGANIZATIONS_REQUEST });
  try {
    const response = await api.getUserRepos(username);
    if (response.ok) {
      dispatch({
        type: FETCH_USER_REPOS_AND_ORGANIZATIONS_SUCCESS,
        data: response.data
      });
    } else {
      dispatch({
        type: FETCH_USER_REPOS_AND_ORGANIZATIONS_FAILURE,
        error: response.error
      });
    }
  } catch (e) {
    // do nothing just yet.
  }
};
