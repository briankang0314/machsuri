import React from "react";
import JobItem from "./JobItem";
import styles from "./JobListContents.module.scss";

const JobListContents = (props) => {
  const { jobs } = props;

  return (
    <section className={styles.jobListContents}>
      {jobs.map((job) => {
        return <JobItem key={job.id} job={job} />;
      })}
    </section>
  );
};

export default JobListContents;
