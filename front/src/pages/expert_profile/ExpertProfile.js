import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ExpertProfileHeader from '../../components/expert/ExpertProfileHeader';
import ExpertProfileService from '../../components/expert/ExpertProfileService';
// import ExpertProfilePosts from '../../components/expert/ExpertProfilePosts';
import ExpertProfileName from '../../components/expert/ExpertProfileName';
import ExpertProfileMainService from '../../components/expert/ExpertProfileMainService';
import ExpertProfileIntro from '../../components/expert/ExpertProfileIntro';
import ExpertProfileAddress from '../../components/expert/ExpertProfileAddress';
import ExpertProfileActiveTime from '../../components/expert/ExpertProfileActiveTime';
import ExpertProfileWorkEx from '../../components/expert/ExpertProfileWorkEx';
import ExpertProfileEmployeeNum from '../../components/expert/ExpertProfileEmployeeNum';
import { SERVER_PORT } from '../../config';

import styles from './ExpertProfile.module.scss';
const token = localStorage.getItem('access_token');

const ExpertProfileDelay = props => {
  const [myInfo, setMyInfo] = useState(null);

  useEffect(() => {
    fetch(SERVER_PORT + '/expert/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    })
      .then(response => response.json())
      .then(data => {
        const { expert } = data;
        // 리뷰 평점 구하기
        let reviewAverage = 0;
        if (expert.reviews.length > 0) {
          let sum = 0;
          expert.reviews.forEach(review => {
            sum = review.grade + sum;
          });
          reviewAverage = Math.round(sum / expert.reviews.length);
        }

        expert.reviewAverage = reviewAverage;
        expert.address.details = expert.detailAddress;
        delete expert.detailAddress;

        setMyInfo(expert);
      });
  }, []);

  return (
    myInfo && (
      <>
        <Header />
        <ExpertProfile myInfo={myInfo} />
        <Footer />
      </>
    )
  );
};

const ExpertProfile = props => {
  const { myInfo } = props;

  function handleClickUpdate(title, value) {
    // let obj = {};
    // switch (title) {
    // case '이름':
    //   obj.type = 'name';
    //   obj.value = value;
    //   obj.token = '';
    //   break;
    // case '대표 서비스':
    //   console.log(useMainCategory);
    //   break;
    // case '한줄 소개':
    //   console.log(useIntro);
    //   break;
    // case '활동 지역':
    //   console.log(useAddress);
    //   break;
    // case '연락 가능 시간':
    //   console.log(useStartTime, useEndTime);
    //   break;
    // case '경력':
    //   console.log(useWorkEx);
    //   break;
    // case '직원수':
    //   console.log(useEmployeeNum);
    //   break;
    // case '제공 서비스':
    //   console.log(useCategories);
    //   break;
    //   default:
    //     return;
    // }
    // fetch('/expert/profile', {
    //   method: 'PUT',
    //   body: JSON.stringify(obj),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then(response => console.log('response >> ', response));
  }

  return (
    <main className={styles.expertProfile}>
      <div className={styles.expertProfileHeader}>
        <ExpertProfileHeader myInfo={myInfo} />
      </div>
      <div className={styles.expertProfileContents}>
        <ExpertProfileName
          title="이름"
          value={myInfo.name}
          handleClickUpdate={handleClickUpdate}
        />
        <ExpertProfileMainService
          title="대표 서비스"
          data={myInfo.expertsCategories}
          handleClickUpdate={handleClickUpdate}
        />
        <ExpertProfileIntro
          title="한줄 소개"
          value={myInfo.intro ? myInfo.intro : ''}
          handleClickUpdate={handleClickUpdate}
        />
        <ExpertProfileAddress
          title="활동 지역"
          value={myInfo.address}
          handleClickUpdate={handleClickUpdate}
        />
        <ExpertProfileActiveTime
          title="연락 가능 시간"
          value={{ start: myInfo.start_time, end: myInfo.end_time }}
          handleClickUpdate={handleClickUpdate}
        />
        <ExpertProfileWorkEx
          title="경력"
          value={myInfo.work_experience}
          handleClickUpdate={handleClickUpdate}
        />
        <ExpertProfileEmployeeNum
          title="직원수"
          value={myInfo.employee_number}
          handleClickUpdate={handleClickUpdate}
        />
        <ExpertProfileService
          title="제공 서비스"
          data={myInfo.expertsCategories}
          handleClickUpdate={handleClickUpdate}
        />
        {/* <ExpertProfilePosts title="사진 및 동영상" data={myInfo.expertPosts} /> */}
        {/* <MyReviews/>  */}
      </div>
    </main>
  );
};

export default ExpertProfileDelay;
