import React from 'react';
import { connect } from 'react-redux';
import AuthenticationAction from '../Actions/AuthenticationAction';
import { toast } from 'react-toastify';
import {
    TextField,
    Button,
    Icon,
    Grid
} from '@material-ui/core';
import {
    AccountCircle,
    AccountBalanceWallet,
    Lock
} from '@material-ui/icons/';

class LoginComponent extends React.Component {

    state = {
        Username: '',
        Password: ''
    };

    constructor(props) {

        super(props);

        this.props.Logout();
    }

    HandleChange = (e) => {

        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    HandlePress = (e) => {

        if (e.key === 'Enter') {

            this.Login();
        }
    }

    Login = () => {

        const { Username, Password } = this.state;

        if (!Username || !Password) {

            toast.info("please enter username and password.");

            return;
        }

        this.props.Login(Username, Password);
    }

    render = () => {

        let _loginButton = {
            Text: "log in",
            Icon: "check",
            Disabled: false
        };

        if (this.props.LoginRequest) {

            _loginButton = {
                Text: "logging in...",
                Icon: "hourglass_empty",
                Disabled: true
            };
        }

        return (
            <div className="login">
                    <div style={{ paddingLeft: 94, paddingTop:19, float: "left" }}>
                        <AccountBalanceWallet style={
                            {
                                // color: "#3498db",
                                color: "#4caf50",
                                fontSize: 40,
                            }} />
                    </div>
                    <div  style={{ float: "left", paddingLeft: 13 }}>
                        <h2 style={{ color: "#bebebe" }}>oZfinance</h2>

                    </div>
                <div style={{ paddingLeft: 30, paddingRight:30, paddingBottom:10 }}>
                    <Grid
                        container
                        spacing={2}
                        alignItems="flex-end">
                        <Grid item xs={1}>
                            <AccountCircle htmlColor="white" />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                value={this.state.Username}
                                onKeyPress={this.HandlePress}
                                onChange={this.HandleChange}
                                autoFocus
                                name='Username'
                                margin="dense"
                                label="username or e-mail"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                        alignItems="flex-end">
                        <Grid item xs={1}>
                            <Lock htmlColor="white" />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                value={this.state.Password}
                                onKeyPress={this.HandlePress}
                                onChange={this.HandleChange}
                                name='Password'
                                margin="dense"
                                label="password"
                                type="password"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="login-button">
                    <Button
                        disabled={_loginButton.Disabled}
                        type="submit"
                        style={{ width: 200 }}
                        startIcon={<Icon>{_loginButton.Icon}</Icon>}
                        variant="contained"
                        onClick={this.Login}
                        color="primary">
                        {_loginButton.Text}
                    </Button>
                </div>
            </div>
        );
    }
}

const MapStateToProps = _state => {

    const { LoginRequest } = _state.AuthenticationReducer;

    return { LoginRequest };
}

const MapDispatchToProps = (dispatch) => {

    return {
        Login: (_user, _password) => dispatch(AuthenticationAction.Login(_user, _password)),
        Logout: () => dispatch(AuthenticationAction.Logout())
    }
}

export const LoginPage = connect(MapStateToProps, MapDispatchToProps)(LoginComponent);