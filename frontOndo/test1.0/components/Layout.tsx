import React from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link';
import { Menu , Input, Row, Col} from 'antd';

//특정 페이지만 공통인 부분은 레이아웃으로 만들자 
const Layout  = ({children}) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>Ondo</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{ verticalAlign: 'middle'}}/>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/user/info"><a>마이페이지</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/user/login"><a>로그인</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/user/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            
            <Row gutter={12}>
                <Col xs={24} md={6}>
                    왼쪽 그리드
                </Col>
                <Col xs={24} md={12}>
                {children}
                </Col>
                <Col xs={24} md={6}>
                    Ondo 랭킹표
                </Col>
            </Row>
            
            
        </div>
    );

};
// Row 가로 Col 세로  
Layout.propTypes  ={
    children: PropTypes.node.isRequired,
};

export default Layout;