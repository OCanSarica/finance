import React from 'react';
import AccountAction from '../Actions/AccountAction'
import { StatementDetail } from '../Components'
import { connect } from 'react-redux';
import { Table } from '../Components';
import { green } from "@material-ui/core/colors";
import { TextField, Button, Icon } from "@material-ui/core";

class HomeComponent extends React.Component {

    state = {
        Year: (new Date()).getFullYear(),
        Detail: []
    }

    _Table = {
        Options: {
            search: false,
            actionsColumnIndex: 0,
            pageSize: 10,
            pageSizeOptions: [],
        },
        Style: {
            minHeight: 'calc(100vh - 125px)',
            maxHeight: 'calc(100vh - 125px)',
        },
        Columns: [
            {
                title: "period",
                field: "Period",
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
            },
            {
                title: "summary",
                field: "Summary",
                type: 'numeric'
            },
            {
                title: "income amount",
                field: "IncomeAmount",
                type: 'numeric'
            },
            {
                title: "expense amount",
                field: "ExpenseAmount",
                type: 'numeric'
            },
            {
                title: "loan debt",
                field: "LoanAmount",
                type: 'numeric'
            },
            {
                title: "credit card debt",
                field: "CreditCardAmount",
                type: 'numeric'
            },
            {
                title: "credit card installment amount",
                field: "CreditCardInstallmentAmount",
                type: 'numeric'
            }
        ],
        OnRowClick: (_event, _rowData, _togglePanel) => _togglePanel(),
        StatementDetails:
            [{
                render: _rowData => (
                    <StatementDetail
                        Period={new Date(_rowData.Period)}
                        Summary={_rowData.Summary}
                    />
                )
            }],
    }

    Search = () => {

        this.props.GetStatements(this.state.Year);

        this.setState({ TitleYear: this.state.Year });
    }

    componentDidMount = () => {

        this.props.GetStatements(this.state.Year);

        this.setState({ TitleYear: this.state.Year });
    }

    render = () => {

        const { Year, TitleYear } = this.state;

        const { Statements, VisibleLoadingPanel } = this.props;

        if (!Statements || VisibleLoadingPanel) {

            return "";
        }

        return (
            <div>
                <div style={{ paddingBottom: '40px' }}>
                    <div style={{ float: 'left' }} >
                        <TextField
                            style={{ width: '150px' }}
                            type="number"
                            label="statement year"
                            value={Year}
                            onChange={(_e) =>
                                this.setState({ Year: _e.target.value })} />
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
                        Columns={this._Table.Columns}
                        Data={Statements}
                        Options={this._Table.Options}
                        Style={this._Table.Style}
                        OnRowClick={this._Table.OnRowClick}
                        DetailPanels={this._Table.StatementDetails}
                        Title={"statement: " + TitleYear} />
                </div>
            </div >
        )
    }
}

const MapStateToProps = _state => {

    const { Statements } = _state.AccountReducer;

    const { VisibleLoadingPanel } = _state.UIReducer;

    return { Statements, VisibleLoadingPanel };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {

        GetStatements: (_year) => {

            _dispatch(AccountAction.GetStatements(_year));
        }
    }
}

export const HomePage =
    connect(MapStateToProps, MapDispatchToProps)(HomeComponent);