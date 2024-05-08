import React, { useState } from 'react';
import ExpertProfileContentTitle from '../../components/expert/ExpertProfileContentTitle';

import styles from './ExpertProfileIntro.module.scss';

const ExpertProfileIntro = props => {
  const { title, value, handleClickUpdate } = props;
  const [useIntro, setUseIntro] = useState(value);

  return (
    <ExpertProfileContentTitle
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
          placeholder="전문가 자신에 대한 소개"
          maxLength="80"
        />
        <span className={styles.textCounter}>
          <span>{useIntro?.length ? useIntro.length : 0}</span>
          <span>/80자</span>
        </span>
      </div>
    </ExpertProfileContentTitle>
  );
};

export default ExpertProfileIntro;
