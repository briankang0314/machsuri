import React, { useState } from 'react';
import ExpertProfileContentTitle from '../../components/expert/ExpertProfileContentTitle';

import { BasicDropDown } from '../../components/drop_down/ExpertProfileDropDowns';

// import styles from './ExpertProfileEmployeeNum.module.scss';

const ExpertProfileEmployeeNum = props => {
  const { title, value, handleClickUpdate } = props;
  const [useEmployeeNum, setUseEmployeeNum] = useState(value ? value : 1);

  const options = [1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50]; // 선택할 직원수

  return (
    <ExpertProfileContentTitle
      title={title}
      value={value ? `${value}명 이상` : ''}
      useValue={useEmployeeNum}
      handleClickUpdate={handleClickUpdate}
    >
      <BasicDropDown
        value={useEmployeeNum}
        setValue={setUseEmployeeNum}
        options={options}
      >
        <span style={{ marginRight: '3px' }}>직원</span>
        <span>명</span>
      </BasicDropDown>
    </ExpertProfileContentTitle>
  );
};

export default ExpertProfileEmployeeNum;
