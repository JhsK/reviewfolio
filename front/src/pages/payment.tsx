import React from 'react';
import styled from '@emotion/styled';
import Layout from 'src/components/Layout';
import Header from 'src/components/Header';
import { Banner, Hr } from 'src/components/style';
import { IoTicketOutline } from 'react-icons/io5';
import Footer from 'src/components/Footer';

const BannerConainer = styled.div`
  width: 100%;
  height: 250px;
  background-color: #ffe3f1;

  .banner {
    display: flex;
    align-items: center;

    .icon {
      margin-bottom: 1rem;
      margin-left: 1.5rem;
      display: flex;
      align-items: center;

      span {
        font-size: 2rem;
        margin-left: 0.5rem;
      }
    }
  }
`;

const CardContainer = styled.div`
  padding: 3rem 0;
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Card = styled.div`
  position: relative;
  padding: 1rem 0;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: pointer;

  .stepper {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      margin-top: 1rem;
    }
  }

  .info {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    text-align: right;
    height: 45px;
    padding-top: 0.5rem;
    padding-right: 1rem;
  }
`;

const Payment = () => (
  <>
    <Layout>
      <Header />
    </Layout>
    <BannerConainer>
      <Banner>
        <div className="banner">
          <h1>사용가능한 티켓</h1>
          <div className="icon">
            <IoTicketOutline size="2.5rem" />
            <span>x 3</span>
          </div>
        </div>
        <span>원하는 상품을 결제하여 서비스를 이용하실 수 있습니다</span>
      </Banner>
    </BannerConainer>
    <Layout>
      <CardContainer>
        <Card>
          <div className="stepper">
            <IoTicketOutline size="7rem" />
            <span>수량: 1개</span>
          </div>
          <div className="info">
            <span>30,000원</span>
          </div>
        </Card>
        <Card>
          <div className="stepper">
            <IoTicketOutline size="7rem" />
            <span>수량: 5개</span>
          </div>
          <div className="info">
            <span>120,000원</span>
          </div>
        </Card>
        <Card>
          <div className="stepper">
            <IoTicketOutline size="7rem" />
            <span>수량: 10개</span>
          </div>
          <div className="info">
            <span>250,000원</span>
          </div>
        </Card>
      </CardContainer>
    </Layout>
    <Hr />
    <Footer />
  </>
);

export default Payment;
