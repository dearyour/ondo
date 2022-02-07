import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AppLayout from "../components/layout/AppLayout";
import Mainfeed from "../components/Feed/mainfeed";
import Detailfeed from "./detailfeed";
import { useSelector } from "react-redux";
import { RootState } from "../store/module";

const Home: NextPage = () => {
  const isDetailOpen = useSelector(
    (state: RootState) => state.layout.isDetailOpen
  );
  return (
    <AppLayout title="index page">
      <Mainfeed />
      {isDetailOpen && <Detailfeed />}
    </AppLayout>
  );
};

export default Home;
