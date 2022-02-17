import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AppLayout from "../components/layout/AppLayout";
import Mainfeed from "../components/Feed/mainfeed";
import Detailfeed from "../components/Feed/detailfeed";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/module";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { layoutAction } from "store/slice/layout";
import ScrollToTop from "components/ScrollToTop";
const Home: NextPage = () => {
  const isDetailOpen = useSelector(
    (state: RootState) => state.layout.isDetailOpen
  );
  const dispatch = useDispatch();

  // const feedssssId = 2;
  // const __getLikeList = useCallback(() => {
  //   const token = localStorage.getItem("Token");
  //   return axios({
  //     method: "get",
  //     url: process.env.BACK_EC2+"/feed/like/" + feedssssId,
  //     // url: GetFeedurl,
  //     headers: { Authorization: "Bearer " + token },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       dispatch(layoutAction.likeList(res.data));
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // }, []);

  // useEffect(() => {
  //   const likelistRef = __getLikeList();
  // }, [__getLikeList]);
  return (
    <AppLayout title="메인 | 온도">
      <Mainfeed />
      {isDetailOpen && <Detailfeed />}
      <ScrollToTop />
    </AppLayout>
  );
};

export default Home;
