import React from 'react';
import UserAction from '../Actions/UserAction'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid
} from '@material-ui/core';
import {
    EnhancedEncryption,
    Lock,
    LockOpen
} from '@material-ui/icons/';

class ChangePasswordComponent extends React.Component {

    state = {
        CurrentPassword: '',
        Password: '',
        ConfirmationPassword: ''
    }

    HandleChange = (_e) => {

        const { name, value } = _e.target;

        this.setState({ [name]: value });
    }

    ChangePassword = () => {

        const { CurrentPassword, Password, ConfirmationPassword } = this.state;

        if (CurrentPassword.trim().length == 0) {

            toast.info("please enter current password.");

            return;
        }

        if (Password.trim().length < 6) {

            toast.info("please enter a minimum 6 characters password.");

            return;
        }

        if (Password !== ConfirmationPassword) {

            toast.info("passwords do not match.");

            return;
        }

        this.props.ChangePassword({
            CurrentPassword,
            Password
        });
    }

    Clear = () => {

        this.setState({
            CurrentPassword: '',
            Password: '',
            ConfirmationPassword: ''
        });
    }

    componentDidMount = () => {

        this.props.OnRef(this)
    }

    componentWillUnmount = () => {

        this.props.OnRef(undefined)
    }

    render = () => {

        const { IsOpen, Close } = this.props;

        return (
            <div>
                <Dialog
                    fullWidth
                    maxWidth='xs'
                    open={IsOpen}
                    onClose={Close}>
                    <DialogContent>
                        <Grid
                            container
                            spacing={1}
                            alignItems="flex-end">
                            <Grid item xs={1}>
                                <LockOpen />
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    value={this.state.CurrentPassword}
                                    onChange={this.HandleChange}
                                    name='CurrentPassword'
                                    margin="dense"
                                    label="current password"
                                    type="password"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={1}
                            alignItems="flex-end">
                            <Grid item xs={1}>
                                <Lock />
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    value={this.state.Password}
                                    onChange={this.HandleChange}
                                    name='Password'
                                    margin="dense"
                                    label="password"
                                    type="password"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={1}
                            alignItems="flex-end">
                            <Grid item xs={1}>
                                <EnhancedEncryption />
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    value={this.state.ConfirmationPassword}
                                    onChange={this.HandleChange}
                                    name='ConfirmationPassword'
                                    margin="dense"
                                    label="confirm password"
                                    type="password"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={Close}
                            style={{ color: "#f44336" }}>
                            cancel
                        </Button>
                        <Button
                            onClick={this.ChangePassword}
                            color="primary">
                            change password
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {
        ChangePassword: _dto => _dispatch(UserAction.ChangePassword(_dto))
    }
}

export const ChangePasswordModal =
    connect(null, MapDispatchToProps)(ChangePasswordComponent);