import React, { useState } from 'react';
import styles from './ExpertImage.module.scss';

function ExpertImage(props) {
  const { expert, expertMedia, expert_post } = props;

  return (
    <div>
      <h2 ref={expertMedia}>사진/동영상</h2>
      <div className={styles.expertImage}>
        {!expert_post
          ? null
          : expert_post.map((image, i) => {
              return (
                <div className={styles.imageContainer} key={i}>
                  <div className={styles.imageWrapper}>
                    <img src={image} alt={expert.name} />
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default ExpertImage;
