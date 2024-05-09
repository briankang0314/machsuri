import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/jobs/all") // Adjust the URL based on your server setup
      .then((response) => {
        setJobs(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading the job posts!</div>;

  return (
    <div>
      <h1>Job Posts</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="job-listing">
            <h2>{job.title}</h2>
            <p>{job.summary}</p>
            <div>Fee: {parseFloat(job.fee).toFixed(2)} %</div>
            <div>Contact: {job.contact_info}</div>
            <div>Status: {job.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
