import React, { useState } from "react";
import JobItem from "./JobItem";
import JobPopup from "./JobPopUp";
import JobListHeader from "./JobListHeader";
import styles from "./JobListContents.module.scss";

const JobListContents = (props) => {
  const { jobs, currentUser } = props;
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobList, setJobList] = useState(jobs);
  const [filter, setFilter] = useState("");

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleUpdateJob = (updatedJob) => {
    setJobList((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    setSelectedJob(updatedJob); // Update the selected job to reflect the changes
  };

  const filteredJobs = jobList.filter(
    (job) => !filter || job.status === filter
  );

  return (
    <section className={styles.jobListContents}>
      <JobListHeader jobCount={jobs.length} setFilter={handleFilterChange} />{" "}
      {/* Pass jobCount and setFilter */}
      {filteredJobs.map((job) => (
        <JobItem
          key={job.id}
          job={job}
          onClick={handleJobClick}
          currentUser={currentUser} // Pass currentUser
        />
      ))}
      {selectedJob && (
        <JobPopup
          job={selectedJob}
          onClose={handleClosePopup}
          currentUser={currentUser} // Pass currentUser
          onUpdateJob={handleUpdateJob} // Pass handleUpdateJob
        />
      )}
    </section>
  );
};

export default JobListContents;
