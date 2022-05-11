import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useQuery } from 'react-query';
import { getApplicant, getComment } from 'src/api';
import useAuth from 'src/hooks/useAuth';
import { IApplication, IComment } from 'src/types';
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

  const renderContainer = useCallback(
    (chatData: IComment) => {
      if (chatData.position === currentUser?.data.position) {
        return (
          <MeContainer key={chatData.id}>
            <BubbleRight>
              <span>{chatData.content}</span>
            </BubbleRight>
          </MeContainer>
        );
      }
      if (chatData.content === '') {
        return (
          <OtherContainer key={chatData.id}>
            <BubbleLeft>
              <Link href={`http://localhost:3065/${chatData.CommentFiles[0]?.src}`}>
                <a target="_blank">
                  <span className="file">
                    {`${chatData.CommentFiles[0]?.src} 첨부된 파일입니다. 클릭하여 다운 받으세요`}
                  </span>
                </a>
              </Link>
            </BubbleLeft>
          </OtherContainer>
        );
      }
      return (
        <OtherContainer key={chatData.id}>
          <BubbleLeft>
            <span>{chatData.content}</span>
          </BubbleLeft>
        </OtherContainer>
      );
    },
    [chatList],
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
        {chatList && chatList.map((chat) => renderContainer(chat))}
      </Container>
      {activeApplicant?.status === '리뷰 진행중' && (
        <CommentForm id={id as string} position={currentUser.data.position} activeApplicant={activeApplicant?.id} />
      )}
    </Layout>
  );
};

export default StudentReview;
