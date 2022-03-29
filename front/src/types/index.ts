export interface FormInput {
  birthday: string;
  nickname: string;
  userId: string;
  userName: string;
  userPassword: string;
  rePassword: string;
  career?: number;
}

export interface JoinInput extends FormInput {
  // selectJob: '직무를 선택해주세요' | 'front' | 'back' | 'data' | 'android' | 'ios' | 'devops';
  job: string;
  // position: 'student' | 'programmer';
  position: string;
}

export interface LoginInput {
  userId: string;
  password: string;
}

interface Model {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICurrentUser extends Model {
  userId: string;
  userName: string;
  career?: number;
  birthday: string;
  job: string;
  nickname: string;
  position: string;
  ticket: number;
  point?: number;
  refundPoint?: number;
}

export interface IContextUser {
  data: ICurrentUser;
  isAuthenticate: boolean;
  setData: (param: ICurrentUser) => void;
}

interface IAssociateUser extends Model {
  nickname: string;
  job: string;
}

interface IFile extends Model {
  src: string;
}

export interface IRequestPost extends Model {
  title: string;
  body: string;
  file?: any;
  maxReviewer: number;
  status: 'recurit' | 'ing';
  UserId: number;
  User: IAssociateUser;
  Files: IFile[];
  type: 'portfolio' | 'resume' | 'consulting';
}
