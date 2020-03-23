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
      // main: '#2BD67B',
      main: "#F96262"
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#000',
    },
  },
  overrides: {
    MuiExpansionPanel: {
      root: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        display: 'block'
      }
    }
  }
});

export default theme;