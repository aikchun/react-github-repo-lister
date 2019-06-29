import React from "react";
import { shallow } from "enzyme";
import { App } from "..";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

describe("<App />", () => {
  describe("renders without any props passed in", () => {
    const wrapper = shallow(<App />);
    it("renders TextField", () => {
      expect(wrapper.find(TextField)).toHaveLength(1);
    });

    it("renders AppBar", () => {
      expect(wrapper.find(AppBar)).toHaveLength(1);
    });
  });

  describe("renders with isFetching props passed in", () => {
    const wrapper = shallow(<App isFetching />);

    it("renders CircularProgress", () => {
      expect(wrapper.find(CircularProgress)).toHaveLength(1);
    });

    it("renders 0 List", () => {
      expect(wrapper.find(List)).toHaveLength(0);
    });
  });

  describe("renders with error props passed in", () => {
    const error = { message: "Not Found" };
    const wrapper = shallow(<App error={error} />);

    it("renders Typography", () => {
      expect(
        wrapper.contains(
          <Typography variant="h6" color="error">
            {error.message}
          </Typography>
        )
      ).toEqual(true);
    });

    it("renders 0 List", () => {
      expect(wrapper.find(List)).toHaveLength(0);
    });
  });

  describe("render when supplied with repos and orgs props", () => {
    const repos = [{ name: "repo 1" }, { name: "repo 2" }];
    const orgs = [{ login: "org 1" }];
    const wrapper = shallow(<App repos={repos} orgs={orgs} />);

    it("renders 2 <List />", () => {
      expect(wrapper.find(List)).toHaveLength(2);
    });

    it("renders first <List /> with 2 ListItem children, this is the repos section", () => {
      expect(
        wrapper
          .find(List)
          .at(0)
          .children()
      ).toHaveLength(repos.length);
    });

    it("renders second <List /> with 1 ListItem children, this is the repos section", () => {
      expect(
        wrapper
          .find(List)
          .at(1)
          .children()
      ).toHaveLength(orgs.length);
    });
  });
});
