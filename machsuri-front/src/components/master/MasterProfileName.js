import React, { useState } from 'react';
import MasterProfileContentTitle from '../../components/master/MasterProfileContentTitle';

import styles from './MasterProfileName.module.scss';

const MasterProfileName = props => {
  const { title, value, handleClickUpdate } = props;
  const [useName, setUseName] = useState(value);

  return (
    <MasterProfileContentTitle
      title={title}
      value={value}
      useValue={useName}
      handleClickUpdate={handleClickUpdate}
    >
      <div className={styles.myInfoNameInput}>
        <input
          type="text"
          maxLength="30"
          defaultValue={value}
          placeholder="이름 또는 업체명을 입력하세요"
          onChange={e => {
            setUseName(e.target.value);
          }}
        />
        <span className={styles.textCounter}>
          <span>{useName.length}</span>
          <span>/30자</span>
        </span>
      </div>
    </MasterProfileContentTitle>
  );
};

export default MasterProfileName;
