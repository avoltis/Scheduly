import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import scheduleReducer from './scheduleReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer, 
    schedules: scheduleReducer
});