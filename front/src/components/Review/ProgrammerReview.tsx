import { useRouter } from 'next/router';
import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { getApplicant, getComment, putEndReview } from 'src/api';
import useAuth from 'src/hooks/useAuth';
import Header from '../Header';
import Layout from '../Layout';
import CommentForm from './Form';
import { BubbleLeft, BubbleRight, Container, MeContainer, OtherContainer, TopContainer } from './style';

const ProgrammerReview = () => {
  const router = useRouter();
  const { id } = router.query;
  const currentUser = useAuth();
  const queryClient = useQueryClient();
  const reviewStatusMutation = useMutation(putEndReview);

  const { data: applicant, isSuccess } = useQuery(['applicant'], () => getApplicant(id as string), {
    select: (data) => data.filter((v) => v.ProgrammerId === currentUser.data?.programmerId)[0],
  });

  const { data: chatList } = useQuery(['chatList', applicant?.id], () => getComment(id as string, applicant?.id), {
    enabled: isSuccess,
  });

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
            { applicationId: applicant.id, programmerId: currentUser.data.programmerId },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(['applicant']);
                queryClient.invalidateQueries('userRequest');
              },
            },
          );
          Swal.fire('리뷰가 종료되었습니다', '포린트 15000원이 적립되었습니다', 'success');
          router.push('/user/status');
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  console.log(applicant);
  return (
    <Layout>
      <Header />
      <Container>
        <TopContainer>
          <div className="statusContainer">
            <div className="post" onClick={() => router.push(`/request/${id}`)}>
              <span>해당 게시물 바로보기</span>
              <MdKeyboardArrowRight size="1.5rem" />
            </div>
            {applicant?.status === '리뷰 진행중' ? (
              <button onClick={onClickReviewEnd}>리뷰 종료하기</button>
            ) : (
              <span>[리뷰 종료]</span>
            )}
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
      {applicant?.status === '리뷰 진행중' && (
        <CommentForm id={id as string} position={currentUser.data.position} activeApplicant={applicant?.id} />
      )}
    </Layout>
  );
};

export default ProgrammerReview;
