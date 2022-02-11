import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/module";
import { layoutAction } from "store/slice/layout";
import Reply from "components/Feed/reply";
import Router from "next/router";
import axios from "axios";

function makeArray(obj: Object) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const result = keys.map((item, idx) => {
    return {
      commnetId: item,
      data: values[idx],
    };
  });

  return result.reverse;
}

function Detailfeed() {
  const dispatch = useDispatch();
  const detailData = useSelector((state: RootState) => state.layout.detailData);
  const userImage = useSelector((state: RootState) => state.user.image);
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const [commentData, setCommnetData] = useState([]);
  // const session = useSelector((state)=>state.auth.session);
  // const image = useSelector(
  //   (state: RootState) => state.layout.detailData.feed.image
  // );
  console.log(detailData.feed.feedId);
  const startDate = detailData.feed.createdDate;

  // const __getProfileImage = useCallback(() => {}, [userImage]);
  // console.log(startDate + "$$$$$$$$$$");
  const getStartDate = () => {
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
  const makeFeedTime = () => {
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

  const __loadComments = useCallback(() => {
    //코멘트 업로드 또는 불러올때 계속 새로고침
    if (detailData) {
      const token = localStorage.getItem("Token");
      axios({
        method: "GET",
        url: process.env.BACK_EC2 + "/comment/" + detailData.feed.feedId,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          console.log(res);
          console.log("######" + detailData.feed.feedId);
          console.log(makeArray(res));
          // setCommnetData(makeArray(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const __uploadComment = useCallback(
    (e) => {
      e.preventDefault();
      if (detailData) {
        const data = {
          feedId: detailData.feed.feedId,
          content: comment,
        };
        const token = localStorage.getItem("Token");
        axios({
          method: "POST",
          url: process.env.BACK_EC2 + "/comment/write",
          headers: {
            Authorization: "Bearer " + token,
          },
          data: data,
        })
          .then((res) => {
            console.log(res);
            // commentRef.current.value = "";
            setComment("");
            __loadComments;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [
      detailData,
      comment,
      // commentRef
    ]
  );
  const __closeDetail = useCallback(() => {
    dispatch(layoutAction.updateDetailState(false));

    dispatch(layoutAction.updateDetailData(undefined));
  }, [dispatch]);

  const __whenKeyDown = useCallback(
    (e) => {
      const code = e.code;
      if (code === "Escape") {
        __closeDetail();
      }
    },
    [__closeDetail]
  );

  useEffect(() => {
    window.addEventListener("keydown", __whenKeyDown);
    return () => {
      window.removeEventListener("keydown", __whenKeyDown);
    };
  }, [__whenKeyDown]);

  useEffect(() => {
    __loadComments;
  }, [__loadComments]);
  return (
    <div>
      <div className="feed-detail">
        <div className="bg" onClick={__closeDetail}></div>
        <div className="wrapper">
          <div className="close" onClick={__closeDetail}>
            <img src="/assets/feed/close.svg" alt="닫기" />
          </div>
          {/* {detailData.feed.image && <div className="main-image" style={{ backgroundImage: `url(${detailData.feed.image})`></div>} */}
          {detailData.feed.image && (
            <div
              className="main-image"
              style={{ backgroundImage: `url(${detailData.feed.image})` }}
            ></div>
          )}
          <div className="contents">
            <div className="feed-content">
              <div
                className="top"
                onClick={() => {
                  Router.push(`/user/${detailData.user.username}`);
                }}
              >
                {detailData.user.image && (
                  <div
                    className="profile-image"
                    style={{ backgroundImage: `url(${detailData.user.image})` }}
                  ></div>
                )}
                <div className="feed-desc">
                  <div className="nickname txt-bold">
                    {detailData.user.username}
                  </div>
                  <div className="timestamp">
                    {getStartDate()}
                    {makeFeedTime()}
                  </div>
                </div>
              </div>

              <div className="body">{detailData.feed.content}</div>
              <div className="bottom">
                <div className="like">
                  <div className="asset">
                    <img src="assets/feed/like-dac.svg" alt="좋아요" />
                  </div>
                  <div className="title txt-bold">
                    {detailData.feed.feedlike} 2
                  </div>
                </div>
                <div className="comment">
                  <div className="asset">
                    <img src="assets/feed/comment.svg" alt="댓글" />
                  </div>
                  <div className="title txt-bold">
                    {detailData.feed.comment
                      ? detailData.feed.comment.length
                      : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="feed-comments">
              {detailData.comments.map((item: any, idx: number) => {
                // {/* // console.log(feeds); */}
                return <Reply key={idx} item={detailData} reply={item} />;
              })}
            </div>
            <form className="feed-write-comment" onSubmit={__uploadComment}>
              {userImage && (
                <div
                  className="profile-image"
                  style={{ backgroundImage: `url(${userImage})` }}
                ></div>
              )}
              <div className="write-comment">
                <input
                  type="text"
                  placeholder="댓글을 입력해 주세요"
                  ref={commentRef}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detailfeed;
