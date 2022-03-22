import styled from '@emotion/styled';
import { SubContainer } from './Layout';

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
