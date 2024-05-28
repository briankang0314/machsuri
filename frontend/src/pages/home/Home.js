import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import JobListContents from "../../components/job/JobListContents";
import JobListHeader from "../../components/job/JobListHeader";
import styles from "./Home.module.scss";
import { SERVER_PORT } from "../../config";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const didFetch = useRef(false);

  const fetchJobs = () => {
    setIsLoading(true);
    fetch(`${SERVER_PORT}/jobs/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!didFetch.current) {
      fetchJobs();
      didFetch.current = true;
    }
  }, []);

  return (
    <div>
      <Header />
      <main className={styles.jobList}>
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <>
            {jobs.length > 0 ? (
              <JobListContents jobs={jobs} />
            ) : (
              <div className={styles.notFoundJob}>
                <span>작업이 없어요!</span>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

const Loading = (props) => {
  const { isLoading } = props;
  return <div className={isLoading ? styles.loading : styles.unloading} />;
};

export default Home;
