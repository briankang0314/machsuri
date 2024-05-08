import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ExpertDetail.module.scss';
import ExpertRequest from '../../components/expert-detail/ExpertRequest';
import ExpertProfile from '../../components/expert-detail/ExpertProfile';
import ExpertDetailNav from '../../components/expert-detail/ExpertDetailNav';
import ExpertInfo from '../../components/expert-detail/ExpertInfo';
import ExpertCategory from '../../components/expert-detail/ExpertCategory';
import ExpertImage from '../../components/expert-detail/ExpertImage';
import ExpertReview from '../../components/expert-detail/ExpertReview';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { SERVER_PORT } from '../../config';

function ExpertDetail() {
  const params = useParams();
  const [expert, setExpert] = useState({});
  const [reviews, setReviews] = useState([{ name: '' }]);
  const expertInfo = useRef('');
  const expertMedia = useRef('');
  const expertReview = useRef('');

  //get expert profile fetch
  useEffect(() => {
    fetch(`${SERVER_PORT}/expert/users/${params.id}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setExpert(data);
      });
  }, []);

  //get reviews
  useEffect(() => {
    fetch(`${SERVER_PORT}/review/${params.id}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.reviews.length === 0) {
          data.reviews = [{ name: '' }];
        }
        setReviews(data.reviews);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.detailContainer}>
        <div className={styles.expertProfile}>
          <ExpertProfile expert={expert} review={reviews} />
        </div>
        <div className={styles.pageNav}>
          <ExpertDetailNav
            expert={expert}
            expertInfo={expertInfo}
            expertReview={expertReview}
            reviewCounts={reviews}
            expertMedia={expertMedia}
          />
        </div>
        <div ref={expertInfo} className={styles.expertIntro}>
          <h2>한줄소개</h2>
          <div>
            {!expert.info
              ? `아직 ${
                  !expert.name ? '' : expert.name
                } 전문가님의 소개가 없습니다.`
              : expert.intro}
          </div>
        </div>
        <div className={styles.expertInfoContainer}>
          <ExpertInfo
            expert={expert}
            expertInfo={expertInfo}
            review={reviews}
          />
        </div>
        <div className={styles.minorCategory}>
          <div>
            <ExpertCategory expert={expert} />
          </div>
        </div>
        <div ref={expertMedia} className={styles.expertImages}>
          <div>
            <ExpertImage expert={expert} />
          </div>
        </div>
        <div ref={expertReview} className={styles.expertReview}>
          <div>
            <ExpertReview expert={expert} reviews={reviews} />
          </div>
        </div>
      </div>
      <div className={styles.requestContainer}>
        <ExpertRequest expert={expert} />
      </div>
      <Footer />
    </div>
  );
}

export default ExpertDetail;
