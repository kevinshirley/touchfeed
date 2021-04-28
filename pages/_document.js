import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class Root extends Document {
  render() {
    return (
      <html lang={this.props.__NEXT_DATA__.query.language}>
        <Head />
        <body className='body'>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default Root;
