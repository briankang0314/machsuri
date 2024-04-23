import React, { useState } from 'react';
import MasterCategoryModal from '../modal/MasterCategoryModal';
import { BsXLg } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';

import styles from './MasterProfileService.module.scss';

const MasterProfileService = props => {
  const { title, data, handleClickUpdate } = props;

  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [useCategories, setUseCategories] = useState(
    data.map(category => {
      return {
        id: category.lessonCategories.id,
        name: category.lessonCategories.name,
      };
    })
  );
  function handleCateRemove(lesson) {
    let setArr = useCategories.filter(item => {
      return item.id !== lesson.id;
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
            {useCategories.map(lesson => {
              return (
                <div
                  className={styles.myUpdateServiceList}
                  key={lesson.id}
                  onClick={() => handleCateRemove(lesson)}
                >
                  <span value={lesson.id}>{lesson.name}</span>
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
                key={category.lessonCategories.id}
              >
                <span value={category.lessonCategories.id}>
                  {category.lessonCategories.name}
                </span>
              </div>
            );
          })
        )}
      </div>
      {isModalVisible && (
        <MasterCategoryModal
          useCategories={useCategories}
          setUseCategories={setUseCategories}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </div>
  );
};

export default MasterProfileService;
