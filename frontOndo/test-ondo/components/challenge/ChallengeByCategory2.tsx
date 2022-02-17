import React from "react";
import { Row, Col, Space } from 'antd';
import styled from "styled-components";
import Image from "next/image";
import Router from "next/router";
import Head from "next/head";
import HappyDogye from 'public/images/dogye/happy.png'
import Link from "next/link";

const ChallengeByCategory2 = (props: any) => {
  const challenges = [...props.categorized];

  const getDuration = (startDate: string) => {
    // const sDate = startDate.substring(0, 10);
    const sy = startDate.substring(0, 4);
    const sm = startDate.substring(4, 6);
    const sd = startDate.substring(6, 8);

    const eDate = new Date(Number(sy), Number(sm) - 1, Number(sd) + 2);
    const ey = eDate.getFullYear();
    const em = eDate.getMonth() + 1;
    const ed = eDate.getDate();

    return sy + '-' + sm + '-' + sd + ' ~ '
      + ey + '-' + (("00" + em.toString()).slice(-2)) + '-' + (("00" + ed.toString()).slice(-2));
  }

  const renderCategorizedChallenges = () => {
    const result = [];

    for (let i = 0; i < challenges.length; i++) {
      result.push(
        <Card key={i}>
          <CardImg src={challenges[i].image} />
          <CardBody>
            <h3>{challenges[i].title}</h3>
            <p>{getDuration(challenges[i].sdate)} | {challenges[i].category}</p>
            <h4>현재 {challenges[i].challengeParticipate.length} 명 참여 중</h4>
            <button onClick={() => { Router.push(`/challenge/${challenges[i].challengeId}`) }}>자세히 보기</button>
          </CardBody>
        </Card>
      )
    }

    return result;
  }

  return (
    <>
      <Head><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap"></link></Head>
      <Row>
        <Col span={24}>
          {/* <WriteBtnWrapper><WriteBtn onClick={() => { Router.push('/challenge/write') }}>도전 개설하기</WriteBtn></WriteBtnWrapper> */}
          <Space direction='horizontal' style={{ display: 'flex', justifyContent: 'right', marginBottom: '-2rem' }}>
            <SpeechBubble>
              원하는 도전이 없나요? <br />
              그렇다면 <Link href='/challenge/write'><a>직접 개설</a></Link>해 보세요!
            </SpeechBubble>
            <Image src={HappyDogye} width={100} height={100} />
          </Space>
          <Wrapper>
            {renderCategorizedChallenges()}
          </Wrapper>
        </Col>
      </Row>
    </>
  )
}

const WriteBtnWrapper = styled.div`
  display: flex;
  justify-content: right;
`

const WriteBtn = styled.button`
  position: relative;
  background: #edbaba;
  border-radius: 3px;
  border: 2px solid #edbaba;
  color: white;
  text-align: center;
  margin: 50px 0 20px 0;
  padding: 0.25em 1em;
  width: 150px;
  height: 30px;

  &:hover {
    cursor: pointer;
    background-color: #e7adad;
  }
`

const SpeechBubble = styled.div`
  width: 250px;
  margin: 50px auto;
  background: #F0F0F0;
  padding: 20px;
  text-align: center;
  font-weight: 100;
  font-size: small;
  /* color: palevioletred;
  font-family: arial; */
  position: relative;
  border-radius: 10px;

  ::before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid #F0F0F0;
    border-right: 10px solid transparent;
    border-top: 10px solid #F0F0F0;
    border-bottom: 10px solid transparent;
    right: -15px;
    top: 20px;
  }

  a{
    color: #4979ff;
    text-decoration: underline;
  }
`

const Wrapper = styled.div`
  font-family: "Noto Sans", sans-serif;
  color: #4f546c;
  
  margin: 2rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  justify-content: center;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(14rem, 16rem));
  }
`

const Card = styled.div`
  box-shadow: 0 0 10px 5px #e1e5ee;
  border-radius: 0.2rem;
  min-width: 28rem;
  display: flex;
  /* position: relative; */

  @media screen and (min-width: 600px) {
    flex-direction: column;
    text-align: center;
    min-width: 14rem;
  }
`

const CardFooter = styled.div`
  height: 20%;
  width: 100%;
`

const CardImg = styled.img`
  width: 14rem;
  height: 14rem;
  object-fit: cover;

  @media screen and (min-width: 600px) {
    width: 100%;
    height: 12rem;
  }
`

const CardBody = styled.div`
  margin: 1rem;
  flex-grow: 1;

  h3 {
    line-height: 1.4rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.8rem;
    line-height: 1.2rem;
  }

  h4 {
    font-size: 1.2rem;
    margin-top: 0.6rem;
  }

  button {
    border: none;
    border-top: 1px solid #e1e5ee;
    background-color: transparent;
    font-family: inherit;
    font-size: 1rem;
    font-weight: bold;
    color: inherit;
    width: 100%;
    padding-top: 1rem;
    margin-top: 1rem;
    cursor: pointer;

    &:hover {
      color: palevioletred;
    }
  }
`

export default ChallengeByCategory2;