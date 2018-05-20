import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as api from 'lib/api';
import { pender } from 'redux-pender';

// action types
const GET_TOP4_RATED = 'list/GET_TOP4_RATED';
const GET_BRAND4 = 'list/GET_BRAND4';
const GET_SERIES_BY_ID = 'list/GET_SERIES_BY_ID';
const GET_ALL = 'list/GET_ALL';
const INITIALIZE_SERIES = 'list/INITIALIZE_SERIES';

// action creator
export const getTop4Rated = createAction(GET_TOP4_RATED, api.getTop4Rated);
export const getBrand4 = createAction(GET_BRAND4, api.getBrand4);
export const getSeriesById = createAction(GET_SERIES_BY_ID, api.getSeriesById);
export const getAll = createAction(GET_ALL, api.getAll);
export const initializeSeries = createAction(INITIALIZE_SERIES);

// initial state
const initialState = Map({
    top4: List(),
    brand4: List(),
    series: Map({}),
    all: List(),
    lastPage: null
});

// reducer
export default handleActions({
    [INITIALIZE_SERIES]: (state, action) => {
        return state.set('series', Map({}));
    },
    ...pender({
        type: GET_TOP4_RATED,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            return state.set('top4', fromJS(list));
        }
    }),
    ...pender({
        type: GET_BRAND4,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            return state.set('brand4', fromJS(list));
        }
    }),
    ...pender({
        type: GET_SERIES_BY_ID,
        onSuccess: (state, action) => {
            const { data: series } = action.payload;
            return state.set('series', series);
        }
    }),
    ...pender({
        type: GET_ALL,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            const lastPage = action.payload.headers['last-page'];
            return state.set('all', fromJS(list))
                        .set('lastPage', lastPage);
        }
    })
}, initialState);