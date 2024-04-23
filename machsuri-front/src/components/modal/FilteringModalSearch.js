/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import styles from './FilteringModalSearch.module.scss';

const FilteringModalSearch = props => {
  const { datas, useInputText, handleClickLesson } = props;
  let categories = [];
  datas.forEach(category => {
    category.lessonCategories.forEach(lesson => {
      if (lesson.name.includes(useInputText)) {
        categories.push({
          id: category.id,
          name: category.name,
          lessons: { id: lesson.id, name: lesson.name },
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
                key={category.lessons.id}
                onClick={() =>
                  handleClickLesson({
                    id: category.id,
                    name: category.name,
                    lessons: {
                      id: category.lessons.id,
                      name: category.lessons.name,
                    },
                  })
                }
              >
                <span>{category.lessons.name}</span>
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
