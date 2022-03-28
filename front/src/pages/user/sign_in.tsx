import React from 'react';
import styled from '@emotion/styled';
import Layout from 'src/components/Layout';
import Header from 'src/components/Header';
import { Hr, Input } from 'src/components/style';
import { Box, Button } from '@mui/material';
import Footer from 'src/components/Footer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginInput } from 'src/types';
import { postSignIn } from 'src/api';
import { useRouter } from 'next/router';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - (185px + 100px));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  .article {
    margin-bottom: 1rem;
  }

  span {
    font-size: 0.9rem;
    color: red;
    display: block;
    padding-top: 0.5rem;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

const ExtendsInput = styled(Input)`
  border-radius: 0;
  width: 500px;
`;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    try {
      await postSignIn(data);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout>
        <Header />
      </Layout>
      <Container>
        <h1>로그인</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="article">
            <label htmlFor="userId">아이디</label>
            <ExtendsInput
              {...register('userId', { required: '필수 항목입니다' })}
              type="text"
              name="userId"
              id="userId"
            />
            <span>{errors?.userId?.message}</span>
          </div>
          <div className="article">
            <label htmlFor="password">비밀번호</label>
            <ExtendsInput
              {...register('password', { required: '필수 항목입니다' })}
              type="password"
              name="password"
              id="password"
            />
            <span>{errors?.password?.message}</span>
          </div>
          <Box mt={1} mb={1}>
            <Button fullWidth size="large" type="submit" variant="contained">
              로그인
            </Button>
          </Box>
          <Button size="large" onClick={() => router.push('/user/sign_up')} variant="outlined">
            회원가입
          </Button>
        </Form>
      </Container>
      <Hr />
      <Footer />
    </>
  );
};

export default SignIn;
