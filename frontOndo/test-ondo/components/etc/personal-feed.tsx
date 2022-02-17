import React, { useState } from 'react';
import AppLayout from "../components/layout/AppLayout";
import FeedModal from '../components/FeedModal';

const PersonalFeed = () => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(prev => !prev)
  }

  return (
    <>
     {/* <AppLayout title="개인 피드 페이지 | 온도"> */}
      <button onClick={openModal}>modal test</button>
      <FeedModal showModal={showModal} setShowModal={setShowModal} />
     {/* </AppLayout> */}
    </>
  )
}

export default PersonalFeed