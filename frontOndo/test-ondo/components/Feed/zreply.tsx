import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/module";
import Router from "next/router";
function makeArray(obj: any) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const result = keys.map((item, idx) => {
    return {
      commentId: item,
      data: values[idx],
    };
  });

  return result.reverse();
}

const getStartDate = (startDate: any) => {
  const newdate = new Date(startDate);

  const sy = newdate.getFullYear();
  const sm = newdate.getMonth() + 1;
  const sd = newdate.getDate();

  return sy + "-" + sm + "-" + sd;
};

const oneDay: number = 1000 * 60 * 60 * 24;
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

  return ` ${hour > 12 ? "오후" : "오전"} ${hour > 12 ? makeTwoDigits(hour - 12) : makeTwoDigits(hour)
    }:${makeTwoDigits(minutes)},  ${date === 0 ? "오늘" : date === 1 ? "어제" : ``
    // `${date} 일전`
    }`;
};

export default function ReplyData(props: any) {
  // useEffect(() => {
  //   if (props.reply) {
  //     setReplyData(props.reply);
  //     console.log(props.reply);
  //   }
  // }, [props.reply, commentId]);

  const dispatch = useDispatch();
  const detailData = useSelector((state: RootState) => state.layout.detailData);
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
            <div className="nickname">{props.reply.username}</div>
            <div className="timestamp">
              {getStartDate(props.reply.comment.createdDate)}{" "}
              {makeFeedTime(props.reply.comment.createdDate)}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="like">
            <div className="asset">
              <img src="/assets/feed/like-dac.svg" alt="좋아요" />
            </div>
            <div className="title txt-bold">34k</div>
          </div>
          <div className="reply-btn">답글</div>
        </div>
      </div>
      {<div className="body">{props.reply.comment.content}</div>}
    </div>
  );
}
