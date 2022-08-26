import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class Doc extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
