/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React, { Component } from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CssBaseLine from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Alert from "../../components/Alert";
import Divider from "@material-ui/core/Divider";
import * as Utilities from "../../utilities";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  seedInput: {
    width: "400px",
    marginRight: theme.spacing(4)
  },
  helperTextSuccess: {
    color: theme.palette.success.main
  },
  title: {
    marginBottom: theme.spacing(8)
  },
  backButton: {
    marginRight: theme.spacing(4),
  },
  stepButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
    '& a': {
      textDecoration: 'none'
    }
  },
  form: {
    marginBottom: theme.spacing(8)
  }
}));

const StepButton = styled(Button)(({ theme }) => ({
  minWidth: "120px"
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
  // componentDidMount() {
  //   console.log(this.props);
  // }

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
  };

  handleFocus = () => {
    this.setState({
      seedDirty: true
    });
  };

  handleGenerateDialogClose = () => {
    this.setState({
      generateDialogStatus: false
    });
  };

  handleSeedGenerate = () => {
    this.setState(
      {
        seed: this.handleGenerateSeed(),
        generateDialogStatus: true
      },
      () => {
        Utilities.copyStringToClipboard(this.state.seed);
      }
    );
  };

  handleSubmit = () => {
    const { seed } = this.state;
    const { handleNext, updateValueEntry } = this.props;
    if (!seed) {
      this.setState({
        seedDirty: true
      });
    } else {
      handleNext();
      updateValueEntry("seed", seed);
    }
  };

  render() {
    const { classes } = this.props;
    const { seed, seedDirty, generateDialogStatus } = this.state;
    return (
      <React.Fragment>
        <CssBaseLine />
        <Container fixed className={classes.root}>
          <Box className={classes.container}>
            <Typography variant="h5" className={classes.title}>
              INSERT or GENERATE ENCRYPTION KEY FOR ENCRYPTION
            </Typography>
            <form noValidate className={classes.form}>
              <Box className={classes.fieldRow}>
                <TextField
                  error={seedDirty ? !seed : false}
                  className={classes.seedInput}
                  id="client-seed"
                  name="seed"
                  value={seed}
                  onChange={this.handleChange}
                  onBlur={this.handleFocus}
                  placeholder="Please input or generate the encryption key for encryption."
                  autoComplete="off"
                  label="Encryption Key"
                  helperText={
                    seedDirty
                      ? !seed
                        ? "Please input or generate the seed."
                        : ""
                      : ""
                  }
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleSeedGenerate}
                  style={{
                    color: "#fff"
                  }}
                >
                  GENERATE Encryption Key
                </Button>
              </Box>
            </form>

            <Divider variant="middle" style={{ width: "100%" }} />

            <div className={classes.stepButtons}>
              <Link to="/">
                <StepButton className={classes.backButton} variant="outlined">
                  Back To Home
                </StepButton>
              </Link>
              <StepButton
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Next
              </StepButton>
            </div>
          </Box>
          <Alert
            open={generateDialogStatus}
            handleClose={this.handleGenerateDialogClose}
            title="Encryption Key Generation"
            description="Success! The encryption key copied to your clipboard aotumaticlly."
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default InsertSeedPageWrapper;
