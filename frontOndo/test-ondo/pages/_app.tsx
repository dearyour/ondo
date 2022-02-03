import '../styles/globals.css'
import type { AppProps } from 'next/app'
import wrapper from '../store';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
