import React, { useState } from 'react';
import styles from './ExpertDetailNav.module.scss';

function ExpertDetailNav(props) {
  // navbar 이동 추가 구현
  const { expert, expertInfo, expertReview, expertMedia, reviewCounts } = props;
  const { review } = expert;
  const [active, setActive] = useState('');

  const scroll = ref => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    // header, detail nav bar height 제외하고 이동
    // window.scroll(0, 100);
  };

  const select = e => {
    setActive(e.target.innerText);
  };

  return (
    <ul className={styles.container}>
      <li
        onClick={e => {
          select(e);
          scroll(expertInfo);
        }}
        className={active === '전문가 정보' ? `${styles.active}` : null}
      >
        <span>전문가 정보</span>
      </li>
      <li
        onClick={e => {
          select(e);
          scroll(expertMedia);
        }}
        className={active === '사진/동영상' ? `${styles.active}` : null}
      >
        <span>사진/동영상</span>
      </li>
      <li
        onClick={() => {
          setActive('리뷰');
          scroll(expertReview);
        }}
        className={active === '리뷰' ? `${styles.active}` : null}
      >
        <span>{`리뷰 ${!reviewCounts[0].name ? 0 : reviewCounts.length}`}</span>
      </li>
      <li
        onClick={e => {
          select(e);
          scroll(expertInfo);
        }}
        className={active === '질문 답변' ? `${styles.active}` : null}
      >
        <span>질문 답변</span>
      </li>
    </ul>
  );
}

export default ExpertDetailNav;
