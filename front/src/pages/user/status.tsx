import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import useAuth from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import Layout from 'src/components/Layout';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import { StatusBar, StatusContainer, TopInfo } from 'src/components/style';
import RequestStatus from 'src/components/Status/RequestStatus';
import ApplicationStatus from 'src/components/Status/ApplicationStatus';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 100px - 185px);
  padding: 3rem 0;
`;

const Status = () => {
  const currentUser = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser.isAuthenticate) {
      router.replace('/');
    }
  }, [currentUser.isAuthenticate]);

  return (
    <>
      <Layout>
        <Header />
      </Layout>
      <Layout bgColor="#f8f9fb">
        <Container>{currentUser.data.position === 'student' ? <RequestStatus /> : <ApplicationStatus />}</Container>
      </Layout>
      <Footer />
    </>
  );
};

export default Status;
