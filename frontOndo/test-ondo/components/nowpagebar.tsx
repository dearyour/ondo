import React from 'react';
import styled from 'styled-components';

interface nowpage {
  title: string;
}

const Line = styled.hr`
  background-color: gray;
  border: none;
  height: 1px;
  width: 80%

`

const Pagebar: React.FC<nowpage> = ({title}:nowpage) => {
  return (
    <div>
      <div>{title}</div>
      <Line />
    </div>
  )
}

export default Pagebar;