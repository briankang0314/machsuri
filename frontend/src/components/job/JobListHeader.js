import React from "react";

const JobListHeader = ({ onFilterChange }) => {
  const handleStatusChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <header>
      <select onChange={handleStatusChange}>
        <option value="">All</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </header>
  );
};

export default JobListHeader;
