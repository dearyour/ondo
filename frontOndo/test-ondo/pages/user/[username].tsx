import React from 'react';
import AppLayout from 'components/layout/AppLayout';
import UserProfile from 'components/user/userProfile';
import styled from 'styled-components';
import Challengebox from 'components/user/mypageChallenge';
import Feedbox from 'components/user/mypageFeed';
import { Tabs, Row } from 'antd';
import { useRouter } from 'next/router'

const { TabPane } = Tabs;

const Userfeed = () => {
  const router = useRouter()
  const { username } = router.query
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
    nickname: 'asd',
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
    nowUser.nickname = String(username)

  }
  return (
    <AppLayout>
      <UserProfile nowUser={nowUser}></UserProfile>
      <DivdeLine />
      <Tabs defaultActiveKey="1" centered={true} tabBarGutter={40}>
        <TabPane tab="Feed" key="1">
          <Row>
            {nowUser.feeds.map((feed) => {
              return (
                <Feedbox feed={feed} key={nowUser.ondo++}></Feedbox>
              )
            })}
          </Row>
        </TabPane>
        <TabPane tab="도전" key="2">
          <ChallengeDiv>도전 중</ChallengeDiv>
          <Row>
            {nowUser.challenges.map((challenge) => {
              return (
                <Challengebox challenge={challenge} key={nowUser.ondo++}></Challengebox>
              )
            })}
          </Row>
          <ChallengeDiv>도전 완료</ChallengeDiv>
          <Row>
            {nowUser.endChallenges.map((challenge) => {
              return (
                <Challengebox challenge={challenge} key={nowUser.ondo++}></Challengebox>
              )
            })}
          </Row>

          <ChallengeDiv>내가 만든 도전</ChallengeDiv>
          <Row>
            {nowUser.myChallenges.map((challenge) => {
              return (
                <Challengebox challenge={challenge} key={nowUser.ondo++}></Challengebox>
              )
            })}
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