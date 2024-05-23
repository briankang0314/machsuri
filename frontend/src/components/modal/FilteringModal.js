import React, { useState, useEffect } from "react";
import styles from "./FilteringModal.module.scss";
import { BsXLg, BsList, BsSearch, BsArrowReturnRight } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { GoLocation } from "react-icons/go";

import FilteringModalSearch from "./FilteringModalSearch";
import { SERVER_PORT } from "../../config";

const FilteringModal = (props) => {
  const { isModalVisible, setIsModalVisible, setUseFilter, path } = props;
  const [data, setData] = useState([]);
  const [useInputText, setUseInputText] = useState("");
  const isLocationType = isModalVisible.type === "location";

  useEffect(() => {
    const urlName = isLocationType
      ? "/locations/regions"
      : "/categories/major-categories";
    fetch(SERVER_PORT + urlName)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle errors appropriately
      });
  }, [isLocationType]);

  const handleCancelModal = () => {
    setIsModalVisible(false);
    handleCloseDetails();
  };

  const handleClickMinor = (minor) => {
    if (useInputText !== "") {
      setUseInputText("");
    }
    setUseFilter(minor);
    setIsModalVisible(false);
    handleCloseDetails();
  };

  const handleChangeInput = (e) => {
    setUseInputText(e.target.value);
  };

  const handleClickLocation = (location) => {
    setUseFilter(location);
    setIsModalVisible(false);
    handleCloseDetails();
  };

  const handleCloseDetails = () => {
    const details = document.querySelectorAll("details");
    details.forEach((detail) => {
      detail.removeAttribute("open");
    });
  };

  return (
    <div
      className={`${styles.modalMain} ${
        isModalVisible.visible && styles.modalVisible
      }`}
    >
      <div className={styles.modalWrapper}>
        <div className={styles.modalCloseBtn}>
          <BsXLg
            color="#bfbfbf"
            size="18px"
            style={{ cursor: "pointer" }}
            onClick={handleCancelModal}
          />
        </div>
        <div className={styles.modalHeader}>
          {isLocationType ? (
            <>
              <GoLocation size="24px" />
              <h4>지역 선택</h4>
            </>
          ) : (
            <>
              <BsList size="24px" />
              <h4>분류 선택</h4>
            </>
          )}
        </div>
        <div className={styles.modalContent}>
          {!isLocationType && (
            <div className={styles.modalSearch}>
              <BsSearch />
              <input
                type="text"
                value={useInputText}
                onChange={handleChangeInput}
                placeholder="어떤 종류의 작업을 찾으시나요?"
              />
            </div>
          )}
          {isLocationType ? (
            <div className={styles.modalList}>
              <ul>
                {!path && (
                  <li onClick={() => handleClickLocation(null)}>
                    <details>
                      <summary>
                        <span>전국</span>
                      </summary>
                    </details>
                  </li>
                )}
                {data.map((region) => (
                  <li key={region.id}>
                    <details>
                      <summary>
                        <span>{region.name}</span>
                        <IoIosArrowDown size="24px" color="#bfbfbf" />
                      </summary>
                      {region.cities.map((city) => (
                        <div
                          key={city.id}
                          onClick={() =>
                            handleClickLocation({
                              regionId: region.id,
                              regionName: region.name,
                              cityId: city.id,
                              cityName: city.name,
                            })
                          }
                        >
                          <BsArrowReturnRight color="#bfbfbf" />
                          <span>{city.name}</span>
                        </div>
                      ))}
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={styles.modalList}>
              {useInputText === "" ? (
                <ul>
                  <li onClick={() => handleClickMinor(null)}>
                    <details>
                      <summary>
                        <span>서비스 전체</span>
                      </summary>
                    </details>
                  </li>
                  {data.map((category) => (
                    <li key={category.id}>
                      <details>
                        <summary>
                          <span>{category.name}</span>
                          <IoIosArrowDown size="24px" color="#bfbfbf" />
                        </summary>
                        {category.minor_categories.map((minor) => (
                          <div
                            key={minor.id}
                            onClick={() =>
                              handleClickMinor({
                                id: category.id,
                                name: category.name,
                                minor: { id: minor.id, name: minor.name },
                              })
                            }
                          >
                            <BsArrowReturnRight color="#bfbfbf" />
                            <span>{minor.name}</span>
                          </div>
                        ))}
                      </details>
                    </li>
                  ))}
                </ul>
              ) : (
                <FilteringModalSearch
                  useInputText={useInputText}
                  data={data}
                  handleClickMinor={handleClickMinor}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteringModal;
