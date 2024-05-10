import React, { useState } from 'react';
import ExpertProfileContentTitle from './ExpertProfileContentTitle';

import { BasicDropDown } from '../drop_down/ExpertProfileDropDowns';

// import styles from './ExpertProfileWorkEx.module.scss';

const ExpertProfileWorkEx = props => {
  const { title, value, handleClickUpdate } = props;
  const [useWorkEx, setUseWorkEx] = useState(value ? value : 1);

  const options = [1, 2, 3, 4, 5, 10, 15, 20, 30]; // 선택할 년수

  return (
    <ExpertProfileContentTitle
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
    </ExpertProfileContentTitle>
  );
};

export default ExpertProfileWorkEx;
