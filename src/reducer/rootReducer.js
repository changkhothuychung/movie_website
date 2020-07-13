import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import MovieReducer from './movieReducer';

const rootReducer = combineReducers({
    MovieReducer
});

export default rootReducer; 