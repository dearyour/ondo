import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, Button, Col, Row, Alert } from "antd";
import Image from "next/image";
import styled from "styled-components";
import temp_profile from "public/images/temp_profile.jpg";
import { UserOutlined } from "@ant-design/icons";
import FollowUser from "./followUser";
import Router, { useRouter } from "next/router";
import useUser from "store/hooks/userHooks";
import axios from "axios";

const UserProfile = ({ data }: any) => {
  const router = useRouter();
  const [followModalVisible, setfollowModalVisible] = useState(false);
  const [user, setUser] = useState<any>([]);
  const { users } = useUser();
  const [alert, setAlert] = useState<boolean>(false);
  const [isFollowed, setFollowed] = useState<boolean>(true);
  useEffect(() => {
    setUser(data.user);
    if (data) {
      setFollowed(data.followflag)
    }
  }, [data]);
  const showFollowModal = () => {
    setfollowModalVisible(true);
  };

  const handleOkFollow = () => {
    setfollowModalVisible(false);
  };

  const handleCancelFollow = () => {
    setfollowModalVisible(false);
  };

  const [followingModalVisible, setfollowingModalVisible] = useState(false);

  const showfollowingModal = () => {
    setfollowingModalVisible(true);
  };

  const handleOkfollowing = () => {
    setfollowingModalVisible(false);
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
  // const __doFollow = useCallback(() => {}, [nickname, param]);
  const handleClose = () => {
    setAlert(false)
  }
  return (
    <Wrap>
      {alert ?
        <FollowAlert message="정상적으로 처리되었습니다." type="info" closable afterClose={handleClose}></FollowAlert>
        : null}

      <ProfileWrap>
        <ProfileCol span={14} md={8}>
          <ProfileImg src={user && user.image}></ProfileImg>
        </ProfileCol>
        <ProfileRight span={4} md={4} offset={1}>
          <Nick>{user ? user.username : null}</Nick>
          <Profileedit
            onClick={() => {
              Router.push("/user/profileEdit");
            }}
          >
            {data.modifyflag ? <div><UserOutlined />개인정보 수정</div> : null}
          </Profileedit>
        </ProfileRight>
        <Col span={4} md={8} offset={1}>
          <UserStates>온도  {user ? user.ondo : null}°C</UserStates>
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
              <InnerDiv>팔로워 </InnerDiv>
              {data ? <InnerDiv>{data.followerUserDtos.length}</InnerDiv> : 0}
            </Fspan>
            <Fspan onClick={showfollowingModal}>
              <InnerDiv>팔로잉</InnerDiv>
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
        <FModal
          visible={followModalVisible}
          onOk={handleOkFollow}
          centered={true}
          onCancel={handleCancelFollow}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          {data && data.followerUserDtos.length >= 1 ? (
            data.followerUserDtos.map((user: any) => {
              let key = 9;
              return (
                <FModalDiv key={key++}>
                  <FollowUser off1={setfollowModalVisible} off2={setfollowingModalVisible} user={user}></FollowUser>
                  <hr />
                </FModalDiv>
              );
            })
          ) : (
            <div>팔로우 중인 유저가 없습니다.</div>
          )}
        </FModal>
        <FModal
          visible={followingModalVisible}
          onOk={handleOkfollowing}
          centered={true}
          onCancel={handleCancelFollowing}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          {data &&
            data.followingUserDtos.length >= 1 ? (
            data.followingUserDtos.map((user: any) => {
              let key = 9;
              return (
                <FModalDiv key={key++}>
                  <FollowUser user={user} off1={setfollowModalVisible} off2={setfollowingModalVisible}></FollowUser>
                  <hr />
                </FModalDiv>
              );
            })
          ) : (
            <div>팔로잉 중인 유저가 없습니다.</div>
          )}
        </FModal>
      </ProfileWrap>
    </Wrap>
  );
};

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
  background-color: #f1e8f1;
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
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const FModal = styled(Modal)`
  border-radius: 10px;
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
const FModalDiv = styled.div``;
const ProfileRight = styled(Col)``;
const Profileedit = styled.div`
  margin-top: 120px;
  white-space: nowrap;
  cursor: pointer;
`;
const Fspan = styled.span`
  cursor: pointer;
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
