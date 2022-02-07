import React from "react";
import { Row, Col, Space } from 'antd';
import styled from "styled-components";
import pikachu from 'public/images/pikachu.png';
import Image from "next/image";

const CategoryIcons = () => {
  const categoryIcons = ['overall', 'exercise', 'eating', 'hobbies', 'learning', 'eco', 'appearance', 'etc'];
  const categoryLabels = ['전체', '운동', '식습관', '취미', '학습', '친환경', '외모 관리', '기타'];

  return (
    <Row style={{marginTop: '100px'}}>
        {
          categoryIcons.map((v, i) => (
            <ColCenter xs={3} md={3}>
              <Space direction="vertical">
                <Image src={pikachu} name='cat${i}' width={50} height={50}></Image>
                <LabelCenter htmlFor="cat${i}">{categoryLabels[i]}</LabelCenter>
              </Space>
            </ColCenter>
          ))
        }
        {/* <Space direction="vertical">
          <Image src={pikachu} name='dd' width={50} height={50}></Image>
          <label htmlFor="dd">피카츄</label>
        </Space>
      </ColCenter>
      <ColCenter xs={3} md={3}>
        <Space direction="vertical">
          <Image src={pikachu} name='dd' width={50} height={50}></Image>
          <label htmlFor="dd">피카츄</label>
        </Space>
      </ColCenter>
      <ColCenter xs={3} md={3}>
        <Space direction="vertical">
          <Image src={pikachu} name='dd' width={50} height={50}></Image>
          <label htmlFor="dd">피카츄</label>
        </Space>
      </ColCenter>
      <ColCenter xs={3} md={3}>
        <Space direction="vertical">
          <Image src={pikachu} name='dd' width={50} height={50}></Image>
          <label htmlFor="dd">피카츄</label>
        </Space>
      </ColCenter>
      <ColCenter xs={3} md={3}>
        <Space direction="vertical">
          <Image src={pikachu} name='dd' width={50} height={50}></Image>
          <label htmlFor="dd">피카츄</label>
        </Space>
      </ColCenter>
      <ColCenter xs={3} md={3}>
        <Space direction="vertical">
          <Image src={pikachu} name='dd' width={50} height={50}></Image>
          <label htmlFor="dd">피카츄</label>
        </Space>
      </ColCenter>
      <ColCenter xs={3} md={3}>
        <Space direction="vertical">
          <Image src={pikachu} name='dd' width={50} height={50}></Image>
          <label htmlFor="dd">피카츄</label>
        </Space>
      </ColCenter>
      <ColCenter xs={3} md={3}>
        <Space direction="vertical">
          <Image src={pikachu} name='dd' width={50} height={50}></Image>
          <label htmlFor="dd">피카츄</label>
        </Space> 
      </ColCenter> */}
    </Row>
  )
}

const ColCenter = styled(Col)`
  display: flex;
  justify-content: center;
`

const LabelCenter = styled.label`
  display: flex;
  justify-content: center;
`

export default CategoryIcons;