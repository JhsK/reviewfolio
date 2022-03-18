import React from 'react';
import styled from '@emotion/styled';
import { lightTheme } from 'src/theme';
import { IoNewspaperOutline } from 'react-icons/io5';
import { BsCheck } from 'react-icons/bs';
import { BiCodeAlt } from 'react-icons/bi';
import { IoMdPaperPlane } from 'react-icons/io';

const Container = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${lightTheme.HOME_GRAY};
`;

const SubContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
`;

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2.5rem;

  .explain {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }
`;

const HomeAdvantage = () => (
  <Container>
    <SubContainer>
      <Title>나의 고민이 아래와 같다면 지금 당장 이용해보세요</Title>
      <BoxContainer>
        <Box>
          <IoNewspaperOutline size="4rem" />
          <div>
            <div className="explain">
              <BsCheck size="1.5rem" color="#1976d2" />
              <span>이력서를 어떻게 쓰는지 막막해요..</span>
            </div>
            <div className="explain">
              <BsCheck size="1.5rem" color="#1976d2" />
              <span>어떤 내용을 채울지..</span>
            </div>
          </div>
        </Box>
        <Box>
          <BiCodeAlt size="4rem" />
          <div>
            <div className="explain">
              <BsCheck size="1.5rem" color="#1976d2" />
              <span>포트폴리오에 사용할 프로젝트 고민..</span>
            </div>
            <div className="explain">
              <BsCheck size="1.5rem" color="#1976d2" />
              <span>프로젝트 잘 진행하고 있는지..</span>
            </div>
          </div>
        </Box>
        <Box>
          <IoMdPaperPlane size="4rem" />
          <div>
            <div className="explain">
              <BsCheck size="1.5rem" color="#1976d2" />
              <span>공부를 올바르게 하고 있는지..</span>
            </div>
            <div className="explain">
              <BsCheck size="1.5rem" color="#1976d2" />
              <span>어떤 기술 스택을 공부해야 할지..</span>
            </div>
          </div>
        </Box>
      </BoxContainer>
    </SubContainer>
  </Container>
);

export default HomeAdvantage;
