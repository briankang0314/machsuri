import React from "react";
import { FRONT_PORT, SERVER_PORT } from "../../config";
import { formatTimeAgo } from "../../utils/formatTimeAgo";

import styles from "./JobItem.module.scss";

const JobItem = ({ job, onClick, currentUser }) => {
  console.log("JobItem Job object:", job);

  // Find the thumbnail image from job images, if images exist
  const thumbnail = job.images
    ? job.images.find((image) => image.is_thumbnail)
    : null;

  // Use the thumbnail image if available, otherwise use a default image
  const jobImage = thumbnail
    ? SERVER_PORT + "/" + thumbnail.url
    : FRONT_PORT + "/images/logo/tool.png";

  // Format the posted time
  const postedTime = formatTimeAgo(job.created_at);

  // Convert fee to a number and truncate the decimal part
  const feePercentage = Math.trunc(Number(job.fee)) + "%";

  // Check if the job belongs to the current user
  const isOwnedByCurrentUser = currentUser && job.user_id === currentUser.id;

  return (
    <div onClick={() => onClick(job)} className={styles.jobItem}>
      <picture className={styles.imageWrapper}>
        <img src={jobImage} alt={job.title} className={styles.jobImage} />
      </picture>
      <div className={styles.jobDetails}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h2>{job.title}</h2>
            {isOwnedByCurrentUser && (
              <span className={styles.ownedBadge}>내가 올린 게시물</span>
            )}
          </div>
          <div className={styles.location}>
            <span>
              {job.city.region.name} · {job.city.name}
            </span>
          </div>
          <div className={styles.postedTime}>
            <span>{postedTime}</span>
          </div>
        </div>
        <div className={styles.categories}>
          {job.job_categories && job.job_categories.length > 0 ? (
            <div className={styles.minorCategories}>
              {job.job_categories.map((category, index) => (
                <span key={index} className={styles.category}>
                  {category.minor_category.name}
                </span>
              ))}
            </div>
          ) : (
            <span>No Categories</span>
          )}
        </div>
        <div className={styles.description}>
          <span>{job.summary ? job.summary : "설명이 없습니다."}</span>
        </div>
        <div className={styles.feeContainer}>
          <div className={styles.amount}>
            {job.amount === 0 ? (
              <span>견적: 협의 필요</span>
            ) : (
              <span>{"견적: " + job.amount.toLocaleString() + " ~"}</span>
            )}
          </div>
          <div className={styles.fee}>
            <span>수수료: {feePercentage}</span>
          </div>
        </div>
        <button className={styles.applyButton}>
          {job.status === "open" ? "신청 가능" : "마감"}
        </button>
      </div>
    </div>
  );
};

export default JobItem;
