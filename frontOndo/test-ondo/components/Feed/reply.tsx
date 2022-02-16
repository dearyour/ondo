import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { layoutAction } from "store/slice/layout";
import { RootState } from "store/module";
import axios from "axios";

export default function Reply(props: any) {
  const detailData = useSelector((state: RootState) => state.layout.detailData);
  const loginUserName = useSelector(
    (state: RootState) => state.user.users.username
  );
  const feedUserName = useSelector(
    (state: RootState) => state.layout.detailData.user.username
  );
  // console.log(loginUserName);
  const commentId = useSelector((state: RootState) => state.layout.targetId);
  const [temp, setTemp] = useState(commentId);
  const feedssId = useSelector(
    (state: RootState) => state.layout.detailData.feed.feedId
  );
  // console.log(props.reply.comment.commentId + "$$$$$$$$$$$$");
  // console.log(commentId);
  const [commentData, setCommentData] = useState([]);
  const dispatch = useDispatch();
  const oneDay = 1000 * 60 * 60 * 24;
  function makeTwoDigits(time: any) {
    return time.toString().length !== 2 ? `0${time}` : time;
  }
  const makeFeedTime = (startDate: any) => {
    const feedDate = new Date(startDate);
    const nowDate = Date.now(); //현재 시간

    const timeGap = nowDate - startDate;

    const date = parseInt(String(timeGap / oneDay));
    const hour = feedDate.getHours();
    const minutes = feedDate.getMinutes();
    // console.log(hour + "hour");
    // console.log(minutes);
    // console.log(startDate);

    return ` ${hour > 12 ? "오후" : "오전"} ${
      hour > 12 ? makeTwoDigits(hour - 12) : makeTwoDigits(hour)
    }:${makeTwoDigits(minutes)},  ${
      date === 0 ? "오늘" : date === 1 ? "어제" : ``
      // `${date} 일전`
    }`;
  };
  const getStartDate = (startDate: any) => {
    const newdate = new Date(startDate);

    const sy = newdate.getFullYear();
    const sm = newdate.getMonth() + 1;
    const sd = newdate.getDate();

    return sy + "-" + sm + "-" + sd;
  };
  const __changeTargetId = useCallback(() => {
    dispatch(layoutAction.updateCommentTarget(props.reply.comment.commentId));
    dispatch(layoutAction.updateIsCommentToFeed(false));
  }, [dispatch, props.reply.comment.commentId, detailData, commentId]);
  // console.log(props.item.user.userId);

  // const __loadComments = useCallback(() => {
  //   //코멘트 업로드 또는 불러올때 계속 새로고침
  //   if (detailData) {
  //     const token = localStorage.getItem("Token");
  //     // const feedsId = detailData.feed.feedId;
  //     axios({
  //       method: "GET",
  //       url: process.env.BACK_EC2 + "/comment/" + feedssId,
  //       // url: "http://localhost:8080" + "/feed",
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res.data);
  //         console.log("######" + detailData.feed.feedId);
  //         // console.log(makeArray(res));
  //         // dispatch(layoutAction.updateDetailData(props.dto));
  //         // dispatch(layoutAction.updateDetailData(commentData));

  //         // setCommentData(makeArray(res.data));
  //         setCommentData(res.data.reverse());
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, []);

  const __deleteComment = useCallback(
    (e) => {
      e.preventDefault();
      if (detailData) {
        const token = localStorage.getItem("Token");
        axios({
          method: "DELETE",
          url:
            process.env.BACK_EC2 +
            "/comment/delete/" +
            props.reply.comment.commentId,
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            // console.log(res);
            props.method(); // 로드 comment 다시 부른다
            // dispatch(layoutAction.updateDetailData(commentData));
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    },
    [detailData, useCallback, props.reply]
  );

  return (
    <div className="comment-form comment">
      <div className="top">
        <div className="left">
          {/* <div className="profile-image"></div> */}
          {props.reply.image && (
            <div
              className="profile-image"
              onClick={() => {
                Router.push(`/user/${props.reply.username}`);
              }}
              style={{ backgroundImage: `url(${props.reply.image})` }}
            ></div>
          )}
          <div className="feed-desc">
            {/* <div className="nickname">{props.item.username}</div> */}
            <div
              className="nickname"
              onClick={() => {
                Router.push(`/user/${props.reply.username}`);
              }}
            >
              {props.reply.username}
            </div>
            <div className="timestamp">
              {getStartDate(props.reply.comment.createdDate)}{" "}
              {makeFeedTime(props.reply.comment.createdDate)}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="like">
            <div className="asset">
              <img
              // src="/assets/feed/like-dac.svg"
              // alt="좋아요"
              // onClick={__changeTargetId}
              />
            </div>
            <div className="title txt-bold"></div>
          </div>
          {loginUserName === feedUserName ||
          loginUserName === props.reply.username ? (
            <div className="reply-btn" onClick={__deleteComment}>
              삭제
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {<div className="body">{props.reply.comment.content}</div>}
    </div>
  );
}
