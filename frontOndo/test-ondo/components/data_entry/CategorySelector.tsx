import { useState } from 'react';
import { Select, Space } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

function onSearch(val: any) {
  // console.log('search:', val);
}

function CategorySelector(props: any): JSX.Element {
  const [category, setCategory] = useState('');

  const onChange = (value: any) => {
    setCategory(value);
    // console.log(value);
    props.changeCategory(value);
  }

  return (
    <Space direction='horizontal' style={{ margin: '10px' }}>
      <label htmlFor='category'>카테고리</label>
      <StyledSelect
        showSearch
        placeholder="카테고리를 골라주세요"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className='category'
        style={{ width: 200 }}
      >
        {
          ['운동', '식습관', '취미', '학습', '친환경', '외모관리', '기타'].map(category => (
            <Option value={category} key={category}>{category}</Option>
          ))
        }
      </StyledSelect>
    </Space>
  );
}

const StyledSelect = styled(Select)`
  margin: 5px 0 5px 5px;
  border-radius: 10px;
  background-color: #fdfcf6;
  border-color: #EDBABA;
  &:focus {
    outline: none;
  }
`

export default CategorySelector;

