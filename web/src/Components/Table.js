import React from 'react';
import MaterialTable from 'material-table/'
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';

export class Table extends React.Component {

    _Localization = {
        header: {
            actions: ''
        },
        body: {
            emptyDataSourceMessage: "no records to display.",
            editRow: {
                deleteText: "are you sure delete this row?",
                cancelTooltip: "cancel",

            },
            addTooltip: 'add',
            editTooltip: 'edit',
            deleteTooltip: 'delete',
            saveTooltip: 'save'
        }
    }

    render() {

        let {
            Title,
            Columns,
            Data,
            Options,
            Style,
            Actions,
            Editable,
            OnRowClick,
            DetailPanels
        } = this.props;

        const _defaultOptions = {
            addRowPosition: "first",
            headerStyle: {
                backgroundColor: '#34343466',
            }
        }

        const _options = { ..._defaultOptions, ...Options };

        if (!Style) {

            Style = {};
        }

        Style.overflowY = 'auto'

        return (
            <MaterialTable
                title={Title}
                columns={Columns}
                data={Data}
                options={_options}
                style={Style}
                actions={Actions}
                localization={this._Localization}
                editable={Editable}
                onRowClick={OnRowClick}
                detailPanel={DetailPanels}
                icons=
                {
                    {
                        Add: () =>
                            <Icon
                                style={{ fontSize: 24, color: green[500] }}>add
                            </Icon>,
                        Edit: () =>
                            <Icon
                                color="secondary">edit
                            </Icon>,
                        Delete: () =>
                            <Icon
                                color="error">delete
                            </Icon>,
                        Check: () =>
                            <Icon
                                style={{ color: green[500] }}>check
                            </Icon>,
                        Clear: () =>
                            <Icon
                                color="error">clear
                            </Icon>,
                    }
                }
            />
        )
    }
}

Table.propTypes = {
    Data: PropTypes.array.isRequired,
    Columns: PropTypes.array.isRequired,
    Options: PropTypes.object.isRequired,
    Style: PropTypes.object,
    Title: PropTypes.string,
    Actions: PropTypes.array,
    DetailPanels: PropTypes.array,
    OnRowClick: PropTypes.func
};
