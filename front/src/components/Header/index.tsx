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
`;

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const MenuContainer = styled.div`
  font-size: 1.1rem;

  a {
    cursor: pointer;
    margin-left: 1rem;
    text-decoration: none;
    outline: none;
    color: #000;

    /* &:link {
      color: #000;
    }
    &:visited {
      color: '#000';
    }
    &:active {
      color: '#000';
    } */
  }
`;

const Header = () => (
  <Container>
    <Logo>Reviewfolio</Logo>
    <MenuContainer>
      <Link href="/request">
        <a>요청하기</a>
      </Link>
      <Link href="/request">
        <a>결제하기</a>
      </Link>
      <Link href="/request">
        <a>마이페이지</a>
      </Link>
    </MenuContainer>
  </Container>
);

export default Header;
