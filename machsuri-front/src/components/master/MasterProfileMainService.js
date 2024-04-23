import React, { useState } from 'react';
import MasterProfileContentTitle from '../../components/master/MasterProfileContentTitle';

import styles from './MasterProfileMainService.module.scss';

const MasterProfileMainService = props => {
  const { title, data, handleClickUpdate } = props;
  const mainCategory = data.filter(category => {
    return !!category.is_main;
  })[0];

  const [useMainCategory, setUseMainCategory] = useState(mainCategory);
  return (
    <MasterProfileContentTitle
      title={title}
      value={data.length > 0 ? mainCategory.lessonCategories.name : null}
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
                {category.lessonCategories.name}
              </button>
            </div>
          );
        })}
      </div>
    </MasterProfileContentTitle>
  );
};

export default MasterProfileMainService;
