import React from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';
import timeFormatter from '../../utils/timeFormatter';

import styles from './MasterProfileDropDowns.module.scss';

export const TimeDropDown = props => {
  const { time, setTime } = props;
  let timeArr = [];
  for (let i = 0; i < 24; i++) {
    let time = i < 10 ? '0' + String(i) : String(i);
    time = `2022-01-01 ${time}:00`;
    timeArr.push(time);
  }
  return (
    <div className={styles.dropDownWrapper}>
      <span className={styles.dropDownBtn}>
        <span>{timeFormatter.getFormatedHours(time)}</span>
        <RiArrowDownSFill className={styles.arrowDownIcon} />
      </span>
      <div className={styles.dropDownContent}>
        {timeArr.map(_time => {
          return (
            <span
              key={_time}
              className={styles.dropDownItem}
              onClick={() => setTime(_time)}
            >
              {timeFormatter.getFormatedHours(_time)}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const BasicDropDown = props => {
  const { value, setValue, children, options } = props;

  return (
    <div className={styles.dropDownWrapper}>
      <span className={styles.dropDownBtn}>
        {children[0]} <span>{value}</span>
        {children[1]}
        <RiArrowDownSFill className={styles.arrowDownIcon} />
      </span>
      <div className={styles.dropDownContent}>
        {options.map(option => {
          return (
            <span
              key={option}
              className={styles.dropDownItem}
              onClick={() => setValue(option)}
            >
              {children[0]}
              <span>{option}</span>
              {children[1]}
            </span>
          );
        })}
      </div>
    </div>
  );
};
