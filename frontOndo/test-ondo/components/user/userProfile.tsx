import React from 'react';
import { Modal, Button, Col, Row, Divider } from 'antd';
import Image from 'next/image';
import styled from 'styled-components';


const UserProfile = () => {
  const nowUser = {
    nickname: '',
    image: '',
    ondo: '',
    challenges: [],
    endChallenges: [],
    follow: 4,
    following: 6,
  }
  return (
    <ProfileWrap>
      <Col span={6}>
        <img src='https://picsum.photos/2500'></img>
      </Col>
      <Col span={18}>
        as
      </Col>

    </ProfileWrap>
  )
};

const ProfileWrap = styled(Row)`
  width: 80%;
  margin-left: auto;
  margin-right:auto;
  
  
`
export default UserProfile;