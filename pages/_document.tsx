// pages/_document.js

import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../theme'

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head />
                <link href="https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Playfair+Display&family=Shrikhand&display=swap" rel="stylesheet" />
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
