import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Imgbox from './resultCarouselImg';
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface SearchResults {
  title?: string,
  keyword?: string,
  results?: Array<Object>,
}

const Wrap = styled.div`
  
`
const Title = styled.h1`
  
`
const Nothing = styled.div`
  
`

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 2,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 4,
      spaceBetween: 40
    },
  }
});

const SearchResult: React.FC<SearchResults> = ({ title = '', keyword, results }: SearchResults) => {
  return (
    <Wrap>
      <Title>{title}</Title>
      <div className='swiper'>
        <div className='swiper-wrapper'>

          {results ? results.map((content) => {
            let i = 1929
            return (
              <Imgbox obj={content} key={i++}></Imgbox>
            )
          }) : <Nothing>검색 결과가 없습니다</Nothing>}
        </div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>

      </div>
    </Wrap>
  )
};

export default SearchResult;