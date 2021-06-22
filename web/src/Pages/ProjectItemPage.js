import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Table } from '../Components'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from 'react';
import ProjectItemAction from '../Actions/ProjectItemAction'
import ProjectAction from '../Actions/ProjectAction'
import DateFnsUtils from "@date-io/date-fns";

class ProjectItemComponent extends React.Component {

    _Params = new URLSearchParams(this.props.location.search);

    _ProjectId = null;

    _Table = {
        Options: {
            filtering: true,
            search: false,
            actionsColumnIndex: 0,
            pageSize: 8,
            pageSizeOptions: []
        },
        Style: {
            minHeight: 'calc(100vh - 60px)',
            maxHeight: 'calc(100vh - 60px)',
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
                title: "income",
                field: "IsIncome",
                type: 'boolean',
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
                                Period: _newData.Period,
                                IsIncome: _newData.IsIncome,
                                ProjectId: this._ProjectId,
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
                                Period: _newData.Period,
                                IsIncome: _newData.IsIncome,
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

    componentDidMount = () => {

        this._ProjectId = Number(this._Params.get("_p"));

        if (this._ProjectId) {

            this.props.GetAll(this._ProjectId);

            this.props.GetProject(this._ProjectId);
        }
    }

    render = () => {

        const { ProjectItems, VisibleLoadingPanel, Project } = this.props;

        if (!ProjectItems || !Project || VisibleLoadingPanel) {

            return "";
        }

        let _expenseAmount = 0, _incomeAmount = 0;
        
        ProjectItems.forEach(x=> x.IsIncome ? 
            _incomeAmount += x.Amount : 
            _expenseAmount += x.Amount)
     
        return (
            <div>

                <Table
                    Editable={this._Table.Editable}
                    Columns={this._Table.Columns}
                    Data={ProjectItems.map(x => ({ ...x }))}
                    //to not move tableData property to state
                    Options={this._Table.Options}
                    Style={this._Table.Style}
                    Title={Project.Name + ": " + (_incomeAmount - _expenseAmount) + " = " +
                        _incomeAmount + " - " + _expenseAmount} />
            </div>
        );
    }
}

const MapStateToProps = _state => {

    const { ProjectItems } = _state.ProjectItemReducer;

    const { Project } = _state.ProjectReducer;

    const { VisibleLoadingPanel } = _state.UIReducer;

    return { ProjectItems, VisibleLoadingPanel, Project };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {

        GetAll: (_projectId) => {

            _dispatch(ProjectItemAction.GetAll(_projectId))
        },

        Add: (_projectItem) => {

            _dispatch(ProjectItemAction.Add(_projectItem))
        },

        Update: (_projectItem) => {

            _dispatch(ProjectItemAction.Update(_projectItem))
        },

        Remove: (_id) => {

            _dispatch(ProjectItemAction.Remove(_id))
        },

        GetProject: (_projectId) => {

            _dispatch(ProjectAction.Get(_projectId))
        },
    }
}

export const ProjectItemPage =
    connect(MapStateToProps, MapDispatchToProps)(ProjectItemComponent);