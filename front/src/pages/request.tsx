import React from 'react';
import styled from '@emotion/styled';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';
import { useFormControl } from '@mui/material/FormControl';
import { Box, Button, Stack, TextField } from '@mui/material';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FileContaer = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Request = () => (
  <Layout>
    <Header />
    <Form>
      <Stack spacing={4}>
        <TextField id="standard-basic" label="title" variant="standard" />
        <TextField id="outlined-multiline-static" label="content" multiline rows={15} defaultValue="Default V" />
        <FileContaer>
          <input type="file" multiple />
        </FileContaer>
      </Stack>
      <ButtonContainer>
        <Box mr={1}>
          <Button size="large" variant="contained">
            작성
          </Button>
        </Box>
        <Box mr={1}>
          <Button size="large" variant="outlined">
            취소
          </Button>
        </Box>
      </ButtonContainer>
    </Form>
  </Layout>
);

export default Request;
