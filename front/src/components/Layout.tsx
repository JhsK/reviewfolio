import React from 'react';
import styled from '@emotion/styled';

type LayoutContainer = {
  color?: string;
};

const Container = styled.div<LayoutContainer>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
`;

const SubContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const Layout = ({ children, bgColor = null }) => (
  <Container color={bgColor}>
    <SubContainer>{children}</SubContainer>
  </Container>
);

export default Layout;
