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
const SET_SERVER_FILES = 'editor/SET_SERVER_FILES';
const SET_THUMBNAIL_FILE = 'editor/SET_THUMBNAIL_FILE';
const FILTER_SERVER_FILES = 'editor/FILTER_SERVER_FILES';
const FILTER_SERVER_THUMBNAIL = 'editor/FILTER_SERVER_THUMBNAIL';
const ADD_SERVER_FILES = 'editor/ADD_SERVER_FILES';
const ADD_SERVER_THUMBNAIL = 'editor/ADD_SERVER_THUMBNAIL';
const SET_PREV_SERVER_THUMBNAIL = 'editor/SET_PREV_SERVER_THUMBNAIL';
const SET_PREV_SERVER_THUMBNAIL_LIST = 'editor/SET_PREV_SERVER_THUMBNAIL_LIST';
const SET_SERVER_INPUTS = 'editor/SET_SERVER_INPUTS';

// action creator
export const changeInput = createAction(CHANGE_INPUT);
export const initializeInput = createAction(INITIALIZE_INPUT);
export const uploadImage = createAction(UPLOAD_IMAGE, api.uploadImage);
export const uploadImageThumbnail = createAction(
  UPLOAD_IMAGE_THUMBNAIL,
  api.uploadImage
);
export const filterImage = createAction(FILTER_IMAGE);
export const filterImageApi = createAction(FILTER_IMAGE_API, api.filterImage);
export const setPrevThumbnail = createAction(SET_PREV_THUMBNAIL);
export const filterThumbnail = createAction(FILTER_THUMBNAIL);
export const post = createAction(POST, api.post);
export const setServerFiles = createAction(SET_SERVER_FILES);
export const setThumbnailFile = createAction(SET_THUMBNAIL_FILE);
export const filterServerFiles = createAction(FILTER_SERVER_FILES);
export const filterServerThumbnail = createAction(FILTER_SERVER_THUMBNAIL);
export const addServerFiles = createAction(ADD_SERVER_FILES, api.uploadImage);
export const addServerThumbnail = createAction(
  ADD_SERVER_THUMBNAIL,
  api.uploadImage
);
export const setPrevServerThumbnail = createAction(SET_PREV_SERVER_THUMBNAIL);
export const setPrevServerThumbnailList = createAction(
  SET_PREV_SERVER_THUMBNAIL_LIST
);
export const setServerInputs = createAction(SET_SERVER_INPUTS);

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
    firstBroadcasted: '',
  }),
  storedFiles: List(),
  thumbnailFiles: Map({}),
  prevThumbnail: Map({}),
  postedPost: Map({}),
  serverFiles: List(),
  serverThumbnail: Map({}),
  willRemoveServerFiles: List(),
  willRemoveThumbnailFile: '',
  prevServerThumbnail: Map({}),
  prevServerThumbnailList: List(),
});

// reducer
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['inputs', name], value);
    },
    [INITIALIZE_INPUT]: () => initialState,
    ...pender({
      type: UPLOAD_IMAGE,
      onSuccess: (state, action) => {
        const { storedFileName, localFileName } = action.payload.data;
        return state.update('storedFiles', value =>
          value.concat({ id: storedFileName, localFileName })
        );
      },
    }),
    ...pender({
      type: UPLOAD_IMAGE_THUMBNAIL,
      onSuccess: (state, action) => {
        const { storedFileName, localFileName } = action.payload.data;
        return state.set('thumbnailFiles', {
          id: storedFileName,
          localFileName,
        });
      },
    }),
    [FILTER_IMAGE]: (state, action) => {
      const { image } = action.payload;
      return state.set(
        'storedFiles',
        state.get('storedFiles').filter(file => file.id !== image)
      );
    },
    [SET_PREV_THUMBNAIL]: state => {
      return state.set('prevThumbnail', state.get('thumbnailFiles'));
    },
    [SET_PREV_SERVER_THUMBNAIL]: state => {
      return state.set('prevServerThumbnail', state.get('serverThumbnail'));
    },
    [SET_PREV_SERVER_THUMBNAIL_LIST]: state => {
      return state.update('prevServerThumbnailList', value =>
        value.concat(state.get('prevServerThumbnail'))
      );
    },
    [FILTER_THUMBNAIL]: state => {
      return state.set('prevThumbnail', Map({})).set('thumbnailFiles', Map({}));
    },
    ...pender({
      type: POST,
      onSuccess: (state, action) => {
        const { data: postData } = action.payload;
        return state.set('postedPost', postData);
      },
    }),
    [SET_SERVER_FILES]: (state, action) => {
      const { files } = action.payload;
      return state.set('serverFiles', files);
    },
    [SET_THUMBNAIL_FILE]: (state, action) => {
      const { thumbnail } = action.payload;
      return state.set('serverThumbnail', thumbnail);
    },
    [FILTER_SERVER_FILES]: (state, action) => {
      const { removed } = action.payload;
      if (state.get('willRemoveServerFiles').includes(removed)) {
        return state.set(
          'willRemoveServerFiles',
          state.get('willRemoveServerFiles')
        );
      }

      const filtered = state.get('serverFiles').filter(file => {
        return file.id !== removed;
      });

      return state
        .set('serverFiles', filtered)
        .update('willRemoveServerFiles', value => value.concat(removed));
    },
    [FILTER_SERVER_THUMBNAIL]: (state, action) => {
      const { removed } = action.payload;
      return state
        .set('willRemoveThumbnailFile', removed)
        .set('serverThumbnail', Map({}));
    },
    ...pender({
      type: ADD_SERVER_FILES,
      onSuccess: (state, action) => {
        const { storedFileName, localFileName } = action.payload.data;
        return state.update('serverFiles', value =>
          value.concat({ id: storedFileName, localFileName })
        );
      },
    }),
    ...pender({
      type: ADD_SERVER_THUMBNAIL,
      onSuccess: (state, action) => {
        const { storedFileName, localFileName } = action.payload.data;
        return state.set('serverThumbnail', {
          id: storedFileName,
          localFileName,
        });
      },
    }),
    [SET_SERVER_INPUTS]: (state, action) => {
      const { serverSeries } = action.payload;
      const {
        actors,
        endYear,
        genre,
        name,
        startYear,
        story,
        teasers,
        firstBroadcasted,
      } = serverSeries;
      const actornameArr = actors.map(actor => {
        return actor.name;
      });

      const videoIdArr = teasers.map(teaser => {
        return teaser.videoId;
      });

      const teasernameArr = teasers.map(teaser => {
        return teaser.name;
      });

      return state
        .setIn(['inputs', 'name'], name)
        .setIn(['inputs', 'teasername'], teasernameArr.join(', '))
        .setIn(['inputs', 'videoId'], videoIdArr.join(', '))
        .setIn(['inputs', 'actorname'], actornameArr.join(', '))
        .setIn(['inputs', 'story'], story)
        .setIn(['inputs', 'genre'], genre.join(', '))
        .setIn(['inputs', 'startYear'], startYear)
        .setIn(['inputs', 'endYear'], endYear)
        .setIn(['inputs', 'firstBroadcasted'], firstBroadcasted);
    },
  },
  initialState
);
