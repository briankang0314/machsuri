import React, { useEffect, useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import styles from './ExpertRequestForm.moduel.scss';
import { SERVER_PORT } from '../../config';

function FormPageZero({ minor_categories, expert }) {
  const [minors, setMinors] = useState([]);
  useEffect(() => {
    setMinors(minor_categories);
  }, []);

  return (
    <div>
      <h2>{expert} 전문가님에게 어떤 서비스 견적을 받고 싶나요?</h2>
      <div>
        {minors.length !== 0
          ? minors.map((minor, i) => {
              return (
                <div className={styles.minorUnit} key={i}>
                  {minor}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

function FormPageNext({ minor_categories, pageNumber }) {
  const [formQuestion, setFormQuestion] = useState([]);

  useEffect(() => {
    // fetch('', { method: 'GET' })
    fetch(SERVER_PORT + '', { method: 'GET' })
      .then(res => res.json())
      .then(data => setFormQuestion(data));
  }, []);
  return (
    <div>
      <div>
        <input type="radio" /> 1asd
        <input type="radio" /> 2asd
        <input type="radio" /> 3asd
      </div>
    </div>
  );
}

function ExpertRequestForm({ minor_categories, pageNumber, expert }) {
  return (
    <div className={styles.container}>
      <div className={styles.closeBtn}>
        <FaRegTimesCircle size="1.1rem" color="#323232" />
      </div>
      <div>
        <FormPageZero
          expert={'asd'}
          minor_categories={['ㅁㄴㅇ1', 'ㅁㄴㅇ2']}
        />
        <FormPageNext />
        {pageNumber === 0 ? <FormPageZero expert={expert} /> : null}
        {pageNumber === 1 ? <FormPageNext pageNumber={1} /> : null}
        {pageNumber === 2 ? <FormPageNext pageNumber={2} /> : null}
        {pageNumber === 3 ? <FormPageNext pageNumber={3} /> : null}
      </div>
      <div className={styles.navBtn}>
        {pageNumber === 0 ? null : <button>이전</button>}
        <button>다음</button>
      </div>
    </div>
  );
}

export default ExpertRequestForm;
