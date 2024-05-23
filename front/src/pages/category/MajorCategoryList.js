import MajorCategory from '../../components/major_category/MajorCategory';
import styles from './MajorCategoryList.module.scss';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MajorMinors from '../../components/major_minor/MajorMinor';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { SERVER_PORT } from '../../config';

function MajorCategoryList() {
  const location = useLocation();
  const [imgAddr, setImgAddr] = useState('');
  const { category } = location.state;

  const settingImg = category => {
    switch (category) {
      case '레슨':
        setImgAddr('/images/thump/minor_main.jpg');
        break;
      case '디자인/개발':
        setImgAddr('/images/thump/develop_main.jpg');
        break;
      default:
        setImgAddr('');
    }
  };
  useEffect(() => {
    settingImg(category);
  }, [category]);

  const [minors, setMinors] = useState([]);
  useEffect(() => {
    //fetch('data/hwseol/major_category_list.json')
    fetch(SERVER_PORT + '/category')
      .then(res => res.json())
      .then(data => {
        setMinors(data);
      });
  }, []);
  let minor = [];
  if (minors.hasOwnProperty('categories')) {
    minor = minors.categories.filter(value => value.name === category);
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.imgWrap}>
          <img
            src={imgAddr}
            alt="category_main"
            className={styles.categoryMain}
          />
          <h2 className={styles.category_title}>{category}</h2>
          <p className={styles.description}>
            지금 마하수리와 함께 시작해 보세요
          </p>
          <div className={styles.search_wrap}>
            <input
              type="text"
              placeholder="어떤 종류의 작업을 찾으시나요?"
              className={styles.searchBar}
            />
            <button className={styles.searchBtn}>작업찾기</button>
          </div>
        </div>
        <MajorCategory />
        <MajorMinors minor={minor} />
      </div>
      <Footer />
    </>
  );
}

export default MajorCategoryList;
