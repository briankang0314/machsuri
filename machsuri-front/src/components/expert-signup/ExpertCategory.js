import styles from './ExpertCategory.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

function ExpertCategory() {
  const navigate = useNavigate();
  const nextExpertPage = url => {
    navigate(url);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h3>전문가로 가입하실 분야를 선택하세요</h3>
        <div className={styles.icons}>
          <div className={styles.box}>
            <img
              src="/images/thump/minor.png"
              className={styles.minor}
              alt="minor"
              onClick={() => navigate('/pro/1')}
            />
            <div className={styles.caption}>레슨</div>
          </div>
          <div className={styles.box}>
            <img
              src="/images/thump/home.png"
              className={styles.home}
              alt="home"
              onClick={() => nextExpertPage('/pro/2')}
            />
            <div className={styles.caption}>홈/리빙</div>
          </div>
          <div className={styles.box}>
            <img
              src="/images/thump/event.png"
              className={styles.event}
              alt="event"
              onClick={() => nextExpertPage('/pro/3')}
            />
            <div className={styles.caption}>이벤트</div>
          </div>
          <div className={styles.box}>
            <img
              src="/images/thump/business.png"
              className={styles.business}
              alt="business"
              onClick={() => nextExpertPage('/pro/4')}
            />
            <div className={styles.caption}>비즈니스</div>
          </div>
          <div className={styles.box}>
            <img
              src="/images/thump/design.png"
              className={styles.design}
              alt="design"
              onClick={() => nextExpertPage('/pro/5')}
            />
            <div className={styles.caption}>디자인</div>
          </div>
          <div className={styles.box}>
            <img
              src="/images/thump/health.png"
              className={styles.health}
              alt="health"
              onClick={() => nextExpertPage('/pro/6')}
            />
            <div className={styles.caption}>건강</div>
          </div>
          <div className={styles.box}>
            <img
              src="/images/thump/part_time.png"
              className={styles.partTime}
              alt="part_time"
              onClick={() => nextExpertPage('/pro/7')}
            />
            <div className={styles.caption}>알바</div>
          </div>
          <div className={styles.box}>
            <img
              src="/images/thump/etc.png"
              className={styles.etc}
              alt="etc"
              onClick={() => nextExpertPage('/pro/8')}
            />
            <div className={styles.caption}>기타</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExpertCategory;
