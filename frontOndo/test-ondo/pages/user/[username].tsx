import React, { useEffect, useState } from 'react';
import AppLayout from 'components/layout/AppLayout';
import UserProfile from 'components/user/userProfile';
import styled from 'styled-components';
import Challengebox from 'components/user/mypageChallenge';
import Feedbox from 'components/user/mypageFeed';
import { Tabs, Row, Progress } from 'antd';
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
      url: process.env.BACK_EC2 + '/user/feed/' + username,
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
    <AppLayout title='마이페이지 | 온도'>
      <UserProfile data={data}></UserProfile>
      {/* <FeedModal setShowModal={setShowModal} showModal={showModal}></FeedModal> */}
      <DivdeLine />
      <Tabs defaultActiveKey="1" centered={true} tabBarGutter={40}>
        <MyTab tab="Feed" key="1">
          <ImageRow>
            {data && data.myFeed.length >= 1 ? data.myFeed.map((feed: any) => {
              return (
                <Feedbox feed={feed} key={nowUser.ondo++}></Feedbox>
              )
            }) : <Nothing>작성한 피드가 없습니다.</Nothing>}
          </ImageRow>
        </MyTab>
        <MyTab tab="도전" key="2">
          <ChallengeDiv>도전 중</ChallengeDiv>
          <ImageRow>
            {data && data.runChallenge.length >= 1 ? data.runChallenge.map((challenge: any) => {
              return (
                <Challengebox challenge={challenge} key={nowUser.ondo++}></Challengebox>
              )
            }) : <Nothing>진행 중인 도전이 없습니다.</Nothing>}
          </ImageRow>
          <ChallengeDiv>도전 완료</ChallengeDiv>
          <ImageRow>
            {data && data.compeleteChallenge.length >= 1 ? data.compeleteChallenge.map((challenge: any) => {
              return (
                <Challengebox challenge={challenge} key={nowUser.ondo++}></Challengebox>
              )
            }) : <Nothing>완료한 도전이 없습니다.</Nothing>}
          </ImageRow>

          <ChallengeDiv>내가 만든 도전</ChallengeDiv>
          <ImageRow>
            {data && data.makedChallenge.length >= 1 ? data.makedChallenge.map((challenge: any) => {
              return (
                <Challengebox challenge={challenge} key={nowUser.ondo++}></Challengebox>
              )
            }) : <Nothing>개설한 도전이 없습니다.</Nothing>}
          </ImageRow>
        </MyTab>
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
const MyTab = styled(TabPane)`
  width:80%;
  margin-left: auto;
  margin-right: auto;
`
const ImageRow = styled(Row)`
  /* width: 80%;
  margin-left: auto;
  margin-right: auto; */
`

const ChallengeDiv = styled.h2`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 500;
`

const Nothing = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 20px;
  color:gray;
`

export default Userfeed;