import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import useHooks from '../store/hooks/userHooks';
import AppLayout from '../components/layout/AppLayout'

const Home: NextPage = () => {
  //  data 토큰
   const {plus, count, data} = useHooks();
   if (data !== null) {
     return    <AppLayout title="index page">
       <Link href="/Signin"><a> 로그인</a></Link>;
      
     </AppLayout>
     
   }
  return (
    <AppLayout title="index page">
      
    </AppLayout>
  )
}

export default Home
