import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { getUserApplication } from 'src/api';
import useAuth from 'src/hooks/useAuth';
import { IApplication } from 'src/types';
import { StatusBar, StatusContainer, StatusRequests, TopInfo } from '../style';

const ApplicationStatus = () => {
  const currentUser = useAuth();
  const router = useRouter();
  const { data } = useQuery(['applicationList'], () => getUserApplication(currentUser.data.programmerId));

  const onClickDetail = (application: IApplication) => {
    router.push(`/review/${application.RequestPostId}`);
  };

  return (
    <>
      <TopInfo>
        <div>
          <div className="title">
            <span>리뷰 신청 현황을 살펴보세요!</span>
            <span>리뷰가 완전히 끝나면 포인트를 적립할 수 있습니다</span>
          </div>
          <span className="subTitle">선배 개발자의 따뜻한 조언과 격려로 후배 개발자들에게 힘이 되어 주세요!</span>
        </div>
      </TopInfo>
      <StatusContainer>
        <h1>신청 현황</h1>
        <StatusBar>
          <span>신청일</span>
          <span>유형</span>
          <span>리뷰어</span>
          <span>상태</span>
          <span>신청서</span>
        </StatusBar>
        {data &&
          data.map((application) => (
            <StatusRequests>
              <span>{dayjs(application.createdAt).locale('ko').format('YYYY-MM-DD')}</span>
              <span>{application?.RequestPost.type}</span>
              <span>{application?.RequestPost.maxReviewer}</span>
              <span>{application?.RequestPost.status}</span>
              <span onClick={() => onClickDetail(application)}>
                {application?.RequestPost.status === 'recurit' ? '상세보기' : '리뷰작성'}
              </span>
            </StatusRequests>
          ))}
      </StatusContainer>
    </>
  );
};

export default ApplicationStatus;
