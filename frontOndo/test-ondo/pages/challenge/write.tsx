import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button, Form, Input, Space, Row, Col } from 'antd';
import Image from 'next/image';
import AppLayout from '../../components/layout/AppLayout';
import UploadAvatar from '../../components/data_entry/Upload';
import CategorySelector from '../../components/data_entry/CategorySelector';
import StartDatePicker from 'components/data_entry/StartDatePicker';
import FightingDogye from 'public/images/dogye/fighting.png';
import axios from 'axios';
import useImg from "store/hooks/imgHooks";
import Router from 'next/router';
import CropImg from 'components/Cropper';

const { TextArea } = Input;

const WriteChallenge = () => {
  const { file, image, originalImg, setFile, setImage, setOriginalImage } = useImg();
  const [imageUrl, setImageUrl] = useState<string | ''>('');
  const [startDate, setStartDate] = useState<string | ''>('');
  const [category, setCategory] = useState<string | ''>('');
  const [title, setTitle] = useState<string | ''>('');
  const [content, setContent] = useState<string | ''>('');

  const [imageErr, setImageErr] = useState<string>();
  const [titleErr, setTitleErr] = useState<string>();
  const [dateErr, setDateErr] = useState<string>();
  const [contentErr, setContentErr] = useState<string>();
  const [categoryErr, setCategoryErr] = useState<string>();

  useEffect(() => {
    setImage(null);
  }, [])
  const CheckBeforeCreate = () => {
    let i = 0
    if (!file) {
      setImageErr("이미지는 필수입니다.")
      i++
    } else {
      setImageErr('')
    }
    if (!category) {
      setCategoryErr('카테고리를 선택해주세요.')
    } else {
      setCategoryErr('')
    }
    if (!startDate) {
      setDateErr("날짜를 선택해주세요.")
      i++
    } else {
      setDateErr('')
    }
    if (!title) {
      setTitleErr("제목을 입력해주세요.")
      i++
    } else {
      setTitleErr('')
    }
    if (!content) {
      setContentErr("내용을 입력해주세요.")
      i++
    } else {
      setContentErr('')
    }
    if (i) {

      return false;
    }
    return true
  }

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
    setTitleErr('')
  }, []);

  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
    setContentErr('')
  }, []);

  const onSubmitForm = useCallback(() => {

  }, []);
  // 챌린지 생성 요청
  const openChallengeRequest = () => {
    if (!CheckBeforeCreate()) {
      return
    }
    // console.log(process.env.BACK_EC2);

    const data = {
      title: title,
      content: content,
      s_date: startDate,
      // image: new FormData(),
      category: category
    }
    // data.image.append('file', file)
    const formdata = new FormData();
    formdata.append('file', file)
    formdata.append('data', new Blob([JSON.stringify(data)], { type: "application/json" }))
    // formdata.append('title', title)
    // formdata.append('s_data', startDate)
    // formdata.append('content', content)
    // formdata.append('category', category)
    const token = localStorage.getItem('Token')
    // console.log(data)
    axios({
      method: 'POST',
      url: process.env.BACK_EC2 + '/challenge/create',
      headers: { "Content-Type": `multipart/form-data`, Authorization: "Bearer " + token },
      data: formdata,
    })
      .then((res) => {
        // console.log(res)
        setFile(null)
        Router.push('/challenge/' + String(res.data.challengeId))
      })
  }

  return (
    <AppLayout title='도전 개설하기 | 온도'>
      {originalImg ? <CropImg></CropImg> : null}
      <Row>
        <Col xs={0} md={6}></Col>
        <Col xs={24} md={14}>
          <Write>
            <Space direction='horizontal'>
              <Image src={FightingDogye} width={100} height={100}></Image>
              <SpeechBubble>멋진 도전을 개설해 주세요!</SpeechBubble>
            </Space>
            <RowStyle>
              <Col xs={10} md={10}>
                <UploadAvatar offErr={setImageErr} changeThumbnail={(imageUrl: string) => setImageUrl(imageUrl)} />
              </Col>
              <Col xs={13} md={13} style={{ display: 'flex', alignItems: 'center' }}>
                <StartDatePicker changeStartDate={(dateString: string) => { setStartDate(dateString); setDateErr(''); }} />
              </Col>
            </RowStyle>
            <Row>
              <Col span={11}>
                <ErrDiv>{imageErr}</ErrDiv>
              </Col>
              <Col>
                <ErrDiv>{dateErr}</ErrDiv>
              </Col>
            </Row>
            <Row>
              <Col>
                <CategorySelector changeCategory={(value: string) => { setCategory(value); setCategoryErr(''); }} />
                <ErrDiv>{categoryErr}</ErrDiv>
              </Col>
            </Row>
            <Space direction='horizontal' style={{ margin: '10px' }}>
              <label htmlFor='title'>제목</label>
              <TitleInput style={{ width: 300 }} name='title' value={title} onChange={onChangeTitle} />
            </Space>
            <ErrDiv>{titleErr}</ErrDiv>
            <Space direction='horizontal' style={{ margin: '10px 10px 0 10px' }}>
              <label htmlFor='content'>내용</label>
              <ContentInput showCount maxLength={200} allowClear rows={4} style={{ width: 500 }} placeholder='도전 상세 내용, 인증 사진 찍는 법 등을 기재해 주세요.' name='content' value={content} onChange={onChangeContent} />
            </Space>
            <ErrDiv2>{contentErr}</ErrDiv2>
            <Button.Group style={{ justifyContent: 'center' }}>
              <ConfirmBtn onClick={openChallengeRequest}>개설</ConfirmBtn>
              <CancelBtn onClick={() => { setFile(null); Router.push('/challenge') }}>취소</CancelBtn>
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
const ErrDiv = styled.div`
  /* text-align: center; */
  color: #ee3434;
  margin-left: 10px;
`

const ErrDiv2 = styled.div`
  color: #ee3434;
  margin-left: 10px;
  margin-bottom: 20px;
`

const RowStyle = styled(Row)`
  margin-left:12px;
`
const Write = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
`

const Writetitle = styled.h2`
  text-align: left;
  color: palevioletred;
  margin-top: 50px;
  margin-bottom: 40px;
`

const SpeechBubble = styled.div`
  width: 300px;
  margin: 50px auto;
  background: #F0F0F0;
  padding: 20px;
  text-align: center;
  font-weight: 1000;
  font-size: large;
  /* color: palevioletred;
  font-family: arial; */
  position: relative;
  border-radius: 10px;

  ::before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid #F0F0F0;
    border-top: 10px solid #F0F0F0;
    border-bottom: 10px solid transparent;
    left: -15px;
    top: 20px;
  }
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
  margin: 5px 5px 0 5px;
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