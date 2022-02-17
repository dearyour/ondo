import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Carousel, Space, BackTop, Spin } from "antd";
import { BiArrowFromBottom } from 'react-icons/bi';
import styled from "styled-components";
import HotChallenge from "components/challenge/HotChallenge";
import ChallengeByCategory from "components/challenge/ChallengeByCategory";
import ChallengeByCategory2 from "components/challenge/ChallengeByCategory2";
import CategoryIcons from "components/challenge/CategoryIcons";
import AppLayout from "components/layout/AppLayout";
import axios from "axios";
import { RootState } from "store/module";
import { userActions } from "store/slice/user";
import { challengeAction } from "store/slice/challenge";
import ScrollToTop from "components/ScrollToTop";
import Head from "next/head";
import useUser from "store/hooks/userHooks";


const Challenge = () => {
  const [hotChallenges, setHotChallenges] = useState([]);
  const [catChallenges, setCatChallenges] = useState([]);
  const [allChallenges, setAllChallenges] = useState([]);
  const [category, setCategory] = useState('전체');
  const { isLoading, loadingStart, loadingEnd } = useUser();
  const dispatch = useDispatch();

  // const __GetUserState = (token: string | null) => {
  //   return axios({
  //     method: "GET",
  //     url: "http://localhost:8080/user/info",
  //     headers: { Authorization: "Bearer " + token },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       console.log(res.data);
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // };

  // useEffect(() => {
  //   const token = localStorage.getItem("Token");
  //   __GetUserState(token);
  // }, []);

  const __GetChallengeState = useCallback((token: string | null) => {
    // console.log('__GetChallengeState 호출');

    return axios({
      method: 'GET',
      url: process.env.BACK_EC2 + '/challenge',
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        // console.log('axios get challenge 성공');

        // console.log(res.data);

        setHotChallenges(res.data.top10Challenges);
        setCatChallenges(res.data.allChallenges.reverse());
        setAllChallenges(res.data.allChallenges.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    loadingStart();
    const token = localStorage.getItem("Token");
    // __GetUserState(token);
    __GetChallengeState(token);
    loadingEnd()
  }, []);

  const renderCatChallenges = (selectedCategory: string) => {
    loadingStart();
    if (selectedCategory === '전체') {
      setCatChallenges(allChallenges);
      // console.log(allChallenges[0]);

      return;
    }
    const token = localStorage.getItem('Token');
    axios({
      method: 'GET',
      url: process.env.BACK_EC2 + '/challenge/' + selectedCategory,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        // console.log('categorizing 성공');
        // console.log(res.data[0]);

        setCatChallenges(res.data);
        loadingEnd();
      })
      .catch((err) => {
        loadingEnd();
        // console.log(selectedCategory);
        console.log(err);
      })
  }

  return (
    <AppLayout title="도전 둘러보기 | 온도">
      {/* <Row style={{ marginTop: 20 }}> */}
      {/* <Col xs={0} md={2}></Col> */}
      {/* <Col xs={24} md={24}> */}
      {/* <Head><link href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap' rel="stylesheet"></link></Head> */}
      <HotChallenge top10={hotChallenges}></HotChallenge>
      {/* <CategoryIcons changeCategory={(cat:string) => renderCatChallenges(cat)}></CategoryIcons> */}
      <Row>
        <Col xs={0} md={0}></Col>
        <Col xs={24} md={24}>
          <CategoryIcons changeCategory={(cat: string) => renderCatChallenges(cat)} />
          {/* <Button></Button> */}
          <ChallengeByCategory2 categorized={catChallenges} />
        </Col>
        <Col xs={0} md={0}></Col>
      </Row>
      {/* </Col> */}
      {/* <Col xs={0} md={2}></Col> */}
      {/* </Row> */}
      <ScrollToTop />
    </AppLayout>
  );
};

export default Challenge;
