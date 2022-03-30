import { useRouter } from 'next/router';
import React from 'react';
import Header from 'src/components/Header';
import Layout from 'src/components/Layout';

const Review = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Header />
    </Layout>
  );
};

export default Review;
