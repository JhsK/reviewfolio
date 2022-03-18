import React from 'react';
import styled from '@emotion/styled';
import Layout from '../Layout';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;

  .title {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1.2rem;
  }

  .body {
    margin-bottom: 0.5rem;
    span {
      margin-right: 1rem;
      opacity: 0.6;
    }
  }
`;

const Footer = () => (
  <>
    <Layout>
      <Container>
        <span className="title">Reviewfolio</span>
        <div className="body">
          <span>임성규</span>
          <span>qwe6293@nate.com</span>
          <span>https://github.com/JhsK</span>
        </div>
        <div className="body">
          <span>Copyright © 2022 Sungkyu All Rights Reserved.</span>
        </div>
      </Container>
    </Layout>
  </>
);

export default Footer;
