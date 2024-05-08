import React from 'react';
import styles from './ExpertCategory.module.scss';

function ExpertCategory(props) {
  const { expert } = props;
  const { minor_categories } = expert;
  return (
    <div>
      <h2>제공 서비스</h2>
      <div>
        {!minor_categories
          ? null
          : minor_categories.map(x => {
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

export default ExpertCategory;
