import axios from 'axios';
import queryString from 'query-string';


export const login = ({email, password}) => axios.post('/api/auth/login', {email, password});
export const register = ({email, password, passwordCheck}) => axios.post('/api/auth/register', {email, password, passwordCheck});
export const check = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');

export const uploadImage = (fd, config) => axios.post('/api/editor/upload', fd, config);
export const filterImage = ({image}) => axios.post('/api/editor/filter', {image});
export const post = ({name, teasers, actors, story, thumbnail, genre, startYear, endYear, firstBroadcasted}) => axios.post('/api/post', {name, teasers, actors, story, thumbnail, genre, startYear, endYear, firstBroadcasted});

export const getTop4Rated = () => axios.get('/api/post/home/top4');
export const getBrand4 = () => axios.get('/api/post/home/brand4');

export const getSeriesById = ({id}) => axios.get(`/api/post/${id}`);

export const getRatingOfItem = ({id}) => axios.get(`/api/rate/rating/${id}`);
export const getRatedList = ({email}) => axios.get(`/api/rate/${email}`);
export const rate = ({postId, what, email}) => axios.post(`/api/rate`, {postId, what, email});

export const getAll = ({page, genre}) => axios.get(`/api/post?${queryString.stringify({page, genre})}`);

export const removePost = ({id}) => axios.delete(`/api/post/${id}`);

export const editPost = ({id, name, teasers, actors, story, thumbnail, genre, startYear, endYear}) => axios.patch(`/api/post/${id}`, {name, teasers, actors, story, thumbnail, genre, startYear, endYear});
export const trash = ({prevServerThumbnailList, willRemoveServerFiles, willRemoveThumbnailFile}) => axios.post(`/api/post/trash/files`, {prevServerThumbnailList, willRemoveServerFiles, willRemoveThumbnailFile});