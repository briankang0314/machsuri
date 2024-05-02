/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import styles from './FilteringModalSearch.module.scss';

const FilteringModalSearch = props => {
  const { datas, useInputText, handleClickMinor } = props;
  let categories = [];
  datas.forEach(category => {
    category.minorCategories.forEach(minor => {
      if (minor.name.includes(useInputText)) {
        categories.push({
          id: category.id,
          name: category.name,
          minors: { id: minor.id, name: minor.name },
        });
      }
    });
  });

  return (
    <>
      {categories.length > 0 ? (
        <ul className={styles.modalSearchCategories}>
          {categories.map(category => {
            return (
              <li
                key={category.minors.id}
                onClick={() =>
                  handleClickMinor({
                    id: category.id,
                    name: category.name,
                    minors: {
                      id: category.minors.id,
                      name: category.minors.name,
                    },
                  })
                }
              >
                <span>{category.minors.name}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.modalSearchNotDefined}>
          <span>"{useInputText}"</span>
          <span>에 해당하는 결과를 찾을 수 없습니다</span>
        </div>
      )}
    </>
  );
};

export default FilteringModalSearch;
