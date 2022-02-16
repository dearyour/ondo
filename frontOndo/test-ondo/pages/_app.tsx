import "../styles/globals.css";
import type { AppProps } from "next/app";
import wrapper from "../store";
import "antd/dist/antd.css";
import "../styles/feedcss/core.scss";
import "../styles/maindetailcss/index.scss";
import "../styles/mainfeedcss/index.scss";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import "./maindetailcss/style.module.scss";
// import "../styles/feedcss/index.module.scss";
// import style from "./style.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
