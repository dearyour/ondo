import React from 'react';
import styled from 'styled-components';
import styles from 'css/index.module.css';

interface nowpage {
  title: string;
}

const Line = styled.hr`
  background-color: gray;
  border: none;
  height: 1px;
  margin-top: 5px;
  opacity: 90%;
`
const Title = styled.div`
  font-size: 1rem;
  margin: 30px 20px 0 20px;
  opacity: 80%;
`



const Pagebar: React.FC<nowpage> = ({ title }: nowpage) => {
  return (
    <div>
      <Title>{title}</Title>
      <Line />
    </div>
  )
}


export default Pagebar;