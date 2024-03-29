import React, { useState } from 'react';
import Image from 'next/image';
import temp_profile from 'public/images/temp_profile.jpg'
import { Modal, Button, Col, Row } from 'antd';
import styled from 'styled-components';
import FeedModal from "components/FeedModal";

interface nowProps {
  feed: any,
  show: number,
  control: React.Dispatch<React.SetStateAction<number>>,
}

const Feedbox = ({ feed, show, control }: any) => {
  // console.log(show, control)
  return (
    <Title span={24} sm={12} md={8} lg={6}>
      <Content src={feed.image} onClick={() => { control(feed.feedId) }}></Content>
      {/* <FeedForModal></FeedForModal> */}
    </Title>

  )
}

const Title = styled(Col)`
  padding: 10px;

`

const Content = styled.img`
  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  cursor: pointer;
  border-radius:5px;
  border: 1px solid pink;
`



export default Feedbox;