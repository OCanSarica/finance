import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import RootReducer from '../Reducers/RootReducer';

const _LoggerMiddleware = createLogger();

export const Store = createStore(
    RootReducer,
    applyMiddleware(
        thunkMiddleware,
        // _LoggerMiddleware
    )
);