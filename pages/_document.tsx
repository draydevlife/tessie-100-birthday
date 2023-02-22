import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="See pictures compiled for Tessie Ray's 100th Birthday Celebration!"
          />
          <meta property="og:site_name" content="tessieray.com" />
          <meta
            property="og:description"
            content="See pictures compiled for Tessie Ray's 100th Birthday Celebration!"
          />
          <meta property="og:title" content="Tessie Ray's 100th Birthday Celebration" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Tessie Ray's 100th Birthday Celebration" />
          <meta
            name="twitter:description"
            content="See pictures compiled for Tessie Ray's 100th Birthday Celebration!"
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
