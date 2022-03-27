import { ICurrentUser, JoinInput } from 'src/types';
import { API } from './api.config';

export const postSignUp = (params: JoinInput) => API.post('/user', params);
export const postSignIn = (params) => API.post('/user/login', params);
export const getUser = () => API.get<ICurrentUser>('/user');
export const postLogout = () => API.post('/user/logout');

export const postRequestCreate = (params) => API.post('/post', params);
export const postFilesUpload = async (params: FormData) => {
  const { data } = await API.post<string[]>('/post/files', params);
  return data;
};
export const deleteFileUpload = (params) => API.delete('/post/file', params);
