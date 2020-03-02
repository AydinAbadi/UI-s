/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#015FFF',
    },
    secondary: {
      main: '#2BD67B',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;