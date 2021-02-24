import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Redirect, Switch } from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Restaurent } from "./modules";
import { history } from "./managers/history";
import BaseComponent from "./modules/baseComponent";

class Routes extends BaseComponent {

    componentDidMount() {

    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Router history={history}>
                    <Switch>
                        <Route exact path={'/'} component={Restaurent} />
                        <Redirect exact from='*' to="/" />
                    </Switch>
                </Router>
            </MuiThemeProvider>);
    }
}

export default Routes;