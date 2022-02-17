import React from "react";
import { Row, Col, Space } from 'antd';
import styled from "styled-components";
import Image from "next/image";
import overall from 'public/images/category/overall.png';
import exercise from 'public/images/category/exercise.png';
import eating from 'public/images/category/eating.png';
import hobbies from 'public/images/category/hobbies.png';
import learning from 'public/images/category/learning.png';
import eco from 'public/images/category/eco.png';
import appearance from 'public/images/category/appearance.png';
import etc from 'public/images/category/etc.png';


const CategoryIcons = (props: any) => {
  const categoryIcons = [overall, exercise, eating, hobbies, learning, eco, appearance, etc];
  const categoryLabels = ['전체', '운동', '식습관', '취미', '학습', '친환경', '외모관리', '기타'];
  const categoryPath = ['/exercise', '/eating', '/hobbies', '/learning', '/eco', '/appearance', '/etc'];


  return (
    <Row style={{ marginTop: '100px', marginBottom: '-20px' }}>
      {
        categoryIcons.map((v, i) => (
          <ColCenter xs={6} md={3} key={i}>
            <Space direction="vertical">
              <CategoryIcon src={v} width={50} height={50} id={categoryLabels[i]} onClick={() => props.changeCategory(categoryLabels[i])}></CategoryIcon>
              <LabelCenter htmlFor={categoryLabels[i]}>{categoryLabels[i]}</LabelCenter>
            </Space>
          </ColCenter>
        ))
      }
    </Row>
  )
}

const ColCenter = styled(Col)`
  display: flex;
  justify-content: center;
`

const CategoryIcon = styled(Image)`
  cursor: pointer;
`

const LabelCenter = styled.label`
  display: flex;
  justify-content: center;
`

export default CategoryIcons;
