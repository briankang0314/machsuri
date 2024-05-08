import React, { useState } from 'react';
import ExpertProfileContentTitle from '../../components/expert/ExpertProfileContentTitle';
import FilteringModal from '../../components/modal/FilteringModal';

import styles from './ExpertProfileAddress.module.scss';

const ExpertProfileAddress = props => {
  const { title, value, handleClickUpdate } = props;
  const [useAddress, setUseAddress] = useState(value);
  const [isModalVisible, setIsModalVisible] = useState({
    type: '',
    visible: false,
  });
  const addressFullName = value ? `${value.name} ${value.details.name}` : null;
  return (
    <ExpertProfileContentTitle
      title={title}
      value={addressFullName}
      useValue={useAddress}
      handleClickUpdate={handleClickUpdate}
    >
      <div className={styles.myInfoAddressSelector}>
        <button
          onClick={() => setIsModalVisible({ type: 'address', visible: true })}
        >
          {useAddress.name} {useAddress.details.name}
        </button>
        {isModalVisible.visible && (
          <FilteringModal
            path="profile"
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            setUseFilter={setUseAddress}
          />
        )}
      </div>
    </ExpertProfileContentTitle>
  );
};

export default ExpertProfileAddress;
