import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './MainCategoryReport.module.scss';
import { AiFillStar } from 'react-icons/ai';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { SERVER_PORT, FRONT_PORT } from '../../config';

function MainCategoryReportComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quest, category, image, flag, ended_at } = location.state;
  const [expertList, setExpertList] = useState([]);
  const [endTime, setEndTime] = useState(true);
  let _result = {};
  let result = [];
  let category_num = 0;
  let bannerUrl = '/' + image;

  let time = new Date();
  time.setDate(time.getDate());
  time = Date.parse(time) / 1000; //timestamp

  switch (category) {
    case '방송댄스 레슨':
      category_num = 1;
      break;
    case '보컬 레슨':
      category_num = 2;
      break;
    case '골프 레슨':
      category_num = 3;
      break;
    case '퍼스널트레이닝(PT)':
      category_num = 4;
      break;
    case '기타 레슨':
      category_num = 5;
      break;
    case '중국어 과외':
      category_num = 6;
      break;
    case '프레젠테이션 디자인':
      category_num = 7;
      break;
    case '인쇄물 디자인':
      category_num = 8;
      break;
    case '앱 디자인':
      category_num = 9;
      break;
    case '일러스트 디자인':
      category_num = 10;
      break;
    case '제품 디자인':
      category_num = 11;
      break;
    case '웹 디자인':
      category_num = 12;
      break;
    default:
      category_num = 0;
  }

  const keys = Object.keys(quest);
  for (let i = 0; i < keys.length; i++) {
    _result.user_id = localStorage.getItem('userId');
    _result.minor_category_id = category_num;
    if (keys[i] === 'address1' || keys[i] === 'address2') {
      _result.question_id = i + 1;
    } else {
      _result.question_id = Number(keys[i]);
    }
    _result.choice_question_id = quest[keys[i]];
    result = result.concat(_result);
    _result = {};
  }
  useEffect(() => {
    fetch(`${SERVER_PORT}/expert/main_list/${category_num}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setExpertList(data.getExperts);
      });
  }, [category_num]);

  if (flag === 1) {
    // 1 :요청서 작성한 후 디비에 저장,
    // 0 : 바로 그냥 받은견적으로 들어가는 경우(데이터 저장이 필요 없는 경우)
    PostRequestForm(result);
  }

  function handleNavigate(expertId) {
    navigate(`../profile/users/${expertId}`);
  }

  const DeleteRequestForm = () => {
    fetch(SERVER_PORT + '/receive/estimate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({ ended_at: ended_at }),
    }).then(res => res.json());
    setEndTime(false);
  };

  const settingTime = () => {
    if (ended_at > time) setEndTime(true);
    else setEndTime(false);
  };
  useEffect(() => {
    settingTime();
  }, []);
  return (
    <>
      <Header />
      <img src={bannerUrl} alt="banner" className={styles.img_banner} />
      <div className={styles.expert_container}>
        <div className={styles.headline}>
          {category}
          <div className={styles.button_list}>
            <button className={styles.green_btn}>내 요청서 보기</button>
            {endTime ? (
              <button className={styles.white_btn} onClick={DeleteRequestForm}>
                요청 마감하기
              </button>
            ) : null}
          </div>
        </div>
        <div className={styles.text_line}>
          조건에 맞는 전문가님들이 요청을 검토하고 있어요. 먼저 도착한 견적을
          확인해보세요.
        </div>
        {expertList.map((expert, index) => {
          let expertImage = expert.image
            ? FRONT_PORT + expert.image
            : FRONT_PORT + '/images/profile/profileNotFound.svg';
          return (
            <div
              className={styles.expert_wrap}
              key={index}
              onClick={() => handleNavigate(expert.expert_id)}
            >
              <img
                className={styles.img_box}
                src={expertImage}
                alt="profile_photo"
              />
              <div className={styles.text_box}>
                <h4>{expert.expert_name}</h4>
                <div className={styles.expert_line}>
                  <AiFillStar color="#FFCE21" size="1.1em" />
                  <p>{expert.star}</p>({expert.review_sum})&nbsp;&nbsp;
                  <div className={styles.recruit_box}>
                    {expert.recurit}회 고용
                  </div>
                </div>
                {/* <p className={styles.price}>
                총 {expert.price.toLocaleString('ko-KR')}원 부터 ~
              </p> */}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

function PostRequestForm(result) {
  useEffect(() => {
    fetch(SERVER_PORT + '/form/questions/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('access_token'),
      },
      body: JSON.stringify(result),
    })
      .then(res => res.json())
      .then(result => {
        //alert(result.message);
      });
  }, []);
}

export default MainCategoryReportComplete;
