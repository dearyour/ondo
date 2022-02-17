import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styled from "styled-components";
import Router from "next/router";

function HotChallenge(props: any): JSX.Element {
  const hotChallenges = [...props.top10];

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

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(4, hotChallenges.length),
    slidesToScroll: 1,
    cssEase: 'linear'
  }

  const renderHotChallenge = () => {
    const result = [];
    for (let i = 0; i < Math.min(10, hotChallenges.length); i++) {
      result.push(
        <CardWrapper key={i} onClick={() => { Router.push(`/challenge/${hotChallenges[i].challengeId}`) }}>
          <Card>
            <CardImage>
              <ChallengeImage src={hotChallenges[i].image} />
            </CardImage>
            <Details>
              <h3>
                {hotChallenges[i].title}
                <SubTitle>
                  {getDuration(hotChallenges[i].sdate)} <br />
                  현재 {hotChallenges[i].challengeParticipate.length} 명 참여 중
                </SubTitle>
              </h3>
            </Details>
          </Card>
        </CardWrapper>
      )
    }

    return result;
  }

  return (
    <>
      <p style={{ marginTop: '30px' }}><b>HOT Challenge🔥</b></p>
      <SliderWrapper>
        <StyledSlider {...settings} >
          {renderHotChallenge()}
        </StyledSlider>
      </SliderWrapper>
    </>
  )
}

const SliderWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`

const StyledSlider = styled(Slider)`

    width: 90%;
    
    .slick-dots{
        bottom:-2.5vw;
        li{
            button{
                width:20px;
                height:20px;
                border:1px solid #edbaba;
                border-radius: 20px;
                &:before{
                    position:absolute;
                    top:50%;
                    left:50%;
                    width:10px;
                    height:10px;
                    border-radius: 10px;
                    content:"";
                    text-align: center;
                    opacity:.5;
                    color:#000;
                    background-color:#fff;
                    transform:translate(-50%, -50%);
                    transition:all .3s ease-in-out;
                }
            }
            &.slick-active,
            &:hover{
                button{
                    border-color: palevioletred;
                    &:before{
                        background-color: palevioletred;
                        opacity: 1;
                    }
                }
            }
        }
    }

    .slick-prev, .slick-next{
        width:50px;
        height:50px;
        background-color:#fff;
    }
    .slick-prev:hover,.slick-prev:focus,.slick-next:hover,.slick-next:focus{
        color:#fff;
        outline:none;
        background:#fff;
    }
    .slick-prev:before,.slick-next:before{
        color:#000;
        font-family: $Raleway;
    }
    .slick-next{
        right:-55px;
    }
    .slick-prev{
        left:-55px;
    }

`

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0 10px;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;

  :active, :hover, :focus {
    outline: none;
    border: none;
  }
`

const Card = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  // ?? 모르겟다
  &:hover img {
    opacity: .4;
    -webkit-transition: .5s;
    transition: .5s;
  }

  &:hover div:nth-child(1) {
    -webkit-transform: translateY(-100px);
          transform: translateY(-100px);
    -webkit-transition: all .9s;
    transition: all .9s;
  }

  &:hover div:nth-child(2) {
    bottom: -5px;
  }
`

const Details = styled.div`
  position: absolute;
  bottom: 400px;
  left: 0;
  background: #f0f0f0;
  width: 100%;
  height: 140px;
  z-index: 1;
  padding: 10px;
  -webkit-transition: .6s;
  transition: .6s;

  h3 {
    margin: 30px 0;
    padding: 0;
    text-align: center;
  }
`

const SubTitle = styled.span`
  font-size: 16px;
  line-height: 2;
  color: #333;
  font-weight: 300;
  display: block;
`

const CardImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #000;
  -webkit-transition: .5s;
  transition: .5s;
`

const ChallengeImage = styled.img`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
`

export default HotChallenge;
