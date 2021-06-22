import React from 'react';
import ProjectAction from '../Actions/ProjectAction'
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import { Table } from '../Components'
import { History } from '../Tools'
import { toast } from 'react-toastify';

class ProjectComponent extends React.Component {

    _Table = {
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
                title: "date",
                field: "Date",
                type: 'date'
            },
            {
                title: "amount",
                field: "Amount",
                type: 'numeric',
                editable: 'never'
            }
        ],
        Actions: [
            {
                icon:  () =>
                    <Icon
                        style={{ color: "#f97615" }}>view_headline
                    </Icon>,
                tooltip: 'items',
                onClick: (_event, _rowData) => History.push("/project_item?_p=" + _rowData.Id)
            }
        ],
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
                                Date: _newData.Date,
                                Name: _newData.Name,
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

        if (!_item.Name || _item.Name.length < 1) {

            toast.info("please enter a valid name.");

            return _result;;
        }

        if (!_item.Date) {

            toast.info("please select a date.");

            return _result;;
        }

        _result = true;

        return _result;
    }

    componentDidMount = () => {

        this.props.GetAll();
    }

    render = () => {

        const { Projects, VisibleLoadingPanel } = this.props;

        if (!Projects || VisibleLoadingPanel) {

            return "";
        }

        return (
            <div>
                <Table
                    Actions = {this._Table.Actions}
                    Editable={this._Table.Editable}
                    Columns={this._Table.Columns}
                    Data={Projects.map(x => ({ ...x }))}
                    Options={this._Table.Options}
                    Style={this._Table.Style}
                    Title={"projects"} />
            </div>
        )
    }
}

const MapStateToProps = _state => {

    const { Projects } = _state.ProjectReducer;

    const { VisibleLoadingPanel } = _state.UIReducer;

    return { Projects, VisibleLoadingPanel };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {
        GetAll: () => _dispatch(ProjectAction.GetAll()),
        Add: (_item) => _dispatch(ProjectAction.Add(_item)),
        Update: (_item) => _dispatch(ProjectAction.Update(_item)),
        Remove: (_id) => _dispatch(ProjectAction.Remove(_id)),
    }
}

export const ProjectPage =
    connect(MapStateToProps, MapDispatchToProps)(ProjectComponent);