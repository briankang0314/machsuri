import styles from './MajorMinor.module.scss';
import { Link } from 'react-router-dom';
function MajorMinor({ minor }) {
  // eslint-disable-next-line react/destructuring-assignment
  const lecture = minor;
  if (lecture.id === 2 || lecture.id === 1) {
    return (
      <div className={styles.wrap}>
        <Link
          to={lecture.name}
          state={{
            category: lecture.name,
            image: lecture.image,
            lecture_id: lecture.id,
          }}
        >
          <img
            src={lecture.image}
            alt="major_img"
            className={`${styles.cropping} ${styles.category_img}`}
          />
        </Link>
        <h4 className={styles.category_text}>{lecture.name}</h4>
      </div>
    );
  } else {
    return (
      <div className={styles.wrap}>
        <img
          src={lecture.image}
          alt="major_img"
          className={`${styles.cropping} ${styles.category_img2}`}
        />
        <h4 className={styles.category_text}>{lecture.name}</h4>
      </div>
    );
  }
}

function MajorMinors(minors) {
  // eslint-disable-next-line react/destructuring-assignment
  const lectures = minors.minor;
  if (lectures.length === 0) return true;
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {lectures.length !== 0 && lectures.length !== undefined ? (
          lectures[0].minorCategories.map((minor, index) => (
            <MajorMinor minor={minor} key={index} />
          ))
        ) : (
          <div>레슨이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default MajorMinors;
