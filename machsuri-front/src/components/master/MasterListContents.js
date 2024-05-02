import React from 'react';
import ExpertItem from './ExpertItem';
import styles from './ExpertListContents.module.scss';

const ExpertListContents = props => {
  const { experts } = props;

  return (
    <section className={styles.expertListContents}>
      {experts.map(expert => {
        return <ExpertItem key={expert.id} expert={expert} />;
      })}
    </section>
  );
};

export default ExpertListContents;
