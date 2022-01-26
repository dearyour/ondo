import React, { useState } from 'react';
import OndoLogo from '/public/images/ondo.png';
import Image from 'next/image'
import { Input } from 'antd';
import styled from 'styled-components';
import Searchbar from './Searchbar';

// const { Search } = Input;
// const onSearch = (value:any) => console.log(value);

// const StyledContent = styled(Search)`
//   font-size: 50px
// `;

function Navbar(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavWrapper>
            {/* <img src={OndoLogo} alt='OndoLogo'/> */}
            <Nav>
            <a href=''><Image src={OndoLogo} /></a>
            {/* <StyledContent placeholder="input search text" onSearch={onSearch} enterButton /> */}
            <Hamburger onClick={() => setIsOpen(!isOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </Hamburger>
            <Searchbar />
            <Menu>
                <MenuLink style={{color: 'red', fontWeight: 'bold'}}>Challenge🔥</MenuLink>|
                <MenuLink>로그인</MenuLink>|
                <MenuLink>회원가입</MenuLink>
            </Menu>
            </Nav>
        </NavWrapper>
    )
}

const NavWrapper = styled.div`
    padding: 1rem 10rem;
    `;

const Nav = styled.div`
    padding: 0 2rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background: white;
    border-bottom: 2px solid #edbaba;
`;

const Hamburger = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;

    span {
        height: 2px;
        width: 25px;
        background: palevioletred;
        margin-bottom: 4px;
        border-radius: 5px;
    }

    @media (max-width: 768px) {
        display: flex;
    }
`;

const MenuLink = styled.div`
    padding: 1rem 2rem;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    color: black;
    transition: all 0.3s ease-in;
    font-size: 0.9rem;

    &:hover {
        color: palevioletred;
    }
`;

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
        overflow: hidden;
        flex-direction: column;
        width: 100%;
    }
`;

export default Navbar;