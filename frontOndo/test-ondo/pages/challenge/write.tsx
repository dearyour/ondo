import React, { useCallback, useState } from 'react';
import styled, {css} from 'styled-components';
import { Button, Form, Input, Space, Row, Col } from 'antd';
import AppLayout from '../../components/layout/AppLayout';
import UploadAvatar from '../../components/data_entry/Upload';
import ChallengeSelector from '../../components/data_entry/ChallengeSelector';
import StartDatePicker from 'components/data_entry/StartDatePicker';

const { TextArea } = Input;

const WriteChallenge = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    
  }, []);

  return (
    <AppLayout title='도전 생성 | 온도'>
      <Row>
        <Col xs={0} md={6}></Col>
        <Col xs={24} md={14}>
        <Write onFinish={onSubmitForm}>
            <Writetitle>도전을 만들어주세요!</Writetitle>
            <Row>
              <Col xs={12} md={12}><UploadAvatar /></Col>
              <Col xs={12} md={12} style={{display: 'flex', alignItems: 'center'}}><StartDatePicker /></Col> 
            </Row>
            <ChallengeSelector />
            <Space direction='horizontal' style={{margin: '10px'}}>
              <label htmlFor='title'>제목</label>
              <TitleInput style={{width: 300}} name='title' value={title} onChange={onChangeTitle} />
            </Space>
            <Space direction='horizontal' style={{margin: '10px'}}>
              <label htmlFor='content'>내용</label>
              <ContentInput showCount maxLength={200} allowClear rows={4} style={{width: 500}} placeholder='도전 상세 내용, 인증 사진 찍는 법 등을 기재해 주세요.' name='content' value={content} onChange={onChangeContent}/>
            </Space>
            <Button.Group style={{justifyContent: 'center'}}>
              <ConfirmBtn>개설</ConfirmBtn>
              <CancelBtn>취소</CancelBtn>
            </Button.Group>
        </Write>
        </Col>
        <Col xs={0} md={4}></Col>
      </Row>
    </AppLayout>
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

const Write = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Writetitle = styled.h2`
  text-align: left;
  color: palevioletred;
  margin-top: 50px;
  margin-bottom: 40px;
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
  border-color: palevioletred;
  &:focus {
    outline: none;
  }
`
const ConfirmBtn = styled.button`
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
const CancelBtn = styled.button`
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
    background-color: #fffafa;
  }
`

export default WriteChallenge;