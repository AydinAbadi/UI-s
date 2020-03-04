/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React, { Component } from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';

import Stepper from "../../components/Stepper";
import InsertSeed from "./InsertSeed";

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
  backButton: {
    marginRight: theme.spacing(2)
  },
  stepButtons: {
    display: "flex",
    justifyContent: 'center',
    marginTop: theme.spacing(4)
  },
  stepContent: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8)
  }
}));

const StepButton = styled(Button)(({ theme }) => ({
    width: "120px"
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
      activeStep: 0
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

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const steps = getSteps();
    return (
      <React.Fragment>
        <CssBaseLine />
        <Container fixed className={classes.root}>
          <Box className={classes.container}>
            <div className={classes.stepper}>
              <Stepper
                activeStep={activeStep}
                handleBack={this.handleBack}
                handleNext={this.handleNext}
                steps={steps}
              />
            </div>


            <div className={classes.stepContent}>
              <InsertSeed />
            </div>

            <Divider variant="middle" />

            <div className={classes.stepButtons}>
              {activeStep === steps.length ? (
                <div>
                  <StepButton href="http://www.google.com" target="_blank">
                    Complete
                  </StepButton>
                </div>
              ) : (
                <div>
                  <div>
                    <StepButton
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </StepButton>
                    <StepButton
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </StepButton>
                  </div>
                </div>
              )}
            </div>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

export default ClientPageWrapper;
