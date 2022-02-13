import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from 'css/index.module.css'
import useUser from 'store/hooks/userHooks';
import { Modal, Button, Col, Row, Divider } from 'antd';
import AppLayout from 'components/layout/AppLayout';
import LoggedInForm from 'components/layout/LoggedInForm';
import Image from 'next/image';
import temp_profile from 'public/images/temp_profile.jpg'
import Router, { useRouter } from 'next/router'
import 'antd/dist/antd.css';
import axios from 'axios';

const ReadChallenge = () => {

  const router = useRouter()
  const { id } = router.query
  const [challenge, setChallenge] = useState();

  useEffect(() => {
    const token = localStorage.getItem('Token')
    axios({
      method: 'get',
      url: process.env.BACK_EC2 + '/challenge/detail/' + String(id),
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res)
        setChallenge(res.data.challenge)
      })
      .catch((err) => {
        console.log('상세보기 실패');

      })
  }, [])

  // 참여하기
  const participate = () => {
    const token = localStorage.getItem('Token')
    axios({
      method: 'post',
      url: process.env.BACK_EC2 + '/challenge/participate',
      headers: { Authorization: "Bearer " + token },
      data: {
        challengeId: id,
      }
    })
      .then((res) => {
        console.log(res)
        alert('참여합니다.')
      })
  }

  const getDuration = (startDate: string) => {
    const sDate = startDate.substring(0, 10);
    const sy = sDate.substring(0, 4);
    const sm = sDate.substring(5, 7);
    const sd = sDate.substring(8, 10);

    const eDate = new Date(Number(sy), Number(sm) - 1, Number(sd) + 2);
    const ey = eDate.getFullYear();
    const em = eDate.getMonth() + 1;
    const ed = eDate.getDate();

    return sy + '-' + sm + '-' + sd + ' ~ '
      + ey + '-' + (("00" + em.toString()).slice(-2)) + '-' + (("00" + ed.toString()).slice(-2));
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
              <ChallengeTitle>{ }</ChallengeTitle>
              <LoggedInForm />
              <ChallengeDuration>{ }</ChallengeDuration>
              <p>{content}</p>

              <BottomContent>
                <Participants>현재 {participants} 명 참여 중</Participants>
                <Button.Group>
                  {/* <ParticipateOrWriteFeed>개설</ParticipateOrWriteFeed>
            <ParticipateOrWriteFeed>취소</ParticipateOrWriteFeed> */}
                  <button onClick={participate}>참여하기</button>
                  <button onClick={() => { Router.push('/feed/write') }}>피드쓰기</button>
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