import React, { useState } from 'react';
import Image from 'next/image';
import temp_profile from 'public/images/temp_profile.jpg'
import { Modal, Button, Col, Row } from 'antd';
import styled from 'styled-components';
import Router from 'next/router'


const Challengebox = ({ challenge }: any) => {
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const mouseOver = () => {
    setTimeout(() => {
      setShowTitle(true)
    }, 200)
  }

  const mouseOut = () => {
    setShowTitle(false)
  }

  return (
    <Title span={24} sm={12} md={8} lg={6}>
      <Content src={challenge.image} onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={() => { Router.push('/challenge/' + challenge.challengeId) }}></Content>
      {showTitle ? <ChallengeTitle>{challenge.title}</ChallengeTitle> : null}
    </Title>

  )
}

const Title = styled(Col)`
  padding: 10px;
  position: relative;

`

const Content = styled.img`
  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    opacity: 20%;
  }
  cursor: pointer;
  border-radius:5px;
  border: 1px solid pink;
  /* box-shadow: 0 1px 1px 0; */
`
const ChallengeTitle = styled.div`
/* background-color: gray;
opacity: 50%; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  /* margin-left:5px; */
  left:0;
  top:0;
  pointer-events: none;
  width: 80%;
  height: 100%;
  font-size: 2rem;
  transition: all 1.3s ease-in-out;
  position: absolute;
`

export default Challengebox;