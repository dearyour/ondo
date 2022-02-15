import React from "react";
import { BackTop } from "antd";
import styled from "styled-components";

const ScrollToTop = () => {

  return (
    <BackTop>
        <AntBackTopInner>UP</AntBackTopInner>
    </BackTop>
  )
}

const AntBackTopInner = styled.div`
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 40px;
  background-color: #edbaba;
  color: #fff;
  text-align: center;
  font-size: 15px;
`

export default ScrollToTop;