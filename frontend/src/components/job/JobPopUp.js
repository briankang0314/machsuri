import React from "react";
import { FRONT_PORT, SERVER_PORT } from "../../config";
import styles from "./JobPopUp.module.scss";

const JobPopup = ({ job, onClose }) => {
  if (!job) return null;

  console.log("Job object:", job);

  // Find the thumbnail image from job images, if images exist
  const thumbnail = job.images
    ? job.images.find((image) => image.is_thumbnail)
    : null;

  const jobImage = thumbnail
    ? SERVER_PORT + "/" + thumbnail.url
    : FRONT_PORT + "/images/logo/tool.png";

  // Find the job poster's profile image from job, if it exists
  const profileImage =
    job.user && job.user.profile_image_url
      ? SERVER_PORT + job.user.profile_image_url
      : FRONT_PORT + "/public/images/profile/profile_sample.jpeg";

  console.log("Profile image:", profileImage);
  console.log(FRONT_PORT + "/public/images/profile/profile_sample.jpeg");

  // Convert fee to a number and truncate the decimal part
  const feePercentage = Math.trunc(Number(job.fee)) + "%";

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className={styles.header}>
          <img
            src={profileImage}
            alt={job.title}
            className={styles.profileImage}
          />
          <div className={styles.headerDetails}>
            <div className={styles.location}>
              <span>
                {job.city.region.name} · {job.city.name}
              </span>
            </div>
            <div className={styles.date}>
              <span>
                {new Date(job.created_at).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.title}>
          <h2>{job.title}</h2>
        </div>
        <div className={styles.subtitle}>
          <span>{job.summary ? job.summary : "설명이 없습니다."}</span>
        </div>
        <div className={styles.imageGallery}>
          {job.images.map((image, index) => (
            <img
              key={index}
              src={SERVER_PORT + "/" + image.url}
              alt={`Job Image ${index + 1}`}
            />
          ))}
        </div>
        <div className={styles.description}>
          <span>{job.description}</span>
        </div>
        <div className={styles.fee}>
          {job.amount === 0 ? (
            <span>견적: 협의 필요</span>
          ) : (
            <span>{"견적: " + job.amount.toLocaleString() + " ~"}</span>
          )}
        </div>
        <div className={styles.fee}>
          <span>수수료: {feePercentage}</span>
        </div>
        <button className={styles.applyButton}>
          {job.status === "open" ? "신청 가능" : "마감"}
        </button>
      </div>
    </div>
  );
};

export default JobPopup;
