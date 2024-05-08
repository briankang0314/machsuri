import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import CarouselService from '../slide/CarouselService';
import Carouselexpert from '../slide/CarouselExpert';
import Category from '../../components/major_category/MajorCategory';
import Banner from '../slide/Banner';
function Main() {
  return (
    <div>
      <Header />
      <Banner />
      <Category />
      <CarouselService />
      <Carouselexpert />
      <Footer />
    </div>
  );
}

export default Main;
