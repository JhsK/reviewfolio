import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { postLogout } from 'src/api';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import HomeAdvantage from 'src/components/HomeAdvantage';
import HomeCompany from 'src/components/HomeCompany';
import Layout from 'src/components/Layout';
import { Hr } from 'src/components/style';
import useAuth from 'src/hooks/useAuth';
import usePayment from 'src/hooks/usePayment';
import Swal from 'sweetalert2';

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

const Home = () => {
  const router = useRouter();
  const currentUser = useAuth();
  usePayment(router.query);

  useEffect(() => {
    if (!currentUser.data.checked) {
      Swal.fire({
        title: '현업자 검증이 되지 않았습니다',
        text: '2~3일 정도 소요됩니다',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인',
      }).then(async (result) => {
        try {
          await postLogout();
          router.reload();
        } catch (error) {
          console.error(error);
        }
      });
    }
  }, [currentUser.data]);

  const onClickLogout = async () => {
    try {
      await postLogout();
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(currentUser);
  return (
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
              {!currentUser.isAuthenticate && (
                <div className="btnContainer">
                  <Box mr={1}>
                    <Button size="large" onClick={() => router.push('/user/sign_up')} variant="contained">
                      회원가입
                    </Button>
                  </Box>
                  <Button size="large" onClick={() => router.push('/user/sign_in')} variant="outlined">
                    로그인
                  </Button>
                </div>
              )}
              {currentUser.isAuthenticate && (
                <Button size="large" onClick={onClickLogout} variant="contained">
                  로그아웃
                </Button>
              )}
            </InfoContainer>
            {/* <img src="./image2-removebg-preview.png" alt="info" /> */}
            <img src="./main.jpeg" alt="info" />
          </div>
        </Container>
      </Layout>
      <HomeAdvantage />
      <HomeCompany />
      <Hr />
      <Footer />
    </>
  );
};
export default Home;
