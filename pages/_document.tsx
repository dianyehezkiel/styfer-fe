import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="Styfer is an app that compose one image in the style of another image"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Main />
        <NextScript />
      </Html>
    )
  }
}

export default Document
