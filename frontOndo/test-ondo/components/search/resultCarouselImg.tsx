import React from 'react';
import Image from 'next/image';
import temp_profile from 'public/images/temp_profile.jpg'
import { Modal, Button, Col, Row } from 'antd';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Router from 'next/router';


const Imgbox = ({ obj }: any) => {
  return (
    <Title className='swiper-slide'>
      <Content src={obj.image} onClick={() => { Router.push(obj.url) }}></Content>
    </Title>

  )
}

const Title = styled.div`
  padding: 10px;
  margin-top:auto;
  margin-bottom:auto;
  height: 100%;

`

const Content = styled.img`
  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }

  cursor: pointer;
  border-radius:5px;
`


export default Imgbox;