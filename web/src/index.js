import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { Store } from './Tools'
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.getElementById('app'));

serviceWorker.unregister();
