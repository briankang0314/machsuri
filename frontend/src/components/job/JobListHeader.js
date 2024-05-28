import React from "react";
import styles from "./JobListHeader.module.scss";

const JobListHeader = ({ jobCount, setFilter }) => {
  function handleStatusFilterChange(event) {
    setFilter(event.target.value);
  }

  return (
    <header className={styles.jobListHeader}>
      <div className={styles.headerNav}>
        <h1>작업찾기</h1>
        <span>{jobCount} 개의 작업</span>
      </div>
      <div className={styles.headerCategory}>
        <select
          onChange={handleStatusFilterChange}
          className={styles.statusFilter}
        >
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </header>
  );
};

export default JobListHeader;
