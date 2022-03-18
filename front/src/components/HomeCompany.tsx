import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  padding-bottom: 1rem;

  span {
    font-size: 2rem;
    font-weight: bold;
  }

  img {
    width: 45%;
  }
`;

const HomeCompany = () => (
  <Container>
    <span>유망한 회사의 선배들에게 도움을 받을 수 있습니다.</span>
    <img src="./company.png" alt="company" />
  </Container>
);

export default HomeCompany;
