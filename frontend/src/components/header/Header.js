import { React, useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import { FaRegBell, FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { FRONT_PORT } from "../../config";

function Header() {
  const navigate = useNavigate();
  const [profileClick, setProfileClick] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isNewQuotation, setIsNewQuotation] = useState(true);
  const [chatNumber, setChatNumber] = useState(26);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  const logoutBtn = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    setIsLogin(false);
  };

  const profile = useRef();
  const profileOutline = () => {
    if (!profileClick) {
      profile.current.style.outline = "2px solid #48bbed";
      setProfileClick(true);
    } else {
      profile.current.style.outline = "none";
      setProfileClick(false);
    }
  };

  function handleNavigate(path) {
    navigate(path);
  }

  return (
    <div className={styles.headerBox}>
      <nav className={styles.header}>
        <span className={styles.headerTitle}>
          <span className={styles.headerLogo}>
            <img
              onClick={() => handleNavigate("/")}
              // Original.png is in the public/images/logo folder
              src={"/images/profile/profile_sample.jpeg"}
              width="100px"
              alt="Original"
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
              <li onClick={() => handleNavigate("/received_report")}>
                <div className={styles.flexRow}>
                  받은 견적
                  {isNewQuotation ? (
                    <div className={`${styles.redDot}`} />
                  ) : null}
                </div>
              </li>
              <li onClick={() => handleNavigate("")}>
                <div className={`${styles.flexRow} ${styles.disabled}`}>
                  채팅
                  <div className={`${styles.chatNum}`}>{chatNumber}</div>
                </div>
              </li>
              <li onClick={logoutBtn}>
                <div className={styles.flexRow}>로그아웃</div>
              </li>
              <li>
                <FaRegBell size="1.3em" className={styles.bell} />
              </li>
              <li>
                <div className={styles.flexRow}>
                  <img
                    src={FRONT_PORT + "/images/profile/profileNotFound.svg"}
                    className={styles.profileImg}
                    alt="profile_image"
                    ref={profile}
                    onClick={profileOutline}
                  />
                  <div className={`${styles.grayColor} ${styles.disabled}`}>
                    {profileClick ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>
              </li>
            </>
          ) : (
            <>
              <li onClick={() => handleNavigate("/login")}>로그인</li>
              <li
                onClick={() => handleNavigate("users/register")}
                className={styles.expertSignup}
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
