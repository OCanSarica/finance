import React from 'react';
import UserAction from '../Actions/UserAction'
import { connect } from 'react-redux';
import { OtherTool } from '../Tools'
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
    Email,
    AccountCircle,
    EnhancedEncryption,
    Lock
} from '@material-ui/icons/';

class AddUserComponent extends React.Component {

    state = {
        Username: '',
        Email: '',
        Password: '',
        ConfirmationPassword: ''
    }

    HandleChange = (_e) => {

        const { name, value } = _e.target;

        this.setState({ [name]: value });
    }

    Add = () => {

        const { Username, Email, Password, ConfirmationPassword } = this.state;

        if (Username.trim().length < 3) {

            toast.info("please enter a minimum 3 characters username.");

            return;
        }

        if (Email.trim().length < 3 || 
            !OtherTool.ValidateEmail(Email)) {

            toast.info("please enter a valid email.");

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

        this.props.Add({
            Username,
            Email,
            Password
        });
    }

    Clear = () => {

        this.setState({
            Username: '',
            Email: '',
            Password: '',
            ConfirmationPassword: ''
        })
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
                    {/* <DialogTitle id="form-dialog-title">add user</DialogTitle> */}
                    <DialogContent>
                        {/* <DialogContentText>
                                register user
                            </DialogContentText> */}

                        <Grid
                            container
                            spacing={1}
                            alignItems="flex-end">

                            <Grid item xs={1}>
                                <AccountCircle />
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    value={this.state.Username}
                                    onChange={this.HandleChange}
                                    name='Username'
                                    autoFocus
                                    margin="dense"
                                    label="username"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={1}
                            alignItems="flex-end">
                            <Grid item xs={1}>
                                <Email />
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    value={this.state.Email}
                                    onChange={this.HandleChange}
                                    name='Email'
                                    margin="dense"
                                    label="email"
                                    type="email"
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
                            onClick={this.Add}
                            color="primary">
                            add user
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {
        Add: _user => _dispatch(UserAction.Add(_user))
    }
}

export const AddUserModal =
    connect(null, MapDispatchToProps)(AddUserComponent);