import React, { FC, useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from 'react-spring';
import { Divider } from 'antd';
import styled from "styled-components";
import { CloseOutlined, FireOutlined, FireFilled, CommentOutlined } from '@ant-design/icons';
import LoggedInForm from "./layout/LoggedInForm";
import 'antd/dist/antd.css';

interface Props {
  showModal: Boolean;
  setShowModal: Function;
}

// dummy data
const challengeTitle = '한강에서 1만보 걷기';
const feedContent = '힘들었지만 성공!! 내일도 화이팅 #한강 #걷기 #산책';
const likes = 77;
const comments = ['우와 고생하셨어요~'];

const FeedModal: FC<Props> = ({ showModal, setShowModal }) => {
  const modalRef = useRef()

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)` 
  })

  const closeModal = (e: Event) => {
    if(modalRef.current === e.target) {
      setShowModal(false);
    }
  }

  const keyPress = useCallback(e => {
    if(e.key === 'Escape' && showModal) {
      setShowModal(false)
    }
  }, [setShowModal, showModal])

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src='https://picsum.photos/2500' alt="feed-image" />
              <ModalContent>
                <ModalTitle>{challengeTitle}</ModalTitle>
                <LoggedInForm />
                <p>{feedContent}</p>
                <Divider orientation="right">
                    <FireOutlined style={{color: 'red'}} /> {likes} &nbsp;
                  <CommentOutlined /> {comments.length}
                </Divider>
                {/* <button>Join</button> */}
              </ModalContent>
              <CloseModalButton aria-label="Close modal" onClick={() => setShowModal((prev:Boolean) => !prev)} />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null} 
    </>
  )
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`

const ModalTitle = styled.h1`
  font-size: x-large;
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 0;
  color: palevioletred;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  line-height: 1.8;
  color: #141414;
  margin-left: 1rem;

  p {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  /* button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  } */
`

const CloseModalButton = styled(CloseOutlined)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`

export default FeedModal;