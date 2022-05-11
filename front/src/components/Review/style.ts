import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const TopContainer = styled.div`
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

export const TabContainer = styled.div`
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

export const BubbleLeft = styled.div`
  position: relative;
  padding: 1rem;
  max-width: 50%;
  background: #f8f9fb;
  border-radius: 10px;

  span {
    position: relative;
    z-index: 999;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  .file {
    text-decoration: underline;

    &:hover {
      color: blue;
      cursor: pointer;
    }
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

export const BubbleRight = styled(BubbleLeft)`
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

export const OtherContainer = styled.div`
  width: 100%;
  display: flex;
  padding-left: 1rem;
  margin-bottom: 1rem;
`;

export const MeContainer = styled(OtherContainer)`
  justify-content: flex-end;
  padding-right: 1rem;
  padding-left: 0;
`;
