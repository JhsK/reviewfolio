import React, { useState } from 'react';
import { ICurrentUser } from 'src/types';
import ContextUser from '.';

const ContextProvider = (props) => {
  const setData = (values) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setState((prevState) => ({
      ...prevState,
      data: values,
      isAuthenticate: true,
    }));
  };

  const initialState = {
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
    setData,
  };

  const [state, setState] = useState(initialState);
  return <ContextUser.Provider value={state}>{props.children}</ContextUser.Provider>;
};

export default ContextProvider;
