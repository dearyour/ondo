import React from "react";
import Router from "next/router";
import Link from "next/link";

function rankfeed(props: any) {
  return (
    <ul className="friend-list-wrapper">
      {props.num}위
      <li
        className="friend"
        onClick={() => {
          Router.push(`/user/${props.dto.username}`);
        }}
      >
        {props.dto.image && (
          <div
            className="profile-image"
            style={{ backgroundImage: `url(${props.dto.image})` }}
          >
            {" "}
          </div>
        )}
        <div className="nickname txt-bold">{props.dto.username}</div>
      </li>
    </ul>
  );
}

export default rankfeed;
