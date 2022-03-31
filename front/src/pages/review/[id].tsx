import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useQuery } from 'react-query';
import { getApplicant, getComment } from 'src/api';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import CommentForm from 'src/components/Review/Form';
import useAuth from 'src/hooks/useAuth';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .post {
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
      opacity: 0.5;
      padding-bottom: 0.1rem;
    }
  }
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 0;
  margin-bottom: 1rem;

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
  }
`;

const BubbleLeft = styled.div`
  position: relative;
  padding: 1rem;
  /* width: 400px; */
  max-width: 50%;
  /* height: 100px; */
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
  const { data: applicant } = useQuery(['applicant'], () => getApplicant(id as string));
  const { data: chatList } = useQuery(['chatList'], () => getComment(id as string));

  console.log(applicant);
  console.log(chatList);

  return (
    <Layout>
      <Header />
      <Container>
        <TopContainer>
          <TabContainer>
            {applicant &&
              applicant.map((v, i) => (
                <div className="applicantTab" key={v.id}>
                  {i}
                </div>
              ))}
          </TabContainer>
          <div className="post" onClick={() => router.push(`/request/${id}`)}>
            <span>해당 게시물 바로보기</span>
            <MdKeyboardArrowRight size="1.5rem" />
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
      <CommentForm id={id} position={currentUser.data.position} />
    </Layout>
  );
};

export default Review;
