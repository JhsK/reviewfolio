import styled from '@emotion/styled';
import { MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { putChangeInfo } from 'src/api';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { Input, StatusContainer } from 'src/components/style';
import useAuth from 'src/hooks/useAuth';
import { Container, InfoColumn } from '../info';

interface IChangeInfo {
  userName: string;
  job: string;
  career?: number;
}

const UpdateColumn = styled(InfoColumn)`
  width: 100%;
  display: block;

  input {
    width: 40%;
  }
`;

const Button = styled.button`
  border: none;
  color: rgb(173, 181, 189);
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #fff;
  padding: 0;
  margin: 2rem 0;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

const ErrorLabel = styled.span`
  font-size: 0.9rem;
  color: red;
  margin-bottom: 1rem;
  display: block;
`;

const UpdateInfo = () => {
  const currentUser = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IChangeInfo>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IChangeInfo> = async (data: IChangeInfo) => {
    try {
      await putChangeInfo(data);
      router.push('/user/info');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout>
        <Header />
      </Layout>
      <Layout bgColor="#f8f9fb">
        <Container>
          <StatusContainer>
            <h1>정보 변경</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <UpdateColumn>
                <div className="infoData">
                  <span>이름</span>
                  <Input
                    type="text"
                    {...register('userName', { required: '필수 항목입니다' })}
                    defaultValue={currentUser.data.userName}
                  />
                </div>
              </UpdateColumn>
              <ErrorLabel>{errors?.userName?.message}</ErrorLabel>
              <UpdateColumn>
                <div className="infoData">
                  <span>직종</span>
                  <Select
                    defaultValue={currentUser.data.job}
                    {...register('job', { required: '필수 항목입니다' })}
                    sx={{ width: '40%' }}
                  >
                    <MenuItem value="front">프론트엔드</MenuItem>
                    <MenuItem value="back">백엔드</MenuItem>
                    <MenuItem value="data">데이터분석</MenuItem>
                    <MenuItem value="android">Android</MenuItem>
                    <MenuItem value="ios">IOS</MenuItem>
                    <MenuItem value="devops">DevOps</MenuItem>
                  </Select>
                </div>
              </UpdateColumn>
              <ErrorLabel>{errors?.job?.message}</ErrorLabel>
              {currentUser.data.position === 'programmer' && (
                <>
                  <InfoColumn>
                    <div className="infoData">
                      <span>경력</span>
                      <Input
                        type="text"
                        {...register('career', {
                          required: '필수항목 입니다',
                          min: { value: 0, message: '숫자만 가능합니다' },
                          max: { value: 20, message: '숫자만 가능합니다' },
                          pattern: { value: /^[0-9]+$/, message: '숫자만 가능합니다' },
                        })}
                        defaultValue={currentUser.data.career}
                      />
                    </div>
                  </InfoColumn>
                  <ErrorLabel>{errors?.career?.message}</ErrorLabel>
                </>
              )}
              <Button type="submit">수정</Button>
            </form>
          </StatusContainer>
        </Container>
      </Layout>
      <Footer />
    </>
  );
};

export default UpdateInfo;
