import React, { useCallback, useEffect, useState } from "react";
import { Modal, Button, Col, Row, Alert, Progress, Drawer, List, Avatar } from "antd";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import useUser from "store/hooks/userHooks";
import axios from "axios";
import Link from "next/link";

const UserProfile = ({ data }: any) => {
  const router = useRouter();
  const [followModalVisible, setfollowModalVisible] = useState(false);
  const [user, setUser] = useState<any>([]);
  const { users } = useUser();
  const [alert, setAlert] = useState<boolean>(false);
  const [isFollowed, setFollowed] = useState<boolean>(true);
  const [ondo, setOndo] = useState<number>(1);
  const { isLoading, loadingStart, loadingEnd } = useUser();

  useEffect(() => {
    setfollowModalVisible(false);
    setUser(data.user);
    setOndo(1);
    console.log(data)
    if (data) {
      setFollowed(data.followflag)

      setTimeout(() => {
        setOndo(data.user.ondo)

      }, 1000);
    }
  }, [data]);

  // 팔로우 Drawer관련
  const showFollowModal = () => {
    setfollowModalVisible(true);
  };

  const handleCancelFollow = () => {
    setfollowModalVisible(false);
  };

  const [followingModalVisible, setfollowingModalVisible] = useState(false);

  const showfollowingModal = () => {
    setfollowingModalVisible(true);
  };

  const handleCancelFollowing = () => {
    setfollowingModalVisible(false);
  };


  // 팔로우
  const DoFollow: React.MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent<HTMLElement>) => {
    const token = localStorage.getItem('Token');
    axios({
      method: 'post',
      url: process.env.BACK_EC2 + '/follow/' + user.username,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        setAlert(true)
        setFollowed(false)
        data.followerUserDtos.push({ image: users.image, username: users.username });
        router.push('/user/' + user.username);
        AlertClose();
      })
  }
  // 자동으로 alert창 닫기
  const AlertClose = useCallback(() => {
    setTimeout(() => { setAlert(false) }, 2000);
  }, [])
  const UnFollow: React.MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent<HTMLElement>) => {
    const token = localStorage.getItem('Token');
    axios({
      method: 'delete',
      url: process.env.BACK_EC2 + '/follow/' + user.username,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        setAlert(true)
        setFollowed(true)
        data.followerUserDtos = data.followerUserDtos.filter((now: any) => {
          now.username !== users.username
          // now !== { image: users.image, username: users.username }
        })
        router.push('/user/' + user.username)
        AlertClose();
      })
  }

  const handleClose = () => {
    setAlert(false)
  }
  // 데이터 없을 때. 추가하면 속도가 좀 느려짐
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

  return (
    <Wrap>
      {
        alert && !isFollowed && <FollowAlert message="팔로우하였습니다." type="info" closable afterClose={handleClose}></FollowAlert>
      }

      {
        alert && isFollowed && <FollowAlert message="언팔로우하었습니다." type="info" closable afterClose={handleClose}></FollowAlert>
      }
      <ProfileWrap justify="space-around">
        <ProfileCol md={8}>
          <ProfileImg src={user && user.image}></ProfileImg>
        </ProfileCol>
        <ProfileRight md={7}>
          {user ? <Nick><div><Style className={user.chooseStyle}>{user.chooseStyle}</Style></div> {user.username}</Nick> : null}
          <Profileedit
            onClick={() => {
              loadingStart();
              Router.push("/user/profileEdit");
            }}
          >
            {data.modifyflag ? <ProfileEdit><UserOutlined />개인정보 수정</ProfileEdit> : null}
          </Profileedit>
        </ProfileRight>
        <Col md={8}>
          <UserStates>온도   {user ? <span>   {user.ondo}</span> : null}°C  {user ? <OndoProgress
            strokeColor={{
              '0%': '#058cec',
              '100%': '#ff0000',
            }}
            percent={ondo}
            showInfo={false}
          /> : null}</UserStates>
          <ProfileDiv>
            <InnerDiv>도전 중</InnerDiv>
            {user && user.challengeParticipate
              ? <InnerDiv>{user.challengeParticipate.length}</InnerDiv>
              : 0}
            <InnerDiv>도전 완료</InnerDiv>
            {data.compeleteChallenge ? <InnerDiv>{data.compeleteChallenge.length}</InnerDiv> : 0}
          </ProfileDiv>
          <ProfileDiv>
            <Fspan onClick={showFollowModal}>
              <FollowDiv>팔로워</FollowDiv><span> </span>
              {data ? <InnerDiv>{data.followerUserDtos.length}</InnerDiv> : 0}
            </Fspan>
            <Fspan onClick={showfollowingModal}>
              <FollowDiv>팔로잉</FollowDiv>
              {data ? <InnerDiv>{data.followingUserDtos.length}</InnerDiv> : 0}
            </Fspan>
          </ProfileDiv>
          {user && user.username === users.username ? null : isFollowed ?
            <FollowBtn
              className=""
              onClick={DoFollow}
            // onClick={__doFollow}
            >
              팔로우
            </FollowBtn> : <FollowBtn className="" onClick={UnFollow}>언팔로우</FollowBtn>}
        </Col>
        <Drawer
          visible={followModalVisible}
          headerStyle={{ textAlign: 'center' }}
          title="Follow"
          onClose={handleCancelFollow}
        >
          <List
            itemLayout="horizontal"
            dataSource={data.followerUserDtos}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={<Link href={'/user/' + item.username}><a>{item.username}</a></Link>}
                />
              </List.Item>

            )}
          />
        </Drawer>
        <Drawer
          visible={followingModalVisible}
          title="Following"
          onClose={handleCancelFollowing}
          headerStyle={{ textAlign: 'center' }}
        >
          <List
            itemLayout="horizontal"
            dataSource={data.followingUserDtos}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={<Link href={'/user/' + item.username}><a>{item.username}</a></Link>}
                />
              </List.Item>
            )}
          />
        </Drawer>
      </ProfileWrap>
    </Wrap>
  );
};

const Style = styled.span`
  font-size: 1rem;

`

const OndoProgress = styled(Progress)`
  transition: all 2.0s ease-in-out;
`

const FollowDiv = styled.div`
  border-radius: 5px;
  /* border: 1px solid palevioletred; */
  margin: 0 20px 0 0;
  color: #9e1b7d;
  display:inline;
  &:hover {
    transition: all 0.3s ease-in-out;
    color: palevioletred;
  }
`

const ProfileEdit = styled.div`
  &:hover {
    transition: all 0.3s ease-in-out;
    color: palevioletred;
  }
`
const Wrap = styled.div`
  margin-top: 20px;
`

const FollowAlert = styled(Alert)`
  position: absolute;
  left: 40%;
  /* right: auto; */
  top: 30px;
  z-index: 2;
`

const InnerDiv = styled.div`
  margin: 0 20px 0 0;
  display:inline;
`

const FollowBtn = styled(Button)`
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #f57af5;
  background-color: #f5e4f5;
  &:hover {
    background-color: #ebd4eb;
  }
`

const ProfileWrap = styled(Row)`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  /* background-color: #f7eeef; */
  border: 1px solid pink;
  /* background-color: #fcf6f7; */
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const FModal = styled(Modal)`
  border-radius: 10px;
  /* overflow-y: scroll;
  max-height: 500px; */
  /* height: 20%; */
`;

const ProfileCol = styled(Col)`
  padding:10px;
`

const ProfileImg = styled.img`
  /* padding: 10px; */
  border-radius: 100%;
  width: 100%;
  border: 1px solid pink;
`;
const FModalDiv = styled.div`
`;
const ProfileRight = styled(Col)``;
const Profileedit = styled.div`
  margin-top: 150px;
  white-space: nowrap;
  cursor: pointer;
`;
const Fspan = styled.span`
  cursor: pointer;
  /* border: 1px solid palevioletred;
  padding: 3px;
  margin-right: 5px; */
`;

const Nick = styled.h2`
  margin-top: 15px;
  /* margin-bottom: 15px; */
  /* border: 1px solid black; */
  padding: 5px;
  border-radius: 5px;
`;

const UserStates = styled.div`
  margin-top: 60px;
  /* border: 1px solid pink; */
  border-radius:5px;
  padding: 5px;
`;

const ProfileDiv = styled.div`
  margin-top: 10px;
  /* border: 1px solid pink; */
  border-radius:5px;
  padding: 5px;
`;
export default UserProfile;
