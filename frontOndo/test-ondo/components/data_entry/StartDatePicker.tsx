import React, { Component, useState } from "react";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import styled from "styled-components";
import "react-dates/lib/css/_datepicker.css";
import { Button, DatePicker, Space, Tooltip } from "antd";
import { InfoCircleTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';

const StartDatePicker = (props: any) => {

  const onChange = (date: any, dateString: any) => {

    props.changeStartDate(dateString);
  }

  function disabledDate(current: any) {
    // Can not select days before today and today
    // console.log(current)
    return current < moment().startOf('day');
  }
  return (
    <Space direction="horizontal">

      <label htmlFor="start-date">시작일</label>
      <DatePicker onChange={onChange} disabledDate={disabledDate} name='start-date' placeholder='시작일을 골라주세요' style={{ width: '180px' }} />
      {/* <RangePicker
        onChange={onChange}
        value={hackValue || value}
        onOpenChange={onOpenChange}
        placeholder={['시작일', '종료일']}
        // disabled={[false, true]}
        onCalendarChange={val => { setDates(val); console.log(dates) }}
        disabledDate={disabledDate}

      /> */}
      <Tooltip title='시작일 포함 3일동안 도전합니다.'>
        {/* <Button shape="circle" icon={<InfoCircleOutlined />} size="large" /> */}
        <InfoCircleTwoTone twoToneColor='#edbaba' />
      </Tooltip>
    </Space>

  );
}

export default StartDatePicker;