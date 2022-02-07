import React, { useState, useCallback, useRef } from 'react';
import NowTitleBar from 'components/NowTitleBar'
import AppLayout from 'components/layout/AppLayout';
import styled from 'styled-components';
import styles from 'css/index.module.css'
import { Modal, Button, Col, Row, Input } from 'antd';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import temp_profile from 'public/images/temp_profile.jpg'
import useInput from 'store/hooks/useInput';
import useUser from 'store/hooks/userHooks';

const Edit = () => {
  const dispatch = useDispatch();
  const [nickname, onChangeNick] = useInput('asdas');
  const {ProfileEditRequest} = useUser();
  const onChangeNickname = useCallback((e) => {
    onChangeNick(e.target.value);
  }, []);
  const onEditNickname = useCallback((e) => {
    e.preventDefault();
    dispatch(ProfileEditRequest);
  }, [nickname]); 
  const profileImgInput: any = useRef();
  const ImgBtnClick = (e: any) => {
    e.preventdefault();
    profileImgInput.current.click();
  }

  const ImgUpload = async (e:any) => {
    const formdata = new FormData();
    formdata.append('file', e.target.files[0]);
    // 업로드 추가해야함
  }
  return (
    <AppLayout>
      <NowTitleBar title="개인정보 수정"></NowTitleBar>
      <BorderDiv>
        <div>
          <Divide>
            <h3  className={styles.mx_20}>프로필</h3>
            <Profile src={temp_profile}></Profile>
            <Button  className={styles.mx_20} onClick={ImgBtnClick}>수정</Button>
            <input type="file" accept='image/*' name='file' ref={profileImgInput} className={styles.d_none} onChange={ImgUpload}/>
          </Divide>
          <Divide>
            <h3  className={styles.mx_20}>닉네임</h3>
            <NickInput value={nickname} onChange={onChangeNickname}></NickInput>
            <Button  className={styles.mx_20} onClick={onEditNickname}>수정</Button>
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
  margin-top: 20px;
`

const Divide = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
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