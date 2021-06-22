import React from 'react';
import DateFnsUtils from "@date-io/date-fns";
import CreditCardPeriodAction from '../Actions/CreditCardPeriodAction'
import CreditCardAction from '../Actions/CreditCardAction'
import { connect } from 'react-redux';
import { LoadingPanel, Table } from '../Components'
import { toast } from 'react-toastify';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MenuItem,  Button, Icon } from '@material-ui/core/';
import { green } from "@material-ui/core/colors"

class CreditCardPeriodComponent extends React.Component {

    _Table = {
        Options: {
            filtering: true,
            search: false,
            actionsColumnIndex: 0,
            pageSize: 8,
            pageSizeOptions: []
        },
        Style: {
            minHeight: 'calc(100vh - 110px)',
            maxHeight: 'calc(100vh - 110px)',
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

    state = { Period: null }

    componentDidMount = () => {

        this.props.GetAll();

        this.props.GetAllCards();
    }

    render = () => {

        const { CreditCardPeriods, CreditCards, VisibleLoadingPanel } = this.props;

        if (!CreditCardPeriods || !CreditCards || VisibleLoadingPanel) {

            return "";
        }

        let _cardsLookup = {};

        let _selectOptions = [];

        CreditCards.forEach(x => {

            _cardsLookup[x.Id] = x.Name;

            _selectOptions.push(<MenuItem value={x.Id}>{x.Name}</MenuItem>)
        });

        const _columns = [
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
                title: "credit card",
                field: "CreditCardId",
                lookup: _cardsLookup,
                // editComponent: props => (<div>
                //     <FormControl fullWidth>
                //         {/* <InputLabel id="simple-select-label">select card</InputLabel> */}
                //         <Select
                //             labelId="simple-select-label"
                //             value={props.value}
                //             onChange={value => props.onChange(value)}
                //         >
                //             {_selectOptions}
                //         </Select>
                //         <FormHelperText>select a credit card</FormHelperText>
                //     </FormControl>
                // </div>
                // )
            },
            {
                title: "installment amount",
                field: "InstallmentAmount",
                type: 'numeric',
                editable: 'never'
            },
            {
                title: "amount",
                field: "Amount",
                type: 'numeric',
            },
        ];

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
                    Columns={_columns}
                    Data={CreditCardPeriods.map(x => ({ ...x }))}
                    //to not move tableData property to state
                    Options={this._Table.Options}
                    Style={this._Table.Style}
                    Title={"credit card period"} />
                </div>
            </div >
        );
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

        _result = true;

        return _result;
    }
}

const MapStateToProps = _state => {

    const { CreditCardPeriods } = _state.CreditCardPeriodReducer;

    const { CreditCards } = _state.CreditCardReducer;

    const { VisibleLoadingPanel } = _state.UIReducer;

    return { CreditCardPeriods, CreditCards, VisibleLoadingPanel };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {

        GetAllCards: () => {

            _dispatch(CreditCardAction.GetAll())
        },

        GetAll: (_year, _month) => {

            _dispatch(CreditCardPeriodAction.GetAll(_year, _month))
        },

        Add: (_item) => {

            _dispatch(CreditCardPeriodAction.Add(_item))
        },

        Update: (_item) => {

            _dispatch(CreditCardPeriodAction.Update(_item))
        },

        Remove: (_id) => {

            _dispatch(CreditCardPeriodAction.Remove(_id))
        }
    }
}

export const CreditCardPeriodPage =
    connect(MapStateToProps, MapDispatchToProps)(CreditCardPeriodComponent);