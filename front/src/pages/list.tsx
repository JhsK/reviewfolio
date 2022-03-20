import styled from '@emotion/styled';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Fab from '@mui/material/Fab';
import React, { useState } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';

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

    .footer {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;

      .icon {
        display: flex;
        align-items: center;

        .type {
          margin-right: 1rem;
        }

        span {
          margin-left: 0.3rem;
        }
      }
    }
  }
`;

const FilterContainer = styled.div`
  position: absolute;
  left: 29%;
`;

const List = () => {
  const [filter, setFilter] = useState(true);

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
        <PostContainer>
          <div className="container">
            <span className="title">토이 프로젝트 리뷰 신청합니다.</span>
            <span className="body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam iste ad fugiat perspiciatis dicta
              cumque et minus minima repellendus libero optio illo ex vitae reiciendis eligendi, deleniti aliquid nulla
              doloribus!
            </span>
            <div className="footer">
              <span>작성자: 임성규</span>
              <div className="icon">
                <span className="type">포트폴리오</span>
                <IoPersonSharp size="1rem" />
                <span>x 3</span>
              </div>
            </div>
          </div>
        </PostContainer>
        <PostContainer>
          <div className="container">
            <span className="title">토이 프로젝트 리뷰 신청합니다.</span>
            <span className="body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam iste ad fugiat perspiciatis dicta
              cumque et minus minima repellendus libero optio illo ex vitae reiciendis eligendi, deleniti aliquid nulla
              doloribus!
            </span>
            <div className="footer">
              <span>작성자: 임성규</span>
              <div className="icon">
                <span className="type">포트폴리오</span>
                <IoPersonSharp size="1rem" />
                <span>x 3</span>
              </div>
            </div>
          </div>
        </PostContainer>
        <PostContainer>
          <div className="container">
            <span className="title">토이 프로젝트 리뷰 신청합니다.</span>
            <span className="body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam iste ad fugiat perspiciatis dicta
              cumque et minus minima repellendus libero optio illo ex vitae reiciendis eligendi, deleniti aliquid nulla
              doloribus!
            </span>
            <div className="footer">
              <span>작성자: 임성규</span>
              <div className="icon">
                <span className="type">포트폴리오</span>
                <IoPersonSharp size="1rem" />
                <span>x 3</span>
              </div>
            </div>
          </div>
        </PostContainer>
      </Container>
    </Layout>
  );
};

export default List;
