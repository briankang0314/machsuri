import React from 'react';
import styles from './MasterCategory.module.scss';

function MasterCategory(props) {
  const { master } = props;
  const { lesson_categories } = master;
  return (
    <div>
      <h2>제공 서비스</h2>
      <div>
        {!lesson_categories
          ? null
          : lesson_categories.map(x => {
              return (
                <span className={styles.wrapper} key={x}>
                  {x}
                </span>
              );
            })}
      </div>
    </div>
  );
}

export default MasterCategory;
