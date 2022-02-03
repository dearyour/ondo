import React from 'react';
import Image from 'next/image';
import temp_profile from 'public/images/temp_profile.jpg'
import { Modal, Button, Col, Row } from 'antd';
import styled from 'styled-components';

interface userChallenge {
  title: string,
  percent: any,
  participate: number,
  // image: StaticImageData,
  start: string,
}

const Challengebox: React.FC<userChallenge> = ({title, percent, participate, start}:userChallenge) => {
  return (
    <Row>
      <Col span={9}>
        <Title>
          {title}
        </Title>
        <Content>
          {start}
          {percent}
          참여인원: {participate}명
        </Content>
      </Col>
      <Col span={9}>
        <Image src={temp_profile}></Image>
      </Col>
    </Row>
  )
}

const Title = styled.div`
  padding: 5px;

  background-color: #FFD3D3;
`

const Content = styled.div`
  padding: 5px;
  padding-top: 10px;
  background-color: #F2F2F2;
  height: 100%;
`


export default Challengebox;