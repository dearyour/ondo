import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
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
import happy from "public/images/dogye/happy.png";
import styled from "styled-components";
import { UpCircleOutlined } from "@ant-design/icons";
import useUser from "store/hooks/userHooks";
import InfiniteScroll from 'react-infinite-scroll-component';


function Mainfeed() {
  const { nickname } = useSelector((state: RootState) => state.user);
  const user = useSelector((state: RootState) => state.user);
  const { ondo } = useSelector((state: RootState) => state.user.users);
  const chooseStyle = useSelector(
    (state: RootState) => state.user.users.chooseStyle
  );
  const image = useSelector((state: RootState) => state.user.users.image);
  const feedstate = useSelector((state: RootState) => state.feed.items);
  const { comments } = useSelector((state: RootState) => state.comment);
  const [userProfileImage, setUserProfileImage] = useState(undefined);
  const { isLoading, loadingStart, loadingEnd } = useUser();

  //인피니티 스크롤
  const [loading, setLoading] = useState<boolean>(false);
  const [nowFeedsnum, setNowFeedsNum] = useState(5);
  const loadmoredata = () => {
    if (loading) { return }
    setLoading(true)
    setTimeout(() => {
      setNowFeedsNum(nowFeedsnum + 5)

    }, 1000)
    setLoading(false)
  }



  const dispatch = useDispatch();
  const [feeds, setFeeds] = useState([]); //프롭으로내려주자
  const [rankers, setRankers] = useState([]); //프롭으로내려주자
  const dataId = useRef(0);
  // useEffect(() => {
  //   setUserProfileImage(image);
  // });

  ////////////////////////
  // useEffect(() => {
  // dispatch(userActions.getUser());
  // dispatch(feedAction.getFeed());
  // }, []);
  const __GetUserState = (token: string | null) => {
    return axios({
      method: "GET",
      url: process.env.BACK_EC2 + "/user/info",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    loadingStart();
    const token = localStorage.getItem("Token");
    __GetUserState(token);
    // console.log(userstate.Object.email);
    // dispatch(userActions.setnickname(userstate));
    loadingEnd();
  }, []);
  //////////////////////////////////////////

  //##################################################################################
  //res.data.detailFeedDtos 여기까지가 action임
  //res.data.detailFeedDtos.feed 가 action.payload 임
  let eml: any = [];
  const __GetFeedState = useCallback(
    (token: string | null) => {
      return axios({
        method: "GET",
        url: process.env.BACK_EC2 + "/feed",
        // url: "https://jsonplaceholder.typicode.com/comments",
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          // console.log(res.data.detailFeedDtos);
          let feedss = res.data.detailFeedDtos;
          //[{피드1},{피드2},{피드3}] 저장되어있음
          // console.log(res.data);
          // console.log(res.data.detailFeedDtos);
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
    },
    [feeds]
  );
  useEffect(() => {
    loadingStart();
    const token = localStorage.getItem("Token");
    __GetFeedState(token);

    // console.log(feedstate)
    loadingEnd();
  }, []);


  useEffect(() => {
    loadingStart()
    const token = localStorage.getItem("Token");
    // console.log(feeds); useState는 이렇게하면 초기값나오는듯, set된값은 아래 tsx에서 확인하자
    //댓글개수 실시간카운트 하려면 호출 상태를 디펜던시에 넣는게 아니라
    // 호출한상태값을 저장한변수를 디펜던시에 넣는다

    dispatch(userActions.getUser());
    dispatch(feedAction.getFeed());
    setUserProfileImage(image);
    loadingEnd()
  }, []);

  // const __openFeedDetail = useCallback(() => {
  //   feeds;
  // }, [feeds]);

  //##################################################################################
  // const url = "http://i6a601.p.ssafy.io:8080/feed";
  // let test = eml.map((item: any) => {
  //   console.log(item.feed);
  // });
  // console.log(test);
  // console.log(rankers);
  // console.log(feeds);
  const Dogye = styled.div`
    position: absolute;
    transition: all 0.3s ease-in-out;
    width: 120px;
    height: 120px;
    @media (min-width: 476px) {
      top: 180px;
      left: 10%;
    }
    @media (min-width: 768px) {
      top: 180px;
      left: 10%;
    }
    @media (min-width: 992px) {
      top: 120px;
      left: 10%;
    }
    @media (min-width: 1400px) {
      top: 120px;
      left: 19%;
    }
  `;

  // const GoTopBtn = styled.div`
  //   position: fixed;
  //   bottom: 10px;
  //   right: 10px;
  //   font-size: 2.5rem;
  //   cursor: pointer;
  // `;

  return (
    <div>
      <div className="mainfeed">

        <div className="wrapper">
          <div className="feed-list">
            <Dogye>
              <img src="images/dogye/happy.png"></img>
            </Dogye>
            <form
              className="write-feed"
              // onSubmit={__makeFeed}
              onClick={() => {
                Router.push("/feed/write");
              }}
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
                  disabled
                  // ref={contextRef}
                  type="text"
                  placeholder="     오늘의 도전 인증하기"
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
            {feedstate ? <InfiniteScroll
              dataLength={feedstate.slice(0, nowFeedsnum).length} //This is important field to render the next data
              next={loadmoredata}
              hasMore={nowFeedsnum < feedstate.length}
              loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>마지막입니다</b>
                </p>
              }
            // below props only if you need pull down functionality
            // pullDownToRefresh
            // pullDownToRefreshThreshold={50}
            // pullDownToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            // }
            // releaseToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            // }
            >

              {feedstate &&
                feedstate.slice(0, nowFeedsnum).map((item: any, idx: number) => {
                  // console.log(feeds);
                  // console.log(feedstate.length)
                  // console.log(nowFeedsnum)

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
            </InfiniteScroll> : null}
          </div>

          <div className="friend-list">
            <div
              className="my-profile"
              onClick={() => {
                Router.push(`/user/${nickname}`);
              }}
            >
              {image && (
                <div
                  className="profile-image"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              )}
              {/* <div className="profile-image"></div> */}

              {nickname ? (
                <div className="nickname txt-bold">
                  <div>
                    <Style className={chooseStyle}>{chooseStyle}</Style>
                  </div>{" "}
                  {user.nickname}
                </div>
              ) : null}
            </div>
            <div className="my-friends">
              <div
                className="
              name txt-bold"
              >
                나의 온도 : [ {ondo} ˚C ]
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
      {/* <GoTopBtn
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        <UpCircleOutlined />
      </GoTopBtn> */}
    </div>
  );
}
export default Mainfeed;

const Style = styled.span`
  font-size: 12px;
`;
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
