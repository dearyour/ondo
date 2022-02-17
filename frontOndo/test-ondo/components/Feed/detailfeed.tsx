import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/module";
import { layoutAction } from "store/slice/layout";
import Reply from "components/Feed/reply";
import Router from "next/router";
import axios from "axios";
import { feedAction } from "store/slice/feed";
import Tags from "./tag";
import { Popconfirm } from "antd";

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

function Detailfeed() {
  //layout 은 해당 피드 1 ,2 ,3 각각 에 대한 정보만 저장됨
  const dispatch = useDispatch();
  const loginUserName = useSelector(
    (state: RootState) => state.user.users.username
  );
  const feedUserName = useSelector(
    (state: RootState) => state.layout.detailData.user.username
  );

  const layout = useSelector((state: RootState) => state.layout);
  const image = useSelector((state: RootState) => state.user.users.image);
  const detailData = useSelector((state: RootState) => state.layout.detailData);
  const likelist = useSelector((state: RootState) => state.layout.likelist);
  const feedstate = useSelector((state: RootState) => state.feed.items);
  const feedssId = useSelector(
    (state: RootState) => state.layout.detailData.feed.feedId
  );
  const [comment, setComment] = useState(""); // 댓글작성
  const commentRef: any = useRef(null);
  const [commentData, setCommentData] = useState([]);
  const [likeCount, setLikeCount] = useState(detailData.feed.feedlike.length);
  const [likeState, setLikeState] = useState(""); //이거는 모달 껐다키면 초기값으로 설정됨 사용불가
  // const session = useSelector((state)=>state.auth.session);
  // const image = useSelector(
  //   (state: RootState) => state.layout.detailData.feed.image
  // );
  // console.log(detailData.feed.feedlike.length);
  // console.log(detailData);
  // console.log(commentData);
  // console.log(feedssId);
  useEffect(() => {
    if (detailData.likeflag) {
      setLikeState("delete");
    } else {
      setLikeState("ok");
    }
  }, []);
  const likeFlag = detailData.likeflag;
  // console.log(likeFlag);
  const startDate = detailData.feed.createdDate;
  const [putUser, SetPutUser] = useState([]);
  // putUser = detailData.comment;

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

  // const __deleteComment = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     if (detailData) {
  //       const token = localStorage.getItem("Token");
  //       axios({
  //         method: "DELETE",
  //         url:
  //           process.env.BACK_EC2 +
  //           "/comment/delete/" +
  //           props.reply.comment.commentId,
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       })
  //         .then((res) => {
  //           console.log(res);
  //           props.method();
  //           // dispatch(layoutAction.updateDetailData(commentData));
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   },
  //   [detailData, useCallback, props.reply]
  // );
  const __deleteFeed = useCallback(
    (e) => {
      e.preventDefault();
      if (detailData) {
        const token = localStorage.getItem("Token");
        axios({
          method: "DELETE",
          url: process.env.BACK_EC2 + "/feed/delete/" + feedssId,
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            // console.log(res.data);
            dispatch(feedAction.getFeed());
            __closeDetail();
            // dispatch(layoutAction.updateDetailData(commentData));
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    },
    [detailData, useCallback]
  );

  const __loadComments = useCallback(() => {
    //코멘트 업로드 또는 불러올때 계속 새로고침
    if (detailData) {
      const token = localStorage.getItem("Token");
      dispatch(layoutAction.updateCommentTarget(feedssId));
      dispatch(layoutAction.updateIsCommentToFeed(true));
      // const feedsId = detailData.feed.feedId;
      axios({
        method: "GET",
        url: process.env.BACK_EC2 + "/comment/" + feedssId,
        // url: "http://localhost:8080" + "/feed",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          // console.log(res.data);
          // console.log("######" + detailData.feed.feedId);
          // console.log(makeArray(res));
          // dispatch(layoutAction.updateDetailData(props.dto));
          // dispatch(layoutAction.updateDetailData(commentData));

          // setCommentData(makeArray(res.data));
          setCommentData(res.data.reverse());
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, []);
  // 댓글 작성

  const __uploadComment = useCallback(
    (e) => {
      e.preventDefault();
      if (comment.length > 0 && comment.trim()) {
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
              // console.log(res);
              commentRef.current.value = "";
              setComment("");
              __loadComments();
            })
            .catch((err) => {
              // console.log(err);
            });
        }
      }
    },
    [detailData, comment, commentRef, __loadComments]
  );
  //좋아요
  const __updateLike = useCallback(() => {
    const token = localStorage.getItem("Token");
    return axios({
      method: "get",
      url: process.env.BACK_EC2 + "/feed/like/" + feedssId,
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
  }, [likelist, layout, detailData, likeCount]);

  const __closeDetail = useCallback(() => {
    dispatch(layoutAction.updateDetailState(false));
    dispatch(layoutAction.likeList(undefined)); //이거 거의안씀
    // dispatch(layoutAction.updateDetailData(undefined));
    // dispatch(layoutAction.updateDetailData(detailData));
    // dispatch(layoutAction.likeList("ok" ? "delete" : "ok"));
    dispatch(feedAction.getFeed()); // 모달닫힐때 새로운정보를 최상위부모에 기록 그것을 다시 프롭으로 feed에 넘김
    // 넘긴 feed는 다시 모달 열릴떄 그정보를 props.detail인  개별정보저장인 detailFeed로 넘긴다
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
    __loadComments();
    return () => { };
  }, [__loadComments]);
  // console.log(detailData.tags.map((it: any) => it) + "###");
  // console.log(detailData.tags[0].name + "###");
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
              <div className="top">
                {detailData.user.image && (
                  <div
                    className="profile-image"
                    style={{ backgroundImage: `url(${detailData.user.image})` }}
                    onClick={() => {
                      Router.push(`/user/${detailData.user.username}`);
                    }}
                  ></div>
                )}
                <div className="feed-desc">
                  <div
                    className="nickname txt-bold"
                    onClick={() => {
                      Router.push(`/user/${detailData.user.username}`);
                    }}
                  >
                    {detailData.user.username}
                  </div>
                  <div className="timestamp">
                    {getStartDate()}
                    {makeFeedTime()}
                  </div>
                  {loginUserName === feedUserName ? (
                    <Popconfirm
                      placement="bottomRight"
                      title="이 피드를 삭제하시겠습니까?"
                      onConfirm={__deleteFeed}
                      okText="네"
                      cancelText="아니요"
                    >
                      <div className="reply-btn">
                        <img src="/assets/feed/pngwing.com9.png" alt="삭제" />
                      </div>
                    </Popconfirm>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="body-tag">
                {detailData.tags.map((item: any, idx: number) => {
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
              <div className="body">{detailData.feed.content}</div>
              <div className="bottom">
                <div className="like" onClick={__updateLike}>
                  <div className="asset">
                    <img
                      className={likeState === 'ok' ? "move likeanimated" : "move unlikeanimated"}
                      src=
                      // detailData.likeflag === false &&
                      // || detailData.likeflag === false
                      // && likelist === "ok"
                      "/assets/feed/pngwing.com2.png"
                      alt="좋아요"
                    />
                    <img src="/assets/feed/pngwing.com.png"></img>
                  </div>
                  <div className="title txt-bold">
                    {/* {layout.likelist}　 */}
                    {/* {detailData.feed.feedlike.length} */}
                    {likeCount}
                  </div>
                </div>
                <div className="comment">
                  <div className="asset">
                    <img src="/assets/feed/pngwing.com5.png" alt="댓글" />
                  </div>
                  <div className="title txt-bold">{commentData.length}</div>
                </div>
              </div>
            </div>
            <div className="feed-comments">
              {commentData.map((item: any, idx: number) => {
                // {/* // console.log(feeds); */}
                return (
                  <Reply
                    key={idx}
                    item={item}
                    reply={item}
                    method={__loadComments}
                  />
                );
              })}
            </div>
            <form className="feed-write-comment" onSubmit={__uploadComment}>
              {image && (
                <div
                  className="profile-image"
                  style={{ backgroundImage: `url(${image})` }}
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

// {detailData.comments.map((item: any, idx: number) => {
//   // {/* // console.log(feeds); */}
//   return <Reply key={idx} item={detailData} reply={item} />;
// })}
