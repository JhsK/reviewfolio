import React from 'react';
import ProgrammerReview from 'src/components/Review/ProgrammerReview';
import StudentReview from 'src/components/Review/StudentReview';
import useAuth from 'src/hooks/useAuth';

const Review = () => {
  const currentUser = useAuth();

  return <>{currentUser.data.position === 'student' ? <StudentReview /> : <ProgrammerReview />}</>;
};

export default Review;
