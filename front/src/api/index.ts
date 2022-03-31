import { IApplication, IComment, ICurrentUser, IRequestPost, JoinInput } from 'src/types';
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
export const getPostsList = async () => {
  const { data } = await API.get<IRequestPost[]>('/post');
  return data;
};
export const getPostDetail = async (id: string) => {
  const { data } = await API.get<IRequestPost>(`/post/${id}`);
  return data;
};
export const getUserRequest = async () => {
  const { data } = await API.get<IRequestPost[]>('/post/user/request');
  return data;
};
export const getUserApplication = async (id: number) => {
  const { data } = await API.get<IApplication[]>(`/application/user/${id}`);
  return data;
};

export const postApplication = (params) => API.post('/application', params);
export const getApplicant = async (id: string) => {
  const { data } = await API.get<IApplication[]>(`/application/${id}`);
  return data;
};

export const postComment = (params) => API.post('/comment', params);
export const getComment = async (id: string) => {
  const { data } = await API.get<IComment[]>(`/comment/${id}`);
  return data;
};
