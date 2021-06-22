import React from 'react';
import { connect } from 'react-redux';
import CreditCardInstallmentAction from '../Actions/CreditCardInstallmentAction'
import CreditCardAction from '../Actions/CreditCardAction'
import { LoadingPanel, Table } from '../Components'
import { toast } from 'react-toastify';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class CreditCardInstallmentComponent extends React.Component {

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
                                CreditCardId: Number.parseInt(_newData.CreditCardId),
                                Installment: Number.parseInt(_newData.Installment),
                                Name: _newData.Name,
                                Period: _newData.Period,
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
                                Id: _newData.Id,
                                Amount: Number.parseFloat(_newData.Amount),
                                CreditCardId: Number.parseInt(_newData.CreditCardId),
                                Installment: Number.parseInt(_newData.Installment),
                                Name: _newData.Name,
                                Period: _newData.Period,
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

        if (!_item.CreditCardId || _item.CreditCardId <= 0) {

            toast.info("please select a valid card.");

            return _result;;
        }

        if (!_item.Name || _item.Name.length < 1) {

            toast.info("please enter a valid name.");

            return _result;;
        }

        if (!_item.Installment || _item.Installment <= 0) {

            toast.info("please enter the installment.");

            return _result;;
        }

        _result = true;

        return _result;
    }

    componentDidMount = () => {

        this.props.GetAll();

        this.props.GetAllCards();
    }

    render = () => {

        const { CreditCardInstallments, CreditCards, VisibleLoadingPanel } = this.props;

        if (!CreditCardInstallments || !CreditCards || VisibleLoadingPanel) {

            return "";
        }

        let _cardsLookup = {};

        CreditCards.forEach(x => _cardsLookup[x.Id] = x.Name);

        const _columns = [
            {
                title: "id",
                field: "Id",
                hidden: true
            },
            {
                title: "name",
                field: "Name"
            },
            {
                title: "credit card",
                field: "CreditCardId",
                lookup: _cardsLookup,
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
        ];

        return (
            <div>
                <Table
                    Editable={this._Table.Editable}
                    Columns={_columns}
                    Data={CreditCardInstallments.map(x => ({ ...x }))}
                    //to not move tableData property to state
                    Options={this._Table.Options}
                    Style={this._Table.Style}
                    Title={"credit card installments"} />
            </div>
        )
    }
}

const MapStateToProps = _state => {

    const { CreditCardInstallments } = _state.CreditCardInstallmentReducer;

    const { CreditCards } = _state.CreditCardReducer;

    const { VisibleLoadingPanel } = _state.UIReducer;

    return { CreditCardInstallments, CreditCards, VisibleLoadingPanel };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {

        GetAllCards: () => {

            _dispatch(CreditCardAction.GetAll())
        },

        GetAll: () => {

            _dispatch(CreditCardInstallmentAction.GetAll())
        },

        Add: (_item) => {

            _dispatch(CreditCardInstallmentAction.Add(_item))
        },

        Update: (_item) => {

            _dispatch(CreditCardInstallmentAction.Update(_item))
        },

        Remove: (_id) => {

            _dispatch(CreditCardInstallmentAction.Remove(_id))
        }
    }
}

export const CreditCardInstallmentPage =
    connect(MapStateToProps, MapDispatchToProps)(CreditCardInstallmentComponent);