import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps (ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <body>
          <div id="root"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
