/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React, { Component } from "react";
import { styled, makeStyles, withTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CssBaseLine from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import { SHA3 } from "crypto-js";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as Utilities from "../../utilities";
import Zip from "jszip";
import Notification from "../../components/Notification";

import {
  LooksOne,
  LooksTwo,
  Looks3,
  CloudDownloadOutlined
} from "@material-ui/icons";
import FileSaver from "file-saver";

import Forge from "node-forge";

import Descriptionitem from "../../components/DescriptionItem";

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
    marginTop: theme.spacing(4),
    "& a": {
      textDecoration: "none"
    }
  },
  divider: {
    width: "100%",
    borderTop: "1px dashed",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginLeft: 0,
    marginRight: 0
  },
  row: {
    marginBottom: theme.spacing(2)
  },
  actions: {
    width: "100%",
    display: "flex",
    marginTop: theme.spacing(2)
  }
}));

const StepButton = styled(Button)(({ theme }) => ({
  minWidth: "120px"
}));

function ResultPageWrapper(props) {
  const classes = useStyles();
  return <ResultPage classes={classes} {...props} />;
}

class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Default",
      open: false
    };
  }
  componentDidMount() {
    // console.log("result page props", this.props);
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  renderOriginalDescriptionList = () => {
    const { valueEntry } = this.props;
    let originalValueList = [];
    switch (valueEntry.key) {
      case "age":
        const { age } = valueEntry;
        originalValueList.push({
          label: "Age",
          value: age.age
        });
        originalValueList.push({
          file: true,
          label: "Proof Of Age",
          value: age.proofOfAgeOriginalValue
        });
        break;
      case "degree":
        const { degree } = valueEntry;
        originalValueList.push({
          label: "DEGREE",
          value: degree.degree
        });
        originalValueList.push({
          label: "DEGREE DESCRIPTION",
          value: degree.degreeDescription
        });
        originalValueList.push({
          file: true,
          label: "Proof Of DEGREE",
          value: degree.proofOfDegreeOriginalValue
        });
        break;
      case "license":
        const { license } = valueEntry;
        originalValueList.push({
          label: "LICENSE",
          value: license.license
        });
        originalValueList.push({
          label: "LICENSE DESCRIPTION",
          value: license.licenseDescription
        });
        originalValueList.push({
          label: "LICENSE EXPIREDATE",
          value: license.licenseExpireDate
        });
        originalValueList.push({
          file: true,
          label: "Proof Of LICENSE",
          value: license.proofOfLicenseOriginalValue
        });
        break;

      default:
        break;
    }
    return originalValueList;
  };

  renderResultDescriptionList = () => {
    const { valueEntry } = this.props;
    let randomValueList = [];
    let hashValueList = [];
    switch (valueEntry.key) {
      case "age":
        const {
          age: { age, ageRandomValue, proofOfAgeRandomValue, proofOfAge }
        } = valueEntry;
        randomValueList.push({
          label: "Random Value Of Age",
          value: ageRandomValue
        });
        randomValueList.push({
          label: "Random Value Of Proof Of Age",
          value: proofOfAgeRandomValue
        });
        hashValueList.push({
          label: "Hash Value Of Age",
          value: SHA3(age.concat(ageRandomValue), {
            outputLength: 256
          }).toString()
        });
        hashValueList.push({
          label: "Hash Value Of Proof Of Age",
          value: SHA3(proofOfAge.concat(proofOfAgeRandomValue), {
            outputLength: 256
          }).toString()
        });
        break;
      case "degree":
        const {
          degree: {
            degree,
            proofOfDegree,
            degreeRandomValue,
            degreeDescription,
            degreeDescriptionRandomValue,
            proofOfDegreeRandomValue
          }
        } = valueEntry;
        randomValueList.push({
          label: "Random Value Of DEGREE",
          value: degreeRandomValue
        });
        randomValueList.push({
          label: "Random Value Of DEGREE DESCRIPTION",
          value: degreeDescriptionRandomValue
        });
        randomValueList.push({
          label: "Random Value Of PROOF OF DEGREE",
          value: proofOfDegreeRandomValue
        });
        hashValueList.push({
          label: "Hash Value Of DEGREE",
          value: SHA3(degree.concat(degreeRandomValue), {
            outputLength: 256
          }).toString()
        });
        hashValueList.push({
          label: "Hash Value Of DEGREE DESCRIPTION",
          value: SHA3(degreeDescription.concat(degreeDescriptionRandomValue), {
            outputLength: 256
          }).toString()
        });
        hashValueList.push({
          label: "Hash Value Of PROOF OF DEGREE",
          value: SHA3(proofOfDegree.concat(proofOfDegreeRandomValue), {
            outputLength: 256
          }).toString()
        });
        break;
      case "license":
        const {
          license: {
            license,
            proofOfLicense,
            licenseRandomValue,
            licenseDescription,
            licenseDescriptionRandomValue,
            licenseExpireDate,
            licenseExpireDateRandomValue,
            proofOfLicenseRandomValue
          }
        } = valueEntry;
        randomValueList.push({
          label: "Random Value Of LICENSE",
          value: licenseRandomValue
        });
        randomValueList.push({
          label: "Random Value Of LICENSE DESCRIPTION",
          value: licenseDescriptionRandomValue
        });
        randomValueList.push({
          label: "Random Value Of LICENSE EXPIREDATE",
          value: licenseExpireDateRandomValue
        });
        randomValueList.push({
          label: "Random Value Of PROOF OF LICENSE",
          value: proofOfLicenseRandomValue
        });
        hashValueList.push({
          label: "Hash Value Of LICENSE",
          value: SHA3(license.concat(licenseRandomValue), {
            outputLength: 256
          }).toString()
        });
        hashValueList.push({
          label: "Hash Value Of LICENSE DESCRIPTION",
          value: SHA3(
            licenseDescription.concat(licenseDescriptionRandomValue),
            {
              outputLength: 256
            }
          ).toString()
        });
        hashValueList.push({
          label: "Hash Value Of LICENSE EXPIREDATE",
          value: SHA3(licenseExpireDate.concat(licenseExpireDateRandomValue), {
            outputLength: 256
          }).toString()
        });
        hashValueList.push({
          label: "Hash Value Of PROOF OF LICENSE",
          value: SHA3(proofOfLicense.concat(proofOfLicenseRandomValue), {
            outputLength: 256
          }).toString()
        });

        break;

      default:
        break;
    }
    return {
      randomValueList,
      hashValueList
    };
  };

  handleFileDownload = file => {
    FileSaver.saveAs(file);
  };

  generateApproval = async () => {
    this.handleApprove(approval => {
      this.setState(
        {
          open: true,
          message: "Success, Approval has copied to clipboard automatically."
        },
        () => {
          Utilities.copyStringToClipboard(approval);
        }
      );
    });
  };

  handleApprove = callback => {
    const {
      valueEntry: { seedAndSign }
    } = this.props;
    const originalMessage = seedAndSign.seed
      .concat(seedAndSign.clientAddress)
      .concat(this.props.valueEntry.key);
    const encryptedMessage = SHA3(originalMessage, {
      outputLength: 256
    }).toString();
    const encryptedMessageWithInfo = encryptedMessage
      .concat(this.props.valueEntry)
      .concat("approved");
    const privateKey = seedAndSign.privateKey[0];

    const reader = new FileReader();
    reader.onload = function(e) {
      const keyInfo = Forge.pki.privateKeyFromPem(e.target.result);
      const md = Forge.md.sha256.create();
      md.update(encryptedMessageWithInfo, "utf8");
      const pss = Forge.pss.create({
        md: Forge.md.sha1.create(),
        mgf: Forge.mgf.mgf1.create(Forge.md.sha1.create()),
        saltLength: 20
      });
      const signature = keyInfo.sign(md, pss);
      const signatureHex = Forge.util.bytesToHex(signature);
      callback(SHA3(signatureHex, { outputLength: 256 }).toString());
    };
    reader.readAsBinaryString(privateKey);
  };

  handleResultDownload = async () => {
    const {
      valueEntry: { key }
    } = this.props;
    const resultEntities = this.props.valueEntry;
    delete resultEntities.seedAndSign;
    const that = this;
    this.handleApprove(approve => {
      resultEntities.approve = approve;
      const valueString = JSON.stringify(resultEntities);
      let zip = new Zip();
      const folder = zip.folder("result");
      folder.file("result.txt", valueString);
      let file = null;
      switch (key) {
        case "age":
          file = that.props.valueEntry[key].proofOfAgeOriginalValue[0];
          break;
        case "degree":
          file = that.props.valueEntry[key].proofOfDegreeOriginalValue[0];
          break;
        case "license":
          file = that.props.valueEntry[key].proofOfLicenseOriginalValue[0];
          break;
        default:
          break;
      }
      folder.file(file.name, file);
      folder.generateAsync({ type: "blob" }).then(function(content) {
        FileSaver.saveAs(content, `${key}_validation_result.zip`);
      });
    });
  };

  render() {
    const { classes, theme, valueEntry } = this.props;
    const { message, open } = this.state;
    const seed =
      valueEntry && valueEntry.seedAndSign && valueEntry.seedAndSign.seed;
    const clientAddress =
      valueEntry &&
      valueEntry.seedAndSign &&
      valueEntry.seedAndSign.clientAddress;

    return (
      <React.Fragment>
        <CssBaseLine />
        <Container fixed className={classes.root}>
          <Box className={classes.container}>
            <Typography variant="caption" className={classes.instruction}>
              <LooksOne color="primary" />
              <Typography variant="caption" style={{ marginLeft: "8px" }}>
                VALUE OF ENCRYPTION KEY AND CLIENT ADDRESS.
              </Typography>
            </Typography>

            <Container>
              <Grid container className={classes.row}>
                <Descriptionitem label="ENCRYPTION KEY" content={seed} />
              </Grid>

              <Grid container className={classes.row}>
                <Descriptionitem
                  label="CLIENT ADDRESS"
                  content={clientAddress}
                />
              </Grid>
            </Container>

            <Divider variant="middle" className={classes.divider} />

            <Typography variant="caption" className={classes.instruction}>
              <LooksTwo color="primary" />
              <Typography variant="caption" style={{ marginLeft: "8px" }}>
                ORIGINAL VALUE OF ENCRYPTION ATTRIBUTE.
              </Typography>
            </Typography>

            <Container>
              {this.renderOriginalDescriptionList().map(item => {
                return item.file ? (
                  <Grid container className={classes.row} key={item.value}>
                    <Descriptionitem
                      label={item.label}
                      content={
                        <Chip
                          icon={
                            <CloudDownloadOutlined
                              style={{ marginLeft: "12px", marginRight: "0px" }}
                            />
                          }
                          label={item.value[0].name}
                          className={classes.chip}
                          variant="outlined"
                          color="primary"
                          clickable
                          onClick={() => {
                            this.handleFileDownload(item.value[0]);
                          }}
                        />
                      }
                    />
                  </Grid>
                ) : (
                  <Grid container className={classes.row} key={item.value}>
                    <Descriptionitem label={item.label} content={item.value} />
                  </Grid>
                );
              })}
            </Container>

            <Divider variant="middle" className={classes.divider} />

            <Typography variant="caption" className={classes.instruction}>
              <Looks3 color="primary" />
              <Typography variant="caption" style={{ marginLeft: "8px" }}>
                VALIDATION OF ENCRYPTION ATTRIBUTE.
              </Typography>
            </Typography>

            <ExpansionPanel
              elevation={0}
              style={{ marginBottom: theme.spacing(2) }}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="body2">Random Value List</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Container>
                  {this.renderResultDescriptionList().randomValueList.map(
                    item => {
                      return (
                        <Grid container className={classes.row}>
                          <Descriptionitem
                            key={item.value}
                            label={item.label}
                            content={item.value}
                            full
                          />
                        </Grid>
                      );
                    }
                  )}
                </Container>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel elevation={0}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="body2">Hashed Value List</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Container>
                  {this.renderResultDescriptionList().hashValueList.map(
                    item => {
                      return (
                        <Grid container className={classes.row}>
                          <Descriptionitem
                            key={item.value}
                            label={item.label}
                            content={item.value}
                            className={classes.row}
                            full
                          />
                        </Grid>
                      );
                    }
                  )}
                </Container>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <div className={classes.actions}>
              <StepButton
                variant="contained"
                color="primary"
                style={{ marginBottom: theme.spacing(2) }}
                onClick={this.handleResultDownload}
              >
                Download Result
              </StepButton>

              <StepButton
                variant="contained"
                color="primary"
                style={{
                  marginBottom: theme.spacing(2),
                  marginLeft: theme.spacing(2)
                }}
                onClick={this.generateApproval}
              >
                Generate Encrypted Approval
              </StepButton>
            </div>

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
                Go To Register
              </StepButton>
            </div>
          </Box>
        </Container>

        <Notification
          onClose={this.handleClose}
          open={open}
          message={message}
          type="success"
        />
      </React.Fragment>
    );
  }
}

export default withTheme(ResultPageWrapper);
