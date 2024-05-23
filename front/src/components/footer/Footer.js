import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.scss';
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import { VscGithub } from 'react-icons/vsc';
import { FaSlack, FaFacebook } from 'react-icons/fa';

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
          평일 10:00 - 18:00 <br />
          (점심시간 13:00 - 14:00 제외 · 주말/공휴일 제외)
        </div>
        <div className={styles.footerLink}>
          <div className={styles.hiddenLine} />
          <ul>
            <li className={`${styles.footerTitle} ${styles.disabled}`}>
              고객 안내
            </li>
            <li className={styles.disabled}>이용안내</li>
            <li className={styles.disabled}>안전정책</li>
            <li className={styles.disabled}>예상금액</li>
            <li
              className={styles.clickable}
              onClick={() => handleNavigate('/expert/list')}
            >
              작업찾기
            </li>
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
      <div className={styles.explanation}>
        <div className={styles.textBox}>
          <ul className={styles.documents}>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>사업자 정보확인</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
