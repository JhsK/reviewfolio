export interface FormInput {
  birthday: string;
  nickname: string;
  userId: string;
  userName: string;
  userPassword: string;
  rePassword: string;
  career?: number;
  bank?: string;
  accountNumber: number;
}

export interface JoinInput extends FormInput {
  // selectJob: '직무를 선택해주세요' | 'front' | 'back' | 'data' | 'android' | 'ios' | 'devops';
  job: string;
  // position: 'student' | 'programmer';
  position: string;
  image?: string;
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
  position: 'student' | 'programmer' | '';
  ticket: number;
  point?: number;
  refundPoint?: number;
  programmerId?: number;
  checked?: boolean;
}

export interface IContextUser {
  data: ICurrentUser;
  isAuthenticate: boolean;
  setData: (param: any) => void;
  setLogout: () => void;
}

interface IAssociateUser extends Model {
  nickname: string;
  job: string;
}

interface IFile extends Model {
  src: string;
}

export interface IApplication extends Model {
  ProgrammerId: number;
  RequestPostId: number;
  RequestPost?: IRequestPost;
  status: '리뷰 진행중' | '리뷰 종료';
}

export interface IRequestPost extends Model {
  title: string;
  body: string;
  file?: any;
  maxReviewer: number;
  status: 'recurit' | 'ing' | 'end';
  UserId: number;
  User: IAssociateUser;
  Files: IFile[];
  type: 'portfolio' | 'resume' | 'consulting';
  Applications: IApplication[];
}

export interface IComment extends Model {
  content: string;
  RequestPostId: number;
  ApplicationId?: any;
  UserId: number;
  position: string;
  CommentFiles: IFile[];
}
