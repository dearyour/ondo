import FeedModal from "components/FeedModal";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FeedParams } from "store/interfaces/Feed.interface";
import { RootState } from "store/module";
import { useDispatch, useSelector } from "react-redux";
import { layoutAction } from "store/slice/layout";
import styled from "styled-components";
import { commentAction } from "store/slice/comment";
import Router from "next/router";
import { feedAction } from "store/slice/feed";
import axios from "axios";
// import Router from "next/router";
//feedId, createDate, chaallengId , image , content , userId , feedlike, comment []
// feeds: [feedId, createdDate, challengeId, image, content, userId, feedlike],
// comment: [commentId, userId, feedId, content, createdDate, modifiedDate],

interface Propss {
  showModal: Boolean;
  setShowModal: Function;
}
const Feed = (props: any) => {
  const dispatch = useDispatch();
  // const nickname = props.nickname;
  const startDate = props.dto.feed.createdDate;
  // const userimage = props.image;
  const user = useSelector((state: RootState) => state.user);
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const comments = useSelector((state: RootState) => state.comment.comments);
  const ondo = useSelector((state: RootState) => state.user.ondo);
  const [likeCount, setLikeCount] = useState(props.dto.feed.feedlike.length);
  const [likeState, setLikeState] = useState("");
  useEffect(() => {
    if (props.dto.likeflag) {
      setLikeState("delete");
    } else {
      setLikeState("ok");
    }
  }, []);
  // useEffect(() => {
  //   dispatch(commentAction.getComment);
  // }, []);
  // const challengeTitle = useSelector(
  //   (state: RootState) => state.challenge.challenges
  // );

  //mainfeed 페이지, props 는 detailFeedDtos이다 해당 [{..},{..},{..}] 내려받음
  //feed 페이지,  props.dto 는 해당 dto를 사용한다 이형식으로 리덕스에 저장됬다
  // {..} 이것이 feed 이다
  // console.log(props.dto.user.image);
  // 피드 하나하나당이 있는 배열 default값!
  // console.log(props.dto);

  // console.log(props.dto.feed);

  //
  // challenges.map((item: any, idx: number) => {
  //   console.log(item);
  // });

  // const feedId = useSelector((state: RootState) => state.feed.feeds.feedId);
  // const image = useSelector((state: RootState) => state.feed.feeds.image);
  // const content = useSelector((state: RootState) => state.feed.feeds.content);
  // const userId = useSelector((state: RootState) => state.feed.feeds.userId);
  // const createdDate = useSelector(
  //   (state: RootState) => state.feed.feeds.createdDate
  // );
  // const modifiedDate = useSelector(
  //   (state: RootState) => state.feed.feeds.modifiedDate
  // );
  // const feedlike = useSelector((state: RootState) => state.feed.feeds.feedlike);
  // const challengeId = useSelector(
  //   (state: RootState) => state.feed.feeds.challengeId
  // );
  const __openFeedDetail = useCallback(() => {
    // console.log(props.dto.feed);
    dispatch(feedAction.getFeed()); //전체 피드정보 다시 업데이트(자식컴포넌트에서 변경된값 부모에저장)
    dispatch(layoutAction.updateDetailData(props.dto)); //부모로부터 새로운 개별 피드 정보 저장
    dispatch(layoutAction.updateDetailState(true));
  }, [dispatch, props.dto]);

  // // const comment = comments;
  // console.log(comments.length);
  // console.log(userimage);
  // console.log(comments);
  // const num = comments.length;
  // console.log(num);

  // const IamgeLoad = useCallback(() => {}, []);

  // useEffect(() => {
  //   IamgeLoad();
  //   return () => {};
  // }, [IamgeLoad]);
  // //////////////////////////////// Date
  const oneDay = 1000 * 60 * 60 * 24;

  function makeTwoDigits(time: any) {
    return time.toString().length !== 2 ? `0${time}` : time;
  }
  const makeFeedTime = () => {
    const feedDate = new Date(startDate);
    const nowDate = Date.now(); //현재 시간

    const timeGap = nowDate - startDate;

    const date = parseInt(String(timeGap / oneDay));
    const hour = feedDate.getHours();
    const minutes = feedDate.getMinutes();
    // console.log(hour + "hour");
    // console.log(minutes);
    // console.log(startDate);

    return ` ${hour > 12 ? "오후" : "오전"} ${hour > 12 ? makeTwoDigits(hour - 12) : makeTwoDigits(hour)
      }:${makeTwoDigits(minutes)}  ${date === 0 ? "오늘" : date === 1 ? "어제" : ``
      // `${date} 일전`
      }`;
  };
  //////////////////////////////
  const getStartDate = () => {
    const newdate = new Date(startDate);

    const sy = newdate.getFullYear();
    const sm = newdate.getMonth() + 1;
    const sd = newdate.getDate();

    return (
      sy +
      "-" +
      ("00" + sm.toString()).slice(-2) +
      "-" +
      ("00" + sd.toString()).slice(-2)
    );
  };
  // console.log(startDate);
  const adate = new Date(startDate);
  const newdate = adate.getMonth() + 1;
  // console.log(newdate);
  // const getDuration = () => {
  //   const endDate = new Date(startDate);
  //   endDate.setDate(endDate.getDate() + 2);

  //   const sy = startDate.getFullYear();
  //   const sm = startDate.getMonth() + 1;
  //   const sd = startDate.getDate();
  //   const ey = endDate.getFullYear();
  //   const em = endDate.getMonth() + 1;
  //   const ed = endDate.getDate();
  //   return sy + "-" + sm + "-" + sd + " ~ " + ey + "-" + em + "-" + ed;
  // };
  //   console.log(props);
  // console.log(props.feed.feedId);
  //
  // console.log(props.feed.feed.feedlike);
  // console.log(
  //   props.dto.feed.feedTag.map((item: any, idx: number) => {
  //     return item;
  //   }) + "%%%%%%%%%%%"
  // );

  const __updateLike = useCallback(() => {
    const token = localStorage.getItem("Token");
    return axios({
      method: "get",
      url: process.env.BACK_EC2 + "/feed/like/" + props.dto.feed.feedId,
      // url: GetFeedurl,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        // console.log(res.data + "### 라이크!!");
        if (res.data === "ok") {
          setLikeCount(likeCount + 1);
          setLikeState(res.data);
          // dispatch(layoutAction.likeList(res.data));
        } else {
          setLikeCount(likeCount - 1);
          setLikeState(res.data);
          // dispatch(layoutAction.likeList(res.data));
        }
        dispatch(feedAction.getFeed());
      })
      .catch((err) => {
        return err;
      });
  }, [props.dto, likeCount]);
  return (
    <div className="feed">
      <div
        className="top"
      // onClick={() => {
      //   Router.push(`/user/${props.dto.username}`);
      // }}
      >
        {props.dto.user.image && (
          <div
            className="profile-image"
            style={{ backgroundImage: `url(${props.dto.user.image})` }}
            onClick={() => {
              Router.push(`/user/${props.dto.user.username}`);
            }}
          >
            {/* { <img src={userimage} alt="온도이미지" />} */}
          </div>
        )}
        <div className="profile-desc">
          <div
            className="nickname txt-bold"
            onClick={() => {
              Router.push(`/user/${props.dto.user.username}`);
            }}
          >
            <Style className={props.dto.user.chooseStyle}>
              {props.dto.user.chooseStyle}
            </Style>
            {props.dto.user.username}
          </div>
          <div className="timestamp">
            온도 : {props.dto.user.ondo}
            ˚C
          </div>
          <div className="timestamp">
            {getStartDate()} ,{makeFeedTime()}
          </div>
          <div
            className="timestamps"
            onClick={() => {
              Router.push("/search/" + props.dto.title);
            }}
          >
            도전 명 : {props.dto.title}
          </div>
          {/* <div className="timestamp">도전 명 : {challengeTitle}</div> */}
          {/* <div className="timestamp">도전 기간 :{getDuration()}</div> */}
          {/* <div className="timestamp">참여 날짜 : {getStartDate()}</div>
          <div className="timestamp">피드 작성 시간 : {makeFeedTime()}</div> */}
        </div>
      </div>
      <div className="contents">
        <div className="body-tag">
          {props.dto.tags.map((item: any, idx: number) => {
            return (
              <div
                className="body-tags"
                key={idx}
                onClick={() => {
                  Router.push("/search/" + item.name);
                }}
              >
                [# {item.name} ]
              </div>
            );
            // <Tags item={item.name}></Tags>;
          })}
        </div>
        {props.dto.feed.content}
        {/* {props.dto.feed.feedTag[0]} */}
        {/* <img src={props.feed.image} alt="온도이미지" /> */}
        {props.dto.feed.image && (
          <div
            className="image"
            onClick={__openFeedDetail}
            style={{ backgroundImage: `url(${props.dto.feed.image})` }}
          ></div>
        )}
      </div>
      <div className="bottom">
        <div className="like" onClick={__updateLike}>
          <div className="asset">
            {/* <img src="/assets/feed/like-dac.svg" alt="좋아요" /> */}
            <img

              className={props.dto.likeflag === false ? "move likeanimated unlikeanimated" : "move unlikeanimated"}
              src=
              //  && likelist === "ok"
              "/assets/feed/pngwing.com2.png"></img>
            <img src="/assets/feed/pngwing.com.png"
              alt="좋아요"
            ></img>

          </div>
          <div className="count txt-bold">
            {props.dto.feed.feedlike ? props.dto.feed.feedlike.length : 0}
          </div>
        </div>
        <div className="comment" onClick={__openFeedDetail}>
          {/* <Link href=""> */}
          <div className="asset">
            <img src="/assets/feed/pngwing.com5.png" alt="댓글" />
          </div>
          <div className="count txt-bold">
            {props.dto.feed.comment
              ? Object.keys(props.dto.feed.comment).length
              : 0}
          </div>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Feed;

const Style = styled.span`
  /* font-size: 1rem; */
  margin-right: 10px;
`;
// const [
//   {
//     feed: {
//       _userid,
//       _feedid,
//       _image,
//       _content,
//       _createdDate,
//       _modifiedDate,
//       _feedlike,
//       _challengeId,
//       _comment,
//     },
//   },
//   setData,
// ] = useState({
//   feed: {
//     _userid: 0,
//     _feedid: 0,
//     _image: "",
//     _content: "",
//     _createdDate: Date,
//     _modifiedDate: Date,
//     _feedlike: [],
//     _challengeId: 0,
//     _comment: [],
//   },
// });

// const __openFeedDetail = useCallback(() => {
//   const feedData = {
//     feed: {
//       _userid,
//       _feedid,
//       _image,
//       _content,
//       _createdDate,
//       _modifiedDate,
//       _feedlike,
//       _challengeId,
//       _comment,
//     },
//     // user: { nickname: user ? user.nickname : "yongstar", _userimage },
//   };

//   console.log(feedData);
//   console.log(props.dto.feed);
//   // dispatch(layoutAction.updateDetailData(feedData));
//   dispatch(layoutAction.updateDetailData(props.dto.feed));
//   dispatch(layoutAction.updateDetailState(true));
// }, [
//   dispatch,
//   _userid,
//   _feedid,
//   _image,
//   _content,
//   _createdDate,
//   _modifiedDate,
//   _feedlike,
//   _challengeId,
//   _comment,
// ]);
