import React from "react";
import { useNavigate } from "react-router-dom";

import { BsStarFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { FRONT_PORT } from "../../config";

import styles from "./JobPostItem.module.scss";

const JobPostItem = (props) => {
  const { job } = props;
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/profile/users/${job.id}`);
  }
  // const isReviewEmpty = job.reviews.length === 0;

  // let reviewerNameTrans =
  //   !isReviewEmpty && job.reviews[0].users.name.slice(0, 1) + "**";
  // let recentReviewComment = !isReviewEmpty && job.reviews[0].comment;

  // // 리뷰 평점 구하기
  // let reviewAvg = 0;
  // if (!isReviewEmpty) {
  //   let sum = 0;
  //   job.reviews.forEach((review) => {
  //     sum = review.grade + sum;
  //   });
  //   reviewAvg = Math.round(sum / job.reviews.length);
  // }

  let jobImage = "/images/profile/profileNotFound.svg";

  return (
    <div onClick={handleNavigate} className={styles.jobItem}>
      <picture className={styles.imageWrapper}>
        <img src={jobImage} alt={job.name} />
      </picture>
      <div className={`${styles.jobInfoWrapper} ${styles.textTruncate}`}>
        <span className={styles.jobInfoName}>{job.name}</span>
        <span className={`${styles.jobInfoIntro} ${styles.textTruncate}`}>
          {job.intro ? job.intro : "소개가 없습니다."}
        </span>
        {/* <span className={styles.jobInfoReview}>
          <span>
            <BsStarFill color="#fadb14" size="12px" /> {reviewAvg}
          </span>
          <span>({job.reviews.length})</span>
        </span>
        {!isReviewEmpty && (
          <span
            className={`${styles.jobInfoRecentReview} ${styles.textTruncate}`}
          >
            <span>
              <FaRegCommentDots size="12px" color="#666" />
            </span>
            <span>{reviewerNameTrans}</span>
            <span className={styles.textTruncate}>{recentReviewComment}</span>
          </span>
        )} */}
      </div>
    </div>
  );
};

export default JobPostItem;
