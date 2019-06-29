import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#59DDAD"
    },
    secondary: {
      main: "#DD5989"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#E4E4E4"
    }
  },
  overrides: {
    MuiTypography: {
      colorPrimary: {
        color: "#687C8F"
      },
      colorSecondary: {
        color: "#8D8D8D"
      },
      colorError: {
        color: "#d50000"
      }
    }
  }
});

export default theme;
