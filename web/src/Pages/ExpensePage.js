import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ExpenseAction from '../Actions/ExpenseAction'
import { Table } from '../Components'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { green } from "@material-ui/core/colors"
import { Button, Icon } from "@material-ui/core";

class ExpenseComponent extends React.Component {

    state = { Period: null }

    _Table = {
        Options: {
            filtering: true,
            search: false,
            actionsColumnIndex: 0,
            pageSize: 8,
            pageSizeOptions: []
        },
        Style: {
            minHeight: 'calc(100vh - 125px)',
            maxHeight: 'calc(100vh - 125px)',
        },
        Columns: [
            {
                title: "id",
                field: "Id",
                hidden: true
            },
            {
                title: "period",
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
                title: "name",
                field: "Name",
            },
            {
                title: "amount",
                field: "Amount",
                type: 'numeric'
            }
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
                                Name: _newData.Name,
                                Period: _newData.Period
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

                            if (typeof _newData.Period === "object") {

                                _newData.Period.setHours(12);
                            }

                            this.props.Update({
                                Amount: Number.parseFloat(_newData.Amount),
                                Id: _newData.Id,
                                Name: _newData.Name,
                                Period: _newData.Period                           
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

        if (!_item.Amount || _item.Amount <= 0) {

            toast.info("please enter a valid amount.");

            return _result;;
        }

        if (!_item.Name || _item.Name.length < 1) {

            toast.info("please enter a valid name.");

            return _result;;
        }

        _result = true;

        return _result;
    }

    Search = () => {

        if (!this.state.Period) {

            this.props.GetAll();

            return;
        }

        const _year = this.state.Period.getFullYear();

        const _month = this.state.Period.getMonth() + 1;

        this.props.GetAll(_year, _month);
    }

    componentDidMount = () => {

        this.props.GetAll();
    }

    render = () => {

        const { Expenses, VisibleLoadingPanel } = this.props;

        if (!Expenses || VisibleLoadingPanel) {

            return "";
        }

        return (
            <div>
                <div style={{ paddingBottom: '40px' }}>
                    <div style={{ float: 'left', width: '140px' }} >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                clearable={true}
                                label="select period"
                                value={this.state.Period}
                                onChange={(_v) =>
                                    this.setState({ Period: _v })}
                                views={["year", "month"]}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div style={{ paddingTop: '12px', float: 'left', paddingLeft: '20px' }} >
                        <Button
                            variant="contained"
                            startIcon={<Icon>search</Icon>}
                            onClick={this.Search}
                            style={{ backgroundColor: green[500] }}>
                            search
                    </Button>
                    </div>
                </div>
                <div style={{ paddingTop: 25 }}>
                    <Table
                        Editable={this._Table.Editable}
                        Columns={this._Table.Columns}
                        Data={Expenses.map(x => ({ ...x }))}
                        //to not move tableData property to state
                        Options={this._Table.Options}
                        Style={this._Table.Style}
                        Title={"expenses"} />
                </div>
            </div >
        );
    }
}

const MapStateToProps = _state => {

    const { Expenses } = _state.ExpenseReducer;

    const { VisibleLoadingPanel } = _state.UIReducer;

    return { Expenses, VisibleLoadingPanel };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {

        GetAll: (_year, _month) => {

            _dispatch(ExpenseAction.GetAll(_year, _month))
        },

        Add: (_expense) => {

            _dispatch(ExpenseAction.Add(_expense))
        },

        Update: (_expense) => {

            _dispatch(ExpenseAction.Update(_expense))
        },

        Remove: (_id) => {

            _dispatch(ExpenseAction.Remove(_id))
        }
    }
}

export const ExpensePage =
    connect(MapStateToProps, MapDispatchToProps)(ExpenseComponent);