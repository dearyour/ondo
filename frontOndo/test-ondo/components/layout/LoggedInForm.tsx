import { Avatar, Image, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import 'antd/dist/antd.css';

const LoggedInForm = () => {
  return (
    <Space direction='horizontal'>
      <Avatar style={{backgroundColor: '#edbaba'}} icon={<UserOutlined />} />
      &nbsp;<b>doyouhavea</b>
    </Space>
  );
}

export default LoggedInForm;