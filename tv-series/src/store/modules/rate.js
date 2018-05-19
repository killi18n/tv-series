import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as api from 'lib/api';
import { pender } from 'redux-pender';

// action types
const GET_RATING_OF_ITEM = 'rate/GET_RATING_OF_ITEM';
const GET_RATED_LIST = 'rate/GET_RATED_LIST';
const RATE = 'rate/RATE';
const SET_SELECTED = 'rate/SET_SELECTED';

// action creator
export const getRatingOfItem = createAction(GET_RATING_OF_ITEM, api.getRatingOfItem);
export const getRatedList = createAction(GET_RATED_LIST, api.getRatedList);
export const rate = createAction(RATE, api.rate);
export const setSelected = createAction(SET_SELECTED);

// initial state
const initialState = Map({
    rating: Map({}),
    hit: null,
    good: null,
    bad: null,
    rated: List(),
    selected: false,
    liked: false,
    hated: false
});

// reducer
export default handleActions({
    ...pender({
        type: GET_RATING_OF_ITEM,
        onSuccess: (state, action) => {
            const { hit, good, bad } = action.payload.data;
            return state.set('hit', hit)
                .set('good', good)
                .set('bad', bad);
        }
    }),
    ...pender({
        type: GET_RATED_LIST,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;

            return state.set('rated', fromJS(list));
        }
    }),
    [SET_SELECTED]: (state, action) => {
        const { what } = action.payload;
        if (what === true) {
            return state.set('selected', true)
                .set('liked', true)
                .set('hated', false);
        }
        return state.set('selected', true)
            .set('hated', true)
            .set('liked', false);

    }
}, initialState);