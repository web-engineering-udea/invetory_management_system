import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from '@/layouts';
import type { AppProps } from 'next/app';
// import { Provider } from 'jotai';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default App;