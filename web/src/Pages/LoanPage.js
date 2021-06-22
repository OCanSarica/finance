import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import LoanAction from '../Actions/LoanAction'
import { LoadingPanel, Table } from '../Components'
import { toast } from 'react-toastify';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class LoanComponent extends React.Component {

    _Table = {
        Options: {
            search: false,
            filtering: true,
            actionsColumnIndex: 0,
            pageSize: 8,
            pageSizeOptions: []
        },
        Style: {
            minHeight: 'calc(100vh - 60px)',
            maxHeight: 'calc(100vh - 60px)'
        },
        Columns: [
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
                title: "starting period",
                field: "Period",
                filtering: false,
                customSort: (a, b) => {

                    let _a = typeof a.Period === "object" ?
                        a.Period.toJSON() :
                        a.Period;

                    let _b = typeof b.Period === "object" ?
                        b.Period.toJSON() :
                        b.Period;

                    return _a.localeCompare(_b);
                },
                type: 'date',
                render: _value => {

                    let _stringDate = typeof _value.Period === "object" ?
                        _value.Period.toJSON() :
                        _value.Period;

                    let _temp = _stringDate.split('-');

                    let _date = _temp[0] + "/" + _temp[1];

                    return <p>{_date}</p>
                },
                editComponent: props =>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            onChange={props.onChange}
                            value={props.rowData.Period}
                            views={["year", "month"]}
                        />
                    </MuiPickersUtilsProvider>
            },
            {
                title: "completed",
                field: "IsCompleted",
                type: 'boolean',
                editable: 'never'
            },
            {
                title: "closed",
                field: "Closed",
                type: 'boolean',
                editable: 'onUpdate'
            },
            {
                title: "closed period",
                field: "ClosedPeriod",
                filtering: false,
                editable: 'onUpdate',
                customSort: (a, b) => {

                    let [_a, _b] = ["", ""];

                    if (a.ClosedPeriod) {

                        _a = typeof a.ClosedPeriod === "object" ?
                            a.ClosedPeriod.toJSON() :
                            a.ClosedPeriod;
                    }

                    if (b.ClosedPeriod) {

                        _b = typeof b.ClosedPeriod === "object" ?
                            b.ClosedPeriod.toJSON() :
                            b.ClosedPeriod;
                    }

                    return _a.localeCompare(_b);
                },
                type: 'date',
                render: _value => {

                    if (!_value ||
                        !_value.ClosedPeriod) {

                        return <p></p>;
                    }

                    let _stringDate = typeof _value.ClosedPeriod === "object" ?
                        _value.ClosedPeriod.toJSON() :
                        _value.ClosedPeriod;

                    let _temp = _stringDate.split('-');

                    let _date = _temp[0] + "/" + _temp[1];

                    return <p>{_date}</p>
                },
                editComponent: props =>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            onChange={props.onChange}
                            value={props.rowData.ClosedPeriod}
                            views={["year", "month"]}
                        />
                    </MuiPickersUtilsProvider>
            },
            {
                title: "current installment",
                field: "CurrentInstallment",
                type: 'numeric',
                editable: 'never'
            },
            {
                title: "installment",
                field: "Installment",
                type: 'numeric'
            },
            {
                title: "principal amount",
                field: "PrincipalAmount",
                type: 'numeric',
            },
            {
                title: "total amount",
                field: "TotalAmount",
                type: 'numeric',
                editable: 'never'
            },
            {
                title: "amount",
                field: "Amount",
                type: 'numeric',
                editable: 'always'
            },
        ],
        Editable: {
            onRowAdd: _newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            if (!this.CheckRequired(_newData)) {

                                reject();

                                return;
                            }

                            if (!_newData.Period) {

                                _newData.Period = new Date();
                            }

                            _newData.Period.setHours(12);

                            this.props.Add({
                                Amount: Number.parseFloat(_newData.Amount),
                                Installment: Number.parseInt(_newData.Installment),
                                Period: _newData.Period,
                                Name: _newData.Name,
                                PrincipalAmount: Number.parseFloat(_newData.PrincipalAmount),
                                Closed: false,
                                ClosedPeriod: null
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

                            if (_newData.Closed &&
                                !_newData.ClosedPeriod) {

                                toast.info("please select closed period.");

                                reject();

                                return;
                            }

                            if (typeof _newData.Period === "object") {

                                _newData.Period.setHours(12);
                            }

                            if (_newData.ClosedPeriod &&
                                typeof _newData.ClosedPeriod === "object") {

                                _newData.ClosedPeriod.setHours(12);
                            }

                            this.props.Update({
                                Amount: Number.parseFloat(_newData.Amount),
                                Id: _newData.Id,
                                Installment: Number.parseInt(_newData.Installment),
                                Period: _newData.Period,
                                Name: _newData.Name,
                                PrincipalAmount: Number.parseFloat(_newData.PrincipalAmount),
                                Closed: _newData.Closed ? true : false,
                                ClosedPeriod: _newData.ClosedPeriod
                            });
                        }
                        resolve()
                    }, 1000)
                }),
            onRowDelete: _oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            this.props.Remove(_oldData.Id)
                        }
                        resolve()
                    }, 1000)
                })
        }
    }

    componentDidMount = () => {

        this.props.GetAll();
    }

    CheckRequired = (_item) => {

        let _result = false;

        if (!_item.Amount || _item.Amount <= 0) {

            toast.info("please enter a valid amount.");

            return _result;
        }

        if (!_item.Name || _item.Name.length < 1) {

            toast.info("please enter a valid name.");

            return _result;
        }

        if (!_item.Installment || _item.Installment <= 0) {

            toast.info("please enter the installment.");

            return _result;
        }

        if (!_item.PrincipalAmount || _item.PrincipalAmount <= 0) {

            toast.info("please enter a valid principal amount.");

            return _result;
        }

        _result = true;

        return _result;
    }

    render() {

        const { Loans, VisibleLoadingPanel } = this.props;

        if (!Loans || VisibleLoadingPanel) {

            return "";
        }

        let _total = 0;

        Loans.
            filter(x => !x.IsCompleted && x.CurrentInstallment > 0).
            forEach(x => _total += x.Amount);

        return (
            <div>
                <Table
                    Editable={this._Table.Editable}
                    Columns={this._Table.Columns}
                    Data={Loans.map(x => ({ ...x }))}
                    //to not move tableData property to state
                    Options={this._Table.Options}
                    Style={this._Table.Style}
                    Title={"loans: " + _total} />
            </div>
        )
    }
}

const MapStateToProps = _state => {

    const { Loans } = _state.LoanReducer;

    const { VisibleLoadingPanel } = _state.UIReducer;

    return { Loans, VisibleLoadingPanel };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {

        GetAll: () => {

            _dispatch(LoanAction.GetAll())
        },

        Add: (_item) => {

            _dispatch(LoanAction.Add(_item))
        },

        Update: (_item) => {

            _dispatch(LoanAction.Update(_item))
        },

        Remove: (_id) => {

            _dispatch(LoanAction.Remove(_id))
        }
    }
}

export const LoanPage =
    connect(MapStateToProps, MapDispatchToProps)(LoanComponent);