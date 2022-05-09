import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { QueryClient, useQuery } from 'react-query';
import { getApplicant, getComment } from 'src/api';
import useAuth from 'src/hooks/useAuth';
import { IApplication } from 'src/types';
import Header from '../Header';
import Layout from '../Layout';
import CommentForm from './Form';
import { BubbleLeft, BubbleRight, Container, MeContainer, OtherContainer, TabContainer, TopContainer } from './style';

const StudentReview = () => {
  const router = useRouter();
  const { id } = router.query;
  const currentUser = useAuth();
  const [activeApplicant, setActiveApplicant] = useState<IApplication>(null);

  const { data: applicant, isSuccess } = useQuery(['applicant'], () => getApplicant(id as string), {
    onSuccess: (data) => setActiveApplicant(data[0]),
  });

  const { data: chatList } = useQuery(
    ['chatList', activeApplicant?.id],
    () => getComment(id as string, activeApplicant?.id),
    {
      enabled: isSuccess,
    },
  );

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
            <span>{`[${activeApplicant?.status}]`}</span>
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
        <CommentForm id={id as string} position={currentUser.data.position} activeApplicant={activeApplicant?.id} />
      )}
    </Layout>
  );
};

export default StudentReview;
