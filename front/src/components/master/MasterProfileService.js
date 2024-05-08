import React, { useState } from 'react';
import ExpertCategoryModal from '../modal/ExpertCategoryModal';
import { BsXLg } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';

import styles from './ExpertProfileService.module.scss';

const ExpertProfileService = props => {
  const { title, data, handleClickUpdate } = props;

  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [useCategories, setUseCategories] = useState(
    data.map(category => {
      return {
        id: category.minorCategories.id,
        name: category.minorCategories.name,
      };
    })
  );
  function handleCateRemove(minor) {
    let setArr = useCategories.filter(item => {
      return item.id !== minor.id;
    });
    setUseCategories(setArr);
  }
  return (
    <div className={styles.myInfo}>
      <div className={styles.myInfoTitle}>
        <span>{title}</span>
        <span
          style={{ color: isUpdating ? '#ff3131' : '' }}
          onClick={() => {
            setIsUpdating(!isUpdating);
            if (isUpdating) {
              handleClickUpdate(title, useCategories);
            }
          }}
        >
          {isUpdating ? '저장' : '수정'}
        </span>
      </div>
      <div className={styles.myServiceWrap}>
        {isUpdating ? (
          <>
            <div
              className={styles.addServiceBtn}
              onClick={() => setIsModalVisible(true)}
            >
              <FiPlus size="18px" />
              <span>서비스 추가</span>
            </div>
            {useCategories.map(minor => {
              return (
                <div
                  className={styles.myUpdateServiceList}
                  key={minor.id}
                  onClick={() => handleCateRemove(minor)}
                >
                  <span value={minor.id}>{minor.name}</span>
                  <BsXLg size="12px" color="#796c6c70" />
                </div>
              );
            })}
          </>
        ) : (
          data.map(category => {
            return (
              <div
                className={styles.myServiceList}
                key={category.minorCategories.id}
              >
                <span value={category.minorCategories.id}>
                  {category.minorCategories.name}
                </span>
              </div>
            );
          })
        )}
      </div>
      {isModalVisible && (
        <ExpertCategoryModal
          useCategories={useCategories}
          setUseCategories={setUseCategories}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </div>
  );
};

export default ExpertProfileService;
