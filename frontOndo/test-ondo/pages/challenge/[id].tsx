import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import styles from 'css/index.module.css'
import useUser from 'store/hooks/userHooks';
import { Modal, Button, Col, Row, Divider } from 'antd';
import AppLayout from 'components/layout/AppLayout';
import LoggedInForm from 'components/layout/LoggedInForm';
import Image from 'next/image';
import temp_profile from 'public/images/temp_profile.jpg'
import 'antd/dist/antd.css';

const ReadChallenge = () => {
  useEffect(() => {

  })
  const title = '하루 30분 조깅하기';
  const startDate = new Date(2022, 0, 31);
  const getDuration = () => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 2);

    const sy = startDate.getFullYear();
    const sm = startDate.getMonth() + 1;
    const sd = startDate.getDate();
    const ey = endDate.getFullYear();
    const em = endDate.getMonth() + 1;
    const ed = endDate.getDate();
    return sy + '-' + sm + '-' + sd + ' ~ ' + ey + '-' + em + '-' + ed;
  }
  const content = "3일동안 다같이 런닝해여~ 조깅화와 시계를 찍어서 올려주시면 됩니다.";
  const participants = 7;
  const feedsPosted = ['https://picsum.photos/250', 'https://picsum.photos/250', 'https://picsum.photos/250', 'https://picsum.photos/250', 'https://picsum.photos/250'];

  const renderPosts = () => {
    const result = [];
    for (let i = 0; i < feedsPosted.length; i++) {
      result.push(
        <Col xs={8} md={8} key={i}>
          <FeedImg src={feedsPosted[i]}></FeedImg>
        </Col>
      );
    }
    return result;
  }

  return (
    <AppLayout title="도전 상세보기 | 온도">
      <Row style={{ marginTop: 20, fontFamily: 'sans-serif' }}>
        <Col xs={0} md={4} />
        <Col xs={24} md={16}>
          오늘의 도전
          <Divider style={{ borderColor: 'black' }} />
          <ChallengeWrapper>
            <ChallengeImg src='https://picsum.photos/2500' alt="feed-image" />
            <ChallengeContent>
              <ChallengeTitle>{title}</ChallengeTitle>
              <LoggedInForm />
              <ChallengeDuration>{getDuration()}</ChallengeDuration>
              <p>{content}</p>

              <BottomContent>
                <Participants>현재 {participants} 명 참여 중</Participants>
                <Button.Group>
                  {/* <ParticipateOrWriteFeed>개설</ParticipateOrWriteFeed>
            <ParticipateOrWriteFeed>취소</ParticipateOrWriteFeed> */}
                  <button>참여하기</button>
                  <button>피드쓰기</button>
                </Button.Group>
              </BottomContent>
            </ChallengeContent>
          </ChallengeWrapper>
          <Row gutter={8}>{renderPosts()}</Row>
        </Col>
        <Col xs={0} md={4} />
      </Row>
    </AppLayout>
  )
}

const ChallengeWrapper = styled.div`
  width: 780px;
  height: 400px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.1);
  background: #fff8f8;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 5px;
  margin-bottom: 10px;
`

const ChallengeImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`

const FeedImg = styled.img`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  border-radius: 10px 0 0 10px;
`

const ChallengeTitle = styled.h1`
  font-size: x-large;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0;
  color: palevioletred;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`

const ChallengeDuration = styled.div`
  text-align: right;
  padding-right: 20px;
`

const ChallengeContent = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  line-height: 1.8;
  color: #141414;
  margin: 0rem 2rem;

  p {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  button {
      /* padding: 10px 24px;
      background: #141414;
      color: #fff;
      border: none; */
    background: #edbaba;
    border-radius: 3px;
    border: 2px solid #edbaba;
    color: white;
    text-align: center;
    margin: 0.25rem ;
    padding: 0.25em 1em;
    width: 120px;
    
    &:hover {
      cursor: pointer;
      background-color: #e7adad;
    }
  }
`
const BottomContent = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`

const Participants = styled.div`
  font-size: 10px;
  text-align: right;
  padding-right: 20px;
  /* right: 10px;
  bottom: 70px; */
`

export default ReadChallenge;