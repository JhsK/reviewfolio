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
  createdAt: string;
  updatedAt: string;
}

export interface ICurrentUser extends Model {
  userId: string;
  userName: string;
  career: number;
  birthday: null | string;
  job: string;
  nickname: string;
  position: string;
  ticket: null | number;
}
