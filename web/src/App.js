import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from './Tools/';
import { PrivateRoute, Menu, LoadingPanel } from './Components/';
import UIAction from './Actions/UIAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { green } from '@material-ui/core/colors';
import {
    HomePage,
    LoginPage,
    IncomePage,
    ExpensePage,
    LoanPage,
    CreditCardPage,
    CreditCardInstallmentPage,
    CreditCardPeriodPage,
    AccountPage,
    ProjectPage,
    ProjectItemPage
} from './Pages/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class App extends React.Component {

    _Theme = createMuiTheme({
        palette: {
            secondary: {
                main: '#ffc800',
            },
            primary: {
                main: green[500]
            },
            type: 'dark'
        },
        typography: {
            fontSize: 24,
        },
    });

    constructor(props) {

        super(props);

        History.listen((location, action) => {

        });
    }

    render() {

        const _user = this.props.User;

        return (
            <MuiThemeProvider theme={this._Theme}>
                <div className="container">
                    <ToastContainer />
                    <Router history={History}>
                        {_user && <Menu/>}
                        {this.props.VisibleLoadingPanel && <LoadingPanel />}
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/"
                                component={HomePage} />
                            <PrivateRoute
                                path="/income"
                                component={IncomePage} />
                            <PrivateRoute
                                path="/expense"
                                component={ExpensePage} />
                            <PrivateRoute
                                path="/loan"
                                component={LoanPage} />
                            <PrivateRoute
                                path="/credit_card"
                                component={CreditCardPage} />
                            <PrivateRoute
                                path="/credit_card_period"
                                component={CreditCardPeriodPage} />
                            <PrivateRoute
                                path="/credit_card_installment"
                                component={CreditCardInstallmentPage} />
                            <PrivateRoute
                                path="/account"
                                component={AccountPage} />
                            <PrivateRoute
                                path="/project"
                                component={ProjectPage} />
                            <PrivateRoute
                                path="/project_item"
                                component={ProjectItemPage} />
                            <Route
                                path="/login"
                                component={LoginPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>

                </div>
            </MuiThemeProvider>
        );
    }
}

const MapStateToProps = state => {

    const { User } = state.AuthenticationReducer;

    const { VisibleLoadingPanel } = state.UIReducer

    return { User, VisibleLoadingPanel };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {
        SetVisibilityAddUserModal:
            _status => _dispatch(UIAction.SetVisibilityAddUserModal(_status)),
    }
}

export default
    connect(MapStateToProps, MapDispatchToProps)(App);