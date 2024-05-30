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
        <span>총 {jobCount} 개의 작업을 찾았습니다.</span>
      </div>
      <div className={styles.headerCategory}>
        <select
          onChange={handleStatusFilterChange}
          className={styles.statusFilter}
        >
          <option value="">전체</option>
          <option value="open">신청 가능</option>
          <option value="closed">마감</option>
        </select>
      </div>
    </header>
  );
};

export default JobListHeader;
