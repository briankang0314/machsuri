import React from "react";
import { useNavigate } from "react-router-dom";
import { FRONT_PORT } from "../../config";

import styles from "./JobItem.module.scss";

const JobItem = (props) => {
  const { job } = props;
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`jobs/${job.id}`);
  }

  // Find the thumbnail image from job images
  const thumbnail = job.images.find((image) => image.is_thumbnail);

  // Use the thumbnail image if available, otherwise use a default image
  const jobImage = thumbnail
    ? FRONT_PORT + thumbnail.url
    : FRONT_PORT + "/images/profile/profileNotFound.svg";

  return (
    <div onClick={handleNavigate} className={styles.jobItem}>
      <picture className={styles.imageWrapper}>
        <img src={jobImage} alt={job.title} />
      </picture>
      <div className={`${styles.jobInfoWrapper} ${styles.textTruncate}`}>
        <span className={styles.jobInfoName}>{job.title}</span>
        <span className={`${styles.jobInfoIntro} ${styles.textTruncate}`}>
          {job.summary ? job.summary : "설명이 없습니다."}
        </span>
      </div>
    </div>
  );
};

export default JobItem;
