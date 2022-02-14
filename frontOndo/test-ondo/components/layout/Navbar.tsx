import React, { useEffect, useState } from "react";
import OndoLogo from "/public/images/ondo.png";
import Image from "next/image";
import Link from "next/link";
import { Input, Row, Col, Menu, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Searchbar from "./Searchbar";
import Router from "next/router";
import LoggedInForm from "./LoggedInForm";
import styles from "css/index.module.css";
import useUser from "store/hooks/userHooks";

// const { Search } = Input;
// const onSearch = (value:any) => console.log(value);

// const StyledContent = styled(Search)`
//   font-size: 50px
// `;

function Navbar(): JSX.Element {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { nickname, GetUser } = useUser();
  useEffect(() => {
    GetUser();
  }, [])
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

  return (
    <NavWrapper>
      {/* <img src={OndoLogo} alt='OndoLogo'/> */}
      <Nav>
        <XsLogo xs={24} lg={4} xl={6}>
          <Link href="/feedMain">
            <a>
              <Image src={OndoLogo} width={60} height={42} />
            </a>
          </Link>
          {/* <StyledContent placeholder="input search text" onSearch={onSearch} enterButton /> */}
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
            <MenuLink style={{ color: "red", fontWeight: "bold" }}>
              <Link href="/challenge">Challenge🔥</Link>
            </MenuLink>
            <Link href={"/user/" + nickname}>
              <a>
                <MenuLink>
                  <LoggedInForm />
                </MenuLink>
              </a>
            </Link>
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
  padding: 1rem 5rem 1rem 5rem;
  /* padding:10px; */
  /* background-color: black; */
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  `;

const Nav = styled(Row)`
  padding: 10px;
  /* display: flex;
    justify-content: space-between; */
  align-items: center;
  /* flex-wrap: wrap; */
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
  padding: 0 10px;
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
