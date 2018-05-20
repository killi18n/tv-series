import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as api from 'lib/api';
import { pender } from 'redux-pender'; 
import storage from 'lib/storage';


// action types
const LOGIN = 'auth/LOGIN';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_INPUTS = 'auth/INITIALIZE';
const REGISTER = 'auth/REGISTER';
const SET_LOGGED_INFO = 'auth/SET_LOGGED_INFO';
const CHECK = 'auth/CHECK';
const LOGOUT = 'auth/LOGOUT';

// action creator
export const login = createAction(LOGIN, api.login);
export const changeInput = createAction(CHANGE_INPUT);
export const initializeInputs = createAction(INITIALIZE_INPUTS);
export const register = createAction(REGISTER, api.register);
export const setLoggedInfo = createAction(SET_LOGGED_INFO);
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
    admin: false
});

// reducer
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: LOGIN, 
        onSuccess: (state, action) => {
            const { email, admin } = action.payload.data;
            storage.set('loggedInfo', email);
            return state.set('logged', true)
                        .set('admin', admin);
        },
        onError: (state, action) => {
            return state.set('error', '잘못된 로그인 입니다.');
        }   
    }),
    [INITIALIZE_INPUTS]: (state, action) => {
        return state.set('email', '')
                    .set('password', '')
                    .set('passwordCheck', '')
                    .set('error', '');
    },
    [SET_LOGGED_INFO]: (state, action) => {
        const { loggedInfo } = action.payload;
        return state.set('loggedInfo', loggedInfo)
                    .set('logged', true);
    },
    ...pender({
        type: CHECK,
        onSuccess: (state, action) => {
            const { data: user } = action.payload;
            return state.set('admin', user.admin);
        }
    })
}, initialState);