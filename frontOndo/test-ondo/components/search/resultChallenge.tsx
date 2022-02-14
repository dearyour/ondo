import { Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Imgbox from './resultCarouselImg';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
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
  color: #dd7ed8;
`
const Nothing = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding-left: 5rem;
`


const SearchResultChallenge = ({ title = '', keyword, results }: SearchResults) => {
  let i = 121211
  return (
    <Wrap>
      <Title>Challenge</Title>
      <div>&quot;{keyword}&quot;에 대한 검색 결과: {results?.length}건</div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        breakpoints={{
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
            spaceBetween: 30
          }
        }}
        navigation
        // pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}>
        <Swrapper className='swiper-wrapper'>

          {results.length >= 1 ? results.map((content: any) => {
            content = {
              ...content,
              url: '/challenge/' + content.challengeId,
            }
            return (
              <SwiperSlide key={title + String(i++)}><Imgbox obj={content}></Imgbox></SwiperSlide>
            )
          }) : <Nothing>검색 결과가 없습니다</Nothing>}
        </Swrapper>


      </Swiper>
    </Wrap>
  )
};


const Swrapper = styled.div`

`

export default SearchResultChallenge;