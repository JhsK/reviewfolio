import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { postFilesUpload, postRequestCreate } from 'src/api';

interface IFileContainer {
  isInputProp: boolean;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FileContaer = styled.div<IFileContainer>`
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

    .deleteIcon {
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
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
  const router = useRouter();

  const onSubmit = async (data) => {
    const values = { ...data, files: filePath };

    try {
      await postRequestCreate(values);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDeleteFile = (fileName: string) => {
    console.log(fileName);
    setFileList((prev) => prev.filter((v) => v !== fileName));
  };

  const fileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const formData = new FormData();
    const fileObj = Array.from(e.target.files);

    fileObj.forEach((file, i) => formData.append(`files`, file));

    try {
      const returnPath = await postFilesUpload(formData);
      fileObj.forEach((file) => setFileList((prev) => [...prev, file.name]));
      setFilePath(returnPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Header />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <TextField
            id="standard-basic"
            {...register('title', { required: '필수 항목입니다' })}
            label="제목"
            variant="standard"
          />
          <span>{errors?.title?.message}</span>
          <TextField
            id="outlined-multiline-static"
            {...register('body', { required: '필수 항목입니다' })}
            label="설명"
            multiline
            rows={15}
          />
          <span>{errors?.body?.message}</span>
          <FileContaer isInputProp={fileList.length > 0}>
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
          </FileContaer>
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
