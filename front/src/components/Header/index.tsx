import React from 'react';
import styled from '@emotion/styled';
import Layout from '../Layout';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
`;

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const MenuContainer = styled.div`
  font-size: 1.1rem;

  span {
    margin-left: 1rem;
  }
`;

const Header = () => (
  <Layout>
    <Container>
      <Logo>Reviewfolio</Logo>
      <MenuContainer>
        <span>요청하기</span>
        <span>결제하기</span>
        <span>마이페이지</span>
      </MenuContainer>
    </Container>
  </Layout>
);

export default Header;
