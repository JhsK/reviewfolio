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

  span {
    width: 35%;
  }

  input {
    width: 40%;
  }
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
              <UpdateColumn>
                <div className="infoData">
                  <span>직종</span>
                  <Select
                    // id="job"
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
              {currentUser.data.position === 'programmer' && (
                <InfoColumn>
                  <div className="infoData">
                    <span>경력</span>
                    <span>{currentUser.data.career}</span>
                  </div>
                </InfoColumn>
              )}
              <button type="submit">수정</button>
            </form>
          </StatusContainer>
        </Container>
      </Layout>
      <Footer />
    </>
  );
};

export default UpdateInfo;
