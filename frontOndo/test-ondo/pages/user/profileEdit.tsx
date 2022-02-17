import React, { useState, useCallback, useRef, useEffect, ReactNode, useLayoutEffect } from "react";
import NowTitleBar from "components/NowTitleBar";
import AppLayout from "components/layout/AppLayout";
import styled from "styled-components";
import styles from "css/index.module.css";
import { Modal, Button, Col, Row, Input, Upload, message, Select, Spin } from "antd";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import temp_profile from "public/images/temp_profile.jpg";
import useInput from "store/hooks/useInput";
import useUser from "store/hooks/userHooks";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import CropImg from "components/Cropper";
import useImg from "store/hooks/imgHooks";
import Router from "next/router";
import StyleDrawer from 'components/user/StyleInfo';


function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('Image must smaller than 10MB!');
  }
  return isJpgOrPng && isLt10M;
}

function getBase64(img: Blob, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const Edit = () => {
  const { isLoading, loadingStart, loadingEnd } = useUser();
  const { GetUser, profile, nickname, users } = useUser();
  const { file, image, originalImg, setFile, setImage, setOriginalImage } = useImg();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, onChangeNick] = useState(users.username); // input값
  const [chooseStyle, setChooseStyle] = useState<any>();
  const [style, setStyle] = useState<any>();
  const [usernameErr, setUsernameErr] = useState<string>();
  const { Option } = Select;

  const onChangeNickname = useCallback((e) => {
    setUsernameErr('')
    onChangeNick(e.target.value);
  }, []);



  const StyleChallenge = (e: any) => {
    setStyle(e);
  }
  // useLayoutEffect


  useEffect(() => {
    const token = localStorage.getItem('Token');
    axios({
      method: 'get',
      url: process.env.BACK_EC2 + '/user/modify',
      headers: { Authorization: "Bearer " + token },
    })
      .then(res => {
        // console.log(res)
        // setImage(res.data.image)
        // onChangeNick(res.data.username)
        setChooseStyle(res.data.stylesList)
      })
    GetUser();
    setImage(users.image);
    onChangeNick(users.username);
    setStyle(users.chooseStyle)
    loadingEnd()
    // console.log(users)

  }, [])
  // 개인정보 수정
  const onEditNickname = () => {
    loadingStart()
    const token = localStorage.getItem('Token');
    const formdata = new FormData();
    // console.log(file);
    const name = username !== users.username ? username : null;
    formdata.append("file", file);
    formdata.append("username", username);
    formdata.append("chooseStyle", style)

    axios({
      method: 'put',
      url: process.env.BACK_EC2 + '/user/modify',
      headers: { "Content-Type": "multipart/form-data", Authorization: "Bearer " + token },
      data: formdata,
    })
      .then((res) => {
        setLoading(false)

        Router.push('/feedMain');
        // setImage(null)
      })
      .catch((err) => {
        setLoading(false)
        loadingEnd()
        setUsernameErr("중복된 닉네임입니다.")
      })
  }

  const ImgUpload = (e: any) => {
    setLoading(true);
    if (e.file.status === 'uploading') {
      setLoading(false)
      return;
    }
    if (e.file.status === 'done') {
      getBase64(e.file.originFileObj, (imageUrl: any) => {
        setOriginalImage(imageUrl)
        // console.log(originalImg)
        setLoading(false)
        return;
      },
      );
    }
    setLoading(false)
  };
  const UpBtn = styled(Button)`
    border: 0px;
    color: #F3F3F3;
    padding: 4px 16px;
    background-color: #f5ebeb;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background-color: #ebcdcd;
    }
  `
  const uploadButton = (
    <UpBtn icon={<UploadOutlined />}>Upload</UpBtn>
  );

  const Nodata = () => {
    return (
      <NodataDiv>
        <DogyeImg src="/images/dogye/sad.png"></DogyeImg>
        <DogyeContent>보유중인 칭호가 없어요...</DogyeContent>
      </NodataDiv>
    )
  }

  const DogyeImg = styled.img`
    width: 20%;
  `
  const DogyeContent = styled.span`
    text-align: center;
  `

  const NodataDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    /* align-items: center; */
  `
  const Loading = styled(Spin)`
    position: absolute;
    top:45%;
    left: 45%;
    z-index: 10;
  `

  return (
    <AppLayout title="내 정보 수정하기 | 온도">
      {loading && <Loading size="large" tip={<div>로딩 중...</div>}></Loading>}
      {originalImg ? <CropImg></CropImg> : null}

      <NowTitleBar title="개인정보 수정"></NowTitleBar>
      <BorderDiv>
        <div>
          <Divide>
            <h3 className={styles.mx_20}>프로필</h3>
            {image ? <Profile src={image}></Profile> : <DefaultProfile src={users.image}></DefaultProfile>}

            <UpImage
              name="file"
              onChange={ImgUpload}
              showUploadList={false}
              beforeUpload={beforeUpload}
              maxCount={1}
            >{uploadButton}</UpImage>

            <Title>칭호</Title>
            <StyleInput
              placeholder="현재 보유중인 칭호 목록"
              value={style ? style : null}
              bordered={false}
              notFoundContent={Nodata()}
              dropdownStyle={{ boxShadow: 'none', border: '1px solid pink', borderRadius: '10px' }}
              onChange={StyleChallenge}
            >
              {chooseStyle && chooseStyle.length > 0
                ? chooseStyle.map((now: any) => {
                  return (
                    <Option
                      value={now.styleName}
                      key={now.stylesId}
                      title={now.content}

                    >
                      <OptionContent><span className={now.styleName}>{now.styleName}</span> - {now.content}</OptionContent>
                    </Option>
                  );
                })
                : null}
            </StyleInput>
            <StyleDrawer></StyleDrawer>
          </Divide>
          <Divide>
            <h3 className={styles.mx_20}>닉네임</h3>
            <NickInput value={username} onChange={onChangeNickname}></NickInput>
            <EditBtn className={styles.mx_20} onClick={onEditNickname}>
              수정
            </EditBtn>
          </Divide>
          <Errmsg>{usernameErr ? usernameErr : null}</Errmsg>
        </div>
      </BorderDiv>
    </AppLayout >
  );
};
const OptionContent = styled.div`
  padding: 2px 0 2px 0;
  /* margin: 0px 1px 1px 1px; */
`
const Errmsg = styled.div`
  color: red;
  opacity: 80%;
  margin-left: 100px;
`

const Title = styled.h3`
  margin-left: 40px;
  margin-right: 20px;
`

const StyleInput = styled(Select)`
  box-shadow: none;
  margin: 5px 0 5px 5px;
  padding: 5px 5px 5px 5px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #edbaba;
  width: 50%;
  outline: #edbaba 1px;
`;

const EditBtn = styled(Button)`
  border: 0px;
    color: #F3F3F3;
    padding: 4px 16px;
    background-color: #f5ebeb;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background-color: #ebcdcd;
    }
`

const UpImage = styled(Upload)`
  width: 10%;
  margin: 5px 0 5px 5px;
`
const BorderDiv = styled.div`
  border: 1px solid #edbaba;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
`;

const Divide = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Profile = styled.img`
  border-radius: 100%;
  width: 20%;
  border: solid 1px black;
`;
const DefaultProfile = styled.img`
  border-radius: 100%;
  width: 20%;
  border: solid 1px black;
`;

const NickInput = styled(Input)`
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin: 5px;
  border-color: #edbaba;
  width: 50%;
  &:focus {
    outline: none;
  }
`;

export default Edit;
