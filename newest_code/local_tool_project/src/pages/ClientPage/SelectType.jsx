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
import Input from "@material-ui/core/Input";
import { DropzoneArea } from "material-ui-dropzone";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { LooksOne, LooksTwo } from "@material-ui/icons";
import { SHA256 } from "crypto-js";
import * as Utilities from "../../utilities";

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
    marginBottom: theme.spacing(8)
  },
  formControl: {
    width: "60%",
    marginBottom: theme.spacing(2)
  },
  divider: {
    width: "100%",
    borderTop: "1px dashed",
    marginTop: theme.spacing(4),
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
      ageDirty: false,
      notificationOpen: false
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

  handleFileUpload = file => {
    console.log(file[0]);
    this.fileHash(file[0], SHA256, function(x) {
      console.log(x);
    });
  };

  fileHash = (file, hasher, callback) => {
    //Instantiate a reader
    var reader = new FileReader();

    //What to do when we gets data?
    reader.onload = function(e) {
      var hash = hasher(e.target.result);
      callback(hash);
    };

    reader.readAsBinaryString(file);
  };

  handleClose = () => {
    this.setState({
      notificationOpen: false
    });
  };

  handleSubmit = () => {
    const { age } = this.state;
    const { handleNext, updateValueEntry } = this.props;
    if (!age) {
      this.setState({
        notificationOpen: true
      });
    } else {
      handleNext();
      updateValueEntry("age", age);
    }
  };

  render() {
    const { classes, theme, handleBack } = this.props;
    const { type, age, notificationOpen } = this.state;
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

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="client-age">Age</InputLabel>
                <Input
                  value={age}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "age",
                    id: "client-age",
                    placeholder: "Pleace Input Age"
                  }}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <Typography
                  variant="caption"
                  style={{
                    marginBottom: theme.spacing(1),
                    marginTop: theme.spacing(2)
                  }}
                >
                  Proof of Age:{" "}
                </Typography>
                <DropzoneArea
                  name="Proof of Age"
                  onChange={this.handleFileUpload}
                  dropzoneText="Drag and drop file here or click"
                  dropzoneClass={classes.dropzone}
                  useChipsForPreview
                  showPreviewsInDropzone={false}
                  showPreviews
                />
              </FormControl>
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
                  <Button color="secondary" size="small" onClick={this.handleClose}>
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
