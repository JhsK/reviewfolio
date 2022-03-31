import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postComment } from 'src/api';

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

const CommentForm = ({ id, position }) => {
  const [chat, setChat] = useState('');
  const queryClient = useQueryClient();
  const chatMutation = useMutation(postComment);

  const onChangeChat = (e) => {
    setChat(e.target.value);
  };

  const onSubmitComment = (e) => {
    e.preventDefault();
    console.log(chat);

    chatMutation.mutate(
      { content: chat, postId: id, position },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['chatList']);
        },
      },
    );
  };

  return (
    <InputContainer onSubmit={onSubmitComment}>
      <textarea onChange={onChangeChat} />
      <button type="submit">전송</button>
    </InputContainer>
  );
};

export default CommentForm;
