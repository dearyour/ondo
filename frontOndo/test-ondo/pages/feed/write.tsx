import React from 'react';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import AppLayout from '../../components/layout/AppLayout';
import styles from 'css/index.module.css';

const { TextArea } = Input;

const Write_feed = () => {
  return (
    <AppLayout title='write_feed'>
    <Write>
      <Writetitle>피드 작성하기</Writetitle>
      <WriteDiv>
        <Label>이미지</Label>
        <UploadInput></UploadInput>
      </WriteDiv>
      <WriteDiv>
        <Label>도전</Label>
        <WriteInput></WriteInput>
      </WriteDiv>
      <WriteDiv>
        <Label>태그</Label>
        <TagInput></TagInput>
      </WriteDiv>
      <WriteDiv>
        <Label>내용</Label>
        <WriteTA rows={4}></WriteTA>
      </WriteDiv>
      <div className={`${styles.d_flex} ${styles.justify_content_end} ${styles.w_60}`}>
        <WriteButton>작성</WriteButton>
        <WriteButton>취소</WriteButton>
      </div>
    </Write>
    </AppLayout>
  )
}


const Write = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

`

const Writetitle = styled.h1`
  text-align: center;
`

const Label = styled.label`
  padding-top: 5px;
  white-space: nowrap;
  padding: 5px;
  width: 10%;
  text-align: left;

`

const WriteButton = styled(Button)`
  border: 0px;
  color: #F3F3F3;
  background-color: #ebc1c1;
  border-radius: 5px;
  padding: 10px 30px;  
  margin: 20px 10px;  
  &:hover {
    cursor: pointer;
    background-color: #e7adad;
  }
`

const WriteInput = styled(Input)`
  box-shadow: none;
  margin: 5px 0 5px 5px;
  padding: 5px;
  border-radius: 10px;
  background-color: #fdfcf6;
  /* border-color: #EDBABA; */
  border: 1px solid #EDBABA;
  /* border-top: #EDBABA; */
  /* border: none; */
  width: 50%;
  outline: #EDBABA 1px;
  
`

const WriteTA = styled(TextArea)`
  margin: 5px 0 5px 5px;
  border-radius: 10px;
  padding: 5px;
  background-color: #fdfcf6;
  border-color: #EDBABA;
  width: 50%;
  &:focus {
    outline: none;
  }
`

const UploadInput = styled(Input)`
  box-shadow: none;
  margin: 5px 0 5px 5px;
  padding: 5px;
  border-radius: 10px;
  background-color: #fdfcf6;
  border: 1px solid #EDBABA;
  width: 50%;
  &:focus {
    outline: none;
  }
`

const WriteDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;

`

const TagInput = styled(Input)`
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin: 5px 0 5px 5px;
  padding: 5px;
  width:50%;
  border-color: #EDBABA;
  &:focus {
    outline: none;
  }
`

const UploadButton = styled(Button)`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: none;
  background-color: #EDBABA;
`

export default Write_feed;