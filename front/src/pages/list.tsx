import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getPostsList } from 'src/api';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { RequestFormFooter } from 'src/components/style';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

const PostContainer = styled.div`
  width: 70%;
  height: 180px;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  opacity: 0.7;
  margin-bottom: 4rem;

  a {
    cursor: pointer;
    text-decoration: none;
    outline: none;
    color: rgba(0, 0, 0, 0.7);
  }

  &:hover {
    opacity: 1;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    .title {
      font-size: 1.3rem;
      font-weight: bold;
    }
  }
`;

const FilterContainer = styled.div`
  width: 66%;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);

  span {
    font-size: 1.2rem;
    font-weight: bold;
    border-bottom: 2px solid #007fff;
    padding-bottom: 0.5rem;
    cursor: pointer;
  }
`;

const List = () => {
  const { data } = useQuery(['posts'], getPostsList);

  return (
    <Layout>
      <Header />
      <Container>
        <FilterContainer>
          <span>최신순</span>
        </FilterContainer>
        {data &&
          data.map((post) => (
            <PostContainer key={post.id}>
              <Link href={`/request/${post.id}`}>
                <a>
                  <div key={post.id} className="container">
                    <span className="title">{post.title}</span>
                    <span className="body">{`${post.body.substring(0, 200)}...`}</span>
                    <RequestFormFooter>
                      <span>{`작성자: ${post.User.nickname} - ${post.User.job.toUpperCase()}`}</span>
                      <div className="icon">
                        <span className="type">{post.type}</span>
                        <IoPersonSharp size="1rem" />
                        <span>{`x ${post.maxReviewer}`}</span>
                      </div>
                    </RequestFormFooter>
                  </div>
                </a>
              </Link>
            </PostContainer>
          ))}
      </Container>
    </Layout>
  );
};

export default List;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['posts'], getPostsList, { staleTime: 1000 });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
