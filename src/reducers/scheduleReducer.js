import _ from 'lodash';
import {
    FETCH_SCHEDULE,
    FETCH_SCHEDULES,
    CREATE_SCHEDULE,
    EDIT_SCHEDULE,
    DELETE_SCHEDULE
} from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {

        case FETCH_SCHEDULES:
            return { ...state, ..._.mapKeys(action.payload, 'Id') };

        case FETCH_SCHEDULE:
      
            return { ...state, [action.payload.Id]: action.payload };

        case CREATE_SCHEDULE:
            return { ...state, [action.payload.Id]: action.payload };

        case EDIT_SCHEDULE:
            return { ...state, [action.payload.Id]: action.payload };

        case DELETE_SCHEDULE:
            return _.omit(state, action.payload);

        default:
            return state;
    }
}