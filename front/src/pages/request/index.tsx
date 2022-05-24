import styled from '@emotion/styled';
import { Box, Button, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postFilesUpload, postRequestCreate } from 'src/api';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { FileContainer } from 'src/components/style';
import useAuth from 'src/hooks/useAuth';
import Swal from 'sweetalert2';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    justify-content: space-between;

    .selectContainer {
      display: flex;
      justify-content: space-between;
      width: 30%;
    }
  }

  .error {
    font-size: 0.9rem;
    color: red;
    margin: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Request = () => {
  const fileRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [fileList, setFileList] = useState([]);
  const [filePath, setFilePath] = useState<string[]>(null);
  const [reviewer, setReviewer] = useState<string | number>('');
  const [reivewType, setReviewType] = useState('');
  const currentUser = useAuth();
  const router = useRouter();
  console.log('resqwfd', currentUser);

  useEffect(() => {
    if (currentUser.isAuthenticate && currentUser.data.ticket < 1) {
      Swal.fire({
        title: '티켓이 부족합니다',
        icon: 'error',
      }).then((result) => {
        router.replace('/');
      });
    }
  }, [currentUser]);

  const onSubmit = async (data) => {
    if (reviewer === '' || reivewType === '') {
      return toast.error('리뷰어 티입 및 인원을 선택해주세요', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (!(fileList.length > 0)) {
      return toast.error('파일을 업로드 해주세요', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const values = { ...data, files: filePath };

    if (reviewer > currentUser.data.ticket) {
      return toast.error('티켓이 부족합니다. 인원을 줄여주세요', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    try {
      await postRequestCreate(values);
      router.push('/');
    } catch (error) {
      console.error(error);
    }

    return null;
  };

  const onChangeRevieType = (e: SelectChangeEvent) => {
    setReviewType(e.target.value);
  };

  const onChangeReviewer = (e: SelectChangeEvent) => {
    setReviewer(e.target.value);
  };

  const onClickDeleteFile = (fileName: string) => {
    setFileList((prev) => prev.filter((v) => v !== fileName));
  };

  const fileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData(); // 파일 업로드를 위해 FormData 객체 생성
    const fileObj = Array.from(e.target.files); // input onChange 이벤트로 얻은 파일 정보를 배열로 변경

    fileObj.forEach((file, i) => formData.append(`files`, file));
    // formData에 fileObj 값을 추가
    try {
      const returnPath = await postFilesUpload(formData);
      // 업로드할 파일 정보 formData를 api를 통해 서버로 전달
      fileObj.forEach((file) => setFileList((prev) => [...prev, file.name]));
      // 서버의 응답으로 받은 업로드한 파일의 주소만 메모리에 저장하여 요청글 작성시 다시 서버로 전달
      setFilePath(returnPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Header />
      <ToastContainer />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <div className="top">
            <TextField
              sx={{ width: '65%' }}
              id="standard-basic"
              {...register('title', { required: '필수 항목입니다' })}
              label="제목"
              variant="standard"
            />
            <div className="selectContainer">
              <Select
                {...register('reviewType')}
                value={reivewType}
                onChange={onChangeRevieType}
                sx={{ width: '45%' }}
                displayEmpty
              >
                <MenuItem value="">리뷰 유형</MenuItem>
                <MenuItem value="portfolio">포트폴리오</MenuItem>
                <MenuItem value="resume">이력서</MenuItem>
                <MenuItem value="consulting">고민 상담</MenuItem>
              </Select>
              <Select
                {...register('reviewer')}
                value={reviewer}
                onChange={onChangeReviewer}
                sx={{ width: '50%' }}
                displayEmpty
              >
                <MenuItem value="">리뷰어 인원 설정</MenuItem>
                <MenuItem value={1}>최대 1명</MenuItem>
                <MenuItem value={2}>최대 2명</MenuItem>
                <MenuItem value={3}>최대 3명</MenuItem>
              </Select>
            </div>
          </div>
          <span className="error">{errors?.title?.message}</span>
          <TextField
            id="outlined-multiline-static"
            {...register('body', { required: '필수 항목입니다' })}
            label="설명"
            multiline
            rows={15}
          />
          <span>{errors?.body?.message}</span>
          <FileContainer isInputProp={fileList.length > 0}>
            <div className="fileInfo" onClick={() => fileRef.current.click()}>
              <AiOutlinePlus size="2rem" />
              <span>파일을 드래그 또는 클릭하여 첨부해주세요</span>
            </div>
            <input ref={fileRef} onChange={fileUpload} type="file" multiple />
            {fileList.length > 0 &&
              fileList.map((file: string) => (
                <div key={file} className="fileList">
                  <div className="deleteIcon" onClick={() => onClickDeleteFile(file)}>
                    <IoCloseCircleSharp size="1.2rem" />
                  </div>
                  <span key={file}>{file}</span>
                </div>
              ))}
          </FileContainer>
        </Stack>
        <ButtonContainer>
          <Box mr={1}>
            <Button size="large" type="submit" variant="contained">
              작성
            </Button>
          </Box>
          <Box mr={1}>
            <Button onClick={() => router.back()} size="large" variant="outlined">
              취소
            </Button>
          </Box>
        </ButtonContainer>
      </Form>
    </Layout>
  );
};

export default Request;
