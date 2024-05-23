import React, { useState } from "react";
import styles from "./JobListHeader.module.scss";
import { BsGrid } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { GoLocation } from "react-icons/go";

import FilteringModal from "../modal/FilteringModal";

const JobListHeader = (props) => {
  const {
    jobCount,
    useSort,
    setUseSort,
    useCategory,
    setUseCategory,
    useLocation,
    setUseLocation,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState({
    type: "",
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
      <header className={styles.jobListHeader}>
        <div className={styles.headerNav}>
          <h1>작업찾기</h1>
          <span>
            서울/경기 오더방
            <IoIosArrowForward size="10px" />{" "}
            {!useLocation
              ? "지역"
              : useLocation.regionName + " " + useLocation.cityName}
            {", "}
            {!useCategory
              ? "카테고리"
              : useCategory.name + " - " + useCategory.minor.name}
          </span>
        </div>
        <div className={styles.headerCategory}>
          <button
            className={styles.locationBtn}
            onClick={() => handleOpenModal("location")}
          >
            <GoLocation className={styles.icon} size="12px" />
            {!useLocation
              ? "전국"
              : useLocation.regionName + " " + useLocation.cityName}
          </button>
          <button
            className={styles.categoryBtn}
            onClick={() => handleOpenModal("category")}
          >
            <BsGrid className={styles.icon} size="12px" />
            {!useCategory
              ? "분류 전체"
              : useCategory.name + " - " + useCategory.minor.name}
          </button>
        </div>
        <div className={styles.headerSort}>
          <div className={styles.jobCounterWapper}>
            <span>{jobCount}</span>
            <span> 개의 작업</span>
          </div>
          <div className={styles.dropDownWrapper}>
            <button className={styles.dropDownBtn}>
              {useSort} <IoIosArrowDown />
            </button>
            <div className={styles.dropDownContent}>
              <span onClick={(e) => handleChangeSort(e.target.innerText)}>
                리뷰순
              </span>
              <span onClick={(e) => handleChangeSort(e.target.innerText)}>
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
            isModalVisible.type === "location" ? setUseLocation : setUseCategory
          }
        />
      )}
    </>
  );
};

export default JobListHeader;
