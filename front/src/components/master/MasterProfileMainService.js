import React, { useState } from 'react';
import ExpertProfileContentTitle from '../../components/expert/ExpertProfileContentTitle';

import styles from './ExpertProfileMainService.module.scss';

const ExpertProfileMainService = props => {
  const { title, data, handleClickUpdate } = props;
  const mainCategory = data.filter(category => {
    return !!category.is_main;
  })[0];

  const [useMainCategory, setUseMainCategory] = useState(mainCategory);
  return (
    <ExpertProfileContentTitle
      title={title}
      value={data.length > 0 ? mainCategory.minorCategories.name : null}
      useValue={useMainCategory}
      handleClickUpdate={handleClickUpdate}
    >
      <div className={styles.myInfoMainCategoryWrap}>
        {data.map(category => {
          return (
            <div
              className={
                useMainCategory.id === category.id
                  ? styles.mainCategoryColor
                  : ''
              }
              key={category.id}
            >
              <button
                onClick={() => setUseMainCategory(category)}
                value={category.id}
              >
                {category.minorCategories.name}
              </button>
            </div>
          );
        })}
      </div>
    </ExpertProfileContentTitle>
  );
};

export default ExpertProfileMainService;
