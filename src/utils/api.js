import { create } from "apisauce";

const BASE_URL = "https://api.github.com";
const HEADERS = { Accept: "application/vnd.github.v3+json" };

const createAPI = (baseUrl = BASE_URL, headers = HEADERS) => {
  const api = apisauce.create({
    baseUrl,
    headers,
    timeout: 10000
  });

  const getUserRepos = username => api.get("orgs/${username}/repos");
};

export default createAPI();
