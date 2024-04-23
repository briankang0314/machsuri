import React, { useState } from 'react';
import styles from './MasterProfileContentTitle.module.scss';

const MasterProfileContentTitle = props => {
  const { children, title, value, useValue, handleClickUpdate } = props;
  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <div className={styles.myInfo}>
      <div className={styles.myInfoTitle}>
        <span>{title}</span>
        <span
          style={{ color: !value || isUpdating ? '#ff3131' : '' }}
          onClick={() => {
            setIsUpdating(!isUpdating);
            if (isUpdating) {
              handleClickUpdate(title, useValue);
            }
          }}
        >
          {!value ? '등록하기' : isUpdating ? '저장' : '수정'}
        </span>
      </div>
      {isUpdating ? (
        children
      ) : (
        <div className={styles.myInfoValue}>{value}</div>
      )}
    </div>
  );
};
export default MasterProfileContentTitle;
