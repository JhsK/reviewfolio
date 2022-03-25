import { createContext } from 'react';
import { ICurrentUser } from 'src/types';

const ContextUser = createContext({
  data: {
    id: null,
    userId: '',
    userName: '',
    birthday: '',
    career: null,
    job: '',
    nickname: '',
    position: '',
    ticket: null,
  },
  isAuthenticate: false,
  setData: (param: ICurrentUser) => {},
});

export default ContextUser;
