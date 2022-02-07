import React from "react";
import { Col, Row, Carousel, Space } from "antd";
import styled from "styled-components";
import HotChallenge from "components/challenge/HotChallenge";
import ChallengeByCategory from "components/challenge/ChallengeByCategory";
import CategoryIcons from "components/challenge/CategoryIcons";
import AppLayout from "components/layout/AppLayout";

const Challenge = () => {
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
    <AppLayout>
      <Row style={{ marginTop: 20 }}>
        <Col xs={0} md={2}></Col>
        <Col xs={24} md={20}>
          <HotChallenge top3={top3}></HotChallenge>
          <CategoryIcons></CategoryIcons>
          {/* <Button></Button> */}
          <ChallengeByCategory
            categorized={categorizedChallenges}
          ></ChallengeByCategory>
        </Col>
        <Col xs={0} md={2}></Col>
      </Row>
    </AppLayout>
  );
};

export default Challenge;
