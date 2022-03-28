import styled from '@emotion/styled';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Fab from '@mui/material/Fab';
import React, { useState } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { useQuery } from 'react-query';
import { getPostsList } from 'src/api';
import Link from 'next/link';
import { RequestFormFooter } from 'src/components/style';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostContainer = styled.div`
  width: 70%;
  height: 180px;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  opacity: 0.7;
  margin-top: 4rem;

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
  position: absolute;
  left: 29%;
`;

const List = () => {
  const { data } = useQuery(['posts'], getPostsList);
  const [filter, setFilter] = useState(true);

  console.log(data);
  return (
    <Layout>
      <Header />
      <Container>
        <FilterContainer>
          <Fab variant="extended" onClick={(value) => setFilter(!value)}>
            {filter ? <ArrowDropUpIcon sx={{ mr: 1 }} /> : <ArrowDropDownIcon sx={{ mr: 1 }} />}
            날짜순
          </Fab>
        </FilterContainer>
        {data &&
          data.map((post) => (
            <PostContainer key={post.id}>
              <Link href={`/request/${post.id}`}>
                <a>
                  <div key={post.id} className="container">
                    <span className="title">{post.title}</span>
                    <span className="body">{post.body}</span>
                    <RequestFormFooter>
                      <span>{`작성자: ${post.User.nickname} - ${post.User.job.toUpperCase()}`}</span>
                      <div className="icon">
                        <span className="type">포트폴리오</span>
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
