import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import challengeSaga from 'store/sagas/Challenge.saga';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

const Te = () => {
  const [data, setData] = useState({ challenges: [], feeds: [], users: [], });

  const router = useRouter()
  const { test } = router.query
  useEffect(useCallback(() => {
    // Router.reload()
    if (test) {
      const token = localStorage.getItem('Token');
      console.log(test)
      const url = process.env.NEXT_PUBLIC_BACK_LOCAL + '/search/' + test
      axios({
        method: 'get',
        url: url,
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          setData(res.data)
          console.log(data)
        })
    }
  }, [test]), [test])


  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        navigation
        // pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {data.challenges.map((challenge: any) => {
          return (
            <SwiperSlide><img src={challenge.image}></img></SwiperSlide>
          )
        })}

      </Swiper>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
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
        spaceBetween={50}
        slidesPerView={4}
        navigation
        // pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {data.feeds.map((feed: any) => {
          return (
            <SwiperSlide><img src={feed.image}></img></SwiperSlide>
          )
        })}

      </Swiper>
    </div>
  )
}

export default Te;