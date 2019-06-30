import {
  FETCH_USER_REPOS_AND_ORGS_REQUEST,
  FETCH_USER_REPOS_AND_ORGS_SUCCESS,
  FETCH_USER_REPOS_AND_ORGS_FAILURE
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_REPOS_AND_ORGS_REQUEST:
      return { isFetching: true };
    case FETCH_USER_REPOS_AND_ORGS_SUCCESS:
      return {
        isFetching: false,
        repos: action.repos,
        orgs: action.orgs
      };
    case FETCH_USER_REPOS_AND_ORGS_FAILURE:
      return {
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};
