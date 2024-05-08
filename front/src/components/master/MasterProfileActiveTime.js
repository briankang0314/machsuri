import React, { useState } from 'react';
import ExpertProfileContentTitle from '../../components/expert/ExpertProfileContentTitle';
import { TimeDropDown } from '../../components/drop_down/ExpertProfileDropDowns';
import timeFormatter from '../../utils/timeFormatter';

import styles from './ExpertProfileActiveTime.module.scss';

const ExpertProfileActiveTime = props => {
  const { title, value, handleClickUpdate } = props;
  const [useStartTime, setUseStartTime] = useState(
    value.start ? value.start : '2022-01-01 09:00'
  );
  const [useEndTime, setUseEndTime] = useState(
    value.end ? value.end : '2022-01-01 09:00'
  );
  const timeFullName =
    value.start && value.end
      ? `${timeFormatter.getFormatedHours(
          value.start
        )} - ${timeFormatter.getFormatedHours(value.end)}`
      : null;
  return (
    <ExpertProfileContentTitle
      title={title}
      value={timeFullName}
      useValue={{ start: useStartTime, end: useEndTime }}
      handleClickUpdate={handleClickUpdate}
    >
      <TimeDropDown time={useStartTime} setTime={setUseStartTime} />
      <span className={styles.timeSplit}>부터</span>
      <TimeDropDown time={useEndTime} setTime={setUseEndTime} />
      <span className={styles.timeSplit}>까지</span>
    </ExpertProfileContentTitle>
  );
};

export default ExpertProfileActiveTime;
