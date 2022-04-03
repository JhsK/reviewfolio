import styled from '@emotion/styled';
import { SubContainer } from './Layout';

interface IFileContainer {
  isInputProp: boolean;
}

export const Hr = styled.hr`
  color: rgba(0, 0, 0, 0.12);
  border-width: 0px 0px thin;
`;

export const Banner = styled(SubContainer)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;

  h1 {
    margin: 0 0 1rem 0;
    font-size: 2.5rem;
  }
`;

export const Input = styled.input`
  width: 40%;
  height: 50px;
  border-radius: 1.2rem;
  border: 1px solid rgb(222, 226, 230);
  outline: none;
  padding: 0 1rem;
  font-size: 1rem;
`;

export const RequestFormFooter = styled.div`
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
`;

export const FileContainer = styled.div<IFileContainer>`
  width: 100%;
  height: 200px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isInputProp ? 'flex-start' : 'center')};

  input {
    display: none;
  }

  .fileInfo {
    display: ${(props) => (props.isInputProp ? 'none' : 'flex')};
    flex-direction: column;
    align-items: center;
    opacity: 0.5;
    cursor: pointer;

    span {
      margin-top: 1rem;
    }
  }

  .fileList {
    position: relative;
    width: 200px;
    height: 160px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    margin-right: 1rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    overflow: auto;

    .deleteIcon {
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
  }
`;

export const TopInfo = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #21252b;
  border-radius: 3rem;
  color: #fff;
  margin-bottom: 3rem;

  .title {
    margin-bottom: 1rem;
    span {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`;

export const StatusContainer = styled.div`
  width: 100%;
  padding: 2rem 3rem;
  background-color: #fff;
  border-radius: 3rem;
`;

export const StatusBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  /* justify-content: space-around; */
  font-size: 1.2rem;
  color: rgb(173, 181, 189);
  font-weight: 700;
  margin-top: 2rem;
  padding-bottom: 1rem;
  border-bottom: 0.2rem solid rgb(233, 236, 239);

  span {
    width: 20%;
  }
`;

export const StatusRequests = styled(StatusBar)`
  color: #000;
  border: none;
  cursor: pointer;
  padding-bottom: 0;

  span {
    &:nth-of-type(5) {
      color: rgb(173, 181, 189);
    }

    &:nth-of-type(5):hover {
      color: #000;
    }
  }
`;
