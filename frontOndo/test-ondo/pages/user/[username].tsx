import React, { useEffect, useState } from 'react';
import AppLayout from 'components/layout/AppLayout';
import UserProfile from 'components/user/userProfile';
import styled from 'styled-components';
import Challengebox from 'components/user/mypageChallenge';
import Feedbox from 'components/user/mypageFeed';
import { Tabs, Row } from 'antd';
import { useRouter } from 'next/router'
import axios from 'axios';

const { TabPane } = Tabs;

const Userfeed = () => {
  const router = useRouter()
  const { username } = router.query
  const [data, setdata] = useState<any>('');
  useEffect(() => {
    if (!username) { return }
    const token = localStorage.getItem('Token');
    axios({
      method: 'get',
      url: 'http://localhost:8080' + '/user/feed/' + username,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res)
        setdata(res.data)
      })
  }, [username])
  const people = {
    image: 'https://picsum.photos/2500',
    nickname: 'asdasd',
  }
  const Challenge = {
    image: 'https://picsum.photos/2500',
  }
  const Feed = {
    image: 'https://picsum.photos/2500',
  }
  const nowUser = {
    username: 'asd',
    image: '',
    ondo: 22,
    challenges: [Challenge, Challenge],
    endChallenges: [Challenge, Challenge, Challenge, Challenge],
    myChallenges: [Challenge, Challenge, Challenge],
    feeds: [Feed, Feed, Feed, Feed, Feed],
    follow: [people, people, people, people,],
    following: [],
  }
  if (username) {
    nowUser.username = String(username)

  }
  return (
    <AppLayout>
      <UserProfile data={data}></UserProfile>
      <DivdeLine />
      <Tabs defaultActiveKey="1" centered={true} tabBarGutter={40}>
        <TabPane tab="Feed" key="1">
          <Row>
            {data ? data.myFeed.map((feed: any) => {
              return (
                <Feedbox feed={feed} key={nowUser.ondo++}></Feedbox>
              )
            }) : null}
          </Row>
        </TabPane>
        <TabPane tab="도전" key="2">
          <ChallengeDiv>도전 중</ChallengeDiv>
          <Row>
            {data ? data.runChallenge.map((challenge: any) => {
              return (
                <Challengebox challenge={challenge} key={nowUser.ondo++}></Challengebox>
              )
            }) : null}
          </Row>
          <ChallengeDiv>도전 완료</ChallengeDiv>
          <Row>
            {data ? data.compeleteChallenge.map((challenge: any) => {
              return (
                <Challengebox challenge={challenge} key={nowUser.ondo++}></Challengebox>
              )
            }) : null}
          </Row>

          <ChallengeDiv>내가 만든 도전</ChallengeDiv>
          <Row>
            {data ? data.makedChallenge.map((challenge: any) => {
              return (
                <Challengebox challenge={challenge} key={nowUser.ondo++}></Challengebox>
              )
            }) : null}
          </Row>
        </TabPane>
      </Tabs>
    </AppLayout>
  )
};

const DivdeLine = styled.hr`
  border-color:#f7e4f4;
  width: 60%;
  margin-left:auto;
  margin-right:auto;
  margin-top: 25px;
  opacity: 50%;
`

const ChallengeDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 500;
`

export default Userfeed;