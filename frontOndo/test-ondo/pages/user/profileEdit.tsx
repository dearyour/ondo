import React, { useState, useCallback, useRef, useEffect } from "react";
import NowTitleBar from "components/NowTitleBar";
import AppLayout from "components/layout/AppLayout";
import styled from "styled-components";
import styles from "css/index.module.css";
import { Modal, Button, Col, Row, Input, Upload, message } from "antd";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import temp_profile from "public/images/temp_profile.jpg";
import useInput from "store/hooks/useInput";
import useUser from "store/hooks/userHooks";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import CropImg from "components/Cropper";
import useImg from "store/hooks/imgHooks";

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
  const { file, image, originalImg, setFile, setImage, setOriginalImage } = useImg();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, onChangeNick] = useState("asdas");
  // const [image, setImage] = useState<string>();
  // const [file, setFiles] = useState<File | ''>('')
  // const [originalImg, setOriginalImage] = useState<string>()
  const onChangeNickname = useCallback((e) => {
    onChangeNick(e.target.value);
  }, []);

  const { GetUser, profile, nickname, users } = useUser();
  useEffect(() => {
    GetUser();
    setImage(users.image);
    onChangeNick(users.username);

  }, [])
  const onEditNickname = () => {
    const token = localStorage.getItem('Token');
    const formdata = new FormData();
    console.log(file);
    formdata.append("file", file);
    formdata.append("username", username);
    axios({
      method: 'put',
      url: process.env.BACK_EC2 + '/user/modify',
      headers: { "Content-Type": "multipart/form-data", Authorization: "Bearer " + token },
      data: formdata,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const ImgUpload = (e: any) => {
    if (e.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (e.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(e.file.originFileObj, (imageUrl: any) => {
        setOriginalImage(imageUrl)
        console.log(originalImg)
        setLoading(false)
        return;
      },
      );
    }
  };
  const UpBtn = styled(Button)`
    border: 0px;
    color: #F3F3F3;
    padding: 4px 16px;
    background-color: #ebc1c1;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background-color: #e7adad;
    }
  `
  const uploadButton = (
    <UpBtn icon={<UploadOutlined />}>Upload</UpBtn>
  );
  return (
    <AppLayout>
      {originalImg ? <CropImg></CropImg> : null}

      <NowTitleBar title="개인정보 수정"></NowTitleBar>
      <BorderDiv>
        <div>
          <Divide>
            <h3 className={styles.mx_20}>프로필</h3>
            {image ? <Profile src={image}></Profile> : <DefaultProfile src={temp_profile}></DefaultProfile>}

            <UpImage
              name="file"
              onChange={ImgUpload}
              showUploadList={false}
              beforeUpload={beforeUpload}
              maxCount={1}
            >{uploadButton}</UpImage>
          </Divide>
          <Divide>
            <h3 className={styles.mx_20}>닉네임</h3>
            <NickInput defaultValue={username} onChange={onChangeNickname}></NickInput>
            <Button className={styles.mx_20} onClick={onEditNickname}>
              수정
            </Button>
          </Divide>
        </div>
      </BorderDiv>
    </AppLayout>
  );
};

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
const DefaultProfile = styled(Image)`
  border-radius: 100%;
  width: 40%;
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
