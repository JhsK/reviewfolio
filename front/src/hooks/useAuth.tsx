import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getUser } from 'src/api';
import ContextUser from 'src/store';

const useAuth = () => {
  const currentUser = useContext(ContextUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUser();
        currentUser.setData(data);
      } catch (error) {
        console.error(error);
        currentUser.setLogout();
      }
    };
    fetchData();
  }, []);

  return currentUser;
};

export default useAuth;
