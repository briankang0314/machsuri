import styles from './ExpertProfile.module.scss';
import { FaStar } from 'react-icons/fa';

function ExpertProfile({ expert, review }) {
  const { minor_categories } = expert;
  const getTotalAVGGrade = reviews => {
    let total = reviews.map(rev => rev.grade);
    return parseFloat(Math.round((total / reviews.length) * 100) / 100).toFixed(
      1
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.expertImage}>
        <img
          src={
            !expert.expert_image
              ? `/images/profile/profileNotFound.svg`
              : expert.expert_image
          }
          alt={!expert ? null : expert.name}
        />
      </div>
      <div className={styles.expertInfo}>
        <h1>{!expert ? null : expert.name}</h1>
        <div className={styles.expertCategory}>
          {!minor_categories ? null : expert.minor_categories[0]}
        </div>
        <div className={styles.expertReview}>
          <span>
            <FaStar size="16px" color="#ffce21" />
          </span>
          <span>{!review[0].name ? '0.0' : getTotalAVGGrade(review)}</span>
          <span>({!review[0].name ? 0 : review.length})</span>
        </div>
      </div>
    </div>
  );
}

export default ExpertProfile;
