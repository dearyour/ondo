import React from "react";
import { Row, Col, Carousel } from 'antd';
import styled from "styled-components";

function HotChallenge(props: any): JSX.Element {
  const top3 = [...props.top3];
  const getDuration = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 2);
  
    const sy = startDate.getFullYear();
    const sm = startDate.getMonth() + 1;
    const sd = startDate.getDate();
    const ey = endDate.getFullYear();
    const em = endDate.getMonth() + 1;
    const ed = endDate.getDate();
    return sy+'-'+sm+'-'+sd + ' ~ ' + ey+'-'+em+'-'+ed;
  }

  const renderHotChallenges = () => {
    const result = [];
    for(let i = 0; i < Math.min(3, top3.length); i++) {
      result.push(
        <HotChallengeFrame>
          <HotChallengeImg src={top3[i].img}></HotChallengeImg>
          <TextOnImage>
            {/* <h1>{top3[i].title}</h1>
            <p>{getDuration(top3[i].startDate)}</p>
            <p>현재 {top3[i].participants}명 참여 중</p> */}
            <Row>
              <Col xs={12} md={10}><h1>{top3[i].title}</h1></Col>
              <Col xs={0} md={4}></Col>
              <Col xs={12} md={10}>
                <p>{getDuration(top3[i].startDate)}</p>
                <p>현재 {top3[i].participants}명 참여 중</p>
              </Col>
            </Row>
          </TextOnImage>
        </HotChallengeFrame>
      );
    }
    return result;
  }
  return (
    <>
      <p><b>HOT Challenge🔥</b></p>
        <Carousel autoplay>
          {renderHotChallenges()}
        </Carousel>
    </>
  );
}

const HotChallengeFrame = styled.div`
  position: relative;
`

const HotChallengeImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  opacity: 20%;
`

const TextOnImage = styled.div`
  position: absolute;
  right: 20%;
  left: 20%;
  bottom: 25%;
`

export default HotChallenge;