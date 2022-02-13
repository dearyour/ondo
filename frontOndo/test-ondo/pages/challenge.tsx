import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Carousel, Space } from "antd";
import styled from "styled-components";
import HotChallenge from "components/challenge/HotChallenge";
import ChallengeByCategory from "components/challenge/ChallengeByCategory";
import CategoryIcons from "components/challenge/CategoryIcons";
import AppLayout from "components/layout/AppLayout";
import axios from "axios";
import { RootState } from "store/module";
import { userActions } from "store/slice/user";
import { challengeAction } from "store/slice/challenge";
// import { Category } from "store/interfaces/Category.interface";


const Challenge = () => {
  const [hotChallenges, setHotChallenges] = useState([]);
  const [catChallenges, setCatChallenges] = useState([]);
  const [allChallenges, setAllChallenges] = useState([]);
  const [category, setCategory] = useState('전체');
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
        console.log('axios get challenge 성공');
        
        setHotChallenges(res.data.top3Challenges);
        setCatChallenges(res.data.allChallenges.reverse());
        setAllChallenges(res.data.allChallenges.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    // __GetUserState(token);
    __GetChallengeState(token);
  }, []);

  const renderCatChallenges = (selectedCategory:string) => {
    if(selectedCategory === '전체') {
      setCatChallenges(allChallenges);
      console.log(allChallenges[0]);
      
      return;
    }
    const token = localStorage.getItem('Token');
    axios({
      method: 'GET',
      url: 'http://localhost:8080/challenge/' + selectedCategory,
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      console.log('categorizing 성공');
      console.log(res.data[0]);
      
      setCatChallenges(res.data);
    })
    .catch((err) => {
      console.log(selectedCategory); 
      console.log(err);
    })
  }

  const top3 = [
    {
      title: "취중고백",
      startDate: new Date(2022, 0, 31),
      participants: 854,
      img: "https://picsum.photos/500/100",
    },
    {
      title: "사랑은 늘 도망가",
      startDate: new Date(2022, 3, 1),
      participants: 765,
      img: "https://picsum.photos/500/100",
    },
    {
      title: "Step Back",
      startDate: new Date(2022, 1, 28),
      participants: 633,
      img: "https://picsum.photos/500/100",
    },
  ];

  const categorizedChallenges = [
    {
      title: "호랑수월가",
      owner: "탑현",
      startDate: new Date(2022, 0, 31),
      participants: 399,
      img: "https://picsum.photos/500/100",
    },
    {
      title: "ELEVEN",
      owner: "IVE (아이브)",
      startDate: new Date(2022, 3, 1),
      participants: 148,
      img: "https://picsum.photos/500/100",
    },
    {
      title: "회전목마",
      owner: "sokodomo",
      startDate: new Date(2022, 1, 28),
      participants: 179,
      img: "https://picsum.photos/500/100",
    },
    {
      title: "리무진",
      owner: "BE'O (비오)",
      startDate: new Date(2022, 3, 1),
      participants: 77,
      img: "https://picsum.photos/500/100",
    },
    {
      title: "Counting Stars",
      owner: "BE'O (비오)",
      startDate: new Date(2022, 3, 1),
      participants: 337,
      img: "https://picsum.photos/500/100",
    },
    {
      title: "Dreams Come True",
      owner: "aespa",
      startDate: new Date(2022, 3, 1),
      participants: 411,
      img: "https://picsum.photos/500/100",
    },
    {
      title: "Child",
      owner: "마크 (MARK)",
      startDate: new Date(2022, 3, 1),
      participants: 364,
      img: "https://picsum.photos/500/100",
    },
  ];

  return (
    <AppLayout title="도전 둘러보기 | 온도">
      <Row style={{ marginTop: 20 }}>
        <Col xs={0} md={2}></Col>
        <Col xs={24} md={20}>
          <HotChallenge top3={hotChallenges}></HotChallenge>
          {/* <CategoryIcons changeCategory={(cat:string) => renderCatChallenges(cat)}></CategoryIcons> */}
          <CategoryIcons changeCategory={(cat:string) => renderCatChallenges(cat)}></CategoryIcons>
          {/* <Button></Button> */}
          <ChallengeByCategory
            categorized={catChallenges}
          ></ChallengeByCategory>
        </Col>
        <Col xs={0} md={2}></Col>
      </Row>
    </AppLayout>
  );
};

export default Challenge;
