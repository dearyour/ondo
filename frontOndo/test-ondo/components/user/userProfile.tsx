import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, Button, Col, Row } from "antd";
import Image from "next/image";
import styled from "styled-components";
import temp_profile from "public/images/temp_profile.jpg";
import { UserOutlined } from "@ant-design/icons";
import FollowUser from "./followUser";
import Router from "next/router";
import useUser from "store/hooks/userHooks";

const UserProfile = ({ data }: any) => {
  const [followModalVisible, setfollowModalVisible] = useState(false);
  const [user, setUser] = useState<any>([]);
  const { users } = useUser();
  useEffect(() => {
    setUser(data.user);
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

  // const __doFollow = useCallback(() => {}, [nickname, param]);

  return (
    <ProfileWrap>
      <Col span={14} md={6}>
        <ProfileImg src={user && user.image}></ProfileImg>
      </Col>
      <ProfileRight span={4} md={6} offset={1}>
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
        <UserStates>온도: {user ? user.ondo : null}°C</UserStates>
        <ProfileDiv>
          도전 중{" "}
          {user && user.challengeParticipate
            ? user.challengeParticipate.length
            : 0}{" "}
          | 도전 완료{" "}
          {data.compeleteChallenge ? data.compeleteChallenge.length : 0}
        </ProfileDiv>
        <ProfileDiv>
          <Fspan onClick={showFollowModal}>
            팔로워{" "}
            {data ? data.followerUserDtos.length : 0}
          </Fspan>{" "}
          |{" "}
          <Fspan onClick={showfollowingModal}>
            팔로잉{" "}
            {data ? data.followingUserDtos.length : 0}
          </Fspan>
        </ProfileDiv>
        <div
          className="follow-btn txt-bold"
        // onClick={__doFollow}
        >
          팔로우 하기
        </div>
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
  );
};

const ProfileWrap = styled(Row)`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const FModal = styled(Modal)`
  border-radius: 10px;
`;

const ProfileImg = styled.img`
  padding: 10px;
  border-radius: 100%;
  width: 100%;
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
`;

const UserStates = styled.div`
  margin-top: 60px;
`;

const ProfileDiv = styled.div`
  margin-top: 10px;
`;
export default UserProfile;
