import { createContext } from 'react';
import { IContextUser, ICurrentUser } from 'src/types';

const ContextUser = createContext<IContextUser>({
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
    checked: true,
  },
  isAuthenticate: false,
  setData: (param: ICurrentUser) => {},
  setLogout: () => {},
});

export default ContextUser;
