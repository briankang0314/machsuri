import React from "react";
import JobPostItem from "./JobPostItem"; // You need to create this component similar to ExpertItem
import styles from "./JobPostListContents.module.scss"; // Consider renaming the styling file too

const JobListContents = (props) => {
  const { jobPosts } = props;

  return (
    <section className={styles.jobPostListContents}>
      {jobPosts.map((job) => {
        return <JobPostItem key={job.id} job={job} />;
      })}
    </section>
  );
};

export default JobPostListContents;
