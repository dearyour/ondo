// import React, { useCallback, useEffect, useState } from "react";
// import styled from "styled-components";
// import Link from "next/link";
// import { Button, Form, Input } from "antd";
// import { test } from "../../store/api/User.api";
// import axios from "axios";
// import { GetFeedState } from "store/api/Feed.api";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/router";
// import { userActions } from "store/slice/user";
export default {};

// // const GetUserurl = process.env.NEXT_PUBLIC_BACK_LOCAL + "/user/info";
// const GetUserurl = process.env.BACK_EC2 + "/user/info";
// // const GetFeedurl = process.env.NEXT_PUBLIC_BACK_LOCAL + "/feed";
// const GetFeedurl = process.env.BACK_EC2 + "/feed";
// const Login = () => {
//   const __GetUserStates = useCallback((token: string | null) => {
//     return axios({
//       method: "GET",
//       // url: "http://localhost:8080/user/info",
//       url: GetUserurl,
//       headers: { Authorization: "Bearer " + token },
//     })
//       .then((res) => {
//         console.log(res);
//         return res.data;
//       })
//       .catch((err) => {
//         return err;
//       });
//   }, []);
//   const [feeds, setFeeds] = useState([]); //프롭으로내려주자
//   const __GetFeedState = (token: string | null) => {
//     return axios({
//       method: "GET",
//       // url: "http://localhost:8080/feed",
//       url: GetFeedurl,
//       // url: "https://jsonplaceholder.typicode.com/comments",
//       headers: { Authorization: "Bearer " + token },
//     })
//       .then((res) => {
//         // console.log(res.data.detailFeedDtos);
//         console.log(res.data);
//         return setFeeds(res.data.detailFeedDtos);
//       })
//       .catch((err) => {
//         return err;
//       });
//   };
//   const __GetFollowerState = (token: string | null) => {
//     return axios({
//       method: "GET",
//       url: "http://localhost:8080/follow/follower/나는짱이야",
//       // url: GetFeedurl,
//       headers: { Authorization: "Bearer " + token },
//     })
//       .then((res) => {
//         // console.log(res.data.detailFeedDtos);
//         console.log(res.data);
//         return setFeeds(res.data.detailFeedDtos);
//       })
//       .catch((err) => {
//         return err;
//       });
//   };
//   const __GetFollowingState = (token: string | null) => {
//     return axios({
//       method: "GET",
//       url: "http://localhost:8080/follow/following/나는짱이야",
//       // url: GetFeedurl,
//       headers: { Authorization: "Bearer " + token },
//     })
//       .then((res) => {
//         // console.log(res.data.detailFeedDtos);
//         console.log(res.data);
//         return setFeeds(res.data.detailFeedDtos);
//       })
//       .catch((err) => {
//         return err;
//       });
//   };
//   const usersss = "hunter";
//   const __postFollowing = (token: string | null) => {
//     return axios({
//       method: "post",
//       url: "http://localhost:8080/follow/" + usersss,
//       // url: GetFeedurl,
//       headers: { Authorization: "Bearer " + token },
//     })
//       .then((res) => {
//         // console.log(res.data.detailFeedDtos);
//         console.log(res.data);
//         return setFeeds(res.data.detailFeedDtos);
//       })
//       .catch((err) => {
//         return err;
//       });
//   };
//   const __delFollowing = (token: string | null) => {
//     return axios({
//       method: "delete",
//       url: "http://localhost:8080/follow/" + usersss,
//       // url: GetFeedurl,
//       headers: { Authorization: "Bearer " + token },
//     })
//       .then((res) => {
//         // console.log(res.data.detailFeedDtos);
//         console.log(res.data);
//         return setFeeds(res.data.detailFeedDtos);
//       })
//       .catch((err) => {
//         return err;
//       });
//   };
//   const feedsssId = 1;
//   const __feedinfoId = (token: string | null) => {
//     return axios({
//       method: "get",
//       url: "http://localhost:8080/feed/info/" + feedsssId,
//       // url: GetFeedurl,
//       headers: { Authorization: "Bearer " + token },
//     })
//       .then((res) => {
//         // console.log(res.data.detailFeedDtos);
//         console.log(res.data);
//         return setFeeds(res.data.detailFeedDtos);
//       })
//       .catch((err) => {
//         return err;
//       });
//   };
//   const feedssssId = 2;
//   const __feedlike = (token: string | null) => {
//     return axios({
//       method: "get",
//       url: "http://localhost:8080/feed/like/" + feedssssId,
//       // url: GetFeedurl,
//       headers: { Authorization: "Bearer " + token },
//     })
//       .then((res) => {
//         // console.log(res.data.detailFeedDtos);
//         console.log(res.data);
//         return setFeeds(res.data.detailFeedDtos);
//       })
//       .catch((err) => {
//         return err;
//       });
//   };
//   const commentIdss = 1;
//   const __loadComments = useCallback(() => {
//     //코멘트 업로드 또는 불러올때 계속 새로고침
//     const token = localStorage.getItem("Token");
//     // const feedsId = detailData.feed.feedId;
//     axios({
//       method: "GET",
//       url: "http://localhost:8080" + "/comment/" + commentIdss,
//       // url: "http://localhost:8080" + "/feed",
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     })
//       .then((res) => {
//         console.log(res.data);
//         // console.log(makeArray(res));
//         // dispatch(layoutAction.updateDetailData(props.dto));
//         // dispatch(layoutAction.updateDetailData(commentData));

//         // setCommentData(makeArray(res.data));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("Token");
//     // console.log(feeds); useState는 이렇게하면 초기값나오는듯, set된값은 아래 tsx에서 확인하자
//     // __GetUserStates(token);
//     __GetFeedState(token);
//     // __GetFollowerState(token);
//     // __GetFollowingState(token);
//     // __postFollowing(token);
//     // __delFollowing(token);
//     // __feedinfoId(token);
//     // __feedlike(token);
//     // __loadComments();
//   }, [__GetUserStates]);
//   //아래 얘는 작동인됨 위에는됨 도대체왜?????
//   // const __GetFeedssssState = (token: string | null) => {
//   //   return axios({
//   //     method: "GET",
//   //     url: "https://jsonplaceholder.typicode.com/comments",
//   //     headers: { Authorization: "Bearer " + token },
//   //   })
//   //     .then((res) => {
//   //       console.log(res.data.detailFeedDtos.feed);
//   //       console.log(res);
//   //       return res;
//   //     })
//   //     .catch((err) => {
//   //       return err;
//   //     });
//   // };

//   // useEffect(() => {
//   //   const token = localStorage.getItem("Token");
//   //   __GetFeedssssState(token);
//   // }, []);
//   //################################################################3
//   // const dispatch = useDispatch();
//   // const [userObj, setUserObj] = useState([]);
//   // const router = useRouter();
//   // const { username } = router.query;
//   // let a = {};
//   // const __GetUserState = (token: string | null) => {
//   //   return axios({
//   //     method: "GET",
//   //     url: process.env.BACK_EC2 + "/user/feed/" + username,
//   //     headers: { Authorization: "Bearer " + token },
//   //   })
//   //     .then((result) => {
//   //       console.log(result.data);
//   //       result.data;
//   //       setUserObj(result.data.user.image);
//   //       // setFeeds(result.data);
//   //       return result.data;
//   //     })
//   //     .catch((err) => {
//   //       return err;
//   //     });
//   // };
//   // useEffect(() => {
//   //   const token = localStorage.getItem("Token");
//   //   __GetUserState(token);
//   //   dispatch(userActions.getUserObj(username));
//   //   // dispatch(layoutAction.updateDetailData(userObj));
//   //   console.log(userObj);
//   // }, [__GetUserState]);
//   return (
//     <LoginForm>
//       <LoginLabel htmlFor="Test-Warning">
//         {" "}
//         테스트용 URL입니다. 삭제하지 말아주세요!!
//       </LoginLabel>
//       <LoginLabel htmlFor="Test-Sarning">
//         {" "}
//         올바른 URL을 다시 입력해 주세요
//       </LoginLabel>
//       <div>
//         {/* <div className="태양">닉네임</div> */}
//         <div><span className="자" style={{ marginRight: '10px' }}>자 이제 시작이야</span>닉네임</div>
//         <br />
//         <div><span className="헬스왕" style={{ marginRight: '10px' }}>헬스왕</span>닉네임</div>
//         <br />
//         <div><span className="환경미화원" style={{ marginRight: '10px' }}>환경미화원</span>닉네임</div>
//         <br />
//         <div><span className="취향입니다" style={{ marginRight: '10px' }}>취향입니다</span>닉네임</div>
//         <br />
//         <div><span className="공부벌레" style={{ marginRight: '10px' }}>공부벌레</span>닉네임</div>
//         <br />
//         <div><span className="바른" style={{ marginRight: '10px' }}>바른</span>닉네임</div>
//         <br />
//         <div><span className="넓고" style={{ marginRight: '10px' }}>넓고</span>닉네임</div>
//         <br />
//         <div><span className="아이돌" style={{ marginRight: '10px' }}>아이돌</span>닉네임</div>
//         <br />
//         <div><span className="따뜻한" style={{ marginRight: '10px' }}>따뜻한</span>닉네임</div>
//         <br />
//         <div><span className="뜨거운" style={{ marginRight: '10px' }}>뜨거운</span>닉네임</div>
//         <br />
//         <div><span className="불타오르는" style={{ marginRight: '10px' }}>불타오르는</span>닉네임</div>
//         <br />
//         <div><span className="태양" style={{ marginRight: '10px' }}>태양</span>닉네임</div>
//         {/* <div><span className="따뜻한" style={{ marginRight: '10px' }}>태양</span>닉네임</div> */}
//       </div>
//       <LoginDiv>
//         <LoginLabel htmlFor="user-id">이메일</LoginLabel>
//         <LoginInput name="user-id" required />
//       </LoginDiv>
//       <LoginDiv>
//         <LoginLabel htmlFor="user-password">비밀번호</LoginLabel>
//         <LoginInput name="user-password" type="password" required />
//       </LoginDiv>
//       <LoginButton
//         onClick={() => {
//           const token = localStorage.getItem("Token");
//           axios({
//             method: "get",
//             url: process.env.BACK_EC2 + "/user/info",
//             headers: { Authorization: "Bearer " + token },
//           })
//             .then((res) => {
//               console.log(res);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }}
//       >
//         로그인
//       </LoginButton>
//       <div>
//         <Link href="">
//           <a>비밀번호 찾기 </a>
//         </Link>
//         |
//         <Link href="">
//           <a> 회원가입</a>
//         </Link>
//         <a href={test}>카카오 테스트</a>
//       </div>
//     </LoginForm>
//   );
// };

// export default Login;
// const LoginInput = styled(Input)`
//   border-top: 0px;
//   border-left: 0px;
//   border-right: 0px;
//   margin: 5px;
//   border-color: #edbaba;
//   &:focus {
//     outline: none;
//   }
// `;

// const LoginForm = styled(Form)`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
//   width: 30%;
//   margin: 100px auto;
// `;

// const LoginLabel = styled.label`
//   padding-top: 5px;
//   white-space: nowrap;
// `;

// const LoginButton = styled(Button)`
//   width: 100%;
//   border: 0px;
//   color: #f3f3f3;
//   background-color: #ebc1c1;
//   border-radius: 5px;
//   padding: 10px;
//   margin: 20px 0px;
//   &:hover {
//     cursor: pointer;
//     background-color: #e7adad;
//   }
// `;

// const LoginDiv = styled.div`
//   display: grid;
//   width: 100%;
//   text-align: center;
//   grid-template-columns: 1fr 4fr;
//   margin: 10px 0px;
// `;
