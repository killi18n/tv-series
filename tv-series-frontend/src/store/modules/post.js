import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import * as api from 'lib/api';

// action types
const REMOVE_POST = 'post/REMOVE_POST';
const EDIT_POST = 'post/EDIT_POST';
const TRASH = 'post/TRASH';

// action creator
export const removePost = createAction(REMOVE_POST, api.removePost);
export const editPost = createAction(EDIT_POST, api.editPost);
export const trash = createAction(TRASH, api.trash);

// initial state
const initialState = Map({});

// reducer
export default handleActions({}, initialState);
