import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.scss";

function Footer() {
  const navigate = useNavigate();

  function handleNavigate(path) {
    navigate(path);
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLine} />
      <div className={styles.infoBox}>
        <div className={styles.contacts}>
          <p className={styles.gen}>1234-5678</p>
          평일 10:00 - 18:00 (점심시간 13:00 - 14:00 제외 · 주말/공휴일 제외)
        </div>
        <div className={styles.footerLink}>
          <div className={styles.hiddenLine} />
          <ul>
            <li className={`${styles.footerTitle} ${styles.disabled}`}>
              고객안내
            </li>
            <li className={styles.disabled}>이용안내</li>
            <li className={styles.disabled}>안전정책</li>
            <li className={styles.disabled}>예상금액</li>
            <li
              className={styles.clickable}
              onClick={() => handleNavigate("/users/all")}
            >
              전문가찾기
            </li>
          </ul>
          <div className={styles.hiddenLine} />
          <ul>
            <li className={`${styles.footerTitle} ${styles.disabled}`}>
              전문가안내
            </li>
            <li className={styles.disabled}>이용안내</li>
            <li className={styles.disabled}>전문가가이드</li>
            <li
              className={styles.clickable}
              onClick={() => handleNavigate("/users/register")}
            >
              전문가가입
            </li>
            <li className={styles.disabled}>전문가센터</li>
          </ul>
          <div className={styles.hiddenLine} />
          <ul>
            <li className={`${styles.footerTitle} ${styles.disabled}`}>
              고객센터
            </li>
            <li className={styles.disabled}>공지사항</li>
            <li className={styles.disabled}>자주묻는질문</li>
          </ul>
          <div className={styles.hiddenLine} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
