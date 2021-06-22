import React from 'react';
import { connect } from 'react-redux';
import CreditCardAction from '../Actions/CreditCardAction'
import { LoadingPanel, Table } from '../Components'
import { toast } from 'react-toastify';

class CreditCardComponent extends React.Component {

    _Table = {
        Options: {
            search: false,
            actionsColumnIndex: 0,
            pageSize: 10,
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

                            this.props.Add({
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

                            this.props.Update({
                                Id: _newData.Id,
                                Name: _newData.Name,
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


    componentDidMount = () => {

        this.props.GetAll();
    }

    CheckRequired = (_item) => {

        let _result = false;

        if (!_item.Name || _item.Name.length < 1) {

            toast.info("please enter a valid name.");

            return _result;;
        }

        _result = true;

        return _result;
    }

    render = () => {

        const { CreditCards, VisibleLoadingPanel } = this.props;

        if (!CreditCards || VisibleLoadingPanel) {

            return "";
        }

        return (
            <div>
                <Table
                    Editable={this._Table.Editable}
                    Columns={this._Table.Columns}
                    Data={CreditCards.map(x => ({ ...x }))}
                    Options={this._Table.Options}
                    Style={this._Table.Style}
                    Title={"credit cards: "} />
            </div>
        )
    }
}

const MapStateToProps = _state => {

    const { CreditCards } = _state.CreditCardReducer;

    const { VisibleLoadingPanel } = _state.UIReducer;

    return { CreditCards, VisibleLoadingPanel };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {

        GetAll: () => {

            _dispatch(CreditCardAction.GetAll())
        },

        Add: (_item) => {

            _dispatch(CreditCardAction.Add(_item))
        },

        Update: (_item) => {

            _dispatch(CreditCardAction.Update(_item))
        },

        Remove: (_id) => {

            _dispatch(CreditCardAction.Remove(_id))
        }
    }
}

export const CreditCardPage =
    connect(MapStateToProps, MapDispatchToProps)(CreditCardComponent);