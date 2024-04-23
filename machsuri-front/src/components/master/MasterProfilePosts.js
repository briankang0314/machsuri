import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import styles from './MasterProfilePosts.module.scss';

const MasterProfilePosts = props => {
  const { title, data } = props;
  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <div className={styles.myInfo}>
      <div className={styles.myInfoTitle}>
        <span>{title}</span>
      </div>
      <div className={styles.pictureWrapper}>
        <picture>
          <AiOutlinePlusCircle size="30px" />
        </picture>
        {data.map((item, index) => {
          return (
            <picture key={index}>
              <img src={'..' + item.postImage} alt={item.postImage} />
            </picture>
          );
        })}
      </div>
    </div>
  );
};

export default MasterProfilePosts;
