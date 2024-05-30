import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SERVER_PORT } from "../../config";
import Notification from "../notification/Notification";

function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "/images/profile/profileNotFound.svg"
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const profile = useRef();

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("currentUser");
    setIsLogin(false);
    navigate("/users/login");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");

    console.log("accessToken:", accessToken);
    console.log("userId:", userId);

    if (accessToken) {
      const { exp } = JSON.parse(atob(accessToken.split(".")[1]));
      if (Date.now() >= exp * 1000) {
        console.log("Token expired, logging out");
        handleLogout();
        return;
      }

      setIsLogin(true);
      // Fetch user profile data
      fetch(`${SERVER_PORT}/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.profile_image_url) {
            console.log("Profile data:", data);
            const profileImageUrl = `${SERVER_PORT}${data.profile_image_url}`;
            console.log("Profile image URL:", profileImageUrl);
            setProfileImage(profileImageUrl);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });

      fetch(`${SERVER_PORT}/notifications/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log("Notifications:", data);
            setNotifications(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    } else {
      setIsLogin(false);
    }
  }, []);

  const profileOutline = () => {
    if (isLogin) {
      navigate("/users/profile/" + localStorage.getItem("user_id"));
    }
  };

  function handleNavigate(path) {
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    navigate(path);
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationRead = (updatedNotifications) => {
    setNotifications(updatedNotifications);
  };

  return (
    <div className={styles.headerBox}>
      <nav className={styles.header}>
        <span className={styles.headerTitle}>
          <span className={styles.headerLogo}>
            <img
              onClick={() => handleNavigate("/")}
              src="/images/logo/tool.svg"
              width="100px"
              alt="Logo"
            />
          </span>
        </span>
        <ul className={styles.headerBtn}>
          {isLogin ? (
            <>
              <li onClick={handleLogout}>
                <div className={styles.flexRow}>로그아웃</div>
              </li>
              <li
                className={styles.notificationIcon}
                onClick={toggleNotifications}
              >
                <FaRegBell size="1.3em" className={styles.bell} />
                {showNotifications && (
                  <div className={styles.notifications}>
                    <Notification
                      notifications={notifications}
                      onNotificationRead={handleNotificationRead}
                    />
                  </div>
                )}
              </li>
              <li>
                <div className={styles.flexRow}>
                  <img
                    src={profileImage}
                    className={styles.profileImg}
                    alt="profile_image"
                    ref={profile}
                    onClick={profileOutline}
                  />
                </div>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/jobs/register")}
                  className={styles.jobRegisterBtn}
                >
                  작업등록
                </button>
              </li>
            </>
          ) : (
            <>
              <li onClick={() => handleNavigate("users/login")}>로그인</li>
              <li
                onClick={() => handleNavigate("users/register")}
                className={styles.userSignup}
              >
                회원가입
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
