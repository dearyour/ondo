import React, { useState } from 'react';
import { Modal, Button, Col, Row } from 'antd';
import Image from 'next/image';
import styled from 'styled-components';
import temp_profile from 'public/images/temp_profile.jpg'
import { UserOutlined } from '@ant-design/icons';
import FollowUser from './followUser';


const UserProfile = ({ nowUser }: any) => {
  const [followModalVisible, setfollowModalVisible] = useState(false);

  const showFollowModal = () => {
    setfollowModalVisible(true);
  };

  const handleOkFollow = () => {
    setfollowModalVisible(false);
  };

  const handleCancelFollow = () => {
    setfollowModalVisible(false);
  };

  const [followingModalVisible, setfollowingModalVisible] = useState(false);

  const showfollowingModal = () => {
    setfollowingModalVisible(true);
  };

  const handleOkfollowing = () => {
    setfollowingModalVisible(false);
  };

  const handleCancelFollowing = () => {
    setfollowingModalVisible(false);
  };

  return (
    <ProfileWrap>
      <Col span={6}>
        <ProfileImg src={temp_profile}></ProfileImg>
      </Col>
      <ProfileRight span={6} offset={1}>
        <Nick>{nowUser.nickname}</Nick>
        <Profileedit><UserOutlined /> 개인정보 수정</Profileedit>
      </ProfileRight>
      <Col span={10} offset={1}>
        <UserStates>온도: {nowUser.ondo}°C</UserStates>
        <ProfileDiv>도전 중 {nowUser.challenges.length} | 도전 완료 {nowUser.endChallenges.length}</ProfileDiv>
        <ProfileDiv ><Fspan onClick={showFollowModal}>팔로워 {nowUser.follow.length}</Fspan> | <Fspan onClick={showfollowingModal}>팔로잉 {nowUser.following.length}</Fspan></ProfileDiv>
      </Col>
      <Modal
        visible={followModalVisible}
        onOk={handleOkFollow}
        centered={true}
        onCancel={handleCancelFollow}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        follow
        {nowUser.follow.map((user: any) => {
          let key = 111
          return (
            <FollowUser user={user} key={key++}></FollowUser>
          )
        })}
      </Modal>
      <Modal
        visible={followingModalVisible}
        onOk={handleOkfollowing}
        centered={true}
        onCancel={handleCancelFollowing}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        following
        {nowUser.following.map((user: any) => {
          let key = 111111
          return (
            <FollowUser user={user} key={key++}></FollowUser>
          )
        })}
      </Modal>
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
  border-radius: 100%;
`

const ProfileRight = styled(Col)`
  
`
const Profileedit = styled.div`
  margin-top: 120px;
  white-space:nowrap;
  
`
const Fspan = styled.span`
  cursor: pointer;
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