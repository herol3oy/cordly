import theme from "../theme";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200;300;700&family=Caveat:wght@700&family=Baloo+Da+2:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
