import styled from '@emotion/styled';
import { Box, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteRequesDelete, getPostDetail, postApplication } from 'src/api';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { FileContainer, RequestFormFooter } from 'src/components/style';
import useAuth from 'src/hooks/useAuth';
import Swal from 'sweetalert2';

interface IFileContainer {
  isInputProp: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      width: 70%;
      font-size: 1.3rem;
      font-weight: bold;
      border: none;
      background-color: #fff;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding-bottom: 0.5rem;
    }
  }

  textarea {
    width: 100%;
    height: 500px;
    resize: none;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    outline: none;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const ExtendsRequestFormFooter = styled(RequestFormFooter)`
  opacity: 0.7;
`;

const ExtendsFileContainer = styled(FileContainer)`
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const RequestDetail = () => {
  const currentUser = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const applicationMutation = useMutation(postApplication);
  const { data } = useQuery(['postDetail', id], () => getPostDetail(id as string));

  const onClickApplication = async () => {
    const overlapApplication = data.Applications.filter(
      (application) => application.ProgrammerId === currentUser.data.programmerId,
    );

    if (overlapApplication.length > 0) {
      return toast.error('이미 신청한 리뷰 글입니다', {
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
      applicationMutation.mutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['postDetail', id]);
          },
        },
      );
    } catch (error) {
      console.error(error);
    }

    return null;
  };

  const onClickDeleteRequest = async () => {
    try {
      await deleteRequesDelete(id as string);
      Swal.fire('삭제 완료', '리뷰 요청글이 삭제되었습니다', 'success');
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data);
  return (
    <Layout>
      <Header />
      <ToastContainer />
      <Container>
        <Stack spacing={4}>
          <div className="top">
            <input type="text" value={data?.title} readOnly />
            <ExtendsRequestFormFooter>
              <span>{`작성자: ${data?.User.nickname} - ${data?.User.job.toUpperCase()}`}</span>
              <div className="icon">
                <span className="type">{data?.type}</span>
                <IoPersonSharp size="1rem" />
                <span>{`x ${data?.maxReviewer} - ${data?.Applications.length}명 신청`}</span>
              </div>
            </ExtendsRequestFormFooter>
          </div>
          <textarea readOnly value={data?.body} />
          <ExtendsFileContainer isInputProp={data?.Files.length > 0}>
            {data?.Files.length > 0 &&
              data?.Files.map((file) => (
                <Link href={`http://localhost:3065/${file.src}`}>
                  <a target="_blank">
                    <div key={file.id} className="fileList">
                      <span key={file.id}>{file.src}</span>
                    </div>
                  </a>
                </Link>
              ))}
          </ExtendsFileContainer>
        </Stack>
        {currentUser.data.position === 'programmer' && data?.maxReviewer > data?.Applications.length && (
          <ButtonContainer>
            <Box mr={1}>
              <Button size="large" onClick={onClickApplication} variant="contained">
                신청
              </Button>
            </Box>
            <Box mr={1}>
              <Button onClick={() => router.back()} size="large" variant="outlined">
                목록
              </Button>
            </Box>
          </ButtonContainer>
        )}
        {currentUser.data.id === data.User.id && (
          <ButtonContainer>
            <Box mr={1}>
              <Button size="large" onClick={() => router.push(`/request/${id}/update`)} variant="contained">
                수정
              </Button>
            </Box>
            <Box mr={1}>
              <Button onClick={onClickDeleteRequest} size="large" variant="outlined">
                삭제
              </Button>
            </Box>
          </ButtonContainer>
        )}
      </Container>
    </Layout>
  );
};

export default RequestDetail;
