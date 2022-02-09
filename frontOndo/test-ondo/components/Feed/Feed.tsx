import FeedModal from "components/FeedModal";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FeedParams } from "store/interfaces/Feed.interface";
import { RootState } from "store/module";
import { useDispatch, useSelector } from "react-redux";
import { layoutAction } from "store/slice/layout";
//feedId, createDate, chaallengId , image , content , userId , feedlike, comment []
// feeds: [feedId, createdDate, challengeId, image, content, userId, feedlike],
// comment: [commentId, userId, feedId, content, createdDate, modifiedDate],

interface Propss {
  showModal: Boolean;
  setShowModal: Function;
}
const Feed = (props: any) => {
  // const dispatch = useDispatch();
  // const nickname = props.nickname;
  // const startDate = props.feed.createdDate;
  // const userimage = props.image;
  const user = useSelector((state: RootState) => state.user);
  const comments = useSelector((state: RootState) => state.comment.comments);
  const ondo = useSelector((state: RootState) => state.user.ondo);
  const title1 = useSelector(
    (state: RootState) => state.challenge.challenges[0].title
  );
  console.log(props.feed.user.image);
  // 피드 하나하나당
  console.log(props.feed);
  // challenges.map((item: any, idx: number) => {
  //   console.log(item);
  // });
  // const [
  //   {
  //     feed: {
  //       userid,
  //       feedid,
  //       iamge,
  //       content,
  //       createDate,
  //       modifiedDate,
  //       feedlike,
  //       challengeId,
  //     },
  //   },
  //   setData,
  // ] = useState({
  //   feed: {
  //     userid: 0,
  //     feedid: 0,
  //     iamge: "",
  //     content: "",
  //     createDate: Date,
  //     modifiedDate: Date,
  //     feedlike: [],
  //     challengeId: 0,
  //   },
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
  // const __openFeedDetail = useCallback(() => {
  //   const feedData = {
  //     feed: {
  //       userId,
  //       feedId,
  //       image,
  //       content,
  //       createdDate,
  //       modifiedDate,
  //       feedlike,
  //       challengeId,
  //     },
  //     user: { nickname: user ? user.nickname : "yongstar", userimage },
  //   };

  //   console.log(feedData);
  //   dispatch(layoutAction.updateDetailData(feedData));
  //   dispatch(layoutAction.updateDetailState(true));
  // }, [
  //   dispatch,
  //   userId,
  //   feedId,
  //   image,
  //   content,
  //   createdDate,
  //   modifiedDate,
  //   feedlike,
  //   challengeId,
  // ]);

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
  // const oneDay: number = 1000 * 60 * 60 * 24;

  // function makeTwoDigits(time: any) {
  //   return time.toString().length !== 2 ? `0${time}` : time;
  // }
  // const makeFeedTime = () => {
  //   const feedDate = new Date(startDate);
  //   const nowDate = Date.now(); //현재 시간

  //   const timeGap = nowDate - startDate;

  //   const date = parseInt(timeGap / oneDay);
  //   const hour = feedDate.getHours();
  //   const minutes = feedDate.getMinutes();
  //   console.log(hour + "hour");
  //   console.log(minutes);

  //   return ` ${hour > 12 ? "오후" : "오전"} ${
  //     hour > 12 ? makeTwoDigits(hour - 12) : makeTwoDigits(hour)
  //   }:${makeTwoDigits(minutes)},  ${
  //     date === 0 ? "오늘" : date === 1 ? "어제" : `${date} 일전`
  //   }`;
  // };
  // //////////////////////////////
  // const getStartDate = () => {
  //   const newdate = new Date(startDate);

  //   const sy = newdate.getFullYear();
  //   const sm = newdate.getMonth() + 1;
  //   const sd = newdate.getDate();

  //   return sy + "-" + sm + "-" + sd;
  // };
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
  // createdDate,
  // challengeId,
  // image,
  // content,
  // props.feed.feedId,
  //   props.feed.userId,
  // feedlike,
  //   console.log(props);
  // console.log(props.feed.feedId);
  //
  // console.log(props.feed.feed.feedlike);

  return (
    <div
      className="feed"
      // onClick={__openFeedDetail}
    >
      <div className="top">
        {props.feed.user.image && (
          <div
            className="profile-image"
            style={{ backgroundImage: `url(${props.feed.user.image})` }}
          >
            {/* <img src={userimage} alt="온도이미지" /> */}
          </div>
        )}
        <div className="profile-desc">
          <div className="nickname txt-bold">{/* {nickname} */}</div>
          <div className="timestamp">
            {/* 온도 :{props.feed.user.ondo} */}
            ˚C
          </div>
          <div className="timestamp">도전 중 :{/* {title1} */}</div>
          {/* <div className="timestamp">도전 기간 :{getDuration()}</div> */}
          {/* <div className="timestamp">참여 날짜 : {getStartDate()}</div> */}
          {/* <div className="timestamp">피드 작성 시간 : {makeFeedTime()}</div> */}
        </div>
      </div>
      <div className="contents">
        {props.feed.feed.content}
        {props.feed.feed.image && (
          <div
            className="image"
            style={{ backgroundImage: `url(${props.feed.feed.image})` }}
          ></div>
        )}
        {/* <img src={props.feed.image} alt="온도이미지" /> */}
      </div>
      <div className="bottom">
        <div className="like">
          <div className="asset">
            <img src="/assets/feed/like-dac.svg" alt="좋아요" />
          </div>
          <div className="count txt-bold">
            {props.feed.feed.feedlike ? props.feed.feed.feedlike.length : 2}
          </div>
        </div>
        <div className="comment">
          {/* <Link href=""> */}
          <div className="asset">
            <img src="/assets/feed/comment.svg" alt="댓글" />
          </div>
          <div className="count txt-bold">
            {props.feed.comments ? props.feed.comments.length : 0}
          </div>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};
export default Feed;
