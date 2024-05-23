import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import { FaRegBell, FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  const logoutBtn = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    setIsLogin(false);
  };

  const profile = useRef();

  const profileOutline = () => {
    if (isLogin) {
      navigate("/profile");
    }
  };

  function handleNavigate(path) {
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    navigate(path);
  }

  return (
    <div className={styles.headerBox}>
      <nav className={styles.header}>
        <span className={styles.headerTitle}>
          <span className={styles.headerLogo}>
            <img
              onClick={() => handleNavigate("/")}
              src="/images/logo/fix.png"
              width="100px"
              alt="Logo"
            />
          </span>
          <div className={`${styles.headerSearchBox} ${styles.hidden}`}>
            <input
              className={styles.headerSearch}
              placeholder="어떤 서비스가 필요하세요?"
            />
            <FiSearch className={styles.searchIcon} />
          </div>
        </span>

        <span className={`${styles.menuBtn} ${styles.hidden}`}>
          <FaBars />
        </span>

        <span className={`${styles.searchBtn} ${styles.hidden}`}>
          <FiSearch />
        </span>
        <ul className={styles.headerBtn}>
          {isLogin ? (
            <>
              <li onClick={logoutBtn}>
                <div className={styles.flexRow}>로그아웃</div>
              </li>
              <li>
                <FaRegBell size="1.3em" className={styles.bell} />
              </li>
              <li>
                <div className={styles.flexRow}>
                  <img
                    src={"/images/profile/profileNotFound.svg"}
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
