import React from 'react';
import { useQuery } from 'react-query';
import { getUserRequest } from 'src/api';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { IRequestPost } from 'src/types';
import { StatusBar, StatusContainer, StatusRequests, TopInfo } from '../style';

const RequestStatus = () => {
  const { data } = useQuery('userRequest', getUserRequest);
  const router = useRouter();

  const onClickDetail = (request: IRequestPost) => {
    if (request.status === 'recurit') {
      router.push(`/request/${request.id}`);
    }

    router.push(`/review/${request.Applications[0].id}`);
  };

  console.log(data);

  return (
    <>
      <TopInfo>
        <div>
          <div className="title">
            <span>리뷰 요청 현황을 살펴보세요!</span>
            <span>리뷰가 완전히 끝난 후에도 언제든 다시 확인할 수 있습니다</span>
          </div>
          <span className="subTitle">혹시 리뷰 내용에 문제가 있을경우 문의를 통해 환불 및 조치를 받아보세요!</span>
        </div>
      </TopInfo>
      <StatusContainer>
        <h1>요청 현황</h1>
        <StatusBar>
          <span>작성일</span>
          <span>유형</span>
          <span>리뷰어</span>
          <span>상태</span>
          <span>신청서</span>
        </StatusBar>
        {data &&
          data.map((request) => (
            <StatusRequests>
              <span>{dayjs(request.createdAt).locale('ko').format('YYYY-MM-DD')}</span>
              <span>{request.type}</span>
              <span>{request.maxReviewer}</span>
              <span>{request.status}</span>
              <span onClick={() => onClickDetail(request)}>상세보기</span>
            </StatusRequests>
          ))}
      </StatusContainer>
    </>
  );
};

export default RequestStatus;
