import React from 'react';
import MasterItem from './MasterItem';
import styles from './MasterListContents.module.scss';

const MasterListContents = props => {
  const { masters } = props;

  return (
    <section className={styles.masterListContents}>
      {masters.map(master => {
        return <MasterItem key={master.id} master={master} />;
      })}
    </section>
  );
};

export default MasterListContents;
