import React from 'react';
import { useNavigate } from 'react-router-dom';

import { BsStarFill } from 'react-icons/bs';
import { FaRegCommentDots } from 'react-icons/fa';
import { FRONT_PORT } from '../../config';

import styles from './ExpertItem.module.scss';

const ExpertItem = props => {
  const { expert } = props;
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/profile/users/${expert.id}`);
  }
  const isReviewEmpty = expert.reviews.length === 0;

  let reviewerNameTrans =
    !isReviewEmpty && expert.reviews[0].users.name.slice(0, 1) + '**';
  let recentReviewComment = !isReviewEmpty && expert.reviews[0].comment;

  // 리뷰 평점 구하기
  let reviewAvg = 0;
  if (!isReviewEmpty) {
    let sum = 0;
    expert.reviews.forEach(review => {
      sum = review.grade + sum;
    });
    reviewAvg = Math.round(sum / expert.reviews.length);
  }

  let expertImage = expert.expert_image
    ? FRONT_PORT + expert.expert_image
    : FRONT_PORT + '/images/profile/profileNotFound.svg';

  return (
    <div onClick={handleNavigate} className={styles.expertItem}>
      <picture className={styles.imageWrapper}>
        <img src={expertImage} alt={expert.name} />
      </picture>
      <div className={`${styles.expertInfoWrapper} ${styles.textTruncate}`}>
        <span className={styles.expertInfoName}>{expert.name}</span>
        <span className={`${styles.expertInfoIntro} ${styles.textTruncate}`}>
          {expert.intro ? expert.intro : '소개가 없습니다.'}
        </span>
        <span className={styles.expertInfoReview}>
          <span>
            <BsStarFill color="#fadb14" size="12px" /> {reviewAvg}
          </span>
          <span>({expert.reviews.length})</span>
        </span>
        {!isReviewEmpty && (
          <span
            className={`${styles.expertInfoRecentReview} ${styles.textTruncate}`}
          >
            <span>
              <FaRegCommentDots size="12px" color="#666" />
            </span>
            <span>{reviewerNameTrans}</span>
            <span className={styles.textTruncate}>{recentReviewComment}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ExpertItem;
