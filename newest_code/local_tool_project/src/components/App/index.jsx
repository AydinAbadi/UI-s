/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../theme';
import * as ROUTES from '../../routes';
import HomePage from '../../pages/HomePage';

export default class RouterList extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <Route exact path={ROUTES.HOMEPAGE} component={HomePage} />
                </Router>
            </ThemeProvider>
        )
    }
}