import React from "react";
import { FRONT_PORT, SERVER_PORT } from "../../config";
import { formatTimeAgo } from "../../utils/formatTimeAgo";

import styles from "./JobItem.module.scss";

const JobItem = ({ job, onClick }) => {
  // Find the thumbnail image from job images, if images exist
  const thumbnail = job.images
    ? job.images.find((image) => image.is_thumbnail)
    : null;

  // Use the thumbnail image if available, otherwise use a default image
  const jobImage = thumbnail
    ? SERVER_PORT + "/" + thumbnail.url
    : FRONT_PORT + "/images/logo/tool.png";

  // print the path to the image
  // console.log("path to the image: " + jobImage);

  // Format the posted time
  const postedTime = formatTimeAgo(job.created_at);

  // Convert fee to a number and truncate the decimal part
  const feePercentage = Math.trunc(Number(job.fee)) + "%";

  return (
    <div onClick={() => onClick(job)} className={styles.jobItem}>
      <picture className={styles.imageWrapper}>
        <img src={jobImage} alt={job.title} />
      </picture>
      <div className={styles.jobDetails}>
        <div className={styles.location}>
          <span>
            {job.city.region.name} · {job.city.name} · {postedTime}
          </span>
        </div>
        <div className={styles.title}>
          <h2>{job.title}</h2>
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
        <div className={styles.fee}>
          {job.amount === 0 ? (
            <span>협의 필요</span>
          ) : (
            <span>{job.amount.toLocaleString() + " ~"}</span>
          )}
        </div>
        <div className={styles.fee}>
          <span>{feePercentage}</span>
        </div>
        <button className={styles.applyButton}>
          {job.status === "open" ? "신청 가능" : "마감"}
        </button>
      </div>
    </div>
  );
};

export default JobItem;
