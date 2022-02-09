import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useUser from "../../../store/hooks/userHooks"
import { Spin, Space } from 'antd';
// import 'antd/dist/antd.css';
import styles from '../../../css/index.module.css'
import styled from 'styled-components';

const Auth2 = () => {
  const {kakaoLogin} = useUser()
  useEffect(() => {
    kakaoLogin();
  }, [])
  return (
    <div>
      <div className={styles.container}>
          <Large>
            <Loading size='large' />
          </Large>
        </div>
    </div>
  )
};

const Large = styled.div`
  width: 100%;
  margin-top: 30%;
  display: flex;
  justify-content: center;
`

const Loading = styled(Spin)`
  
`

export default Auth2;