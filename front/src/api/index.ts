import { JoinInput } from 'src/types';
import { API } from './api.config';

export const postSignUp = (params: JoinInput) => API.post('/user', params);
export const postSignIn = (params) => API.post('/user/login', params);
