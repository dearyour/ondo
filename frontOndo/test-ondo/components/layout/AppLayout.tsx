import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import NavBar from './Navbar';
import styled from 'styled-components';
import Router from 'next/router';



interface LayoutProps {
  children?: ReactNode,
  title?: string,
}

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`

const { Header, Content, Footer } = Layout;

const AppLayout: React.FC<LayoutProps> = ({ children, title = '' }: LayoutProps) => {

  useEffect(() => {
    setTimeout(() => {
      if (!localStorage.getItem('Token')) {
        Router.push('/');
      }
    }, 2000)
  }, [])
  return (

    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* <Layout> */}
      {/* <Header> */}
      <NavBar></NavBar>
      {/* </Header> */}
      {/* </Layout> */}
      {/* <Content> */}
      <Container>
        {children}
      </Container>
      {/* </Content> */}
      {/* <Footer> */}

      {/* </Footer> */}
    </div>
  )
}


export default AppLayout;