/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../theme';
import * as ROUTES from '../../routes';
import HomePage from '../../pages/HomePage';
import ClientPage from '../../pages/ClientPage';
import ValidatorPage from '../../pages/ValidatorPage';

export default class RouterList extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <Route exact path={ROUTES.HOMEPAGE} component={HomePage} />
                    <Route exact path={ROUTES.CLIENTPAGE} component={ClientPage} />
                    <Route exact path={ROUTES.VALIDATORPAGE} component={ValidatorPage} />
                </Router>
            </ThemeProvider>
        )
    }
}