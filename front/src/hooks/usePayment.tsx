import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { postBuyTicket } from 'src/api';
import useAuth from './useAuth';

const usePayment = (query) => {
  const currentUser = useAuth();
  console.log(query);
  useEffect(() => {
    if (query.hasOwnProperty('result')) {
      switch (query.result) {
        case 'success':
          (async () => {
            const values = { ...query, nickname: currentUser.data.nickname };
            await postBuyTicket(values);
            window.history.replaceState({}, document.title, '/');
            toast.success('결제에 성공했습니다', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })();
          break;

        case 'fail':
          (async () => {
            toast.error(query.message, {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            window.history.replaceState({}, document.title, '/');
          })();
          break;
        default:
          throw new Error('예상치 못한 오류가 발생하였습니다');
      }
    }
  }, [query]);
};

export default usePayment;
