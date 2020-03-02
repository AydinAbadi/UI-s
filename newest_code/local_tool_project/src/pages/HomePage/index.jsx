/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React, { Component } from 'react';
import { withTheme, withStyles } from '@material-ui/core/styles';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import OrbBackground from '../../components/OrbBackground';
import Logo from '../../assets/logo_placeholder.png';

const styles = {
    root: {
        color: '#fff',
        position: 'relative'
    },
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    validatorButton: {
        marginLeft: '20px',
        color: "#fff"
    },
    OrbBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
    },
    '@global': {
        body: {
            background: '#000'
        }
    },
    buttonContainer: {
        width: "100%",
        display: 'flex',
        justifyContent: 'center'
    },
    logoContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    logo: {
        height: '150px',
    }

}


class HomePage extends Component{
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseLine />
                <Container fixed className={classes.root}>
                    <Box className={classes.container}>
                        <div className={classes.logoContainer}>
                            <img className={classes.logo} src={Logo} alt="Logo"/>
                        </div>
                        <div className={classes.buttonContainer}>
                            <Button 
                                className={classes.clientButton}
                                color="primary"
                                variant="contained"
                                >I AM CLIENT</Button>
                            <Button 
                                className={classes.validatorButton}
                                color="secondary"
                                variant="contained"
                                >I AM VALIDATOR</Button>
                        </div>
                    </Box>
                </Container>
                <div className={classes.OrbBackground}>
                    <OrbBackground />
                </div>
            </React.Fragment>

        )
    }
}

export default withTheme(withStyles(styles)(HomePage));