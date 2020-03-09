/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React, { Component } from "react";
import { styled, makeStyles, withTheme } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { LooksOne, LooksTwo } from "@material-ui/icons";
import * as Utilities from "../../utilities";

import AgeNode from "./EncryptAttributeAge";
import DegreeNode from "./EncryptAttributeDegree";
import LicenseNode from "./EncryptAttributeLicense";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  instruction: {
    marginBottom: theme.spacing(3),
    textAlign: "left",
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  backButton: {
    marginRight: theme.spacing(4)
  },
  stepButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4)
  },
  form: {
    width: "100%",
    marginBottom: theme.spacing(4)
  },
  formControl: {
    width: "60%",
    marginBottom: theme.spacing(4)
  },
  divider: {
    width: "100%",
    borderTop: "1px dashed",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginLeft: 0,
    marginRight: 0
  },
  dropzone: {
    border: "1px dashed #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "#fefefe",
    "& p": {
      color: "#666",
      fontSize: 16
    },
    "& svg": {
      color: theme.palette.primary.light
    },
    "& img": {
      maxHeight: "100px"
    },
    "& + .MuiGrid-container": {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    }
  },
  dropzoneError: {
    border: `1px dashed ${theme.palette.warning.main}`
  }
}));

const StepButton = styled(Button)(({ theme }) => ({
  minWidth: "120px"
}));

function SelectTypePageWrapper(props) {
  const classes = useStyles();
  return <SelectTypePage classes={classes} {...props} />;
}

class SelectTypePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      age: "",
      proofOfAge: null,
      ageDirty: false,
      notificationOpen: false,
      degree: "",
      degreeDescription: "",
      proofOfDegree: null,
      license: "",
      licenseDescription: "",
      licenseExpireDate: null,
      proofOfLicense: null
    };
  }
  componentDidMount() {
    console.log("props", this.props);
  }

  handleChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        [`${e.target.name}Dirty`]: true
      },
      () => {
        console.log(this.state);
      }
    );
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

  handleFileUpload = async (key, files) => {
    let value = ""
    if(files.length > 0) {
      Utilities.hashFile(files[0], (result) => {
        value = result;
        this.setState({
          [key]: value
        });
      })
    }
  };

  handleClose = () => {
    this.setState({
      notificationOpen: false
    });
  };

  handleDateChange = date => {
    this.setState({
      licenseExpireDate: date
    });
  };

  handleSubmit = () => {
    const { type } = this.state;
    const { valueEntry } = this.props;
    const { handleNext, updateValueEntry } = this.props;
    let valueEntities = { };
    const seed = valueEntry.seed;
    let valueKey = '';
    let isPassvalidation = false;
    let values = {};
    if (seed) {
      switch (type) {
        case 0:
          valueKey = 'age'
          values = {
            age: this.state.age,
            proofOfAge: this.state.proofOfAge
          };

          isPassvalidation = Object.keys(values).every(k => !!values[k]);
          if (isPassvalidation) {
            valueEntities = {
              age: this.state.age,
              proofOfAge: this.state.proofOfAge.originalValue,
              ageResult: Utilities.hashWithKeccak(seed, this.state.age),
              proofOfAgeResult: Utilities.hashWithKeccak(seed, this.state.proofOfAge),
            }
          }
          break;
        case 1:
          valueKey = 'degree';
          values = {
            degree: this.state.degree,
            degreeDescription: this.state.degreeDescription,
            proofOfDegree: this.state.proofOfDegree
          };
          isPassvalidation = Object.keys(values).every(k => !!values[k]);
          if(isPassvalidation) {
            valueEntities = {
              degree: this.state.degree,
              degreeDescription: this.state.degreeDescription,
              proofOfDegree: this.state.proofOfDegree.originalValue,
              degreeResult: Utilities.hashWithKeccak(seed, this.state.degree),
              degreeDescriptionResult: Utilities.hashWithKeccak(seed, this.state.degreeDescription),
              proofOfDegreeResult: Utilities.hashWithKeccak(seed, this.state.proofOfDegree),
            }
          }
          break;
        case 2:
          valueKey = 'license';
          values = {
            license: this.state.license,
            licenseDescription: this.state.licenseDescription,
            licenseExpireDate: this.state.licenseExpireDate,
            proofOfLicense: this.state.proofOfLicense
          };
          isPassvalidation = Object.keys(values).every(k => !!values[k]);
          if (isPassvalidation) {
            valueEntities = {
              license: this.state.license,
              licenseDescription: this.state.licenseDescription,
              proofOfLicense: this.state.proofOfLicense.originalValue,
              licenseExpireDate: this.state.licenseExpireDate,
              licenseResult: Utilities.hashWithKeccak(seed, this.state.license),
              licenseDescriptionResult: Utilities.hashWithKeccak(seed, this.state.licenseDescription),
              licenseExpireDate: Utilities.hashWithKeccak(seed, this.state.licenseExpireDate),
              proofOfLicenseResult: Utilities.hashWithKeccak(seed, this.state.proofOfLicense),
            }
          }
          break;
  
        default:
          break;
      }
      if (!isPassvalidation) {
        this.setState({
          notificationOpen: true
        });
      } else {
        handleNext();
        // updateValueEntry("age", "9");
      }
    }
  };

  renderContent = type => {
    const { classes, theme } = this.props;
    const {
      age,
      degree,
      degreeDescription,
      license,
      licenseDescription,
      licenseExpireDate
    } = this.state;
    switch (type) {
      case 0:
        return (
          <AgeNode
            theme={theme}
            classes={classes}
            age={age}
            handleChange={this.handleChange}
            handleFileUpload={this.handleFileUpload}
          />
        );

      case 1:
        return (
          <DegreeNode
            theme={theme}
            classes={classes}
            degree={degree}
            degreeDescription={degreeDescription}
            handleChange={this.handleChange}
            handleFileUpload={this.handleFileUpload}
          />
        );

      case 2:
        return (
          <LicenseNode
            theme={theme}
            classes={classes}
            license={license}
            licenseDescription={licenseDescription}
            licenseExpireDate={licenseExpireDate}
            handleChange={this.handleChange}
            handleFileUpload={this.handleFileUpload}
            handleDateChange={this.handleDateChange}
          />
        );

      default:
        return "";
    }
  };

  render() {
    const { classes, theme, handleBack } = this.props;
    const { type, notificationOpen } = this.state;
    return (
      <React.Fragment>
        <CssBaseLine />
        <Container fixed className={classes.root}>
          <Box className={classes.container}>
            <form noValidate className={classes.form}>
              <Typography variant="caption" className={classes.instruction}>
                <LooksOne color="primary" />
                <Typography variant="caption" style={{ marginLeft: "8px" }}>
                  SELECT WHAT KIND OF DATA FOR ENCRPTION.
                </Typography>
              </Typography>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="client-type">Type</InputLabel>
                <Select
                  value={type}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "type",
                    id: "client-type"
                  }}
                  defaultValue={0}
                >
                  <MenuItem value={0}>Age</MenuItem>
                  <MenuItem value={1}>Degree</MenuItem>
                  <MenuItem value={2}>License</MenuItem>
                </Select>
              </FormControl>

              <Divider variant="middle" className={classes.divider} />

              <Typography variant="caption" className={classes.instruction}>
                <LooksTwo color="primary" />
                <Typography variant="caption" style={{ marginLeft: "8px" }}>
                  UPLOAD THE ORIGINAL DATA.
                </Typography>
              </Typography>

              {this.renderContent(type)}
            </form>

            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              open={notificationOpen}
              autoHideDuration={6000}
              onClose={this.handleClose}
              message="Please Fill the Information."
              action={
                <React.Fragment>
                  <Button
                    color="secondary"
                    size="small"
                    onClick={this.handleClose}
                  >
                    CLOSE
                  </Button>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={this.handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />

            <Divider variant="middle" style={{ width: "100%" }} />

            <div className={classes.stepButtons}>
              <StepButton onClick={handleBack} className={classes.backButton}>
                Back
              </StepButton>
              <StepButton
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Next
              </StepButton>
            </div>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

export default withTheme(SelectTypePageWrapper);
