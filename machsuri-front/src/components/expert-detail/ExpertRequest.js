import React from 'react';
import styles from './ExpertRequest.module.scss';

function ExpertRequest(props) {
  const { expert } = props;
  return (
    <aside className={styles.container}>
      <div className={styles.text}>
        {!expert ? null : expert.name} 전문가에게 원하는 서비스의 견적을
        받아보세요
      </div>
      <div className={styles.btnWrapper}>
        <button className={styles.sendBtn}>견적 요청하기</button>
      </div>
    </aside>
  );
}

export default ExpertRequest;
