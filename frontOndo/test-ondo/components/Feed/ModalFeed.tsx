import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from 'react-spring';
import axios from "axios";
import Modal from "antd/lib/modal/Modal";
import Router, { useRouter } from 'next/router';
import useUser from 'store/hooks/userHooks';
import { Popconfirm } from "antd";

interface nowProps {
  show: number, // 상위에서 state로 show, control 설정. show에 feedId 넣어서 내려준다
  control: React.Dispatch<React.SetStateAction<number>>
}


const FeedForModal = (props: nowProps) => {
  const CommentRef: any = useRef(null);
  const [data, setData] = useState<any>(null);
  const [date, setDate] = useState<any>(null);
  const [comment, setComment] = useState<string>('');
  const [likeState, setLikeState] = useState<any>({ like: false, count: 0 });
  const [flag, setFlag] = useState<boolean>(false);
  const router = useRouter();
  const { users } = useUser();

  // 날짜 표현
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
    // console.log(feedDate)
    const nowDate = Date.now(); //현재 시간

    const timeGap = nowDate - startDate;
    // console.log(nowDate, startDate)

    const date = parseInt(String(timeGap / oneDay));
    const hour = feedDate.getHours();
    const minutes = feedDate.getMinutes();
    // console.log(hour + "hour");
    // console.log(minutes);

    return ` ${hour > 12 ? "오후" : "오전"} ${hour > 12 ? makeTwoDigits(hour - 12) : makeTwoDigits(hour)
      }:${makeTwoDigits(minutes)}  ${date === 0 ? ", 오늘" : date === 1 ? ", 어제" : ``
      // `${date} 일전`
      }`;
  }; // 날짜 표현

  // 애니메이션
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: props.show ? 1 : 0,
    transform: props.show ? `translateY(0%)` : `translateY(-100%)`
  })

  // 초기 데이터 설정
  useEffect(() => {
    if (props.show) {
      const token = localStorage.getItem('Token')
      axios({
        method: "get",
        url: process.env.BACK_EC2 + "/feed/info/" + String(props.show),
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          // console.log(res)
          setData(res.data)
          setLikeState({ like: !res.data.likeflag, count: res.data.feed.feedlike.length })
          setDate(getStartDate(res.data.feed.createdDate) + makeFeedTime((res.data.feed.createdDate)))
        })
    }
  }, [props.show, flag])

  // 좋아요
  const DoLike = () => {
    const token = localStorage.getItem("Token");
    axios({
      method: "get",
      url: process.env.BACK_EC2 + "/feed/like/" + props.show,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        // console.log(res)
        if (res.data === "delete") {
          setLikeState({ like: false, count: likeState.count - 1 })
        } else {
          setLikeState({ like: true, count: likeState.count + 1 })
        }
      })
  }

  // 댓글작성
  const WriteComment = () => {
    if (comment && comment.trim()) {
      const nowdata = {
        feedId: props.show,
        content: comment,
      }
      const token = localStorage.getItem("Token");
      axios({
        method: "POST",
        url: process.env.BACK_EC2 + "/comment/write",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: nowdata,
      })
        .then(res => {
          CommentRef.current.value = '';
          setComment('');
          setFlag(!flag);
        })
    }
  }
  // 피드삭제
  const deleteFeed = () => {
    const token = localStorage.getItem("Token");
    axios({
      method: "DELETE",
      url: process.env.BACK_EC2 + "/feed/delete/" + props.show,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(res => {
        props.control(0)
        router.reload();
      })
  }

  // 댓글삭제
  const deleteComment: any = (commentId: number) => {
    const token = localStorage.getItem("Token");
    axios({
      method: "DELETE",
      url:
        process.env.BACK_EC2 +
        "/comment/delete/" +
        String(commentId),
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(res => {
        setFlag(!flag)
      })
  }

  return (
    <animated.div style={animation}>
      <WrapDiv>
        <FeedModal
          width={'70%'}
          visible={props.show > 0}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={() => props.control(0)}
        >
          <Wrap>
            <Flex>
              <InnerImg>
                {data && <FeedImg src={data.feed.image}></FeedImg>}
              </InnerImg>
              <Inner>
                {data && <FeedUser>
                  <Profile src={data.user.image}></Profile>
                  <span>
                    <Username><Style className={data.user.chooseStyle}>{data.user.chooseStyle}</Style>{data.user.username}</Username>
                    <CreatedDate>{date}</CreatedDate>
                  </span>
                </FeedUser>}
                <TagWrap>
                  {data && data.tags.map((tag: any, idx: any) => {
                    return (
                      <Tag key={idx} onClick={() => { Router.push('/search/' + tag.name) }}>#{tag.name}</Tag>
                    )
                  })}
                </TagWrap>
                <Content>{data && data.feed.content}</Content>
                <ImgWrap>
                  <Like>
                    <LikeImg src="/assets/feed/white.png"></LikeImg>
                    <LikeBaseImg className={likeState.like ? "likeanimated" : 'unlikeanimated'} onClick={DoLike} src="/assets/feed/pngwing.com2.png"></LikeBaseImg>
                    <LikeBase src="/assets/feed/pngwing.com.png" onClick={DoLike}></LikeBase>

                    <span> {data ? likeState.count : 0}</span>
                  </Like>
                  <CommentCount>
                    <CommentImg src="/assets/feed/pngwing.com5.png"></CommentImg>
                    <span> {data && data.comments ? data.comments.length : 0}</span>
                  </CommentCount>
                  <Popconfirm
                    placement="bottomRight"
                    title="이 피드를 삭제하시겠습니까?"
                    onConfirm={deleteFeed}
                    okText="네"
                    cancelText="아니요"
                  >
                    {data && users.username === data.user.username ? <DeleteImg src="/assets/feed/pngwing.com6.png" /> : null}
                  </Popconfirm>
                </ImgWrap>
                <CommentLine></CommentLine>
                <CommentWrap>
                  {data && [...data.comments].reverse().map((now: any, idx: any) => {
                    return (
                      <div key={idx}>
                        <CommentFeedUser>
                          <CommentProfile src={now.image}></CommentProfile>
                          <span>
                            <CommentUsername>{now.username}</CommentUsername>
                            <CreatedDate>{getStartDate(now.comment.createdDate)}{" "}
                              {makeFeedTime(now.comment.createdDate)}</CreatedDate>
                          </span>
                        </CommentFeedUser>
                        <CommentContent>
                          {now.comment.content} {now.flag && <CommentDeleteBtn onClick={() => { deleteComment(now.comment.commentId) }}>삭제</CommentDeleteBtn>}
                        </CommentContent>
                        <CommentDivider />
                      </div>
                    )
                  })}
                </CommentWrap>
                <CommentLine></CommentLine>
                <CommentInputWrap>
                  <CommentInput
                    type="text"
                    // autoFocus={true}
                    placeholder="댓글을 입력해 주세요"
                    ref={CommentRef}
                    onKeyUp={(e) => { if (e.key === 'Enter') { WriteComment(); } }}
                    onChange={(e) => setComment(e.target.value)}
                  >


                  </CommentInput>
                </CommentInputWrap>
              </Inner>
            </Flex>
          </Wrap>
        </FeedModal>
      </WrapDiv>
    </animated.div>
  )
}

const Style = styled.span`
  margin-right: 10px;
`

const CommentInput = styled.input`
  outline: none;
  border: none;
  padding: 5px;
  width: 100%;
  /* height: 100%; */
`
const CommentDeleteBtn = styled.span`
  font-size:0.7rem;
  color: blue;
  opacity: 80%;
  cursor: pointer;
  white-space:nowrap;
`
const CommentInputWrap = styled.div`
  height: 10%;
  width: 100%;
  /* overflow: scroll; */
`

const CommentContent = styled.div`
  padding: 10px 4px;
  display: flex;
  justify-content: space-between;
`

const CommentDivider = styled.hr`
  background-color: pink;
  opacity: 40%;
`

const CommentWrap = styled.div`
  overflow-y: scroll;
  padding-left: 20px;
  padding-right: 10px;
  height: 23vw;
  &::-webkit-scrollbar-track {
background-color: palevioletred;
}
`
const CommentLine = styled.hr`
  width: 100%;

`

const Like = styled.div`
  padding: 2px;
  margin-right: 5px;
  position: relative;
`

const LikeImg = styled.img`
  /* visibility: hidden; */
  width: 1.5rem;
  cursor: pointer;
`

const LikeBase = styled.img`
  width:1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 0;
  left: 0;
`
const LikeBaseImg = styled.img`
  transition: all 1s ease-out;
  height: 1.5rem;
  width:1.5rem;
  position: absolute;
  top: 0;
  left: 0;
  /* opacity: 0; */
  
`

const CommentCount = styled.div`
  padding: 2px;
`

const CommentImg = styled.img`
  width: 1.5rem;
`

const ImgWrap = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 5px;
  padding-right: 20px;
`
const DeleteImg = styled.img`
  padding: 4px 2px 2px 2px;
  /* padding-top:3px; */
  width: 1.5rem;
  cursor: pointer;
`

const Content = styled.div`
  margin-top: 10px;
  margin-left: 20px;
`
const Tag = styled.span`
  /* padding:10px; */
  margin-right: 10px;
  color: palevioletred;
  cursor: pointer;
  &:hover {
    color: #709edb;
  }
`
const TagWrap = styled.div`
  padding-left: 20px;
  padding-right: 5px;
`

const CreatedDate = styled.div`
  font-size: 13px;
  opacity: 80%;
  margin-left: 10px;
  /* margin-bottom: 1px; */
`

const Username = styled.span`
  margin-left: 10px;
  font-weight: bold;
`
const CommentUsername = styled.span`
  margin-left: 10px;
`

const CommentProfile = styled.img`
  width: 7%;
  border-radius: 100%;
  margin-top:5px;
`

const Profile = styled.img`
  width: 9%;
  border-radius: 100%;
  margin-top:5px;
`

const FeedUser = styled.div`
  display: flex;
  padding-left: 20px;
`

const CommentFeedUser = styled.div`
margin-top: 5px;
  display: flex;
`

const FeedImg = styled.img`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`

const Wrap = styled.div`
  /* padding: 5px; */
`

const InnerImg = styled.div`
  width: 60%;
  /* height: 100%; */
  /* background-size: cover; */
  /* padding: 5px 0 0 5px; */
  height: auto;
  margin: 0;
  overflow: hidden;
`
const Inner = styled.div`
  /* margin-left: 20px; */
  width: 50%;
  padding-top: 10px;
  border-left: 1px solid pink;
  overflow: hidden;
`

const Flex = styled.div`
  display: flex;
`

const FeedModal = styled(Modal)`
  
  /* width: 90%; */
  /* border: 1px solid palevioletred; */
  padding-bottom: 0;
  /* padding: 10px; */
  .ant-modal-content {
    border-radius: 20px;
    margin-bottom: 20px;
    /* height: 50%; */
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-footer{
    display:none;
  }
  `


const WrapDiv = styled.div`
  border-radius: 20px;
  overflow: hidden;
`

export default FeedForModal;