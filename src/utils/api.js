import apisauce from "apisauce";

const BASE_URL = "https://api.github.com";
const HEADERS = { Accept: "application/vnd.github.v3+json" };

export const getProblemMessage = problem => {
  switch (problem) {
    case apisauce.NETWORK_ERROR:
      return { message: "Network not available" };
    case apisauce.TIMEOUT_ERROR:
      return { message: "Server timeout" };
    case apisauce.CONNECTION_ERROR:
      return { message: "Server not available" };
    default:
      return { message: "An unknown error has occurred" };
  }
};

export const getError = ({ data, problem }) =>
  data ? data : getProblemMessage(problem);

const create = (baseURL = BASE_URL, headers = HEADERS) => {
  const api = apisauce.create({
    baseURL,
    headers,
    timeout: 10000
  });

  const getUserRepos = username => api.get(`users/${username}/repos`);
  const getUserOrgs = username => api.get(`users/${username}/orgs`);
  return {
    getUserRepos,
    getUserOrgs
  };
};

export default create();
