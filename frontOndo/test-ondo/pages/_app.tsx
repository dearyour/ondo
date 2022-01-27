import '../styles/globals.css'
import type { AppProps } from 'next/app'
import wrapper from '../store';
import Link from 'next/link'
import useHooks from '../store/hooks/userHooks';

function MyApp({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
