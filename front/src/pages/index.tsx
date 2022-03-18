import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import React from 'react';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { Box } from '@mui/system';
import HomeAdvantage from 'src/components/HomeAdvantage';
import { lightTheme } from 'src/theme';
import HomeCompany from 'src/components/HomeCompany';

const Container = styled.div`
  width: 100%;
  height: 600px;

  .mainFlex {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 800px;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.7rem;
    line-height: 2.8rem;
  }

  .subTitle {
    line-height: 1.5rem;
    opacity: 0.5;
    margin-bottom: 1rem;
  }

  .btnContainer {
    display: flex;
  }
`;

const Test = styled.div`
  width: 100%;
  background-color: black;
`;

const Home = () => (
  <>
    <Layout>
      <Header />
      <Container>
        <div className="mainFlex">
          <InfoContainer>
            <div className="title">
              <span>나의 포트폴리오 &#x000B7; 이력서를</span>
              <br />
              <span>첨삭받을 수 있는 기회</span>
            </div>
            <div className="subTitle">
              <span>지금 회원가입시 무료로 첨삭받을 수 있는</span>
              <br />
              <span>티켓 1장을 드립니다</span>
            </div>
            <div className="btnContainer">
              <Box mr={1}>
                <Button size="large" variant="contained">
                  회원가입
                </Button>
              </Box>
              <Button size="large" variant="outlined">
                로그인
              </Button>
            </div>
          </InfoContainer>
          <img src="./image2-removebg-preview.png" alt="info" />
        </div>
      </Container>
    </Layout>
    <HomeAdvantage />
    <HomeCompany />
  </>
);

export default Home;
