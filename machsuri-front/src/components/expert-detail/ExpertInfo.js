import React from 'react';
import {
  FaUser,
  FaTrophy,
  FaLocationArrow,
  FaClock,
  FaCreditCard,
  FaBriefcase,
  FaUsers,
  FaRegFileAlt,
  FaAward,
} from 'react-icons/fa';
import styles from './ExpertInfo.module.scss';

function ExpertInfo({ expert, review }) {
  return (
    <div className={styles.expertInfoContainer}>
      <div className={styles.infoBox}>
        <h2>기본정보</h2>
        <div>
          <div>
            <FaUser />
            <span>본인 인증</span>
          </div>
          <div>
            <FaTrophy />
            <span>{!review ? 0 : review.length} 회 고용됨</span>
          </div>
          <div>
            <FaLocationArrow />
            <span>
              {expert.address} {expert.detail_address}
            </span>
          </div>
          <div>
            <FaClock />
            <span>
              {!expert.start_time ? '00:00' : expert.start_time.slice(11, 18)} -{' '}
              {!expert.end_time ? '00:00' : expert.end_time.slice(11, 18)}
            </span>
          </div>
          <div>
            <FaCreditCard />
            <span>숨고페이, 카드결제, 계좌이체, 현금결제 가능</span>
          </div>
        </div>
      </div>
      <div
        className={
          !expert.work_experience || !expert.employee_number
            ? styles.Off
            : styles.infoBox
        }
      >
        <h2>추가정보</h2>
        <div>
          <div>
            <FaBriefcase />
            <span>
              경력{' '}
              {expert.work_experience < 1
                ? ' 1년 미만'
                : `${expert.work_experience}년`}
            </span>
          </div>
          <div>
            <FaUsers />
            <span>
              직원 수
              {expert.employee_number === null
                ? ' 1명 '
                : ` ${expert.employee_number} 명`}{' '}
              (본인 포함)
            </span>
          </div>
          <div>
            <FaRegFileAlt />
            <span>사업자등록증 등록완료</span>
          </div>
          <div>
            <FaAward />
            <span>자격증 등록완료</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertInfo;
