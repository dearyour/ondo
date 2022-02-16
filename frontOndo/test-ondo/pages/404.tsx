import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Space } from 'antd';
import SadDogye from 'public/images/dogye/sad.png';
import Head from 'next/head';

const NotFound = () : JSX.Element => {
  return (
    <>
      <Head><title>온도 :: 페이지를 찾을 수 없습니다.</title></Head>
      <NotFoundDiv>
        <Space direction='horizontal'>
          <Image src={SadDogye} width={500} height={500}></Image>
          <SpeechBubble>
            <h1>이런...</h1>
            <h2>해당 페이지를 찾을 수 없어요.</h2>
            <p><Link href="/"><a>홈페이지</a></Link>로 돌아가기</p>
          </SpeechBubble>
        </Space>
      </NotFoundDiv>
    </>
  );
}

const NotFoundDiv = styled.div`
  text-align: center;
  padding: 100px;

  p {
    margin-top: 50px;
    color: #777;
  }

  a{
    color: #4979ff;
    text-decoration: underline;
  }
`

const SpeechBubble = styled.div`
  width: 500px;
  margin: 50px auto;
  background: #F0F0F0;
  padding: 50px;
  text-align: center;
  font-weight: 1000;
  color: #333;
  /* font-family: arial; */
  position: relative;
  border-radius: 10px;

  ::before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 30px solid transparent;
    border-right: 30px solid #F0F0F0;
    border-top: 30px solid #F0F0F0;
    border-bottom: 30px solid transparent;
    left: -45px;
    top: 60px;
  }
`

export default NotFound;