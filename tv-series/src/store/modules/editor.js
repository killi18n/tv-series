import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as api from 'lib/api';
import { pender } from 'redux-pender';  

// action types
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const INITIALIZE_INPUT = 'editor/INITIALIZE_INPUT';
const UPLOAD_IMAGE = 'editor/UPLOAD_IMAGE';
const UPLOAD_IMAGE_THUMBNAIL = 'editor/UPLOAD_IMAGE_THUMBNAIL';
const FILTER_IMAGE = 'editor/FILTER_IMAGE';
const FILTER_THUMBNAIL = 'editor/FILTER_THUMBNAIL';
const FILTER_IMAGE_API = 'editor/FILTER_IMAGE_API';
const SET_PREV_THUMBNAIL = 'editor/SET_PREV_THUMBNAIL';
const POST = 'editor/POST';

// action creator
export const changeInput = createAction(CHANGE_INPUT);
export const initializeInput = createAction(INITIALIZE_INPUT);
export const uploadImage = createAction(UPLOAD_IMAGE, api.uploadImage);
export const uploadImageThumbnail = createAction(UPLOAD_IMAGE_THUMBNAIL, api.uploadImage);
export const filterImage = createAction(FILTER_IMAGE);
export const filterImageApi = createAction(FILTER_IMAGE_API, api.filterImage);
export const setPrevThumbnail = createAction(SET_PREV_THUMBNAIL);
export const filterThumbnail = createAction(FILTER_THUMBNAIL);
export const post = createAction(POST, api.post);

// initial state
const initialState = Map({
    inputs: Map({
        name: '',
        teasername: '',
        videoId: '',
        actorname: '',
        story: '',
        genre: '',
        startYear: '',
        endYear: '',
        firstBroadcasted: ''        
    }),
    storedFiles: List(),
    thumbnailFiles: Map({}),
    prevThumbnail: Map({}),
    postedPost: Map({})
});

// reducer
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['inputs', name], value);
    },
    [INITIALIZE_INPUT]: (state, action) => {
        return state.set('inputs', Map({
            name: '',
            teasername: '',
            videoId: '',
            actorname: '',
            story: '',
            genre: '',
            startYear: '',
            endYear: '',
            firstBroadcasted: ''        
        }))
    },
    ...pender({
        type: UPLOAD_IMAGE,
        onSuccess: (state, action) => {
            const { storedFileName, localFileName } = action.payload.data;
            return state.update('storedFiles', value => value.concat({id: storedFileName, localFileName}));
        }
    }),
    ...pender({
        type: UPLOAD_IMAGE_THUMBNAIL,
        onSuccess: (state, action) => {
            const { storedFileName, localFileName } = action.payload.data;
            return state.set('thumbnailFiles', {
                id: storedFileName,
                localFileName
            });
        }
    }),
    [FILTER_IMAGE]: (state, action) => {
        const { image } = action.payload;
        return state.set('storedFiles', state.get('storedFiles').filter(
            file => file.id !== image
        ));
    },
    [SET_PREV_THUMBNAIL]: (state, action) => {
        return state.set('prevThumbnail', state.get('thumbnailFiles'));

        
    },
    [FILTER_THUMBNAIL]: (state, action) => {
        return state.set('prevThumbnail', Map({}))
                    .set('thumbnailFiles', Map({}));
    },
    ...pender({
        type: POST,
        onSuccess: (state, action) => {
            const { data: post } = action.payload;
            return state.set('postedPost', post);
        }
    })
}, initialState);