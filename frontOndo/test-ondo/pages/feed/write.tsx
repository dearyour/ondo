import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button, Form, Input } from 'antd';
import AppLayout from '../../components/layout/AppLayout';
import styles from 'css/index.module.css';
import { Select } from 'antd';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import Router from 'next/router';
<<<<<<< HEAD
import { feed } from 'store/slice/feed';
=======
import useImg from 'store/hooks/imgHooks';
import CropImg from 'components/Cropper';
>>>>>>> back-updatecomment

const { Dragger } = Upload;
const { TextArea } = Input;
const { Option } = Select;

function getBase64(img: Blob, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

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


const ImageUploadInputSetting = {
  name: 'file',
  action: '',
  headers: {
    authorization: 'authorization-text',
  },
};


const Write_feed = () => {
  const { file, image, originalImg, setFile, setImage, setOriginalImage } = useImg();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | ''>('');
  const [hashtag, setHashtag] = useState<string | ''>('')
  // const [image, setImage] = useState<string | ''>('')
  const [content, setContent] = useState<string | ''>('')
<<<<<<< HEAD
  const [files, setFiles] = useState<any|''>('')
=======
  // const [files, setFiles] = useState<File | ''>('')
  const [Imgname, setImgname] = useState<string>();
>>>>>>> back-updatecomment
  const [num, setNum] = useState<number>(0)
  const [hashArr, setHashArr] = useState<string[] | []>([])
  const [challenge, setChallenge] = useState<string | ''>('')
  const challenges = [];
  for (let i = 10; i < 36; i++) {
    challenges.push(<Option key={i.toString(36) + i}>하루에 {i}보 걷기</Option>);
  }
  const onChangeChallenge = (e: any) => {
    setChallenge(e.target.value)
  }
  const onChangeHashtag: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  }
  const onChangeImage: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
  }
  const onChangeContent: React.ChangeEventHandler<HTMLTextAreaElement> = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const handleChange = (info: any) => {
    // setFile(info.file)
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImgname(info.file.name)
        return setLoading(false), setOriginalImage(imageUrl)
      },
      );
    }
  };

  // 피드 작성 axios
  const WriteRequest = () => {
<<<<<<< HEAD
    const datas = {
=======
    const feed = {
      image: new FormData(),
>>>>>>> back-updatecomment
      tags: hashArr,
      challengeId: 1,
      content: content,
    }
    feed.image.append('image', file)
    const token = localStorage.getItem('Token')
    const formData = new FormData();
    formData.append("file", files.originFileObj);
    formData.append("data", new Blob([JSON.stringify(datas)], {type: "application/json"}))
    console.log(formData.get('file'));
    axios({
      method: 'POST',
      url: 'http://localhost:8080/feed/create',
      headers: {
        "Content-Type": `multipart/form-data`,
      Authorization: "Bearer " + token 
    },
      data: formData,

    })

  }

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


  const onKeyUp = (e: any) => {
    if (process.browser) {
      /* 요소 불러오기, 만들기*/
      const $HashWrapOuter: Element | null = document.querySelector('.HashWrapOuter')
      const $HashWrapInner: HTMLDivElement = document.createElement('div')
      const nowClass = 'HashWrapInner' + String(num)
      $HashWrapInner.className = nowClass
      /* 태그를 클릭 이벤트 관련 로직 */
      $HashWrapInner.addEventListener('click', () => {
        $HashWrapOuter?.removeChild($HashWrapInner)
        console.log($HashWrapInner.innerHTML)
        setHashArr(hashArr.filter((hashtag) => hashtag))
      })

      /* enter 키 코드 :13 */
      if (e.keyCode === 13 && e.target.value.trim() !== '') {
        // console.log('Enter Key 입력됨!', e.target.value)
        $HashWrapInner.innerHTML = e.target.value + 'X'
        $HashWrapOuter?.appendChild($HashWrapInner)
        setHashArr((hashArr) => [...hashArr, hashtag])
        setHashtag('')
        setNum((num + 1) % 3)
      }
    }
  }

  return (
    <AppLayout>
      <Write >
        <Writetitle>피드 작성하기</Writetitle>
        {originalImg ? <CropImg></CropImg> : null}
        {/* <MyImage>{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '50%', border: '1px solid #ebc1c1' }} /> : ''}</MyImage> */}
        <WriteDiv>
          <Label>이미지</Label>
<<<<<<< HEAD
          <UploadInput  value={image}></UploadInput>
=======
          <UploadInput value={Imgname}></UploadInput>
>>>>>>> back-updatecomment
          <UpImage {...ImageUploadInputSetting}
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {uploadButton}
          </UpImage>
        </WriteDiv>
        <WriteDiv>
          <Label>도전</Label>
          <WriteInput bordered={false}>{challenges}</WriteInput>
        </WriteDiv>
        <WriteDiv>
          <div className='HashWrapOuter'></div>
        </WriteDiv>
        <WriteDiv className="">
          <Label>태그</Label>
          <TagInput value={hashtag} onChange={onChangeHashtag} onKeyUp={onKeyUp}></TagInput>
        </WriteDiv>
        <WriteDiv>
          <Label>내용</Label>
          <WriteTA rows={4} onChange={onChangeContent}></WriteTA>
        </WriteDiv>
        <div className={`${styles.d_flex} ${styles.justify_content_end} ${styles.w_60}`}>
          <WriteButton onClick={WriteRequest}>작성</WriteButton>
          <WriteButton onClick={() => { Router.push('/') }}>취소</WriteButton>
        </div>
      </Write>
    </AppLayout>
  )
}

const MyImage = styled.div`
  display: flex;
  justify-content: center;
`
const UpImage = styled(Upload)`
  width: 10%;
  margin: 5px 0 5px 5px;
`

const Write = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

`

const Writetitle = styled.h1`
  text-align: center;
  margin-top:40px;
  margin-bottom:20px;
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
  padding: 10px 30px 30px 30px;  
  margin: 20px 10px;  
  &:hover {
    cursor: pointer;
    background-color: #e7adad;
  }
`

const WriteInput = styled(Select)`
  box-shadow: none;
  margin: 5px 0 5px 5px;
  padding: 5px;
  border-radius: 10px;
  background-color: #fdfcf6;
  border: 1px solid #EDBABA;
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
  width: 40%;
  &:focus {
    outline: none;
  }
`

const WriteDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 15px;


.HashWrapOuter {
  display: flex;
  flex-wrap: wrap;
}

.HashWrapInner0 {
  margin-top: 5px;
  background: #ffeee7;
  border-radius: 56px;
  padding: 4px 8px;
  color: #ff6e35;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  line-height: 20px;
  margin-right: 5px;
  cursor: pointer;
}

.HashWrapInner1 {
  margin-top: 5px;
  background: #e7e7ff;
  border-radius: 56px;
  padding: 4px 8px;
  color: #332b28;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  line-height: 20px;
  margin-right: 5px;
  cursor: pointer;
}

.HashWrapInner2 {
  margin-top: 5px;
  background: #e7ffe9;
  border-radius: 56px;
  padding: 4px 8px;
  color: #3e573d;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  line-height: 20px;
  margin-right: 5px;
  cursor: pointer;
}

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