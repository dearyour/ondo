import React from 'react';
import NowTitleBar from 'components/NowTitleBar'
import AppLayout from 'components/layout/AppLayout';
import styled from 'styled-components';
import styles from 'css/index.module.css'
import { Modal, Button, Col, Row, Input } from 'antd';
import Image from 'next/image';
import temp_profile from 'public/images/temp_profile.jpg'
import useInput from 'store/hooks/useInput';

const Edit = () => {
  const [nickname, onChangeNick] = useInput('asdas');
  return (
    <AppLayout>
      <NowTitleBar title="개인정보 수정"></NowTitleBar>
      <BorderDiv>
        <div>
          <Divide>
            <h3  className={styles.mx_20}>프로필</h3>
            <Profile src={temp_profile}></Profile>
            <Button  className={styles.mx_20}>수정</Button>
          </Divide>
          <Divide>
            <h3  className={styles.mx_20}>닉네임</h3>
            <NickInput value={nickname} onChange={onChangeNick}></NickInput>
            <Button  className={styles.mx_20}>수정</Button>
          </Divide>
        </div>
      </BorderDiv>
    </AppLayout>
  )
}

const BorderDiv = styled.div`
  border: 1px solid #EDBABA;
  border-radius: 5px;
  padding: 10px;
`

const Divide = styled.div`
  display: flex;
  align-items: center;
`

const Profile = styled(Image)`
  border-radius: 100%;

`

const NickInput = styled(Input)`
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin: 5px;
  border-color: #EDBABA;
  width: 50%;
  &:focus {
    outline: none;
  }
`

export default Edit;