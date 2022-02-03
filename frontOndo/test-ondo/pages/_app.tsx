import '../styles/globals.css'
import type { AppProps } from 'next/app'
import wrapper from '../store';
import 'antd/dist/antd.css';
import "../styles/feedcss/index.scss";
// import "../styles/feedcss/index.module.scss";
// import style from "./style.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
