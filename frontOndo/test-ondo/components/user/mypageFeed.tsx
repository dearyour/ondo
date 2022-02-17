import React from 'react';
import { Col } from 'antd';
import styled from 'styled-components';


const Feedbox = ({ feed, show, control }: any) => {
  return (
    <Title span={24} sm={12} md={8} lg={6}>
      <Content src={feed.image} onClick={() => { control(feed.feedId) }}></Content>
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