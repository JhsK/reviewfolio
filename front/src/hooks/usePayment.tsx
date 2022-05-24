import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUser, postBuyTicket } from 'src/api';
import ContextUser from 'src/store';
import useAuth from './useAuth';

const usePayment = (query) => {
  const currentUser = useContext(ContextUser);
  console.log(query);
  useEffect(() => {
    // redirect url query에 result가 있는지 판별
    if (query.hasOwnProperty('result')) {
      switch (query.result) {
        case 'success':
          (async () => {
            const values = { ...query, nickname: currentUser.data.nickname };
            // 쿼리로 얻은 티켓 결제 정보를 백엔드 서버에 전달
            await postBuyTicket(values);
            const { data } = await getUser();
            currentUser.setData(data); // 백엔드 응답 정보를 클라이언트 사용자 정보에 저장
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

        case 'fail': // 에러처리
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
