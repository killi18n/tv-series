import axios from 'axios';

export const login = ({email, password}) => axios.post('/api/auth/login', {email, password});
export const register = ({email, password, passwordCheck}) => axios.post('/api/auth/register', {email, password, passwordCheck});
export const check = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');

export const uploadImage = (fd, config) => axios.post('/api/editor/upload', fd, config);
export const filterImage = ({image}) => axios.post('/api/editor/filter', {image});
export const post = ({name, teasers, actors, story, thumbnail, genre, startYear, endYear}) => axios.post('/api/post', {name, teasers, actors, story, thumbnail, genre, startYear, endYear});

export const getTop4Rated = () => axios.get('/api/post/home/top4');
export const getBrand4 = () => axios.get('/api/post/home/brand4');

export const getSeriesById = ({id}) => axios.get(`/api/post/${id}`);

export const getRatingOfItem = ({id}) => axios.get(`/api/rate/rating/${id}`);
export const getRatedList = ({email}) => axios.get(`/api/rate/${email}`);
export const rate = ({postId, what, email}) => axios.post(`/api/rate`, {postId, what, email});

export const getAll = () => axios.get('/api/post');