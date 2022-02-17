import React, { useCallback, useEffect, useState } from "react";
import OndoLogo from "/public/images/textLogo.png";
import Image from "next/image";
import Link from "next/link";
import { Row, Col, Menu, Dropdown, Spin } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Searchbar from "./Searchbar";
import Router from "next/router";
import LoggedInForm from "./LoggedInForm";
import useUser from "store/hooks/userHooks";


function Navbar(): JSX.Element {
  const { isLoading, loadingStart, loadingEnd } = useUser();
  const { nickname, GetUser } = useUser();
  useEffect(() => {
    GetUser();
    // loadingStart();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      loadingEnd();
    }
      , 3000)
  }, [isLoading])
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link href="/challenge">
          <a>challenge</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link href={"/user/" + nickname}>
          <a>mypage</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <div onClick={Logout}>Logout</div>
      </Menu.Item>
    </Menu>
  );

  const LoadingWrap = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 12;
    background-color: #f8f1f1;
    opacity: 50%;
    text-align: center;
    top:0;
    left:0;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
    
  `
  const Loading = styled(Spin)`
    opacity: 1 !important;
    z-index: 13;
`
  return (
    <NavWrapper>
      {isLoading && <LoadingWrap><Loading size="large" tip={<div>로딩 중...</div>}></Loading></LoadingWrap>}
      <Nav>
        <XsLogo xs={24} lg={4} xl={6}>
          <Link href="/feedMain">
            <a onClick={loadingStart}>
              <Image src={OndoLogo} width={150} height={50} />
            </a>
          </Link>
          <Hamburger
            overlayStyle={{ width: "50%" }}
            overlay={menu}
            trigger={["click"]}
          >
            <MenuOutlined style={{ fontSize: "25px" }} />
          </Hamburger>
        </XsLogo>
        <Col xs={24} md={24} lg={8} xl={6}>
          <Searchbar />
        </Col>
        <Col md={24} lg={12}>
          <Menuitem>
            <MenuLink onClick={() => { loadingStart(); Router.push('/challenge'); }}>오늘의 도전🔥</MenuLink>|
            <MenuLink onClick={() => { loadingStart(); Router.push(`/user/${nickname}`); }}><LoggedInForm /></MenuLink>|
            <MenuLink onClick={Logout}>로그아웃</MenuLink>
          </Menuitem>
        </Col>
      </Nav>
    </NavWrapper>
  );
}
const Logout = () => {
  localStorage.removeItem("Token");
  Router.push("/");
};
const XsLogo = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

const NavWrapper = styled.div`
  padding: 1rem 10rem 1rem 10rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
  `;

const Nav = styled(Row)`
  padding: 10px;
  align-items: center;
  background: white;
  border-bottom: 2px solid #edbaba;
`;

const Hamburger = styled(Dropdown)`
  display: none;
  cursor: pointer;

  @media (max-width: 992px) {
    display: flex;
  }
`;

const MenuLink = styled.div`
  cursor: pointer;
  padding: 0 20px;
  text-align: center;
  text-decoration: none;
  color: black;
  transition: all 0.3s ease-in;

  &:hover {
    color: palevioletred;
  }
`;

const Menuitem = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  @media (max-width: 992px) {
    display: none;
  }
`;

export default Navbar;
