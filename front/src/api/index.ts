import { IApplication, IComment, ICurrentUser, IRequestPost, JoinInput } from 'src/types';
import { API } from './api.config';

export const postSignUp = (params: JoinInput) => API.post('/user', params);
export const postSignIn = (params) => API.post('/user/login', params);
export const getUser = () => API.get<ICurrentUser>('/user');
export const postLogout = () => API.post('/user/logout');

export const postImage = async (params: FormData) => {
  const { data } = await API.post<string>('/user/image', params);
  return data;
};

export const postRequestCreate = (params) => API.post('/post', params);
export const putRequestUpdate = (params) => API.put('/post', params);
export const deleteRequesDelete = (id: string) => API.delete(`/post/${id}`);
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
export const getComment = async (id: string, applicationId: number) => {
  const { data } = await API.get<IComment[]>(`/comment?postId=${id}&applicationId=${applicationId}`);
  return data;
};

export const putEndReview = (params) => API.put('/application', params);

export const postBuyTicket = (params) => API.post('/order', params);

export const putChangePassword = (params) => API.put('/user/change-password', params);
export const putChangeInfo = (params) => API.put('/user/change-info', params);

export const postRequestSubMallCalculate = (params) => API.post('/submall/calculate', params);
