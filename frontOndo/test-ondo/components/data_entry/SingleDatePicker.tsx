import React, { Component } from "react";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import styled from "styled-components";
import "react-dates/lib/css/_datepicker.css";
import { Button, Space, Tooltip } from "antd";
import { InfoCircleTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';

/* https://github.com/airbnb/react-dates/issues/1030
 * In-order to extend styling, wrapper div around date picker is needed.
 */

const StyledDatePickerWrapper = styled.div`
  & .SingleDatePicker,
  .SingleDatePickerInput {
    .DateInput {
      width: 100%;
      height: 40px;
      display: flex;

      .DateInput_input {
        font-size: 1rem;
        border-bottom: 0;
        padding: 12px 16px 14px;
      }
    }

    .SingleDatePickerInput__withBorder {
      border-radius: 4px;
      overflow: hidden;

      :hover,
      .DateInput_input__focused {
        border: 1px solid red;
      }

      .CalendarDay__selected {
        background: blue;
        border: blueviolet;
      }
    }

    .SingleDatePicker_picker.SingleDatePicker_picker {
      top: 43px;
      left: 2px;
      /* top: 43px !important;
      left: 2px !important; */
    }
  }
`;

export default class StartDatePicker extends Component {
  state = {
    focused: false,
    date: moment()
  };

  render() {
    return (

      <Space direction="horizontal">
        <StyledDatePickerWrapper>
          <label htmlFor="start-date" style={{ verticalAlign: 'center' }}>시작일</label>
          <SingleDatePicker
            numberOfMonths={1}
            onDateChange={(date: moment.Moment | null) => this.setState({ date })}
            onFocusChange={({ focused }: any) => this.setState({ focused })}
            focused={this.state.focused}
            date={this.state.date}
            id='start-date'
          />
        </StyledDatePickerWrapper>
        <Tooltip title='시작일 포함 3일동안 도전합니다.'>
          {/* <Button shape="circle" icon={<InfoCircleOutlined />} size="large" /> */}
          <InfoCircleTwoTone twoToneColor='#edbaba' />
        </Tooltip>
      </Space>

    );
  }
}