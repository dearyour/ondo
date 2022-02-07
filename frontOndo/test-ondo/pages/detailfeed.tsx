import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/module";
import { layoutAction } from "store/slice/layout";

function detailfeed() {
  const dispatch = useDispatch();
  const detailData = useSelector((state: RootState) => state.layout.detailData);
  const userImage = useSelector((state: RootState) => state.user.image);
  const image = useSelector(
    (state: RootState) => state.layout.detailData.feed.image
  );
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

    const date = parseInt(timeGap / oneDay);
    const hour = feedDate.getHours();
    const minutes = feedDate.getMinutes();
    console.log(hour + "hour");
    console.log(minutes);

    return ` ${hour > 12 ? "오후" : "오전"} ${
      hour > 12 ? makeTwoDigits(hour - 12) : makeTwoDigits(hour)
    }:${makeTwoDigits(minutes)},  ${
      date === 0 ? "오늘" : date === 1 ? "어제" : `${date} 일전`
    }`;
  };

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
  return (
    <div>
      <div className="feed-detail">
        <div className="bg" onClick={__closeDetail}></div>
        <div className="wrapper">
          <div className="close" onClick={__closeDetail}>
            <img src="/assets/feed/close.svg" alt="닫기" />
          </div>
          {/* {detailData.feed.image && <div className="main-image" style={{ backgroundImage: `url(${detailData.feed.image})`></div>} */}
          {image && (
            <div
              className="main-image"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          )}
          <div className="contents">
            <div className="feed-content">
              <div className="top">
                {userImage && (
                  <div
                    className="profile-image"
                    style={{ backgroundImage: `url(${userImage})` }}
                  ></div>
                )}
                <div className="feed-desc">
                  <div className="nickname txt-bold">
                    {detailData.user.nickname}
                  </div>
                  <div className="timestamp">{makeFeedTime()}</div>
                </div>
              </div>

              <div className="body">{detailData.feed.content}</div>
              <div className="bottom">
                <div className="like">
                  <div className="asset">
                    <img src="assets/feed/like-dac.svg" alt="좋아요" />
                  </div>
                  <div className="title txt-bold">
                    {/* {detailData.feed.feedlike[0]} */}25k
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
              <div className="comment-form comment">
                <div className="top">
                  <div className="left">
                    <div className="profile-image"></div>
                    <div className="feed-desc">
                      <div className="nickname">yongstar</div>
                      <div className="timestamp">8:15pm, yesterday</div>
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
                <div className="body">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit sapiente corrupti veritatis tempora repudiandae
                  dolor delectus animi nisi, saepe, commodi nemo totam sequi.
                  Nobis consequatur accusamus suscipit porro iure dolor.
                </div>
              </div>

              <div className="comment-form reply">
                <div className="top">
                  <div className="left">
                    <div className="profile-image"></div>
                    <div className="feed-desc">
                      <div className="nickname">yongstar</div>
                      <div className="timestamp">8:15pm, yesterday</div>
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
                <div className="body">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit sapiente corrupti veritatis tempora repudiandae
                  dolor delectus animi nisi, saepe, commodi nemo totam sequi.
                  Nobis consequatur accusamus suscipit porro iure dolor.
                </div>
              </div>

              <div className="comment-form comment">
                <div className="top">
                  <div className="left">
                    <div className="profile-image"></div>
                    <div className="feed-desc">
                      <div className="nickname">yongstar</div>
                      <div className="timestamp">8:15pm, yesterday</div>
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
                <div className="body">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit sapiente corrupti veritatis tempora repudiandae
                  dolor delectus animi nisi, saepe, commodi nemo totam sequi.
                  Nobis consequatur accusamus suscipit porro iure dolor.
                </div>
              </div>

              <div className="comment-form comment">
                <div className="top">
                  <div className="left">
                    {userImage && (
                      <div
                        className="profile-image"
                        style={{ backgroundImage: `url(${userImage})` }}
                      ></div>
                    )}
                    <div className="feed-desc">
                      <div className="nickname txt-bold">yongstar</div>
                      <div className="timestamp">8:15pm, yesterday</div>
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
                <div className="body">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit sapiente corrupti veritatis tempora repudiandae
                  dolor delectus animi nisi, saepe, commodi nemo totam sequi.
                  Nobis consequatur accusamus suscipit porro iure dolor.
                </div>
              </div>
            </div>
            <div className="feed-write-comment">
              {userImage && (
                <div
                  className="profile-image"
                  style={{ backgroundImage: `url(${userImage})` }}
                ></div>
              )}
              <div className="write-comment">
                <input type="text" placeholder="댓글을 입력해 주세요" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default detailfeed;
