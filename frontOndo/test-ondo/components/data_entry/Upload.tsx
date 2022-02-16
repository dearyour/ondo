import { useState } from 'react';
import { Upload, message, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import useImg from "store/hooks/imgHooks";

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = true;
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

const UploadAvatar = (props: any) => {
  const { file, image, originalImg, setFile, setImage, setOriginalImage } = useImg();
  const [imageUrl, setImageUrl] = useState<string | ''>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (info: any) => {
    // setFile(info.file.originFileObj)
    props.offErr();
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setOriginalImage(imageUrl);
        setLoading(false);
      });
      props.changeThumbnail(image);
    }
  };

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
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {image ? <img src={image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      {/* <Button>썸네일</Button> */}
    </Space>
  );
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