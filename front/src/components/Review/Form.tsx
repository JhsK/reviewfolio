import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { postComment, postCommentFileUpload } from 'src/api';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlinePlus } from 'react-icons/ai';

const InputContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 200px;
  position: fixed;
  bottom: 0px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 1rem;

  textarea {
    width: 85%;
    height: 100%;
    border: none;
    padding: 1rem;
    resize: none;
    padding-left: 4.5rem;
    font-size: 1rem;
  }

  & > button {
    width: 13%;
    height: 80%;
    background-color: #fae100;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

const FileUploadContainer = styled.div`
  position: absolute;
  left: 5px;
  top: 5px;

  & > button {
    background-color: #fff;
    border-radius: 9999px;
    border: none;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 1rem;
    cursor: pointer;
  }

  & > input {
    display: none;
  }
`;

interface CommentFormProps {
  id: string;
  position: 'student' | 'programmer' | '';
  activeApplicant: number;
}

const CommentForm = ({ id, position, activeApplicant }: CommentFormProps) => {
  const [chat, setChat] = useState('');
  const fileRef = useRef(null);
  const fileNameRef = useRef(null);
  const queryClient = useQueryClient();
  const chatMutation = useMutation(postComment);

  const onClickUploadButton = () => fileRef.current.click();

  const onChangeFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const fileObj = Array.from(e.target.files);
    formData.append('file', fileObj[0]);

    try {
      const uploadFile = await postCommentFileUpload(formData);
      fileNameRef.current = uploadFile;

      chatMutation.mutate(
        { content: '', postId: id, position, ApplicationId: activeApplicant, file: fileNameRef.current },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['chatList', activeApplicant]);
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeChat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChat(e.target.value);
  };

  const onSubmitComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (chat === '') {
      return toast.error('내용을 입력해주세요', {
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
      chatMutation.mutate(
        { content: chat, postId: id, position, ApplicationId: activeApplicant },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['chatList', activeApplicant]);
          },
        },
      );

      setChat('');
    } catch (error) {
      console.error(error);
    }

    return null;
  };

  return (
    <>
      <ToastContainer />
      <InputContainer>
        <textarea value={chat} onChange={onChangeChat} />
        <button onClick={onSubmitComment}>전송</button>
        <FileUploadContainer>
          <button onClick={onClickUploadButton}>
            <AiOutlinePlus size="1.2rem" />
          </button>
          <input onChange={onChangeFileUpload} ref={fileRef} type="file" />
        </FileUploadContainer>
      </InputContainer>
    </>
  );
};

export default CommentForm;
