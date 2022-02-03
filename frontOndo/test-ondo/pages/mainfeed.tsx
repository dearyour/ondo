// import firebaseApp from '@config/firebaseApp';
import React, { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
// import "../styles/feedcss/index.scss";
// import "../styles/feedcss/index.module.scss";
// import style from "./style.module.css";
import "./mainfeedcss/style.module.scss";

function mainfeed() {
  return (
    <div>
      <div className="mainfeed">
        <div className="wrapper">
          <div className="feed-list">
            <form
              className="write-feed"
              // onSubmit={__makeFeed}
            >
              <div className="profile-image"></div>
              <div className="inp">
                <input
                  // ref={contextRef}
                  type="text"
                  placeholder="오늘 무슨 일이 있었나요?"
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

            <div className="feed">
              <div className="top">
                <div className="profile-image"></div>
                <div className="profile-desc">
                  <div className="nickname" txt-bold>yongstar</div>
                  <div className="timestamp">8:15 pm, yesterday</div>
                </div>
              </div>
              <div className="contents">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                soluta voluptate aspernatur assumenda tenetur illum doloremque
                dolorum ipsa, libero explicabo nam earum velit voluptatibus sunt
                in, illo laborum nostrum aliquid.
              </div>
              <div className="bottom">
                <div className="like">
                  <div className="asset">
                    <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                  </div>
                  <div className="count txt-bold">
                    25k
                  </div>
                </div>
                <div className="comment">
                  <div className="asset">
                    <img src="/assets/feed/comment.svg" alt="댓글" />
                  </div>
                  <div className="count txt-bold">
                    2k
                  </div>
                </div>
              </div>
            </div>

            <div className="feed">
              <div className="top">
                <div className="profile-image"></div>
                <div className="profile-desc">
                  <div className="nickname txt-bold">yongstar</div>
                  <div className="timestamp">8:15 pm, yesterday</div>
                </div>
              </div>
              <div className="contents">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                soluta voluptate aspernatur assumenda tenetur illum doloremque
                dolorum ipsa, libero explicabo nam earum velit voluptatibus sunt
                in, illo laborum nostrum aliquid.
                <div className="image"></div>
              </div>
              <div className="bottom">
                <div className="like">
                  <div className="asset">
                    <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                  </div>
                  <div className="count txt-bold">
                    25k
                  </div>
                </div>
                <div className="comment">
                  <div className="asset">
                    <img src="/assets/feed/comment.svg" alt="댓글" />
                  </div>
                  <div className="count txt-bold">
                    2k
                  </div>
                </div>
              </div>
            </div>

            <div className="feed">
              <div className="top">
                <div className="profile-image"></div>
                <div className="profile-desc">
                  <div className="nickname txt-bold">yongstar</div>
                  <div className="timestamp">8:15 pm, yesterday</div>
                </div>
              </div>
              <div className="contents">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                soluta voluptate aspernatur assumenda tenetur illum doloremque
                dolorum ipsa, libero explicabo nam earum velit voluptatibus sunt
                in, illo laborum nostrum aliquid.
              </div>
              <div className="bottom">
                <div className="like">
                  <div className="asset">
                    <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                  </div>
                  <div className="count txt-bold">
                    25k
                  </div>
                </div>
                <div className="comment">
                  <div className="asset">
                    <img src="/assets/feed/comment.svg" alt="댓글" />
                  </div>
                  <div className="count txt-bold">
                    2k
                  </div>
                </div>
              </div>
            </div>

            <div className="feed">
              <div className="top">
                <div className="profile-image"></div>
                <div className="profile-desc">
                  <div className="nickname txt-bold">yongstar</div>
                  <div className="timestamp">8:15 pm, yesterday</div>
                </div>
              </div>
              <div className="contents">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                soluta voluptate aspernatur assumenda tenetur illum doloremque
                dolorum ipsa, libero explicabo nam earum velit voluptatibus sunt
                in, illo laborum nostrum aliquid.
                <div className="image"></div>
              </div>
              <div className="bottom">
                <div className="like">
                  <div className="asset">
                    <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                  </div>
                  <div className="count txt-bold">
                    25k
                  </div>
                </div>
                <div className="comment">
                  <div className="asset">
                    <img src="/assets/feed/comment.svg" alt="댓글" />
                  </div>
                  <div className="count txt-bold">
                    2k
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="friend-list">
            <div className="my-profile">
              <div className="profile-image"></div>
              <div className="nickname txt-bold">
                yongstar
              </div>
            </div>
            <div className="my-friends">
              <div className="title txt-bold">나의 친구</div>
              <ul className="friend-list-wrapper">
                <li className="friend">
                  <div className="profile-image"></div>
                  <div className="nickname txt-bold">
                    일주어터
                  </div>
                </li>
                <li className="friend">
                  <div className="profile-image"></div>
                  <div className="nickname txt-bold">
                    카리나
                  </div>
                </li>
                <li className="friend">
                  <div className="profile-image"></div>
                  <div className="nickname txt-bold">
                    윈터
                  </div>
                </li>
                <li className="friend">
                  <div className="profile-image"></div>
                  <div className="nickname txt-bold">
                    랭커
                  </div>
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
