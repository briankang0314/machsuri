import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ExpertSignUpNext.module.scss';
import ExpertSignUpFooter from '../../components/expert-signup/ExpertSignUpFooter';
import FormInfo from '../../components/expert-signup/FormInfo';
import { SERVER_PORT } from '../../config';

let questionKey = 0;
let formComponentKey = 0;

function FormBox({ questions, questionKey, minorCategory }) {
  return (
    <>
      <h2 className={styles.formTitle}>
        구체적으로 어떤 서비스를 진행 할 수 있나요?
      </h2>
      {questions.message
        ? '질문을 불러오는 중입니다'
        : questions.map(data => {
            return (
              <QuestionForm
                name={data}
                value={data}
                content={data}
                key={questionKey++}
                minorCategory={minorCategory}
              />
            );
          })}
    </>
  );
}

function QuestionForm({ value, minorCategory }) {
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (minorCategory.includes(value.id.toString())) {
      setCheck(true);
    }
  }, [minorCategory, value.id]);
  return (
    <div className={styles.questionBox}>
      <input
        id={value.id}
        className={styles.question}
        type="checkbox"
        name={value.name}
        value={value.id}
        checked={check}
        onChange={e => {
          if (e.target.checked && !minorCategory.includes(e.target.value)) {
            minorCategory.push(e.target.value);
          }

          if (!e.target.checked) {
            minorCategory.splice(minorCategory.indexOf(e.target.value), 1);
          }
          setCheck(prev => !prev);
        }}
      />
      <label htmlFor={value.id}>
        <span className={styles.checkInner}>✔</span>
      </label>
      {value.name}
    </div>
  );
}

function ExpertSignUpNext() {
  // api로 카테고리마다 다른 질문 받아오기 fetch('전문가 가입 질문 get api url')
  // Parent-Category, Child-Category의 데이터 형태를 백엔드에서 어떻게 넘길 지 알아야함.
  // 전문가 가입 상세 기입은 2페이지로 구성. 하위 카테고리 -> 전문가 개인 정보
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const minorCategory = useRef([]);
  const addressRef = useRef('');
  const expertInfo = useRef({
    name: '',
    email: '',
    phoneNumber: '',
    detailAddress: '',
    address: '',
    minorCatID: minorCategory.current,
  });

  useEffect(() => {
    let isMounted = true;
    fetch(`${SERVER_PORT}/category/${params.id}`, {
      method: 'GET',
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          setQuestions(data);
        }
      });
    return () => (isMounted = false);
  }, []);
  // api로 설문 결과 보내기

  const [formPage, setFormPage] = useState(0);
  // useMemo를 이용해서 리렌더링을 막는다. 이 페이지에서
  // + formComponentkey를 쓸 필요가 없다. 함수형 컴포넌트 밖에서 변수를 선언해준다.
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.progressbarBox}>
          <div className={styles.barContainer}>
            <div
              className={
                formPage === 0
                  ? styles.barProgress
                  : `${styles.barProgress} ${styles.bar100}`
              }
            />
          </div>
          <p className={styles.progressNumber}>
            {formPage === 0 ? '50%' : '100%'}
          </p>
        </div>
        <form className={styles.formBox}>
          {formPage === 0 ? (
            <FormBox
              questions={questions}
              questionKey={questionKey}
              key={formComponentKey++}
              minorCategory={minorCategory.current}
            />
          ) : (
            <FormInfo
              key={formComponentKey++}
              expertInfo={expertInfo}
              addressRef={addressRef}
            />
          )}
        </form>
      </div>
      <ExpertSignUpFooter
        setFormPage={setFormPage}
        pageNumber={formPage}
        allData={expertInfo}
        checkMinor={minorCategory.current}
        addressRef={addressRef}
      />
    </section>
  );
}

export default ExpertSignUpNext;
