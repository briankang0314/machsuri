import React, { useState } from "react";
import JobItem from "./JobItem";
import JobPopup from "./JobPopUp";
import styles from "./JobListContents.module.scss";

const JobListContents = (props) => {
  const { jobs } = props;
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  return (
    <section className={styles.jobListContents}>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} onClick={handleJobClick} />
      ))}
      {selectedJob && <JobPopup job={selectedJob} onClose={handleClosePopup} />}
    </section>
  );
};

export default JobListContents;
