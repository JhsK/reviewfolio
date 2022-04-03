import styled from '@emotion/styled';
import React from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { StatusContainer } from 'src/components/style';
import useAuth from 'src/hooks/useAuth';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - (185px + 100px));
  display: flex;
  align-items: center;
`;

const ExtendsStatusContainer = styled(StatusContainer)``;

const InfoColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  height: 50px;

  .infoData {
    span:nth-of-type(1) {
      color: rgb(173, 181, 189);
      font-size: 1.2rem;
      margin-right: 3rem;
    }
  }

  button {
    background-color: #fff;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    font-weight: bold;
    padding: 1rem;
    border-radius: 1rem;

    &:hover {
      background-color: rgb(233, 236, 239);
    }
  }
`;

const Info = () => {
  const currentUser = useAuth();
  console.log(currentUser);
  return (
    <>
      <Layout>
        <Header />
      </Layout>
      <Layout bgColor="#f8f9fb">
        <Container>
          <ExtendsStatusContainer>
            <h1>계정 관리</h1>
            <InfoColumn>
              <div className="infoData">
                <span>아이디</span>
                <span>{currentUser.data.userId}</span>
              </div>
              <button>비밀번호 변경</button>
            </InfoColumn>
            <InfoColumn>
              <div className="infoData">
                <span>티켓</span>
                <span>{currentUser.data.ticket}</span>
              </div>
            </InfoColumn>
            <InfoColumn>
              <div className="infoData">
                <span>이름</span>
                <span>{currentUser.data.userName}</span>
              </div>
              <button>내정보 변경</button>
            </InfoColumn>
            <InfoColumn>
              <div className="infoData">
                <span>유형</span>
                <span>{currentUser.data.position}</span>
              </div>
            </InfoColumn>
            <InfoColumn>
              <div className="infoData">
                <span>직종</span>
                <span>{currentUser.data.job}</span>
              </div>
            </InfoColumn>
            <InfoColumn>
              <div className="infoData">
                <span>생년월일</span>
                <span>{currentUser.data.birthday}</span>
              </div>
            </InfoColumn>
            {currentUser.data.position === 'programmer' && (
              <InfoColumn>
                <div className="infoData">
                  <span>경력</span>
                  <span>{currentUser.data.career}</span>
                </div>
              </InfoColumn>
            )}
          </ExtendsStatusContainer>
        </Container>
      </Layout>
      <Footer />
    </>
  );
};

export default Info;
