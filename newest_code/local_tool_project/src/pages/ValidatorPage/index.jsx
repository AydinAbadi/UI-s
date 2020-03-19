/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Stepper from "../../components/Stepper";
import InsertSeed from "./InsertSeed";
import EncryptAttribute from "./EncryptAttribute";
import ResultPage from "./ResultPage";

const useStyles = makeStyles(theme => ({
  root: {
    background: "#fff",
    marginTop: theme.spacing(8)
  },
  container: {
    padding: theme.spacing(8)
  },
  stepper: {
    paddingTop: theme.spacing(2)
  },
  stepContent: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
}));

function ValidatorPageWrapper(props) {
  const classes = useStyles();
  return <ValidatorPage classes={classes} {...props} />;
}

function getSteps() {
  return ["Insert Encryption Key & Sign", "Select Validation Attribute", "Finish"];
}

class ValidatorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      valueEntry: {}
    };
  }
  componentDidMount() {
    // console.log(this.props);
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  updateValueEntry = (key, value) => {
    const { valueEntry } = this.state;
    this.setState(
      {
        valueEntry: Object.assign(valueEntry, { [key]: value })
      },
      () => {
        console.log(this.state.valueEntry);
      }
    );
  };


  render() {
    const { classes } = this.props;
    const { activeStep, valueEntry } = this.state;
    const steps = getSteps();
    return (
      <React.Fragment>
        <CssBaseLine />
        <Container fixed className={classes.root} maxWidth="md">
          <Box className={classes.container}>
            <div className={classes.stepper}>
              <Stepper activeStep={activeStep} steps={steps} />
            </div>

            <div className={classes.stepContent}>
              <div style={{ display: activeStep === 0 ? "block" : 'none' }}>
                <InsertSeed
                  handleNext={this.handleNext}
                  updateValueEntry={this.updateValueEntry}
                />
              </div>
              <div style={{ display: activeStep === 1 ? "block" : 'none' }}>
                <EncryptAttribute
                  handleNext={this.handleNext}
                  handleBack={this.handleBack}
                  valueEntry={valueEntry}
                  updateValueEntry={this.updateValueEntry}
                />
              </div>
              <div style={{ display: activeStep === 2 ? "block" : 'none' }}>
                <ResultPage handleBack={this.handleBack} valueEntry={valueEntry} />
              </div>
            </div>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

export default ValidatorPageWrapper;
