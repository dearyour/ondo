import React, {ReactNode} from 'react';
import Head from 'next/head';

interface LayoutProps {
    children?: ReactNode,
    title?: string,
}

const Layout: React.FC<LayoutProps> = ({children, title = ''}:LayoutProps) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <header>
          <h1> #Header</h1>
        </header>
        { children }
        <footer>

        </footer>
    </div>
)

export default Layout;