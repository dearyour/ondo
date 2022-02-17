import React from 'react';
import { Col, Row } from 'antd';
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
  border: 1px solid pink;
`

const FollowCol = styled(Col)`
  margin-left: 10px;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.2rem;
`

const FollowRow = styled(Row)`
  width:95%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`

export default FollowUser;