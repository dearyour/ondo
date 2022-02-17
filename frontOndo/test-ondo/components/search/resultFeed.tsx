import React, { useState } from 'react';
import styled from 'styled-components';
import Imgbox from './resultCarouselImg';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import FeedForModal from 'components/Feed/ModalFeed';


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
  const [showModal, setShowModal] = useState<number>(0);
  return (
    <Wrap>
      <FeedForModal show={showModal} control={setShowModal}></FeedForModal>
      <Title>Feed</Title>
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
          {results.length >= 1 ? results.map((content: any, idx: any) => {
            content = {
              ...content,
              url: '/feed/' + content.feedId,
            }
            return (
              <SwiperSlide key={idx}><Imgbox show={showModal} control={setShowModal} obj={content}></Imgbox></SwiperSlide>
            )
          }) : <Nothing>검색 결과가 없습니다</Nothing>}
        </div>
        {results.length >= 5 ?
          <div className="swiper-button-prev-feed"></div> : null
        }
        {results.length >= 5 ?
          <div className="swiper-button-next-feed"></div> : null
        }
      </Swiper>
    </Wrap>
  )
};

export default SearchResultFeed;