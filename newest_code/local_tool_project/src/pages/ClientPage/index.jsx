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
import EncryptAttribute from './EncryptAttribute';
import ResultPage from './ResultPage';

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



function ClientPageWrapper(props) {
  const classes = useStyles();
  return <ClientPage classes={classes} {...props} />;
}

function getSteps() {
  return ["Insert Seed", "Select Type", "Finish"];
}

class ClientPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 2,
      valueEntry: {}
    };
  }
  componentDidMount() {
    console.log(this.props);
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
    this.setState({
      valueEntry: Object.assign(valueEntry, {[key]: value})
    }, () => {
      console.log(this.state.valueEntry)
    });
  }
  

  handleStepContentRender = () => {
    const { activeStep, valueEntry } = this.state;
    switch (activeStep) {
      case 0:
        return (
          <InsertSeed 
                handleNext={this.handleNext}
                updateValueEntry={this.updateValueEntry}
              />
        )
      case 1:
        return (
          <EncryptAttribute
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            valueEntry={valueEntry}
          />
        )
      case 2:
        return (
          <ResultPage 
            handleBack={this.handleBack}
          />
        )
    
      default:
        return ""
    }
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const steps = getSteps();
    return (
      <React.Fragment>
        <CssBaseLine />
        <Container fixed className={classes.root} maxWidth="md">
          <Box className={classes.container}>
            <div className={classes.stepper}>
              <Stepper
                activeStep={activeStep}
                steps={steps}
              />
            </div>


            <div className={classes.stepContent}>
              {
                this.handleStepContentRender()
              }
            </div>

          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

export default ClientPageWrapper;
