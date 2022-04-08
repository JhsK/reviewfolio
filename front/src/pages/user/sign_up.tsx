import styled from '@emotion/styled';
import { FormControlLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postSignUp } from 'src/api';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { Banner, Hr, Input } from 'src/components/style';
import { BANK } from 'src/schema';
import { FormInput, JoinInput } from 'src/types';

const BannerContainer = styled.div`
  width: 100%;
  height: 250px;
  background-color: #e4f7fd;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  width: 100%;

  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .article {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;

    .radio {
      span {
        font-size: 1.2rem;
      }
    }

    .error {
      padding-top: 0.5rem;
      font-size: 0.9rem;
      color: red;
    }

    label {
      padding-bottom: 0.5rem;
    }
  }

  .btnContainer {
    margin-top: 2rem;

    button {
      cursor: pointer;
      width: 150px;
      margin-right: 1rem;
      outline: none;
      font-size: 1rem;
      padding: 1rem 0;
      border-radius: 1.2rem;

      &:nth-of-type(1) {
        color: #fff;
        background-color: #1976d3;
        border: none;
      }

      &:nth-of-type(2) {
        border: 1px solid #1976d3;
        color: #1976d3;
        background-color: #fff;
      }
    }
  }
`;

const validationMessage = {
  required: '필수 항목입니다',
  passwordConfirmation: '비밀번호가 일치하지 않습니다',
  notString: '숫자만 입력 가능합니다',
  range: '최소 0부터 최대 20까지 입력 가능합니다',
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInput>();
  const router = useRouter();
  const [selectJob, setSelectJob] = useState('직무를 선택해주세요');
  const [position, setPosition] = useState('student');

  const onChangeJob = (e: SelectChangeEvent) => {
    setSelectJob(e.target.value);
  };

  const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
    if (selectJob === '직무를 선택해주세요') {
      return toast.error('직무를 선택해주세요', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (data.userPassword !== data.rePassword) {
      setError('userPassword', { message: validationMessage.passwordConfirmation }, { shouldFocus: true });
    }

    const values: JoinInput = { ...data, job: selectJob, position };

    try {
      await postSignUp(values);
      router.replace('/');
    } catch (error) {
      console.log(error.response);
      console.error(error);
      toast.error(error.response.data, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    return null;
  };

  return (
    <>
      <Layout>
        <Header />
      </Layout>
      <ToastContainer />
      <BannerContainer>
        <Banner>
          <h1>회원가입</h1>
          <span>가입유형을 정확하게 선택해주세요</span>
        </Banner>
      </BannerContainer>
      <Layout>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <span className="title">개인 정보</span>
          <div className="article">
            <div className="radio">
              <RadioGroup
                onChange={(event) => setPosition(event.target.value)}
                row
                defaultValue={position}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="student" control={<Radio size="small" />} label="취업준비생" />
                <FormControlLabel value="programmer" control={<Radio size="small" />} label="개발자" />
              </RadioGroup>
            </div>
          </div>
          <div className="article">
            <label htmlFor="userName">이름</label>
            <Input
              {...register('userName', { required: validationMessage.required })}
              type="text"
              name="userName"
              id="userName"
            />
            <span className="error">{errors?.userName?.message}</span>
          </div>
          <div className="article">
            <label htmlFor="userId">아이디</label>
            <Input
              type="text"
              {...register('userId', { required: validationMessage.required })}
              name="userId"
              id="userId"
            />
            <span className="error">{errors?.userId?.message}</span>
          </div>
          <div className="article">
            <label htmlFor="userPassword">비밀번호</label>
            <Input
              {...register('userPassword', { required: validationMessage.required })}
              type="password"
              name="userPassword"
              id="userPassword"
            />
            <span className="error">{errors?.userPassword?.message}</span>
          </div>
          <div className="article">
            <label htmlFor="rePassword">비밀번호 확인</label>
            <Input
              type="password"
              {...register('rePassword', { required: validationMessage.required })}
              name="rePassword"
              id="rePassword"
            />
            <span className="error">{errors?.rePassword?.message}</span>
          </div>
          <div className="article">
            <label htmlFor="nickname">닉네임</label>
            <Input
              {...register('nickname', { required: validationMessage.required })}
              type="text"
              name="nickname"
              id="nickname"
            />
            <span className="error">{errors?.nickname?.message}</span>
          </div>
          <div className="article">
            <label htmlFor="birthday">생년월일</label>
            <Input
              type="date"
              {...register('birthday', { required: validationMessage.required })}
              name="birthday"
              id="birthday"
            />
            <span className="error">{errors?.birthday?.message}</span>
          </div>
          <div className="article">
            <label htmlFor="job">직무</label>
            <Select id="job" value={selectJob} onChange={onChangeJob} sx={{ width: '40%' }}>
              <MenuItem value="front">프론트엔드</MenuItem>
              <MenuItem value="back">백엔드</MenuItem>
              <MenuItem value="data">데이터분석</MenuItem>
              <MenuItem value="android">Android</MenuItem>
              <MenuItem value="ios">IOS</MenuItem>
              <MenuItem value="devops">DevOps</MenuItem>
            </Select>
          </div>
          {position === 'programmer' && (
            <>
              <div className="article">
                <label htmlFor="career">년차</label>
                <Input
                  {...register('career', {
                    required: validationMessage.required,
                    min: { value: 0, message: validationMessage.range },
                    max: { value: 20, message: validationMessage.range },
                    pattern: { value: /^[0-9]+$/, message: validationMessage.notString },
                  })}
                  type="text"
                  name="career"
                  id="career"
                />
                <span className="error">{errors?.career?.message}</span>
              </div>
              <div className="article">
                <label htmlFor="bank">은행</label>
                <Select id="bank" {...register('bank', { required: validationMessage.required })} sx={{ width: '40%' }}>
                  {BANK.map((bank) => (
                    <MenuItem value={bank} key={bank}>
                      {bank}
                    </MenuItem>
                  ))}
                </Select>
                <span className="error">{errors?.career?.message}</span>
              </div>
              <div className="article">
                <label htmlFor="accountNumber">계좌번호</label>
                <Input
                  {...register('accountNumber', {
                    required: validationMessage.required,
                    pattern: { value: /^[0-9]+$/, message: validationMessage.notString },
                  })}
                  type="text"
                  name="accountNumber"
                  id="accountNumber"
                />
                <span className="error">{errors?.accountNumber?.message}</span>
              </div>
            </>
          )}
          <div className="btnContainer">
            <button type="submit">회원가입</button>
            <button onClick={() => router.push('/')}>홈으로</button>
          </div>
        </Form>
      </Layout>
      <Hr />
      <Footer />
    </>
  );
};

export default SignUp;
