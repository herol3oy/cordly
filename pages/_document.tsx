import theme from '../theme'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&family=Shrikhand&display=swap"
                    rel="stylesheet"
                />
                <body>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
