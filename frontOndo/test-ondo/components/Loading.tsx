import React, { ReactNode } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';



interface LayoutProps {
  children?: ReactNode,
}


const IsLoading: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const Loading = true

  return (
    <Spin spinning={Loading}>
      {children}
    </Spin>
  )
}

export default IsLoading;