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
`



const Pagebar: React.FC<nowpage> = ({title}:nowpage) => {
  return (
    <div>
      <div className={`${styles.mx_20} ${styles.mt_30} `}>{title}</div>
      <Line />
    </div>
  )
}

export default Pagebar;