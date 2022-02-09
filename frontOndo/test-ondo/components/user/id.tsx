// import React from 'react';
// import styled from 'styled-components';
// import styles from 'css/index.module.css'
// import useUser from 'store/hooks/userHooks';
// import { Modal, Button, Col, Row } from 'antd';
// import AppLayout from 'components/layout/AppLayout';
// import Image from 'next/image';
// import temp_profile from 'public/images/temp_profile.jpg'
// import Challengebox from 'components/user/mypageChallenge';
// import 'antd/dist/antd.css';
export { };
// const mypage = () => {
//   const nickname = 'temp';
//   const follow = [1,2,3,4];
//   const following = [1,2,3,4];
//   const ondo = 44;
//   const challenge_ing = 1;
//   const challenge_end = 4;
//   const datetime = new Date().toDateString();

//   return (
//     <AppLayout title="mypage">
//       <Row>
//         <Col span={8} xs={24} md={8} className={`${styles.border_right} ${styles.mx_auto}`}>
//           <div className={styles.mx_auto}>
//             <Image src={temp_profile} className={styles.mx_auto}></Image>
//             <div>
//               <FollowBtn>팔로우 {follow.length}</FollowBtn>
//               <FollowBtn>팔로잉 {following.length}</FollowBtn>
//             </div>
//             <p>닉네임 {nickname}</p>
//             <p>온도 {ondo}°C</p>
//             <OndoBar value={ondo} max="100"></OndoBar>
//             <Button>수정</Button>
//           </div>
//         </Col>
//         <Col span={15} xs={24} md={15} offset={1}>
//           <div>
//             <h1>도전 중: {challenge_ing}</h1>
//             <Challengebox title='1' percent={2} participate={3} start={datetime}></Challengebox>
//             <h1>도전 완료: {challenge_end}</h1>
//             <Challengebox title='1' percent={2} participate={3} start={datetime}></Challengebox>
//           </div>
//         </Col>
//       </Row>
//     </AppLayout>
//   )
// }

// const FollowBtn = styled(Button)`
//   border: 0px;
//   color: #F3F3F3;
//   background-color: #ebc1c1;
//   border-radius: 5px;
//   padding: 10px;
//   margin: 20px 10px;
//   &:hover {
//     cursor: pointer;
//     background-color: #e7adad;
//   }
// `

// const OndoBar = styled.progress`
//   display: block;
//   margin-bottom: 10px;
// `


// export default mypage;