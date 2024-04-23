import React, { useState } from 'react';
import MasterProfileContentTitle from '../../components/master/MasterProfileContentTitle';

import styles from './MasterProfileIntro.module.scss';

const MasterProfileIntro = props => {
  const { title, value, handleClickUpdate } = props;
  const [useIntro, setUseIntro] = useState(value);

  return (
    <MasterProfileContentTitle
      title={title}
      value={value}
      useValue={useIntro}
      handleClickUpdate={handleClickUpdate}
    >
      <div className={styles.myInfoIntroInput}>
        <textarea
          rows="6"
          defaultValue={value}
          onChange={e => {
            setUseIntro(e.target.value);
          }}
          placeholder="고수 자신에 대한 소개"
          maxLength="80"
        />
        <span className={styles.textCounter}>
          <span>{useIntro?.length ? useIntro.length : 0}</span>
          <span>/80자</span>
        </span>
      </div>
    </MasterProfileContentTitle>
  );
};

export default MasterProfileIntro;
