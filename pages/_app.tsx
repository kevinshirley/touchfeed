import 'isomorphic-fetch';
import React from 'react';

import { wrapper } from 'src/store';
import Footer from 'src/components/footer';
import Page from 'src/components/common/page';

function Root({ Component, pageProps }: any) {
  return (
    <>
      <Page>
        <div className='container layout'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </Page>
    </>
  );
}

Root.getInitialProps = (async ({ Component, ctx }: any) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps
  };
});

// @ts-ignore
export default wrapper.withRedux(Root);
