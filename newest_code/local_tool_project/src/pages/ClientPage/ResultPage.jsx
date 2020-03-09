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
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Divider from "@material-ui/core/Divider";
import Chip from '@material-ui/core/Chip';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { LooksOne, LooksTwo, Looks3, CloudDownloadOutlined } from "@material-ui/icons";
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
    this.state = {};
  }
  componentDidMount() {
    console.log("props", this.props);
  }

  render() {
    const { classes, theme, handleBack } = this.props;
    return (
      <React.Fragment>
        <CssBaseLine />
        <Container fixed className={classes.root}>
          <Box className={classes.container}>
            <Typography variant="caption" className={classes.instruction}>
              <LooksOne color="primary" />
              <Typography variant="caption" style={{ marginLeft: "8px" }}>
                VALUE OF SEED.
              </Typography>
            </Typography>

            <Container>
              <Grid container>
                <Grid container item xs={2}>
                  SEED:
                </Grid>
                <Grid container item xs={6}>
                  ujhhd67e678374h34g3h4g4
                </Grid>
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
              <Grid container className={classes.row}>
                <Grid container item xs={2}>
                  AGE:
                </Grid>
                <Grid container item xs={6}>
                  26
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid container item xs={2}>
                  PROOF OF AGE:
                </Grid>
                <Grid container item xs={6}>
                <Chip
                    icon={<CloudDownloadOutlined/>}
                    label="proof_of_age.pdf"
                    className={classes.chip}
                    variant="outlined"
                    color="primary"
                    />
                </Grid>
              </Grid>
            </Container>

            <Divider variant="middle" className={classes.divider} />

            <Typography variant="caption" className={classes.instruction}>
              <Looks3 color="primary" />
              <Typography variant="caption" style={{ marginLeft: "8px" }}>
                RESULT OF ENCRYPTION ATTRIBUTE.
              </Typography>
            </Typography>

            <Container>
              <Grid container>
                <Grid container item xs={2}>
                  Random value of :
                </Grid>
                <Grid container item xs={6}>
                  ujhhd67e678374h34g3h4g4
                </Grid>
              </Grid>
            </Container>

            <Container>
              <Grid container>
                <Grid container item xs={2}>
                  SEED:
                </Grid>
                <Grid container item xs={6}>
                  ujhhd67e678374h34g3h4g4
                </Grid>
              </Grid>
            </Container>

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
                Go To Register
              </StepButton>
            </div>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

export default withTheme(ResultPageWrapper);
