import styled from '@emotion/styled';
import { Box, Button, Stack, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoPersonSharp } from 'react-icons/io5';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPostDetail, putRequestUpdate } from 'src/api';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { FileContainer, RequestFormFooter } from 'src/components/style';
import useAuth from 'src/hooks/useAuth';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

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

const RequestUpdate = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: request, isSuccess } = useQuery(['update', id], () => getPostDetail(id as string));
  const fileRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [fileList, setFileList] = useState([]);
  const [filePath, setFilePath] = useState<string[]>(null);
  const [reviewerState, setReviewerState] = useState<string | number>('');
  const [reivewType, setReviewType] = useState('');
  const currentUser = useAuth();

  useEffect(() => {
    if (isSuccess) {
      setReviewerState(request?.maxReviewer);
      setReviewType(request?.type);
      request.Files.forEach((file) => {
        setFileList([file.src]);
        setFilePath([file.src]);
      });
    }
  }, [isSuccess]);

  const onSubmit = async (data) => {
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
    const values = { ...data, requestPostId: id };

    try {
      await putRequestUpdate(values);
      router.push('/user/status');
    } catch (error) {
      console.error(error);
    }

    return null;
  };

  return (
    <Layout>
      <Header />
      <ToastContainer />
      {isSuccess && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <div className="top">
              <TextField
                sx={{ width: '65%' }}
                id="standard-basic"
                {...register('title', { required: '필수 항목입니다' })}
                label="제목"
                variant="standard"
                defaultValue={request?.title}
              />
              <div className="selectContainer">
                <RequestFormFooter>
                  <span>{`작성자: ${request?.User.nickname} - ${request?.User.job.toUpperCase()}`}</span>
                  <div className="icon">
                    <span className="type">{request?.type}</span>
                    <IoPersonSharp size="1rem" />
                    <span>{`x ${request?.maxReviewer} - ${request?.Applications.length}명 신청`}</span>
                  </div>
                </RequestFormFooter>
              </div>
            </div>
            <span className="error">{errors?.title?.message}</span>
            <TextField
              id="outlined-multiline-static"
              {...register('body', { required: '필수 항목입니다' })}
              label="설명"
              defaultValue={request?.body}
              multiline
              rows={15}
            />
            <span>{errors?.body?.message}</span>
            <FileContainer isInputProp={fileList?.length > 0}>
              <div className="fileInfo" onClick={() => fileRef.current.click()}>
                <AiOutlinePlus size="2rem" />
                <span>파일을 드래그 또는 클릭하여 첨부해주세요</span>
              </div>
              <input ref={fileRef} type="file" multiple />
              {fileList?.length > 0 &&
                fileList?.map((file: string) => (
                  <div key={file} className="fileList">
                    <span key={file}>{file}</span>
                  </div>
                ))}
            </FileContainer>
          </Stack>
          <ButtonContainer>
            <Box mr={1}>
              <Button size="large" type="submit" variant="contained">
                수정
              </Button>
            </Box>
            <Box mr={1}>
              <Button onClick={() => router.back()} size="large" variant="outlined">
                취소
              </Button>
            </Box>
          </ButtonContainer>
        </Form>
      )}
    </Layout>
  );
};

export default RequestUpdate;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['update', id], () => getPostDetail(id as string), {
    staleTime: 1000,
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
