import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getApplicant, getComment, putEndReview } from 'src/api';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import CommentForm from 'src/components/Review/Form';
import useAuth from 'src/hooks/useAuth';
import { IApplication } from 'src/types';
import Swal from 'sweetalert2';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  .statusContainer {
    display: flex;
    align-items: center;

    .post {
      display: flex;
      align-items: center;
      cursor: pointer;

      svg {
        opacity: 0.5;
        padding-bottom: 0.1rem;
      }
    }

    button {
      background-color: #fff;
      border: none;
      font-size: 1rem;
      cursor: pointer;
    }
  }
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 0;

  .applicantTab {
    width: 50px;
    height: 50px;
    border-radius: 200px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fb;
    cursor: pointer;
    margin-right: 1rem;
  }
`;

const BubbleLeft = styled.div`
  position: relative;
  padding: 1rem;
  max-width: 50%;
  background: #f8f9fb;
  border-radius: 10px;

  span {
    position: relative;
    z-index: 999;
  }

  &:after {
    border-top: 15px solid #f8f9fb;
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 20px;
    left: -15px;
  }
`;

const BubbleRight = styled(BubbleLeft)`
  background-color: #7fd1ae;
  &:after {
    border-top: 15px solid #7fd1ae;
    border-left: 0px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 0px solid transparent;
    right: -15px;
    left: 0;
  }
`;

const OtherContainer = styled.div`
  width: 100%;
  display: flex;
  padding-left: 1rem;
  margin-bottom: 1rem;
`;

const MeContainer = styled(OtherContainer)`
  justify-content: flex-end;
  padding-right: 1rem;
  padding-left: 0;
`;

const Review = () => {
  const router = useRouter();
  const { id } = router.query;
  const currentUser = useAuth();
  const queryClient = useQueryClient();
  const reviewStatusMutation = useMutation(putEndReview);
  const [activeApplicant, setActiveApplicant] = useState<IApplication>(null);

  const { data: applicant } = useQuery(['applicant'], () => getApplicant(id as string), {
    onSuccess: (data) => setActiveApplicant(data[0]),
  });
  const { data: chatList } = useQuery(['chatList', activeApplicant?.ProgrammerId], () =>
    getComment(id as string, activeApplicant?.ProgrammerId),
  );

  const onClickReviewEnd = () => {
    Swal.fire({
      title: '정말 리뷰를 종료하시겠습니까?',
      text: '리뷰 종료 후에는 상태를 바꿀 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          reviewStatusMutation.mutate(
            { applicationId: activeApplicant.ProgrammerId, programmerId: currentUser.data.programmerId },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(['applicant']);
              },
            },
          );
          Swal.fire('리뷰가 종료되었습니다', '포린트 15000원이 적립되었습니다', 'success');
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const statusInputForm = useCallback(() => {
    if (currentUser.data?.position === 'student') {
      return <span>{`[${activeApplicant?.status}]`}</span>;
    }
    if (activeApplicant?.status === '리뷰 진행중') return <button onClick={onClickReviewEnd}>리뷰 종료하기</button>;
    return <span>[리뷰 종료]</span>;
  }, [activeApplicant]);

  console.log(applicant);

  return (
    <Layout>
      <Header />
      <Container>
        <TopContainer>
          {currentUser.data?.position === 'student' && (
            <TabContainer>
              {applicant &&
                applicant.map((v, i) => (
                  <div
                    className="applicantTab"
                    style={{
                      borderColor: `${
                        v.ProgrammerId === activeApplicant?.ProgrammerId ? 'green' : 'rgba(0, 0, 0, 0.2)'
                      }`,
                    }}
                    key={v.id}
                    onClick={() => setActiveApplicant(v)}
                  >
                    {i + 1}
                  </div>
                ))}
            </TabContainer>
          )}
          <div className="statusContainer">
            <div className="post" onClick={() => router.push(`/request/${id}`)}>
              <span>해당 게시물 바로보기</span>
              <MdKeyboardArrowRight size="1.5rem" />
            </div>
            {statusInputForm()}
          </div>
        </TopContainer>
        {chatList &&
          chatList.map((chat) =>
            chat.position === currentUser.data.position ? (
              <MeContainer key={chat.id}>
                <BubbleRight>
                  <span>{chat.content}</span>
                </BubbleRight>
              </MeContainer>
            ) : (
              <>
                <OtherContainer key={chat.id}>
                  <BubbleLeft>
                    <span>{chat.content}</span>
                  </BubbleLeft>
                </OtherContainer>
              </>
            ),
          )}
      </Container>
      {activeApplicant?.status === '리뷰 진행중' && (
        <CommentForm id={id} position={currentUser.data.position} activeApplicant={activeApplicant.ProgrammerId} />
      )}
    </Layout>
  );
};

export default Review;
