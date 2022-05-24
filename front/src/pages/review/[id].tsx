import React from 'react';
import ProgrammerReview from 'src/components/Review/ProgrammerReview';
import StudentReview from 'src/components/Review/StudentReview';
import useAuth from 'src/hooks/useAuth';

const Review = () => {
  const currentUser = useAuth();
  // 사용자의 유형에 따라 컴포넌트 분기처리
  return <>{currentUser.data.position === 'student' ? <StudentReview /> : <ProgrammerReview />}</>;
};

export default Review;
