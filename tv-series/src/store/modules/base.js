import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';

// action types
const SHOW_SIDE_BAR = 'base/SHOW_SIDE_BAR';
const HIDE_SIDE_BAR = 'base/HIDE_SIDE_BAR';

// action creator
export const showSideBar = createAction(SHOW_SIDE_BAR);
export const hideSideBar = createAction(HIDE_SIDE_BAR);

// initial state
const initialState = Map({
    sideBarVisible: false
});

// reducer
export default handleActions({
    [SHOW_SIDE_BAR]: (state, action) => {
        return state.set('sideBarVisible', true);
    },
    [HIDE_SIDE_BAR]: (state, action) => {
        return state.set('sideBarVisible', false);
    }
}, initialState);