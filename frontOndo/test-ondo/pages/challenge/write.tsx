import React from 'react';
import styled, {css} from 'styled-components';
import { Button, Form, Input, Space } from 'antd';
import AppLayout from '../../components/layout/AppLayout';
import UploadAvatar from '../../components/data_entry/Upload';
import StartDatePicker from '../../components/data_entry/DatePicker';
import ChallengeSelector from '../../components/data_entry/ChallengeSelector';
import { SP } from 'next/dist/shared/lib/utils';

const {Search, TextArea} = Input;

const WriteChallenge = () => {
  return (
    // <AppLayout title='도전 생성 | 온도'>
    <Write>
        <Writetitle>도전을 만들어주세요!</Writetitle>
        <Space direction='horizontal'>
        <UploadAvatar/>
        <StartDatePicker />
        </Space>
        <ChallengeSelector />
        <TitleInput style={{width: 300}}/>
        <ContentInput rows={4} style={{width: 500}}/>
        <Space direction='horizontal'>
        <ConfirmBtn>저장</ConfirmBtn>
        <CancelBtn>취소</CancelBtn>
        </Space>
    </Write>
    // </AppLayout>
  )
}

// const WriteChallenge = () => {
//   return (
//     <>
//     <Writetitle>도전을 만들어주세요!</Writetitle>
//     <StartDatePicker />
//     </>

//   )
// }

const Write = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Writetitle = styled.h1`
  text-align: left;
  color: palevioletred;
`

const TitleInput = styled(Input)`
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin: 5px;
  border-color: #EDBABA;
  &:focus {
    outline: none;
  }
`
const ContentInput = styled(TextArea)`
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin: 5px;
  border-color: '#edbaba';
  &:focus {
    outline: none;
  }
`
const ConfirmBtn = styled(Button)`
  background: #edbaba;
  border-radius: 3px;
  border: 2px solid #edbaba;
  color: white;
  text-align: center;
  margin: 0 ;
  padding: 0.25em 1em;
  width: 120px;
  &:hover {
    cursor: pointer;
    background-color: #e7adad;
  }
`
const CancelBtn = styled(Button)`
  background: white;
  border-radius: 3px;
  border: 2px solid #edbaba;
  color: #edbaba;
  text-align: center;
  margin: 0 1em;
  padding: 0.25em 1em;
  width: 120px;
  &:hover {
    cursor: pointer;
    background-color: #e7adad;
  }
`

export default WriteChallenge;