import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AppLayout from "../components/layout/AppLayout";
import Mainfeed from "../components/Feed/mainfeed";
import Detailfeed from "../components/Feed/detailfeed";
import { useSelector } from "react-redux";
import { RootState } from "../store/module";
import Login from "../components/user/login";

const Home: NextPage = () => {
  return <Login />;
};

export default Home;
