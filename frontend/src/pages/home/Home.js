import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import JobListContents from "../../components/job/JobListContents";
import JobListHeader from "../../components/job/JobListHeader";
import styles from "./Home.module.scss";
import { SERVER_PORT } from "../../config";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
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

  const fetchCurrentUser = (userId) => {
    const accessToken = localStorage.getItem("access_token");

    fetch(`${SERVER_PORT}/users/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("response:", response);
        return response.json();
      })
      .then((data) => {
        setCurrentUser(data);
        localStorage.setItem("currentUser", JSON.stringify(data)); // Store in local storage
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");

    if (!didFetch.current) {
      fetchJobs();
      if (accessToken && userId) {
        fetchCurrentUser(userId);
      }
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
              <JobListContents jobs={jobs} currentUser={currentUser} />
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
