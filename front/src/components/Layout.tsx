import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const Layout = ({ children }) => <Container>{children}</Container>;

export default Layout;
