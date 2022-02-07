// import firebaseApp from '@config/firebaseApp';
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "../styles/feedcss/index.scss";
// import "../styles/feedcss/index.module.scss";
// import style from "./style.module.css";
// import "./mainfeedcss/style.module.scss";
import axios from "axios";
import { userActions } from "store/slice/user";
import { RootState } from "../../store/module";
import Feed from "components/Feed/Feed";
import { Feed as Feedtype, FeedParams } from "store/interfaces/Feed.interface";

function mainfeed() {
  // const dispatch = useDispatch();
  const { nickname } = useSelector((state: RootState) => state.user);
  const user = useSelector((state: RootState) => state.user);
  const { ondo } = useSelector((state: RootState) => state.user);
  const { image } = useSelector((state: RootState) => state.user);
  const { feeds } = useSelector((state: RootState) => state.feed);
  const { comments } = useSelector((state: RootState) => state.comment);
  const [userProfileImage, setUserProfileImage] = useState(undefined);
  useEffect(() => {
    setUserProfileImage(image);
  });

  // const [feeds, setFeeds] = useState([]);
  // const {
  //   feedId,
  //   challengeId,
  //   image,
  //   content,
  //   userId,
  //   createdDate,
  //   modifiedDate,
  //   feedlike,
  // } = useSelector((state: RootState) => state.feed.feeds[0]);
  // console.log(
  //   feeds,
  //   feedId,
  //   challengeId,
  //   image,
  //   content,
  //   userId,
  //   createdDate,
  //   modifiedDate,
  //   feedlike
  // );

  //유저 이미지 불러오기 ##########
  // const __getUserProfileImage = useCallback(() => {
  //   if (user) {
  //     const { userid } = user;

  //     let url = "http://i6a601.p.ssafy.io:8080/user/profile";
  //     axios({
  //       method: "GET",
  //       url: url,
  //       headers: { Authorization: "Bearer " + token },
  //       data: {
  //         userid: userid,
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         return res.data;
  //         setUserprofileImage(image);
  //       })
  //       .catch((err) => {
  //         return err;
  //       });
  //   }
  // }, [user]);
  // useEffect(() => {
  //   __getUserProfileImage();
  //   return () => {};
  // }, [__getUserProfileImage]);

  const token = localStorage.getItem("Token");
  console.log(token + "###############3");
  // const token = useSelector(() => {
  //   localStorage.getItem("token");
  // });
  // console.log(token);

  const __GetFeedState = (token: string | null) => {
    return axios({
      method: "GET",
      // url: "http://i6a601.p.ssafy.io:8080/feed",
      url: "http://localhost:8080/feed",
      // url: "https://jsonplaceholder.typicode.com/comments",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    __GetFeedState(token);
  }, [__GetFeedState]);

  // const url = "http://i6a601.p.ssafy.io:8080/feed";
  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "http://i6a601.p.ssafy.io:8080/feed",
  //     headers: {
  //       Authorization:
  //         "Bearer bcigxnrl_AYNRx4Ft2ou3z7xO4VrBB2XySAgdgorDKYAAAF-xC_Mkw",
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       return response.data;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // });
  // //
  // const dispatch = useDispatch();

  // const { GetUser } = useUser();
  // useEffect(() => {
  //   dispatch(userActions.getToken);
  // }, [dispatch]);

  // console.log(GetUser);

  // const token = localStorage.getItem("Token");

  // let state = useSelector((state: RootState) => state.feed.feeds[0].content);
  // console.log(state);

  // state.user.data = token;
  // console.log(state);
  return (
    <div>
      <div className="mainfeed">
        <div className="wrapper">
          <div className="feed-list">
            <form
              className="write-feed"
              // onSubmit={__makeFeed}
            >
              {image && (
                <div
                  className="profile-image"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              )}
              {/* <div className="profile-image"></div> */}
              <div className="inp">
                <input
                  // ref={contextRef}
                  type="text"
                  placeholder="      오늘의 도전 완료 피드 쓰러가기"
                  // onChange={(e) => setContext(e.target.value)}
                />
              </div>
              <div className="get-image">
                <label htmlFor="get-image-input">
                  <img src="/assets/main/add-image.svg" alt="이미지 추가하기" />
                </label>
                <input
                  id="get-image-input"
                  type="file"
                  // onChange={__getData64FromImage}
                />
              </div>
            </form>

            {/* <Feed /> */}
            {feeds.map((item: any, idx: number) => {
              console.log(item);
              return (
                <Feed
                  key={idx}
                  feed={item}
                  nickname={nickname}
                  image={image}
                  // comments={comments}
                />
              );
            })}
          </div>

          <div className="friend-list">
            <div className="my-profile">
              {image && (
                <div
                  className="profile-image"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              )}
              {/* <div className="profile-image"></div> */}
              <div className="nickname txt-bold">
                {nickname && user.nickname}
              </div>
            </div>
            <div className="my-friends">
              <div
                className="
              name txt-bold"
              >
                나의 온도 : {ondo} ˚C
              </div>
              <div className="title txt-bold">Ondo 순위</div>
              <ul className="friend-list-wrapper">
                <li className="friend">
                  <div className="profile-image"></div>
                  <div className="nickname txt-bold">1. 일주어터</div>
                </li>
                <li className="friend">
                  <div className="profile-image"></div>
                  <div className="nickname txt-bold">2. 카리나</div>
                </li>
                <li className="friend">
                  <div className="profile-image"></div>
                  <div className="nickname txt-bold">3. 윈터</div>
                </li>
                <li className="friend">
                  <div className="profile-image"></div>
                  <div className="nickname txt-bold">4. 혁이</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default mainfeed;
