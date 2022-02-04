import React, { Component } from "react";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import styled from "styled-components";
import "react-dates/lib/css/_datepicker.css";
import { Button, DatePicker, Space, Tooltip } from "antd";
import { InfoCircleTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';

export default class AntdDatePicker extends Component {
  
  render() {
    const onChange = (date:any, dateString:any) => {
      console.log(date, dateString);
      
    }

    return (
        <Space direction="horizontal">
 
          <label htmlFor="start-date">시작일</label>
          <DatePicker onChange={onChange} name='start-date' />

          <Tooltip title='시작일 포함 3일동안 도전합니다.'>
            {/* <Button shape="circle" icon={<InfoCircleOutlined />} size="large" /> */}
            <InfoCircleTwoTone twoToneColor='#edbaba' />
          </Tooltip>
          </Space>
   
    );
  }
}