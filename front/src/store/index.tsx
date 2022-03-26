import { createContext } from 'react';
import { ICurrentUser } from 'src/types';

const ContextUser = createContext({
  data: {
    id: 0,
    userId: '',
    userName: '',
    birthday: '',
    career: 0,
    job: '',
    nickname: '',
    position: '',
    ticket: 0,
    point: 0,
    refundPoint: 0,
  },
  isAuthenticate: false,
  setData: (param: ICurrentUser) => {},
});

export default ContextUser;
