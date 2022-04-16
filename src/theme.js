import { createTheme } from "@mui/material/styles";
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1F0626'
        },
        secondary: {
            main: '#c5b1d6'
        },
        error: {
            main: red.A400,
        },
    }
});

export default theme;