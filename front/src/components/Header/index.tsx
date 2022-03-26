import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import useAuth from 'src/hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import Layout from '../Layout';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  color: ${(props) => props.theme.PUBLIC_BLACK};

  a {
    cursor: pointer;
    text-decoration: none;
    outline: none;
    color: #000;
  }
`;

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const MenuContainer = styled.div`
  font-size: 1.1rem;

  a {
    margin-left: 1rem;
  }
`;

const Header = () => {
  const currentUser = useAuth();

  const NotLoggedInClick = () =>
    toast.warn('로그인이 필요합니다', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <ToastContainer />
      <Container>
        <Logo>
          <Link href="/">
            <a>Reviewfolio</a>
          </Link>
        </Logo>
        <MenuContainer>
          {currentUser.isAuthenticate ? (
            <>
              {currentUser.data.position === 'programmer' ? (
                <Link href="/list">
                  <a>신청하기</a>
                </Link>
              ) : (
                <Link href="/request">
                  <a>요청하기</a>
                </Link>
              )}
              <Link href="/payment">
                <a>결제하기</a>
              </Link>
              <Link href="/user/mypage">
                <a>마이페이지</a>
              </Link>
            </>
          ) : (
            <>
              <a onClick={NotLoggedInClick}>요청하기</a>
              <a onClick={NotLoggedInClick}>결제하기</a>
              <a onClick={NotLoggedInClick}>마이페이지</a>
            </>
          )}
        </MenuContainer>
      </Container>
    </>
  );
};

export default Header;
