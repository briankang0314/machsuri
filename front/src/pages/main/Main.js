import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ExpertListHeader from '../../components/expert/ExpertListHeader';
import ExpertListContents from '../../components/expert/ExpertListContents';
import styles from '../expert/ExpertList.module.scss';
import { SERVER_PORT } from '../../config';

function Main() {
  const [experts, setExperts] = useState([]);
  const [useCategory, setUseCategory] = useState(null);
  const [useAddress, setUseAddress] = useState(null);
  const [useSort, setUseSort] = useState('리뷰순');
  const [useTake, setUseTake] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(
      `${SERVER_PORT}/expert/list?addressId=${
        useAddress ? useAddress.details.id : null
      }&minorId=${useCategory ? useCategory.minors.id : null}&take=${useTake}`
    )
      .then(response => response.json())
      .then(data => {
        setExperts(data);
      });
  }, [useAddress, useCategory, useTake]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  });

  function handleScroll(event) {
    let element = event.target.scrollingElement;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      if (experts.length >= useTake) {
        setIsLoading(true);
        setTimeout(() => {
          setUseTake(useTake + 10);
          setIsLoading(false);
        }, 500);
      }
    }
  }
  return (
    <div>
      <Header />
      <main className={styles.expertList}>
        <ExpertListHeader
          expertNumber={experts.length}
          useSort={useSort}
          setUseSort={setUseSort}
          useCategory={useCategory}
          setUseCategory={setUseCategory}
          useAddress={useAddress}
          setUseAddress={setUseAddress}
        />
        {experts.length > 0 ? (
          <>
            <ExpertListContents experts={experts} />
            <Loading isLoading={isLoading} />
          </>
        ) : (
          <div className={styles.notFoundExpert}>
            <span>작업이 없어요!</span>
          </div>
        )}
      </main>
      {/* <Banner /> */}
      {/* <Category /> */}
      {/* <CarouselService /> */}
      {/* <Carouselexpert /> */}
      <Footer />
    </div>
  );
}

const Loading = props => {
  const { isLoading } = props;
  return <div className={isLoading ? styles.loading : styles.unloading} />;
};

export default Main;
