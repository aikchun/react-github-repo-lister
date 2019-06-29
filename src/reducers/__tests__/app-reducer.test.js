import {
  FETCH_USER_REPOS_AND_ORGANIZATIONS_REQUEST,
  FETCH_USER_REPOS_AND_ORGANIZATIONS_SUCCESS,
  FETCH_USER_REPOS_AND_ORGANIZATIONS_FAILURE
} from "../../actions/types";
import app from "../app-reducer";

describe("app reducer", () => {
  it("return an object with isFetching is true when FETCH_USER_REPOS_AND_ORGANIZATIONS_REQUEST is being dispatched ", () => {
    expect(
      app({}, { type: FETCH_USER_REPOS_AND_ORGANIZATIONS_REQUEST })
    ).toEqual({ isFetching: true });
  });
  it("return an object with isFetching is false when FETCH_USER_REPOS_AND_ORGANIZATIONS_SUCCESS is being dispatched with repos", () => {
    const repos = [{ name: "repo 1" }];
    expect(
      app({}, { type: FETCH_USER_REPOS_AND_ORGANIZATIONS_SUCCESS, repos })
    ).toEqual({ isFetching: false, repos });
  });
  it("return an object with isFetching is false when FETCH_USER_REPOS_AND_ORGANIZATIONS_FAILURE is being dispatched with error", () => {
    const error = { message: "Not Found" };
    expect(
      app({}, { type: FETCH_USER_REPOS_AND_ORGANIZATIONS_FAILURE, error })
    ).toEqual({ isFetching: false, error });
  });
});
