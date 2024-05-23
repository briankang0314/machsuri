import React from "react";
import styles from "./FilteringModalSearch.module.scss";

const FilteringModalSearch = (props) => {
  const { data, useInputText, handleClickMinor } = props;
  let categories = [];

  data.forEach((category) => {
    const filteredMinors = category.minor_categories.filter((minor) =>
      minor.name.includes(useInputText)
    );

    if (filteredMinors.length > 0) {
      categories.push({
        id: category.id,
        name: category.name,
        minors: filteredMinors.map((minor) => ({
          id: minor.id,
          name: minor.name,
        })),
      });
    }
  });

  return (
    <div>
      {categories.length > 0 ? (
        <ul className={styles.modalSearchCategories}>
          {categories.map((category) =>
            category.minors.map((minor) => (
              <li
                key={minor.id}
                onClick={() =>
                  handleClickMinor({
                    categoryId: category.id,
                    categoryName: category.name,
                    minorId: minor.id,
                    minorName: minor.name,
                  })
                }
              >
                <span>{minor.name}</span>
              </li>
            ))
          )}
        </ul>
      ) : (
        <div className={styles.modalSearchNotDefined}>
          <span>"{useInputText}"</span>
          <span>에 해당하는 결과를 찾을 수 없습니다</span>
        </div>
      )}
    </div>
  );
};

export default FilteringModalSearch;
