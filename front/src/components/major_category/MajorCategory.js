import styles from './MajorCategory.module.scss';
import { Link } from 'react-router-dom';

function MajorCategory() {
  return (
    <div className={styles.container}>
      <div>
        <Link to="/minor" state={{ category: '레슨' }}>
          <img
            src="/images/thump/minor.png"
            className={styles.minor}
            alt="minor"
          />
        </Link>
      </div>
      <div>
        <img src="/images/thump/home.png" className={styles.home} alt="home" />
      </div>
      <div>
        <img
          src="/images/thump/event.png"
          className={styles.event}
          alt="event"
        />
      </div>
      <div>
        <img
          src="/images/thump/business.png"
          className={styles.business}
          alt="business"
        />
      </div>
      <div>
        <Link to="/design_develop" state={{ category: '디자인/개발' }}>
          <img
            src="/images/thump/design.png"
            className={styles.design}
            alt="design"
          />
        </Link>
      </div>
      <div>
        <img
          src="/images/thump/health.png"
          className={styles.health}
          alt="health"
        />
      </div>
      <div>
        <img
          src="/images/thump/part_time.png"
          className={styles.partTime}
          alt="part_time"
        />
      </div>
      <div>
        <img src="/images/thump/etc.png" className={styles.etc} alt="etc" />
      </div>
    </div>
  );
}
export default MajorCategory;
