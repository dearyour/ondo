import React, { useRef, useState } from "react";
import { Button, Col, Row } from 'antd';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styled from "styled-components";
import useImg from "store/hooks/imgHooks";

const CropImg: React.FC = () => {
  const { file, image, originalImg, setFile, setImage, setOriginalImage } = useImg();
  const cropperRef = useRef<HTMLImageElement | null>(null);
  // const [image, setImage] = useState<string>();
  // const [file, setFile] = useState<File>();
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
    <div>
      <Cropper
        src={originalImg}
        style={{ height: 400, width: "100%" }}
        // Cropper.js options
        aspectRatio={1 / 1}
        guides={true}
        ref={cropperRef}
      />
      {/* <div>
        <CropImage src={image} alt="" />
      </div> */}
      {/* <Button onClick={onCrop}>미리보기</Button> */}
      <BtnDiv>
        <CropBtn onClick={onCrop}>적용</CropBtn>
        <CropBtn onClick={() => { setOriginalImage(null) }}>종료</CropBtn>
      </BtnDiv>
    </div>
  );
};

const CropImage = styled.img`
  width:30%;
`

const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
`
const CropBtn = styled(Button)`
  margin-left: 10px;
  margin-right: 10px;
`

export default CropImg;