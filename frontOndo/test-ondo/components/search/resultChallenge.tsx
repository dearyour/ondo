import React from 'react';
import styled from 'styled-components';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImgboxChallenge from 'components/search/resultCarouselImgChallenge';


interface SearchResults {
  title?: string,
  keyword?: string,
  results: Array<Object>,
}

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
        scrollbar={{ draggable: true }}>
        <Swrapper className='swiper-wrapper'>
          {results.length >= 1 ? results.map((content: any) => {
            content = {
              ...content,
              url: '/challenge/' + content.challengeId,
            }
            return (
              <SwiperSlide key={title + String(i++)}><ImgboxChallenge obj={content}></ImgboxChallenge></SwiperSlide>
            )
          }) : <Nothing>검색 결과가 없습니다</Nothing>}
        </Swrapper>
      </Swiper>
    </Wrap>
  )
};

const Wrap = styled.div`
  
`
const Title = styled.h1`
  /* color: #edbaba; */
`
const Nothing = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding-left: 5rem;
`

const Swrapper = styled.div`

`

export default SearchResultChallenge;