import React from "react";
import Router from "next/router";
import Link from "next/link";
import styled from "styled-components";

function Rankfeed(props: any) {
  console.log(props)
  return (
    <ul className="friend-list-wrapper">
      {props.num}위 　[ {props.dto.ondo} ˚C ]
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
        <div className="nickname txt-bold"><Style className={props.dto.chooseStyle}>{props.dto.chooseStyle}</Style>{props.dto.username}</div>
      </li>
    </ul>
  );
}

export default Rankfeed;

const Style = styled.div`
font-size:10px;
  margin-right: 10px;
`
