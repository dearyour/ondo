import React, { useState } from 'react';
import styled from 'styled-components';
import Router from 'next/router';


const ImgboxChallenge = ({ obj }: any) => {
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const mouseOver = () => {
    setShowTitle(true)
  }

  const mouseOut = () => {
    setShowTitle(false)
  }
  return (
    <Title className='swiper-slide'>
      <Content src={obj.image} onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={() => { Router.push(obj.url) }}></Content>
      {showTitle ? <ChallengeTitle>{obj.title}</ChallengeTitle> : null}
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
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    opacity: 20%;
  }
  border: 1px solid black;
  cursor: pointer;
  border-radius:5px;
`
const ChallengeTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  left:0;
  top:0;
  padding:10px;
  pointer-events: none;
  width: 80%;
  height: 100%;
  font-size: 2rem;
  position: absolute;
`

export default ImgboxChallenge;