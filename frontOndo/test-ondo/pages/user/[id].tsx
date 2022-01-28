import React from 'react';
import styled from 'styled-components';
import styles from 'css/index.module.css'
import useUser from 'store/hooks/userHooks';
import { Modal, Button, Col, Row } from 'antd';
import AppLayout from 'components/layout/AppLayout';
import Image from 'next/image';
import temp_profile from 'public/images/temp_profile.jpg'
import 'antd/dist/antd.css';

const mypage = () => {
  const nickname = 'temp';
  const follow = [1,2,3,4];
  const following = [1,2,3,4];
  const ondo = 44;

  return (
    <AppLayout title="mypage">
      <Row>
        <Col span={8} xs={24} md={8} className={styles.border_right}>
          <div className={styles.justify_content_center}>
            <Image src={temp_profile}></Image>
            <div>
              <FollowBtn>팔로우 {follow.length}</FollowBtn>
              <FollowBtn>팔로잉 {following.length}</FollowBtn>
            </div>
            <p>{nickname}</p>
            <p>{ondo}</p>
            <Button>수정</Button>
          </div>
        </Col>
        <Col span={15} xs={24} md={15} offset={1}>
          <div>
            <h1>도전 중</h1>
            <h1>도전 완료</h1>
          </div>
        </Col>
      </Row>
    </AppLayout>
  )
}

const FollowBtn = styled(Button)`
  border: 0px;
  color: #F3F3F3;
  background-color: #ebc1c1;
  border-radius: 5px;
  padding: 10px;  
  margin: 20px 10px;  
  &:hover {
    cursor: pointer;
    background-color: #e7adad;
  }
`


export default mypage;