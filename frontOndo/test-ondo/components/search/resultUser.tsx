import React from 'react';
import styled from 'styled-components';
import Imgbox from './resultCarouselImg';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


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

const SearchResultUser: React.FC<SearchResults> = ({ title = '', keyword, results }: SearchResults) => {
  let i = 1212111
  return (
    <Wrap>
      <Title>User</Title>
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
        <div className='swiper-wrapper'>
          {results.length >= 1 ? results.map((content: any) => {
            content = {
              ...content,
              url: '/user/' + content.username,
            }
            return (
              <SwiperSlide key={title + String(i++)}><Imgbox obj={content}></Imgbox></SwiperSlide>
            )
          }) : <Nothing>검색 결과가 없습니다</Nothing>}
        </div>
        {results.length >= 5 ?
          <div className="swiper-button-prev-user"></div> : null
        }
        {results.length >= 5 ?
          <div className="swiper-button-next-user"></div> : null
        }
      </Swiper>
    </Wrap>
  )
};

export default SearchResultUser;