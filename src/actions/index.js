import schedules from '../apis/schedules';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_SCHEDULE,
  FETCH_SCHEDULE,
  FETCH_SCHEDULES,
  DELETE_SCHEDULE,
  EDIT_SCHEDULE
} from '../actions/types';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  history.push('/');
  return {
    type: SIGN_OUT
  };
};

export const createSchedule = formValues => async (dispach, getState) => {
  const GoogleId = getState().auth.userId;
  const response = await schedules.post('/Schedule', {
    ...formValues,
    GoogleId
  });

  dispach({ type: CREATE_SCHEDULE, payload: response.data });
  history.push('/');
};

export const fetchSchedules = googleId => async dispach => {
  const response = await schedules.get('/Schedule?googleId=' + googleId);

  dispach({ type: FETCH_SCHEDULES, payload: response.data });
};

export const fetchSchedule = id => async dispach => {
  const response = await schedules.get('/Schedule/' + id);

  dispach({ type: FETCH_SCHEDULE, payload: response.data });
};

export const editSchedule = (id, formValues) => async (dispach, getState) => {
  const GoogleId = getState().auth.userId;
  const Schedule = { Id: id, GoogleId: GoogleId, ...formValues };
  const response = await schedules.put('/Schedule/', Schedule);

  dispach({ type: EDIT_SCHEDULE, payload: response.data });
  history.push('/');
};

export const deleteSchedule = id => async (dispach, getState) => {
  const GoogleId = getState().auth.userId;
  await schedules.delete('/Schedule/' + id, { data: { GoogleId: GoogleId } });

  dispach({ type: DELETE_SCHEDULE, payload: id });
  history.push('/');
};
