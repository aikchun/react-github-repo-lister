import apisauce from "apisauce";

const BASE_URL = "https://api.github.com";
const HEADERS = { Accept: "application/vnd.github.v3+json" };

const create = (baseURL = BASE_URL, headers = HEADERS) => {
  const api = apisauce.create({
    baseURL,
    headers,
    timeout: 10000
  });

  const getUserRepos = username => api.get(`users/${username}/repos`);
  return {
    getUserRepos
  };
};

export default create();
