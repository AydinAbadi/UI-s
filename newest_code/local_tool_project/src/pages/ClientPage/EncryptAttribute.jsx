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
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { LooksOne, LooksTwo } from "@material-ui/icons";
import * as Utilities from "../../utilities";
import Notification from '../../components/Notification';
import moment from 'moment';


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
      proofOfAgeOriginalValue: [],
      ageDirty: false,
      notificationOpen: false,
      degree: "",
      degreeDescription: "",
      proofOfDegree: null,
      proofOfDegreeOriginalValue: [],
      license: "",
      licenseDescription: "",
      licenseExpireDate: null,
      proofOfLicense: null,
      proofOfLicenseOriginalValue: [],
      notificationMessage: "Please Fill the Information."
    };
  }
  // componentDidMount() {
  //   console.log("props", this.props);
  // }

  handleChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        [`${e.target.name}Dirty`]: true
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

  handleFileUpload = (key, files) => {
    let value = ""
    if(files.length > 0) {
      Utilities.hashFile(files[0], (result) => {
        value = result;
        this.setState({
          [key]: value,
          [key+'OriginalValue']:files
        });
      })
    } else {
      this.setState({
        [key]: '',
        [key+'OriginalValue']:[]
      });
    }
  };

  handleClose = () => {
    this.setState({
      notificationOpen: false
    });
  };

  handleDateChange = date => {
    this.setState({
      licenseExpireDate: moment(new Date(date).valueOf()).format("YYYY-MM-DD")
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
              ageResult: Utilities.hashWithKeccak(seed, this.state.age),
              proofOfAgeResult: Utilities.hashWithKeccak(seed, this.state.proofOfAge),
              proofOfAgeOriginalValue: this.state.proofOfAgeOriginalValue
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
              degreeResult: Utilities.hashWithKeccak(seed, this.state.degree),
              degreeDescriptionResult: Utilities.hashWithKeccak(seed, this.state.degreeDescription),
              proofOfDegreeResult: Utilities.hashWithKeccak(seed, this.state.proofOfDegree),
              proofOfDegreeOriginalValue: this.state.proofOfDegreeOriginalValue
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
              licenseExpireDate: this.state.licenseExpireDate,
              licenseResult: Utilities.hashWithKeccak(seed, this.state.license),
              licenseDescriptionResult: Utilities.hashWithKeccak(seed, this.state.licenseDescription),
              licenseExpireDateResult: Utilities.hashWithKeccak(seed, this.state.licenseExpireDate),
              proofOfLicenseResult: Utilities.hashWithKeccak(seed, this.state.proofOfLicense),
              proofOfLicenseOriginalValue: this.state.proofOfLicenseOriginalValue
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
        updateValueEntry(valueKey, valueEntities);
        updateValueEntry("key", valueKey);
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
      licenseExpireDate,
      proofOfAgeOriginalValue,
      proofOfDegreeOriginalValue,
      proofOfLicenseOriginalValue
    } = this.state;
    switch (type) {
      case 0:
        return (
          <AgeNode
            theme={theme}
            classes={classes}
            age={age}
            proofOfAgeOriginalValue={proofOfAgeOriginalValue}
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
            proofOfDegreeOriginalValue={proofOfDegreeOriginalValue}
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
            proofOfLicenseOriginalValue={proofOfLicenseOriginalValue}
          />
        );

      default:
        return "";
    }
  };

  render() {
    const { classes, handleBack } = this.props;
    const { type, notificationOpen, notificationMessage } = this.state;
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

            <Notification 
            open={notificationOpen}
            onClose={this.handleClose}
            message={notificationMessage}
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
