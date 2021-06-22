import React from 'react';
import MetisMenu from 'react-metismenu';
import UIAction from '../Actions/UIAction'
import { History } from "../Tools"
import { CustomLink } from '../Components'
import { AddUserModal, ChangePasswordModal } from '../Modals'
import { connect } from 'react-redux';

class MenuComponent extends React.Component {

    state = { ActiveLink: "/" };

    _AddUserModalRef = {};

    _ChangePasswordModalRef = {};


    //icons should be font awesome 4.7
    _UserMenu = this.props.User.Username === 'ozzz' ?
        [
            {
                label: 'change password',
                icon: 'unlock-alt',
            },
            {
                label: 'register',
                icon: 'user-plus',
            },
            {
                icon: 'sign-out',
                label: 'logout',
                to: '/login',
            },
        ] :
        [
            {
                label: 'change password',
                icon: 'unlock-alt',
            }, ,
            {
                icon: 'sign-out',
                label: 'logout',
                to: '/login',
            }
        ];

    _MenuItems = [
        {
            icon: 'home',
            label: 'oZfinance',
            to: '/',
        },
        {
            icon: 'credit-card',
            label: 'credit cards',
            content: [
                {
                    icon: 'credit-card-alt',
                    label: 'cards',
                    to: 'credit_card',
                },
                {
                    icon: 'table',
                    label: 'installments',
                    to: 'credit_card_installment',
                },
                {
                    icon: 'calendar',
                    label: 'period debts',
                    to: 'credit_card_period',
                }
            ],
        },
        {
            icon: 'level-down',
            label: 'expenses',
            to: 'expense',
        },
        {
            icon: 'level-up',
            label: 'incomes',
            to: 'income',
        },
        {
            icon: 'usd',
            label: 'loans',
            to: 'loan',
        },
        {
            icon: 'bars',
            label: 'others',
            content:[
                {
                    icon: 'id-card',
                    label: 'accounts',
                    to: 'account',
                },
                {
                    icon: 'money',
                    label: 'projects',
                    to: 'project',
                }
            ]
        },
        {
            icon: 'user',
            label: 'user',
            content: this._UserMenu
        }
        // {
        //     icon: 'external-link',
        //     label: 'External Link',
        //     externalLink: true,
        //     to: 'https://www.google.com',
        // },

    ];

    componentDidMount = () => {

        let _link = "/";

        // login sayfasında buraya geçerken pathname hala "/login" oluyordu.
        // bu yüzden activeLinkFromLocation kullanmak yerine custom yazdım.
        if (History.location.pathname.length > 1 && History.location.pathname != "/login") {

            _link = History.location.pathname.substr(1);
        }

        this.refs.Menu.changeActiveLinkTo(_link);
    }

    render() {

        return (
            <div className="menu col-sm-1">
                <MetisMenu
                    ref="Menu"
                    content={this._MenuItems}
                    LinkComponent={CustomLink}
                    onSelected={(e, b) => {
                        if (e.selectedMenuLabel === 'register') {

                            this._AddUserModalRef.Clear();

                            this.props.SetVisibilityAddUserModal(true);
                        }
                        else if (e.selectedMenuLabel === 'change password') {

                            this._ChangePasswordModalRef.Clear();

                            this.props.SetVisibilityChangePasswordModal(true);
                        }
                        else {

                            History.push(e.newLocation);
                        }
                    }}
                // activeLinkFromLocation
                />
                <AddUserModal
                    OnRef={_ref => this._AddUserModalRef = _ref}
                    IsOpen={this.props.VisibleAddUserModal ?
                        this.props.VisibleAddUserModal :
                        false
                    }
                    Close={() => this.props.SetVisibilityAddUserModal(false)}
                />
                <ChangePasswordModal
                    OnRef={_ref => this._ChangePasswordModalRef = _ref}
                    IsOpen={this.props.VisibleChangePasswordModal ?
                        this.props.VisibleChangePasswordModal :
                        false
                    }
                    Close={() => this.props.SetVisibilityChangePasswordModal(false)}
                />
            </div>)
    }
}

const MapStateToProps = state => {

    const { User } = state.AuthenticationReducer;

    const { VisibleAddUserModal, VisibleChangePasswordModal } = state.UIReducer

    return { User, VisibleAddUserModal, VisibleChangePasswordModal };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {
        SetVisibilityAddUserModal:
            _status => _dispatch(UIAction.SetVisibilityAddUserModal(_status)),
        SetVisibilityChangePasswordModal:
            _status => _dispatch(UIAction.SetVisibilityChangePasswordModal(_status)),
    }
}

export const Menu =
    connect(MapStateToProps, MapDispatchToProps)(MenuComponent);