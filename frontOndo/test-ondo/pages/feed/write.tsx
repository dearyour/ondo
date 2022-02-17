import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Button, Form, Input, Space, Spin } from "antd";
import AppLayout from "../../components/layout/AppLayout";
import styles from "css/index.module.css";
import { Select } from "antd";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Router from "next/router";
import { feed } from "store/slice/feed";
import useImg from "store/hooks/imgHooks";
import CropImg from "components/Cropper";
import useUser from "store/hooks/userHooks";
import FightingDogye from 'public/images/dogye/fighting.png';
import Image from "next/image";

const { Dragger } = Upload;
const { TextArea } = Input;
const { Option } = Select;

function getBase64(img: Blob, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt10M = true;
  if (!isLt10M) {
    message.error("Image must smaller than 10MB!");
  }
  return isJpgOrPng && isLt10M;
}

const ImageUploadInputSetting = {
  name: "file",
  action: "",
  headers: {
    authorization: "authorization-text",
  },
};

const Write_feed = () => {
  const { file, image, originalImg, setFile, setImage, setOriginalImage } =
    useImg();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | "">("");
  const [hashtag, setHashtag] = useState<string | "">("");
  const [imagename, setImagename] = useState<string | "">("");
  const [content, setContent] = useState<string | "">("");
  // const [files, setFiles] = useState<any | ''>('')
  const [num, setNum] = useState<number>(0);
  const [hashArr, setHashArr] = useState<string[] | []>([]);
  const [challenges, setChallenges] = useState<any>("");
  const [challenge, setChallenge] = useState<any>("");

  const [imageErr, setImageErr] = useState<string>();
  const [challengeErr, setChallengeErr] = useState<string>();
  const [tagErr, setTagErr] = useState<string>();
  const [contentErr, setContentErr] = useState<string>();
  // for (let i = 10; i < 36; i++) {
  //   challenges.push(<Option key={i.toString(36) + i}>하루에 {i}보 걷기</Option>);
  // }

  // 도전 받아오기
  useEffect(() => {
    const token = localStorage.getItem('Token');
    setImage(null)
    axios({
      method: "get",
      url: process.env.BACK_EC2 + "/feed/create",
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      // console.log(res);
      if (res.data) {
        setChallenges(res.data);
      } else {
        // challenges = [{ 'name': '도전이 없습니다.' }]
      }
    });
  }, []);

  const onChangeHashtag: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHashtag(e.target.value);
  };
  const onChangeImage: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // console.log(e.target);
  };
  const onChangeContent: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);
    setContentErr("");
  };

  const CheckBeforeCreate = () => {
    let i = 0;
    if (!file) {
      setImageErr("이미지는 필수입니다.");
      i++;
    } else {
      setImageErr('')
    }
    // if (hashArr.length < 1) {
    //   setTagErr("태그를 입력 후 엔터를 눌러주세요.")
    //   i++
    // } else {
    // }
    setTagErr('')
    if (!challenge) {
      // console.log(challenge);
      setChallengeErr("도전을 선택해주세요.");
      i++;
    } else {
      setChallengeErr("");
    }
    if (!content) {
      setContentErr("내용을 입력해주세요.");
      i++;
    } else {
      setContentErr("");
    }
    if (i) {
      return false;
    }
    return true;
  };

  const ChallengeChange = (e: any) => {
    setChallenge(e);
    setChallengeErr("");
  };

  const handleChange = (info: any) => {
    setLoading(true)
    setImageErr("");
    // setFile(info.file)
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImagename(info.file.name);
        return setLoading(false), setOriginalImage(imageUrl);
      });
    }
  };

  // 피드 작성 axios
  const WriteRequest = () => {
    setLoading(true);
    if (CheckBeforeCreate()) {
      const data = {
        // image: new FormData(),
        tags: hashArr,
        challengeId: challenge,
        content: content,
      };
      // console.log(data);
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      const token = localStorage.getItem("Token");
      axios({
        method: "POST",
        url: process.env.BACK_EC2 + "/feed/create",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        data: formdata,
      }).then((res) => {
        // console.log(res);
        Router.push("/feedMain");
      });
    }
    setLoading(false)
  };

  const UpBtn = styled(Button)`
    border: 0px;
    color: #f3f3f3;
    padding: 4px 16px;
    background-color: #f5ebeb;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background-color: #ebcdcd;
    }
  `;
  const uploadButton = <UpBtn icon={<UploadOutlined />}>Upload</UpBtn>;

  const Nodata = () => {
    return (
      <NodataDiv>
        <DogyeImg src="/images/dogye/sad.png"></DogyeImg>
        <DogyeContent>진행중인 도전이 없어요...</DogyeContent>
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
`

  const onKeyUp = (e: any) => {
    if (process.browser) {
      /* 요소 불러오기, 만들기*/
      const $HashWrapOuter: Element | null =
        document.querySelector(".HashWrapOuter");
      const $HashWrapInner: HTMLDivElement = document.createElement("div");
      const nowClass = "HashWrapInner" + String(num);
      $HashWrapInner.className = nowClass;
      /* 태그를 클릭 이벤트 관련 로직 */
      $HashWrapInner.addEventListener("click", () => {
        $HashWrapOuter?.removeChild($HashWrapInner);
        // console.log($HashWrapInner.innerHTML);
        setHashArr(hashArr.filter((hashtag) => hashtag));
      });

      /* enter 키 코드 :13 */
      if (e.keyCode === 13 && e.target.value.trim() !== "") {
        if (hashArr.length > 1) {
          if (
            hashArr.some((now) => {
              return now === e.target.value;
            })
          ) {
            setTagErr("중복된 태그는 입력할 수 없습니다.");
            return;
          }
        }
        // console.log('Enter Key 입력됨!', e.target.value)
        $HashWrapInner.innerHTML = e.target.value;
        $HashWrapOuter?.appendChild($HashWrapInner);
        setHashArr((hashArr) => [...hashArr, hashtag]);
        setHashtag("");
        setTagErr("");
        setNum((num + 1) % 3);
      }
    }
  };

  const Loading = styled(Spin)`
    position: absolute;
    top:45%;
    left: 45%;
    z-index: 10;
  `

  return (
    <AppLayout title="도전 인증 피드 작성하기 | 온도">
      <Write>
        {loading && <Loading size="large" tip={<div>로딩 중...</div>}></Loading>}
        {/* <Writetitle>피드 작성하기</Writetitle> */}
        <Space direction='horizontal' style={{ justifyContent: 'center' }}>
          <Image src={FightingDogye} width={100} height={100} />
          <SpeechBubble>피드로 인증해주세요!</SpeechBubble>
        </Space>
        {originalImg ? <CropImg></CropImg> : null}
        <MyImage>
          {image ? (
            <img
              src={image}
              alt="avatar"
              style={{ width: "50%", border: "1px solid #ebc1c1" }}
            />
          ) : (
            ""
          )}
        </MyImage>
        <WriteDiv>
          <Label>이미지</Label>
          <UploadInput value={imagename}></UploadInput>
          <UpImage
            {...ImageUploadInputSetting}
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {uploadButton}
          </UpImage>
        </WriteDiv>
        <ErrDiv>{imageErr}</ErrDiv>
        <WriteDiv>
          <Label>도전</Label>
          <WriteInput
            placeholder="현재 진행중인 도전 목록"
            bordered={false}
            onChange={ChallengeChange}
            notFoundContent={Nodata()}
            dropdownStyle={{ boxShadow: 'none', border: '1px solid pink', borderRadius: '10px' }}
          >
            {challenges
              ? challenges.map((challenge: any) => {
                return (
                  <Option
                    value={challenge.challengeId}
                    key={challenge.challengeId}
                  >
                    {challenge.title}
                  </Option>
                );
              })
              : null}
          </WriteInput>
        </WriteDiv>
        <ErrDiv>{challengeErr}</ErrDiv>
        <WriteDiv>
          <div className="HashWrapOuter"></div>
        </WriteDiv>
        <WriteDiv className="">
          <Label>태그</Label>
          <TagInput
            placeholder="태그 입력 후 Enter를 눌러주세요"
            value={hashtag}
            onChange={onChangeHashtag}
            onKeyUp={onKeyUp}
          ></TagInput>
        </WriteDiv>
        <ErrDiv>{tagErr}</ErrDiv>
        <WriteDiv>
          <Label>내용</Label>
          <WriteTA rows={4} onChange={onChangeContent}></WriteTA>
        </WriteDiv>
        <ErrDiv>{contentErr}</ErrDiv>
        <div
          className={`${styles.d_flex} ${styles.justify_content_end} ${styles.w_60}`}
        >
          <WriteButton onClick={WriteRequest}>작성</WriteButton>
          <WriteButton
            onClick={() => {
              setFile(null);
              Router.push("/feedMain");
            }}
          >
            취소
          </WriteButton>
        </div>
      </Write>
    </AppLayout>
  );
};

const ErrDiv = styled.div`
  text-align: center;
  color: #ee3434;
`;

const MyImage = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
`;
const UpImage = styled(Upload)`
  width: 10%;
  margin: 5px 0 5px 5px;
`;

const Write = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Writetitle = styled.h1`
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const SpeechBubble = styled.div`
  width: 250px;
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

const Label = styled.label`
  padding-top: 5px;
  white-space: nowrap;
  padding: 5px;
  width: 10%;
  text-align: left;
`;

const WriteButton = styled(Button)`
  border: 0px;
  color: #f3f3f3;
  background-color: #f5ebeb;
  border-radius: 5px;
  padding: 10px 30px 30px 30px;
  margin: 20px 10px;
  &:hover {
    cursor: pointer;
    background-color: #ebcdcd;
  }
`;

const WriteInput = styled(Select)`
  box-shadow: none;
  margin: 5px 0 5px 5px;
  padding: 5px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #edbaba;
  width: 50%;
  outline: #edbaba 1px;
`;

const WriteTA = styled(TextArea)`
  margin: 5px 0 5px 5px;
  border-radius: 10px;
  padding: 5px;
  background-color: #ffffff;
  border-color: #edbaba;
  width: 50%;
  &:focus {
    outline: none;
  }
`;

const UploadInput = styled(Input)`
  box-shadow: none;
  margin: 5px 0 5px 5px;
  padding: 5px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #edbaba;
  width: 40%;
  &:focus {
    outline: none;
  }
`;

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
`;

const TagInput = styled(Input)`
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin: 5px 0 5px 5px;
  padding: 5px;
  width: 50%;
  border-color: #edbaba;
  &:focus {
    outline: none;
  }
`;

const UploadButton = styled(Button)`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: none;
  background-color: #edbaba;
`;

export default Write_feed;
