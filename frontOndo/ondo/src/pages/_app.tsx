import React from 'react';
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import Head from 'next/head';
// import './index.css';

//index.tsx의 부모, 모든 pages의 상위 타입
//page에서 공통적인분은 여기다 적기

//index.tsx의 레이아웃컴포넌트가 여기인자로 들어감 
const App = ({Component}) =>{
    return (
        <>
        <Head>
            <meta charSet="utf-8" />
            <title>Ondo , 3일간의 도전</title>
        </Head>
        <div>공통메뉴</div>
        <Component />

        </>
    );

};

App.propTypes  = {
    Component: PropTypes.elementType.isRequired,
};
export default App;