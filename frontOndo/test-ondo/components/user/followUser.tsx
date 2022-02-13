import React from 'react';
import { Button, Col, Row } from 'antd';
import styled from 'styled-components';
import Router from 'next/router';


const FollowUser = ({ user, off1, off2 }: any) => {
  return (
    <FollowRow onClick={() => { const { username } = user; Router.push('/user/' + username); off1(); off2(); }}>
      <Col span={2}>
        <Profile src={user.image}></Profile>
      </Col>
      <FollowCol>{user.username}</FollowCol>
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