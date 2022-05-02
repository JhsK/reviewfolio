import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { postComment } from 'src/api';
import 'react-toastify/dist/ReactToastify.css';

const InputContainer = styled.form`
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
  }

  button {
    width: 13%;
    height: 80%;
    background-color: #fae100;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

interface CommentFormProps {
  id: string;
  position: 'student' | 'programmer' | '';
  activeApplicant: number;
}

const CommentForm = ({ id, position, activeApplicant }: CommentFormProps) => {
  const [chat, setChat] = useState('');
  const queryClient = useQueryClient();
  const chatMutation = useMutation(postComment);

  const onChangeChat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChat(e.target.value);
  };

  const onSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
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
      <InputContainer onSubmit={onSubmitComment}>
        <textarea value={chat} onChange={onChangeChat} />
        <button type="submit">전송</button>
      </InputContainer>
    </>
  );
};

export default CommentForm;
