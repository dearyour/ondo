import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import 'antd/dist/antd.css';

const LoggedInForm = () => {
  return (
    <>
      <Avatar style={{backgroundColor: '#edbaba'}} icon={<UserOutlined />} />
      &nbsp;<b>doyouhaveaknife</b>
    </>
  );
}

export default LoggedInForm;