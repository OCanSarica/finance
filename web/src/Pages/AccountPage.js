import React from 'react';
import AccountAction from '../Actions/AccountAction'
import DefAction from '../Actions/DefAction'
import { connect } from 'react-redux';
import { Table } from '../Components'
import { toast } from 'react-toastify';

class AccountComponent extends React.Component {

    _Table = {
        Options: {
            search: false,
            actionsColumnIndex: 0,
            filtering: true,
            pageSize: 8,
            pageSizeOptions: []
        },
        Style: {
            minHeight: 'calc(100vh - 60px)',
            maxHeight: 'calc(100vh - 60px)'
        },
        Editable: {
            onRowAdd: _newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            if (!this.CheckRequired(_newData)) {

                                reject();

                                return;
                            }

                            if (typeof _newData.Date === "object") {

                                _newData.Date.setHours(12);
                            }

                            this.props.Add({
                                Amount: Number.parseFloat(_newData.Amount),
                                Date: _newData.Date,
                                Name: _newData.Name,
                                TypeDefid: Number.parseInt(_newData.TypeDefid),
                            });
                        }
                        resolve()
                    }, 1000)
                }),
            onRowUpdate: (_newData, _oldData) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            if (!this.CheckRequired(_newData)) {

                                reject();

                                return;
                            }

                            if (typeof _newData.Date === "object") {

                                _newData.Date.setHours(12);
                            }

                            this.props.Update({
                                Id: _newData.Id,
                                Amount: Number.parseFloat(_newData.Amount),
                                Date: _newData.Date,
                                Name: _newData.Name,
                                TypeDefid: Number.parseInt(_newData.TypeDefid),
                            });
                        }
                        resolve()
                    }, 1000)
                }),
            onRowDelete: _oldData =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        {
                            this.props.Remove(_oldData.Id)
                        }
                        resolve()
                    }, 1000)
                })
        }
    }

    CheckRequired = (_item) => {

        let _result = false;

        if (!_item.Amount || _item.Amount < 1) {

            toast.info("please enter a valid amount.");

            return _result;;
        }

        if (!_item.Date) {

            toast.info("please select a date.");

            return _result;;
        }

        if (!_item.Name || _item.Name.length < 1) {

            toast.info("please enter a valid name.");

            return _result;;
        }

        if (!_item.TypeDefid) {

            toast.info("please select a type.");

            return _result;;
        }

        _result = true;

        return _result;
    }

    componentDidMount = () => {

        this.props.GetAll();

        this.props.GetAccountTypes();
    }

    render = () => {

        const { Accounts, AccountTypes, VisibleLoadingPanel } = this.props;

        if (!Accounts || !AccountTypes || VisibleLoadingPanel) {

            return "";
        }
        
        let _types = {};
        
        AccountTypes.forEach(x => _types[x.Id] = x.Text);

        const _columns = [
            {
                title: "id",
                field: "Id",
                hidden: true
            },
            {
                title: "name",
                field: "Name",
            },
            {
                title: "type",
                field: "TypeDefid",
                lookup: _types
            },
            {
                title: "date",
                field: "Date",
                type: 'date'
            },
            {
                title: "amount",
                field: "Amount",
                type: 'numeric'
            }
        ];

        return (
            <div>
                <Table
                    Editable={this._Table.Editable}
                    Columns={_columns}
                    Data={Accounts.map(x => ({ ...x }))}
                    Options={this._Table.Options}
                    Style={this._Table.Style}
                    Title={"accounts"} />
            </div>
        )
    }
}

const MapStateToProps = _state => {

    const { Accounts } = _state.AccountReducer;

    const { AccountTypes } = _state.DefReducer;

    const { VisibleLoadingPanel } = _state.UIReducer;

    return { Accounts, VisibleLoadingPanel, AccountTypes };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {
        GetAll: () => _dispatch(AccountAction.GetAll()),
        Add: (_item) => _dispatch(AccountAction.Add(_item)),
        Update: (_item) => _dispatch(AccountAction.Update(_item)),
        Remove: (_id) => _dispatch(AccountAction.Remove(_id)),
        GetAccountTypes: (_id) => _dispatch(DefAction.GetAccountTypes())
    }
}

export const AccountPage =
    connect(MapStateToProps, MapDispatchToProps)(AccountComponent);