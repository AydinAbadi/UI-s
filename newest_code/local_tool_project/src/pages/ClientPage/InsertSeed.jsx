/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Alert from '../../components/Alert';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column'
    },
    seedInput: {
        width: '400px',
        marginRight: theme.spacing(4)
    },
    helperTextSuccess: {
        color: theme.palette.success.main
    },
    title: {
        marginBottom: theme.spacing(8)
    },
}));

function InsertSeedPageWrapper(props) {
  const classes = useStyles();
  return <InsertSeedPage classes={classes} {...props} />;
}

class InsertSeedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "",
      seedDirty: false,
      generateDialogStatus: false
    };
  }
  componentDidMount() {
    console.log(this.props);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      seedDirty: true
    });
  };

  handleGenerateSeed = () => {
    let emptyArray = new Uint32Array(2);
    window.crypto.getRandomValues(emptyArray);
    let fisrtPart = emptyArray[0].toString(16);
    let secondPart = emptyArray[1].toString(16);
    return fisrtPart.concat(secondPart);
  }

  handleFocus = () => {
      this.setState({
          seedDirty: true
      })
  }

  handleGenerateDialogClose = () => {
      this.setState({
          generateDialogStatus: false
      })
  }

  handleSeedGenerate = () => {
      this.setState({
          seed: this.handleGenerateSeed(),
          generateDialogStatus: true
      })
  }

  render() {
    const { classes } = this.props;
    const { seed, seedDirty, generateDialogStatus } = this.state;
    return (
      <React.Fragment>
        <CssBaseLine />
        <Container fixed className={classes.root}>
          <Box className={classes.container}>
              <Typography variant="h5" className={classes.title}>INSERT or GENERATE SEED FOR ENCRYPTION</Typography>
            <form action="">
              <Box className={classes.fieldRow}>
                {/* <FormControl error={seedDirty ? !seed : false} className={classes.seedInput} >
                  <InputLabel htmlFor="client-seed">Seed</InputLabel>
                  <Input
                    id="client-seed"
                    name="seed"
                    value={seed}
                    onChange={this.handleChange}
                    onBlur={this.handleFocus}
                    placeholder="Please input or generate the seed for encryption."
                    autoComplete="off"
                  />
                  <FormHelperText>
                    {
                        seedDirty ? (!seed ? "Please input or generate the seed." : "") : ""
                    }
                  </FormHelperText>
                </FormControl> */}
                <TextField
                    error={seedDirty ? !seed : false}
                    className={classes.seedInput}
                    id="client-seed"
                    name="seed"
                    value={seed}
                    onChange={this.handleChange}
                    onBlur={this.handleFocus}
                    placeholder="Please input or generate the seed for encryption."
                    autoComplete="off"
                    label="Seed"
                    helperText={seedDirty ? (!seed ? "Please input or generate the seed." : "") : ""}
                />
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={this.handleSeedGenerate}
                    style={{
                        color: "#fff"
                    }}
                >
                  GENERATE RANDOM SEED
                </Button>
              </Box>
            </form>
          </Box>
          <Alert open={generateDialogStatus} handleClose={this.handleGenerateDialogClose}/>
        </Container>
      </React.Fragment>
    );
  }
}

export default InsertSeedPageWrapper;
