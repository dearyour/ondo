import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Imgbox from './resultCarouselImg';
import Swiper, { Navigation, Pagination } from 'swiper';
import Router from 'next/router';
import Link from 'next/link';


interface SearchResults {
  title?: string,
  keyword?: string,
  results: Array<Object>,
}

const Wrap = styled.div`
  
`
const Title = styled.h1`
  
`
const Nothing = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding-left: 5rem;
`


const SearchResultFeed: React.FC<SearchResults> = ({ title = '', keyword, results }: SearchResults) => {
  let [mySwiper, setMySwiper] = useState<any>(null);
  useEffect(() => {
    let swiperFeed = new Swiper('.swiperFeed', {
      // modules: [Navigation, Pagination],
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      slidesPerView: 2,
      spaceBetween: 10,
      observer: true,
      observeParents: true,
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
    setMySwiper(swiperFeed);

  }, [])
  let i = 1212
  return (
    <Wrap>
      <Title>Feed</Title>
      <div>&quot;{keyword}&quot;에 대한 검색 결과: {results?.length}건</div>
      <div className='swiperFeed'>
        <div className='swiper-wrapper'>

          {results.length >= 1 ? results.map((content: any) => {
            content = {
              ...content,
              url: '/feed/' + content.id,
            }
            return (
              <Imgbox obj={content} key={title + String(i++)}></Imgbox>
            )
          }) : <Nothing>검색 결과가 없습니다</Nothing>}
        </div>
        {/* {results? 
        <div className="swiper-button-prev"></div> : null
      }
        {results?
        <div className="swiper-button-next"></div> : null
      } */}

      </div>
    </Wrap>
  )
};

export default SearchResultFeed;