import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userActions } from "store/slice/user";
import { RootState } from "../../store/module";
import Feed from "components/Feed/Feed";
import { Feed as Feedtype, FeedParams } from "store/interfaces/Feed.interface";
import Router from "next/router";
import { feedAction } from "store/slice/feed";
import { arrayBuffer } from "stream/consumers";
import { actionChannel } from "redux-saga/effects";
import Rankfeed from "components/Feed/rankfeed";

function Mainfeed() {
  const { nickname } = useSelector((state: RootState) => state.user);
  const user = useSelector((state: RootState) => state.user);
  const { ondo } = useSelector((state: RootState) => state.user.users);
  const image = useSelector((state: RootState) => state.user.image);
  // const { feeds } = useSelector((state: RootState) => state.feed);
  const { comments } = useSelector((state: RootState) => state.comment);
  const [userProfileImage, setUserProfileImage] = useState(undefined);
  const dispatch = useDispatch();
  const [feeds, setFeeds] = useState([]); //프롭으로내려주자
  const [rankers, setRankers] = useState([]); //프롭으로내려주자
  const dataId = useRef(0);
  // useEffect(() => {
  //   setUserProfileImage(image);
  // });

  ////////////////////////
  useEffect(() => {
    // dispatch(userActions.getUser());
    // dispatch(feedAction.getFeed());
  }, []);
  const __GetUserState = (token: string | null) => {
    return axios({
      method: "GET",
      url: "http://localhost:8080/user/info",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    __GetUserState(token);
    // console.log(userstate.Object.email);
    // dispatch(userActions.setnickname(userstate));
  }, []);
  //////////////////////////////////////////

  //##################################################################################
  //res.data.detailFeedDtos 여기까지가 action임
  //res.data.detailFeedDtos.feed 가 action.payload 임
  let eml: any = [];
  const __GetFeedState = useCallback((token: string | null) => {
    return axios({
      method: "GET",
      url: "http://localhost:8080/feed",
      // url: "https://jsonplaceholder.typicode.com/comments",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        // console.log(res.data.detailFeedDtos);
        let feedss = res.data.detailFeedDtos;
        //[{피드1},{피드2},{피드3}] 저장되어있음
        console.log(res.data);
        console.log(res.data.detailFeedDtos);
        // console.log(feeds);
        // feeds.map((els: any) => {
        //   console.log(els);

        // elss.finds((elw: any) => {
        //   console.log(elw);
        // });
        // }),
        ////
        // console.log(res.data);
        //
        setRankers(res.data.rankusers);
        //객체가들어있는 해당배열을 feeds에 저장, 프롭으로 내려주기위해, 최신순
        setFeeds(res.data.detailFeedDtos.reverse());
        return;

        // feedss.map((elm: any) => {
        //   console.log(elm.feed);
        //   return elm.feed;
        //   return setFeeds(res.data.detailFeedDtos);
        // });
      })
      .catch((err) => {
        return err;
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    // console.log(feeds); useState는 이렇게하면 초기값나오는듯, set된값은 아래 tsx에서 확인하자
    __GetFeedState(token);
    dispatch(userActions.getUser());
    dispatch(feedAction.getFeed());
    setUserProfileImage(image);
  }, []);
  //##################################################################################
  // const url = "http://i6a601.p.ssafy.io:8080/feed";
  // let test = eml.map((item: any) => {
  //   console.log(item.feed);
  // });
  // console.log(test);
  // console.log(rankers);
  // console.log(feeds);
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
              <div
                className="inp"
                onClick={() => {
                  Router.push("/feed/write");
                }}
              >
                <input
                  disabled
                  // ref={contextRef}
                  type="text"
                  placeholder="      오늘의 도전 완료 피드 쓰러가기"
                  // onChange={(e) => setContext(e.target.value)}
                />
              </div>
              <div className="get-image">
                {/* <label htmlFor="get-image-input">
                  <img src="/assets/main/add-image.svg" alt="이미지 추가하기" />
                </label>
                <input
                  id="get-image-input"
                  type="file"
                  // onChange={__getData64FromImage}
                /> */}
              </div>
            </form>
            {/* <Feed /> */}
            {feeds.map((item: any, idx: number) => {
              // console.log(feeds);

              return (
                <Feed
                  key={idx}
                  dto={item}
                  nickname={nickname}
                  image={image}
                  // comments={comments}
                />
              );
            })}
          </div>

          <div className="friend-list">
            <div className="my-profile">
              {userProfileImage && (
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
              {rankers.map((item: any, idx: number) => {
                // console.log(feeds);
                return <Rankfeed key={idx} dto={item} num={idx + 1} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mainfeed;
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

//
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
