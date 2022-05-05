import styled from '@emotion/styled';
import { Box, Modal } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { postLogout, postRequestSubMallCalculate, putChangePassword } from 'src/api';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { StatusContainer } from 'src/components/style';
import useAuth from 'src/hooks/useAuth';
import Swal from 'sweetalert2';
import { IoCloseOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - (185px + 100px));
  display: flex;
  align-items: center;
`;

export const InfoColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  height: 50px;

  .infoData {
    span:nth-of-type(1) {
      color: rgb(173, 181, 189);
      font-size: 1.2rem;
      margin-right: 3rem;
    }
  }

  button {
    background-color: #fff;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    font-weight: bold;
    padding: 1rem;
    border-radius: 1rem;

    &:hover {
      background-color: rgb(233, 236, 239);
    }
  }
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .inner {
    width: 500px;
    height: 250px;
    background-color: #fff;
    padding: 1rem;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    span {
      font-size: 0.8rem;
      color: red;
    }
  }

  .container {
    width: 100%;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    display: flex;

    label {
      width: 30%;
    }

    input {
      width: 50%;
    }
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
  }
`;

interface IChangePassword {
  password: string;
  repeatPassword: string;
}

const Info = () => {
  const currentUser = useAuth();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IChangePassword>();
  const router = useRouter();

  const onClickChangePassword = () => {
    setOpen(true);
  };

  const onClickModal = () => {
    setOpen(false);
  };

  const onClickUpdateInfo = () => {
    if (currentUser.isAuthenticate) {
      router.push('/user/update/info');
    }
  };

  const onClickCalculate = async () => {
    if (currentUser.data.point < 100000) {
      toast.error('정산할 포인트가 부족합니다', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      Swal.fire({
        title: '10만 포인트가 정산됩니다. 진행을 원하면 버튼을 눌러주세요',
        text: '정산은 2~3일 후에 회원가입때 입력한 계좌로 입금됩니다',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '예',
        cancelButtonText: '아니오',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await postRequestSubMallCalculate({ account: 100000 });
            toast.success('정산에 성공하였습니다', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            router.reload();
          } catch (error) {
            toast.error('정산 기간에 주밀 또는 공휴일이 포함되어 있습니다. 1~3일 후 다시 시도해주세요', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.error(error);
          }
        }
      });
    }
  };

  const onSubmit: SubmitHandler<IChangePassword> = async (data: IChangePassword) => {
    if (data.password !== data.repeatPassword) {
      setError('repeatPassword', { message: '비밀번호가 동일하지 않습니다' }, { shouldFocus: true });
    }
    setOpen(false);

    try {
      await putChangePassword(data);
      Swal.fire({
        icon: 'success',
        title: '비밀번호가 변경되었습니다',
        text: '다시 로그인을 해주세요',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await postLogout();
          router.replace('/');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(currentUser);
  return (
    <>
      <Layout>
        <Header />
      </Layout>
      <Layout bgColor="#f8f9fb">
        <Container>
          <StatusContainer>
            <h1>계정 관리</h1>
            <InfoColumn>
              <div className="infoData">
                <span>아이디</span>
                <span>{currentUser.data.userId}</span>
              </div>
              <button onClick={onClickChangePassword}>비밀번호 변경</button>
            </InfoColumn>
            {currentUser.data.position === 'student' ? (
              <InfoColumn>
                <div className="infoData">
                  <span>티켓</span>
                  <span>{currentUser.data.ticket}</span>
                </div>
              </InfoColumn>
            ) : (
              <InfoColumn>
                <div className="infoData">
                  <span>포인트</span>
                  <span>{currentUser.data.point}</span>
                </div>
                <button onClick={onClickCalculate}>정산하기</button>
              </InfoColumn>
            )}
            <InfoColumn>
              <div className="infoData">
                <span>이름</span>
                <span>{currentUser.data.userName}</span>
              </div>
              <button onClick={onClickUpdateInfo}>내정보 변경</button>
            </InfoColumn>
            <InfoColumn>
              <div className="infoData">
                <span>유형</span>
                <span>{currentUser.data.position}</span>
              </div>
            </InfoColumn>
            <InfoColumn>
              <div className="infoData">
                <span>직종</span>
                <span>{currentUser.data.job}</span>
              </div>
            </InfoColumn>
            <InfoColumn>
              <div className="infoData">
                <span>생년월일</span>
                <span>{currentUser.data.birthday}</span>
              </div>
            </InfoColumn>
            {currentUser.data.position === 'programmer' && (
              <InfoColumn>
                <div className="infoData">
                  <span>경력</span>
                  <span>{`${currentUser.data.career}년차`}</span>
                </div>
              </InfoColumn>
            )}
            <Modal
              open={open}
              onClose={onClickModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalContainer>
                <div className="inner">
                  <div className="top">
                    <h2>비밀번호 변경</h2>
                    <IoCloseOutline onClick={onClickModal} size="1.2rem" />
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                      <label>변경 비밀번호</label>
                      <input {...register('password', { required: '비밀번호를 입력하세요' })} type="password" />
                    </div>
                    <span>{errors?.password?.message}</span>
                    <div className="container">
                      <label>변경 비밀번호 확인</label>
                      <input {...register('repeatPassword', { required: '다시 한번 입력해주세요' })} type="password" />
                    </div>
                    <span>{errors?.repeatPassword?.message}</span>
                    <button type="submit">변경하기</button>
                  </form>
                </div>
              </ModalContainer>
            </Modal>
          </StatusContainer>
        </Container>
      </Layout>
      <Footer />
    </>
  );
};

export default Info;
