import React from 'react';
import ReactLoading from "react-loading";

export class LoadingPanel extends React.Component {


    render = () => {

        return (
            <div className="loading">
                <ReactLoading type="bars" color="#4caf50" />
            </div>
        )
    }
}