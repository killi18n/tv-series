import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as api from 'lib/api';
import { pender } from 'redux-pender'; 
import storage from 'lib/storage';


// action types
const LOGIN = 'auth/LOGIN';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';

// action creator
export const login = createAction(LOGIN, api.login);
export const changeInput = createAction(CHANGE_INPUT);

// initial state
const initialState = Map({
    username: '',
    password: '',
    passwordCheck: '',
    logged: false
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
            const { email } = action.payload.data;
            storage.set('loggedInfo', email);
            return state.set('logged', true);
        }   
    })
}, initialState);