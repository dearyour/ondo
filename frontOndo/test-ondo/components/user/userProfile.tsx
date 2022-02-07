import React from 'react';
import { Modal, Button, Col, Row, Divider } from 'antd';
import Image from 'next/image';
import styled from 'styled-components';
import temp_profile from 'public/images/temp_profile.jpg'


const UserProfile = ({nowUser}:any) => {
  
  return (
    <ProfileWrap>
      <Col span={6}>
        <ProfileImg src={temp_profile}></ProfileImg>
      </Col>
      <ProfileRight span={6} offset={1}>
        <Nick>{nowUser.nickname}</Nick>
      </ProfileRight>
      <Col span={10} offset={1}>
        <UserStates>온도: {nowUser.ondo}°C</UserStates>
        <ProfileDiv>도전 중 {nowUser.challenges.length} | 도전 완료 {nowUser.challenges.length}</ProfileDiv>
        <ProfileDiv>팔로워 {nowUser.follow} | 팔로잉 {nowUser.following}</ProfileDiv>
      </Col>
    </ProfileWrap>
  )
};

const ProfileWrap = styled(Row)`
  width: 80%;
  margin-left: auto;
  margin-right:auto;
`

const ProfileImg = styled(Image)`
  padding: 10px;
`

const ProfileRight = styled(Col)`
  
`

const Nick = styled.h2`
  margin-top: 15px;
`

const UserStates = styled.div`
  margin-top: 60px;
`

const ProfileDiv = styled.div`
  margin-top: 10px;
`
export default UserProfile;