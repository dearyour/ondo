import React from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link';
import { Menu } from 'antd';

//특정 페이지만 공통인 부분은 레이아웃으로 만들자 
const Layout  = ({children}) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a></a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/user/mypage"><a>마이페이지</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/user/login"><a>로그인</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/user/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            {children}
            
        </div>
    );

};

Layout.propTypes  ={
    children: PropTypes.node.isRequired,
};

export default Layout;