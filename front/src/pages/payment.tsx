import styled from '@emotion/styled';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import dayjs from 'dayjs';
import React from 'react';
import { IoTicketOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { Banner, Hr } from 'src/components/style';
import useAuth from 'src/hooks/useAuth';

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

const Payment = () => {
  const currentUser = useAuth();
  const clientKey = 'test_ck_OyL0qZ4G1VOD5zXnndMroWb2MQYg'; // 토스에서 발급받은 키

  const onClickTicket = async (amount: number, num: number) => {
    const tossPayments = await loadTossPayments(clientKey);
    // toss javascript sdk를 이용하여 결제 모듈 요청 및 에러처리
    await tossPayments
      .requestPayment('카드', {
        amount,
        orderId: dayjs().locale('ko').format('YYYYMMDDHHmmss') + String(currentUser.data.id),
        orderName: '리뷰 티켓',
        customerName: currentUser.data.nickname,
        successUrl: `${window.location.origin}?result=success&num=${num}`,
        failUrl: `${window.location.origin}?result=fail`,
      })
      .catch((error) => {
        if (error.code === 'USER_CANCEL') {
          toast.error('결제창이 닫혔습니다. 다시 시도해 주세요', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else
          toast.error('알 수 없는 오류입니다', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      });
  };

  return (
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
              <span>{`x ${currentUser.data?.ticket}`}</span>
            </div>
          </div>
          <span>원하는 상품을 결제하여 서비스를 이용하실 수 있습니다</span>
        </Banner>
      </BannerConainer>
      <Layout>
        <CardContainer>
          <Card onClick={() => onClickTicket(30000, 1)}>
            <div className="stepper">
              <IoTicketOutline size="7rem" />
              <span>수량: 1개</span>
            </div>
            <div className="info">
              <span>30,000원</span>
            </div>
          </Card>
          <Card onClick={() => onClickTicket(120000, 5)}>
            <div className="stepper">
              <IoTicketOutline size="7rem" />
              <span>수량: 5개</span>
            </div>
            <div className="info">
              <span>120,000원</span>
            </div>
          </Card>
          <Card onClick={() => onClickTicket(250000, 10)}>
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
};

export default Payment;
