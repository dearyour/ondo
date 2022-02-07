import { Component } from 'react';
import { Upload, message, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import 'antd/dist/antd.css';

function getBase64(img:any, callback:any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file:any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

// function UploadAvatar(): JSX.Element {
//   const [loading, setLoading] = useState(false);

//   const handleChange = info => {
//     if(info.file.status === 'uploading') {
//       setLoading(true);
//       return;
//     }
//     if(info.file.status === 'done') {

//     }
//   }
// }

class UploadAvatar extends Component {
  state = {
    imageUrl: '',
    loading: false,
  };

  handleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl:any) =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Space direction='horizontal'>
        <label htmlFor='thumbnail'>대표 사진</label>
        <Upload
          name="thumbnail"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      {/* <Button>썸네일</Button> */}
      </Space>
    );
  }
}

// const Button = styled.div`
//   background: #edbaba;
//   border-radius: 3px;
//   border: 2px solid #edbaba;
//   color: white;
//   text-align: center;
//   margin: 0 1em;
//   padding: 0.25em 1em;
//   width: 120px;
// `

export default UploadAvatar;