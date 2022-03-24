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
  selectJob: string;
  // position: 'student' | 'programmer';
  position: string;
}
