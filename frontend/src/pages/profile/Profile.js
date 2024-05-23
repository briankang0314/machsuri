import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./Profile.module.scss";
import { SERVER_PORT } from "../../config";

function Profile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!userId) {
      // If no user ID is found, navigate to login
      navigate("/users/login");
    } else {
      fetchProfile();
      adjustMainMargin();
      window.addEventListener("resize", adjustMainMargin);
      return () => {
        window.removeEventListener("resize", adjustMainMargin);
      };
    }
  }, [userId]);

  const adjustMainMargin = () => {
    const header = document.querySelector("header"); // Update with the correct header selector
    if (header && mainRef.current) {
      mainRef.current.style.marginTop = `${header.offsetHeight}px`;
    }
  };

  const fetchProfile = () => {
    setIsLoading(true);
    fetch(`${SERVER_PORT}/users/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
      });
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const updatedData = {
      name: user.name,
      profile_image_url: user.profile_image_url,
      intro: user.intro,
      phone_number: user.phone_number,
      work_start_time: user.work_start_time,
      work_end_time: user.work_end_time,
      work_experience: user.work_experience,
    };

    fetch(`${SERVER_PORT}/users/profile/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setIsLoading(false);
        alert("프로필이 성공적으로 업데이트되었습니다.");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setIsLoading(false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <Header />
      <main className={styles.profile} ref={mainRef}>
        {isLoading && <div className={styles.loading}>로딩 중...</div>}
        <form onSubmit={handleUpdateProfile}>
          <label htmlFor="profile_image_url">프로필 이미지</label>
          <input
            type="text"
            id="profile_image_url"
            name="profile_image_url"
            value={user.profile_image_url || ""}
            onChange={handleChange}
          />

          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name || ""}
            onChange={handleChange}
          />

          <label htmlFor="intro">소개</label>
          <textarea
            id="intro"
            name="intro"
            value={user.intro || ""}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="phone_number">전화번호</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={user.phone_number || ""}
            onChange={handleChange}
          />

          <label htmlFor="work_start_time">업무 시작 시간</label>
          <input
            type="time"
            id="work_start_time"
            name="work_start_time"
            value={user.work_start_time || ""}
            onChange={handleChange}
          />

          <label htmlFor="work_end_time">업무 종료 시간</label>
          <input
            type="time"
            id="work_end_time"
            name="work_end_time"
            value={user.work_end_time || ""}
            onChange={handleChange}
          />

          <label htmlFor="work_experience">경력 (년)</label>
          <input
            type="number"
            id="work_experience"
            name="work_experience"
            value={user.work_experience || ""}
            onChange={handleChange}
          />

          <button type="submit" disabled={isLoading}>
            프로필 업데이트
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
