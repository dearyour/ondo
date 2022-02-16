import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import styled from 'styled-components';
import { QuestionOutlined } from '@ant-design/icons';

const StyleDrawer: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <InfoBtn onClick={showDrawer}>
        <QuestionOutlined />
      </InfoBtn>
      <Drawer title="칭호 목록" placement="right" onClose={onClose} visible={visible}>
        <div><span className="자" style={{ marginRight: '10px' }}>자 이제 시작이야</span>첫 도전 완료</div>
        <br />
        <div><span className="헬스왕" style={{ marginRight: '10px' }}>헬스왕</span>건강 챌린지 5번 완료</div>
        <br />
        <div><span className="환경미화원" style={{ marginRight: '10px' }}>환경미화원</span>친환경 챌린지 5번 완료</div>
        <br />
        <div><span className="취향입니다" style={{ marginRight: '10px' }}>취향입니다 존중해주시죠</span>취미 챌린지 5번 완료</div>
        <br />
        <div><span className="공부벌레" style={{ marginRight: '10px' }}>공부벌레</span>학습 챌린지 5번 완료</div>
        <br />
        <div><span className="바른" style={{ marginRight: '10px' }}>바른 먹거리</span>식습관 챌린지 5번 완료</div>
        <br />
        <div><span className="넓고" style={{ marginRight: '10px' }}>넓고 깊은</span>기타 챌린지 5번 완료</div>
        <br />
        <div><span className="아이돌" style={{ marginRight: '10px' }}>아이돌</span>외모관리 챌린지 5번 완료</div>
        <br />
        <div><span className="따뜻한" style={{ marginRight: '10px' }}>따뜻한</span>온도 40도 이상</div>
        <br />
        <div><span className="뜨거운" style={{ marginRight: '10px' }}>뜨거운</span>온도 60도 이상</div>
        <br />
        <div><span className="불타오르는" style={{ marginRight: '10px' }}>불타오르는</span>온도 80도 이상</div>
        <br />
        <div><span className="태양" style={{ marginRight: '10px' }}>태양</span>온도 100도 이상</div>
      </Drawer>
    </>
  );
};

const InfoBtn = styled(Button)`
  margin-left: 5px;
  border: 1px solid pink;
  border-radius: 100%;
  padding: 2px 8px;
  

`

export default StyleDrawer;