import "../styles/globals.css";
import type { AppProps } from "next/app";
import wrapper from "../store";
import "antd/dist/antd.css";
import "../styles/feedcss/core.scss";
import "../styles/maindetailcss/index.scss";
import "../styles/mainfeedcss/index.scss";
// import "./maindetailcss/style.module.scss";
// import "../styles/feedcss/index.module.scss";
// import style from "./style.module.css";
import AppLayout from "../components/layout/AppLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default wrapper.withRedux(MyApp);
