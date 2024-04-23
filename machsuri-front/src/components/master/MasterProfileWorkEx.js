import React, { useState } from 'react';
import MasterProfileContentTitle from '../../components/master/MasterProfileContentTitle';

import { BasicDropDown } from '../../components/drop_down/MasterProfileDropDowns';

// import styles from './MasterProfileWorkEx.module.scss';

const MasterProfileWorkEx = props => {
  const { title, value, handleClickUpdate } = props;
  const [useWorkEx, setUseWorkEx] = useState(value ? value : 1);

  const options = [1, 2, 3, 4, 5, 10, 15, 20, 30]; // 선택할 년수

  return (
    <MasterProfileContentTitle
      title={title}
      value={value ? `${value}년 이상` : ''}
      useValue={useWorkEx}
      handleClickUpdate={handleClickUpdate}
    >
      <BasicDropDown
        value={useWorkEx}
        setValue={setUseWorkEx}
        options={options}
      >
        <span style={{ marginRight: '3px' }}>경력</span>
        <span>년</span>
      </BasicDropDown>
    </MasterProfileContentTitle>
  );
};

export default MasterProfileWorkEx;
