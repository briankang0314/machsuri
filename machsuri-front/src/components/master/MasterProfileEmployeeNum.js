import React, { useState } from 'react';
import MasterProfileContentTitle from '../../components/master/MasterProfileContentTitle';

import { BasicDropDown } from '../../components/drop_down/MasterProfileDropDowns';

// import styles from './MasterProfileEmployeeNum.module.scss';

const MasterProfileEmployeeNum = props => {
  const { title, value, handleClickUpdate } = props;
  const [useEmployeeNum, setUseEmployeeNum] = useState(value ? value : 1);

  const options = [1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50]; // 선택할 직원수

  return (
    <MasterProfileContentTitle
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
    </MasterProfileContentTitle>
  );
};

export default MasterProfileEmployeeNum;
