import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Layout from '../Layout';

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

const Header = () => (
  <Container>
    <Logo>
      <Link href="/">
        <a>Reviewfolio</a>
      </Link>
    </Logo>
    <MenuContainer>
      <Link href="/request">
        <a>요청하기</a>
      </Link>
      <Link href="/payment">
        <a>결제하기</a>
      </Link>
      <Link href="/user/mypage">
        <a>마이페이지</a>
      </Link>
    </MenuContainer>
  </Container>
);

export default Header;
