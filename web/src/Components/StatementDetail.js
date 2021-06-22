import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from "react-loading";
import AccountAction from '../Actions/AccountAction';
import { connect } from 'react-redux';
import { Table } from '.';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export class StatementDetailComponent extends React.Component {

    _Theme = createMuiTheme({
        palette: {
            secondary: {
                main: '#ffc800',
            },
            primary: {
                main: green[500]
            },
            type: 'dark'
        },
        typography: {
            fontSize: 21
        },
    });

    _Table = {
        Options: {
            search: false,
            paging: false,
            // rowStyle: {
            //     backgroundColor: '#363636',
            // },
            // headerStyle: {
            //     backgroundColor: '#202020'
            // }
        },
        Columns: [
            {
                title: "type",
                field: "Type",
            },
            {
                title: "name",
                field: "Name",
            },
            {
                title: "amount",
                field: "Amount",
                type: 'numeric'
            },
        ]
    }

    GetDetailPeriod = (_period) =>
        _period.getFullYear() +
        "/" +
        ((_period.getMonth() + 1).toString().length == 1 ? "0" : "") +
        +
        (_period.getMonth() + 1);

    componentDidMount = () => {

        const { Period, StatementDetails } = this.props;

        const _detailPeriod = this.GetDetailPeriod(Period);

        if (!StatementDetails ||
            !StatementDetails[_detailPeriod]) {

            this.props.GetStatementDetails(
                Period.getFullYear(),
                Period.getMonth() + 1);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        const { Period, StatementDetails } = this.props;

        if (!StatementDetails) {

            return true; //render
        }

        const _detailPeriod = this.GetDetailPeriod(Period);

        const _newStatementDetails = nextProps.StatementDetails[_detailPeriod];

        const _oldStatementDetails = this.props.StatementDetails[_detailPeriod];

        if (!_oldStatementDetails ||
            _newStatementDetails.length != _oldStatementDetails.length) {

            return true;
        }

        return false;
    }

    render = () => {

        const { StatementDetails, Period, Summary } = this.props;

        const _detailPeriod = this.GetDetailPeriod(Period);

        if (!StatementDetails || !StatementDetails[_detailPeriod]) {

            return (
                <div className="detail-loading">
                    <ReactLoading type="bars" color="#4caf50" />
                </div>
            )
        }

        return (
            <MuiThemeProvider theme={this._Theme}>
                <div className="detail-panel">
                    <Table
                        Columns={this._Table.Columns}
                        Data={StatementDetails[_detailPeriod]}
                        Options={this._Table.Options}
                        Title={
                            _detailPeriod +
                            ": " +
                            Summary}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

const MapStateToProps = _state => {

    const { StatementDetails } = _state.AccountReducer;

    return { StatementDetails };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {

        GetStatementDetails: (_year, _month) => {

            _dispatch(AccountAction.GetStatementDetails(_year, _month));
        }
    }
}

export const StatementDetail =
    connect(MapStateToProps, MapDispatchToProps)(StatementDetailComponent);

StatementDetail.propTypes = {
    Period: PropTypes.object.isRequired
};
