import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import * as api from 'lib/api';
import { pender } from 'redux-pender';
import storage from 'lib/storage';

// action types
const LOGIN = 'auth/LOGIN';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_INPUTS = 'auth/INITIALIZE';
const REGISTER = 'auth/REGISTER';
const SET_LOGGED_INFO = 'auth/SET_LOGGED_INFO';
const SET_IS_AUTH_CHECKING = 'auth/SET_IS_AUTH_CHECKING';
const CHECK = 'auth/CHECK';
const LOGOUT = 'auth/LOGOUT';

// action creator
export const login = createAction(LOGIN, api.login);
export const changeInput = createAction(CHANGE_INPUT);
export const initializeInputs = createAction(INITIALIZE_INPUTS);
export const register = createAction(REGISTER, api.register);
export const setLoggedInfo = createAction(SET_LOGGED_INFO);
export const setIsAuthChecking = createAction(
  SET_IS_AUTH_CHECKING,
  isAuthChecking => isAuthChecking
);
export const check = createAction(CHECK, api.check);
export const logout = createAction(LOGOUT, api.logout);

// initial state
const initialState = Map({
  email: '',
  password: '',
  passwordCheck: '',
  logged: false,
  error: '',
  loggedInfo: '',
  admin: false,
  isAuthChecking: true,
});

// reducer
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(name, value);
    },
    ...pender({
      type: LOGIN,
      onSuccess: (state, action) => {
        const { email, isAdmin } = action.payload.data;
        storage.set('loggedInfo', email);
        return state.set('logged', true).set('admin', isAdmin);
      },
      onError: state => {
        return state.set('error', '잘못된 로그인 입니다.');
      },
    }),
    [INITIALIZE_INPUTS]: state => {
      return state
        .set('email', '')
        .set('password', '')
        .set('passwordCheck', '')
        .set('error', '');
    },
    [SET_LOGGED_INFO]: (state, action) => {
      const { loggedInfo } = action.payload;
      return state.set('loggedInfo', loggedInfo).set('logged', true);
    },
    [SET_IS_AUTH_CHECKING]: (state, action) => {
      const isAuthChecking = action.payload;
      return state.set('isAuthChecking', isAuthChecking);
    },
    ...pender({
      type: CHECK,
      onSuccess: (state, action) => {
        const { data: user } = action.payload;
        return state.set('admin', user.admin).set('isAuthChecking', false);
      },
    }),
    ...pender({
      type: REGISTER,
      onSuccess: (state, action) => {
        const { email: registeredEmail, isAdmin } = action.payload.data;
        storage.set('loggedInfo', registeredEmail);
        return state.set('logged', true).set('admin', isAdmin);
      },
    }),
    ...pender({
      type: LOGOUT,
      onSuccess: state => {
        storage.remove('loggedInfo');
        return state.set('logged', false).set('admin', false);
      },
    }),
  },
  initialState
);
