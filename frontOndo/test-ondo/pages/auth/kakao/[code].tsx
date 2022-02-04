import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useUser from "../../../store/hooks/userHooks"
import { Spin, Space } from 'antd';
// import 'antd/dist/antd.css';
import styles from '../../../css/index.module.css'

const Auth2 = () => {
  const {kakaoLogin} = useUser()
  useEffect(() => {
    kakaoLogin();
  }, [])
  return (
    <div>
      <div className={styles.container}>
          <Space>
            <Spin size='large' />
          </Space>
        </div>
    </div>
  )
};

export default Auth2;