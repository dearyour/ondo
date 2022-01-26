import React, {ReactNode} from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import NavBar from './Navbar';

interface LayoutProps {
    children?: ReactNode,
    title?: string,
}
const { Header, Content, Footer } = Layout;

const AppLayout: React.FC<LayoutProps> = ({children, title = ''}:LayoutProps) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Layout>
          <Header>
            <NavBar></NavBar>
          </Header>
        </Layout>
        <Content>
          { children }
        </Content>
        <Footer>

        </Footer>
    </div>
)

export default AppLayout;