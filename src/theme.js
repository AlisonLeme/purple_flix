import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { colors } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "f5f5f5",
    },
    primary: {
      main: "#1F0626",
    },
    secondary: {
      main: "#c5b1d6",
      light: "#ffff",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
