import React, { useState } from 'react';
import styles from './MasterListHeader.module.scss';
import { BsGrid } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { GoLocation } from 'react-icons/go';

import FilteringModal from '../modal/FilteringModal';

const MasterListHeader = props => {
  const {
    masterNumber,
    useSort,
    setUseSort,
    useCategory,
    setUseCategory,
    useAddress,
    setUseAddress,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState({
    type: '',
    visible: false,
  });
  function handleChangeSort(text) {
    setUseSort(text);
  }

  function handleOpenModal(type) {
    setIsModalVisible({ type, visible: true });
  }
  return (
    <>
      <header className={styles.masterListHeader}>
        <div className={styles.headerNav}>
          <h1>고수찾기</h1>
          <span>
            숭고 <IoIosArrowForward size="10px" />{' '}
            {!useAddress
              ? '지역'
              : useAddress.name + ' ' + useAddress.details.name}
            {', '}
            {!useCategory
              ? '카테고리'
              : useCategory.name + ' - ' + useCategory.lessons.name}
          </span>
        </div>
        <div className={styles.headerCategory}>
          <button
            className={styles.addressBtn}
            onClick={() => handleOpenModal('address')}
          >
            <GoLocation className={styles.icon} size="12px" />
            {!useAddress
              ? '전국'
              : useAddress.name + ' ' + useAddress.details.name}
          </button>
          <button
            className={styles.categoryBtn}
            onClick={() => handleOpenModal('category')}
          >
            <BsGrid className={styles.icon} size="12px" />
            {!useCategory
              ? '서비스 전체'
              : useCategory.name + ' - ' + useCategory.lessons.name}
          </button>
        </div>
        <div className={styles.headerSort}>
          <div className={styles.masterCounterWapper}>
            <span>{masterNumber}</span>
            <span> 명의 고수</span>
          </div>
          <div className={styles.dropDownWrapper}>
            <button className={styles.dropDownBtn}>
              {useSort} <IoIosArrowDown />
            </button>
            <div className={styles.dropDownContent}>
              <span onClick={e => handleChangeSort(e.target.innerText)}>
                리뷰순
              </span>
              <span onClick={e => handleChangeSort(e.target.innerText)}>
                최신순
              </span>
            </div>
          </div>
        </div>
      </header>
      {isModalVisible.visible && (
        <FilteringModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setUseFilter={
            isModalVisible.type === 'address' ? setUseAddress : setUseCategory
          }
        />
      )}
    </>
  );
};

export default MasterListHeader;
