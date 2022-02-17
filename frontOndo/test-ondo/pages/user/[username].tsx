import React, { useEffect, useState } from 'react';
import AppLayout from 'components/layout/AppLayout';
import UserProfile from 'components/user/userProfile';
import styled from 'styled-components';
import Challengebox from 'components/user/mypageChallenge';
import Feedbox from 'components/user/mypageFeed';
import { Tabs, Row } from 'antd';
import Router, { useRouter } from 'next/router'
import axios from 'axios';
import FeedForModal from 'components/Feed/ModalFeed';
import ScrollToTop from 'components/ScrollToTop';
import useUser from 'store/hooks/userHooks';
import InfiniteScroll from 'react-infinite-scroll-component';

const { TabPane } = Tabs;

const Userfeed = () => {

  const { isLoading, loadingStart, loadingEnd } = useUser();
  const router = useRouter()
  const { username } = router.query
  const [data, setdata] = useState<any>('');
  const [showModal, setShowModal] = useState<number>(0); // 피드 모달용
  const layoutTitle = username + ' 님의 페이지 | 온도'

  //인피니티 스크롤
  const [loading, setLoading] = useState<boolean>(false);
  const [nowFeedsnum, setNowFeedsNum] = useState(5);
  const loadmoredata = () => {
    if (loading) { return }
    setLoading(true)
    setTimeout(() => {
      setNowFeedsNum(nowFeedsnum + 5)

    }, 1000)
    setLoading(false)
  }

  useEffect(() => {
    if (!username) { return }
    const token = localStorage.getItem('Token');
    axios({
      method: 'get',
      url: process.env.BACK_EC2 + '/user/feed/' + username,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        // console.log(res)
        setdata(res.data)
        router.push('/user/' + username);
      })
      .catch((err) => {
        Router.push('/404')
      })
    loadingEnd()
  }, [username])



  return (
    <AppLayout title={layoutTitle}>
      <FeedForModal show={showModal} control={setShowModal}></FeedForModal>
      <UserProfile data={data}></UserProfile>
      <DivdeLine />
      <Tabs defaultActiveKey="1" centered={true} tabBarGutter={40}>
        <MyTab tab="Feed" key="1">
          <ImageRow>
            {data && data.myFeed.length >= 1 ? data.myFeed.map((feed: any, idx: any) => {
              return (
                <Feedbox show={showModal} control={setShowModal} feed={feed} key={idx} onClick={() => { setShowModal(feed.feedId) }}></Feedbox>
              )
            }) : <Nothing>작성한 피드가 없습니다.</Nothing>}
          </ImageRow>
        </MyTab>
        <MyTab tab="도전" key="2">
          <ChallengeDiv>도전 중</ChallengeDiv>
          <ImageRow>
            {data && data.runChallenge.length >= 1 ? data.runChallenge.map((challenge: any, idx: any) => {
              return (
                <Challengebox challenge={challenge} key={idx}></Challengebox>
              )
            }) : <Nothing>진행 중인 도전이 없습니다.</Nothing>}
          </ImageRow>
          <ChallengeDiv>도전 완료</ChallengeDiv>
          <ImageRow>
            {data && data.compeleteChallenge.length >= 1 ? data.compeleteChallenge.map((challenge: any, idx: any) => {
              return (
                <Challengebox challenge={challenge} key={idx}></Challengebox>
              )
            }) : <Nothing>완료한 도전이 없습니다.</Nothing>}
          </ImageRow>

          <ChallengeDiv>내가 만든 도전</ChallengeDiv>
          <ImageRow>
            {data && data.makedChallenge.length >= 1 ? data.makedChallenge.map((challenge: any, idx: any) => {
              return (
                <Challengebox challenge={challenge} key={idx}></Challengebox>
              )
            }) : <Nothing>개설한 도전이 없습니다.</Nothing>}
          </ImageRow>
        </MyTab>
      </Tabs>
      <ScrollToTop />
    </AppLayout>
  )
};

const GoTopBtn = styled.div`
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-size: 2.5rem;
    cursor: pointer;
  `

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