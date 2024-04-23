import React from 'react';
import styles from './MasterRequest.module.scss';

function MasterRequest(props) {
  const { master } = props;
  return (
    <aside className={styles.container}>
      <div className={styles.text}>
        {!master ? null : master.name} 고수에게 원하는 서비스의 견적을
        받아보세요
      </div>
      <div className={styles.btnWrapper}>
        <button className={styles.sendBtn}>견적 요청하기</button>
      </div>
    </aside>
  );
}

export default MasterRequest;
