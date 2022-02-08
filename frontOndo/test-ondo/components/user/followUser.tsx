import React from 'react';
import { Button, Col, Row } from 'antd';
import styled from 'styled-components';
import Router from 'next/router';


const FollowUser = ({ user }: any) => {
  return (
    <FollowRow onClick={() => { const { nickname } = user; Router.push('/user/' + nickname); Router.reload(); }}>
      <Col span={2}>
        <Profile src={user.image}></Profile>
      </Col>
      <FollowCol>{user.nickname}</FollowCol>
    </FollowRow>
  )
};

const Profile = styled.img`
  border-radius: 100%;
`

const FollowCol = styled(Col)`
  margin-left: 10px;
  margin-top: auto;
  margin-bottom: auto;
`

const FollowRow = styled(Row)`
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`

export default FollowUser;