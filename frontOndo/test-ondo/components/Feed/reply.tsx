import React from "react";
import Router from "next/router";

export default function reply(props: any) {
  // console.log(props.item.user.userId);
  return (
    <div className="comment-form comment">
      <div className="top">
        <div className="left">
          {/* <div className="profile-image"></div> */}
          {/* {props.reply.image && (
            <div
              className="profile-image"
              onClick={() => {
                Router.push(`/user/${props.reply.username}`);
              }}
              style={{ backgroundImage: `url(${props.reply.image})` }}
            ></div>
          )} */}
          <div className="feed-desc">
            {/* <div className="nickname">{props.item.username}</div> */}
            <div className="nickname">{props.reply.username}</div>
            {/* <div className="timestamp">{props.reply.comment.createdDate}</div> */}
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
      {/* <div className="body">{props.reply.comment.content}</div> */}
    </div>
  );
}
