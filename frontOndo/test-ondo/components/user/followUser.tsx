import React from 'react';
import { Button, Col, Row } from 'antd';
import styled from 'styled-components';


const FollowUser = ({ user }: any) => {
  return (
    <Row>
      <Col span={2}>
        <Profile src={user.image}></Profile>
      </Col>
      <FollowCol>{user.nickname}</FollowCol>
    </Row>
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

export default FollowUser;