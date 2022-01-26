import React from 'react';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import AppLayout from '../../components/layout/AppLayout';

const {Search} = Input;

const Write_feed = () => {
  return (
    <AppLayout title='write_feed'>
    <Write>
        <Writetitle>피드 작성하기</Writetitle>
        <WriteDiv>
          <Label>이미지</Label>
          <UploadInput enterButton="업로드"></UploadInput>
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
          <WriteInput></WriteInput>
        </WriteDiv>
    </Write>
    </AppLayout>
  )
}


const Write = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Writetitle = styled.h1`
  text-align: center;
`

const Label = styled.label`
  padding-top: 5px;
  white-space: nowrap;

`

const WriteButton = styled(Button)`
  width: 100%;
  border: 0px;
  color: #F3F3F3;
  background-color: #ebc1c1;
  border-radius: 5px;
  padding: 10px;  
  margin: 20px 0px;
  &:hover {
    cursor: pointer;
    background-color: #e7adad;
  }
`

const WriteInput = styled(Input)`
  margin: 5px 0 5px 5px;
  border-radius: 10px;
  background-color: #fdfcf6;
  border-color: #EDBABA;
  &:focus {
    outline: none;
  }
`

const UploadInput = styled(Search)`
  border-radius: 5px;
  background-color: #fdfcf6;
  border-color: #EDBABA;
`

const WriteDiv = styled.div`
  display: flex;
  width: 100%;

`

const TagInput = styled(Input)`
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin: 5px;
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