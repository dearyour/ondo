import React, { useRef } from "react";
import { Button, Modal } from 'antd';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styled from "styled-components";
import useImg from "store/hooks/imgHooks";


const CropImg: React.FC = () => {
  const { file, image, originalImg, setFile, setImage, setOriginalImage } = useImg();
  const cropperRef = useRef<HTMLImageElement | null>(null);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    cropper.getCroppedCanvas().toBlob((blob: any) => {
      const now = new File([blob], 'profileimage');
      setFile(now);
    })
    setImage(cropper.getCroppedCanvas().toDataURL());
    // console.log(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <Modal
      visible={originalImg}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <Cropper
        src={originalImg}
        style={{ height: 400, width: "100%" }}
        // Cropper.js options
        aspectRatio={1 / 1}
        guides={true}
        ref={cropperRef}
      />
      <BtnDiv>
        <CropBtn onClick={onCrop}>적용</CropBtn>
        <CropBtn onClick={() => { setOriginalImage(null) }}>종료</CropBtn>
      </BtnDiv>
      <Description><h1>미리보기</h1></Description>
      <MyImage>{image ? <CropImage src={image}></CropImage> : null}</MyImage>
    </Modal>
  );
};

const Description = styled.div`
  text-align: center;
  margin-top:10px;
`
const MyImage = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
`
const CropImage = styled.img`

`

const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
`
const CropBtn = styled(Button)`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 5px;
`

export default CropImg;