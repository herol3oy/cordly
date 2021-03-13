import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
    textStyles: {
        logo: {
            fontFamily: '"Shrikhand", cursive',
        },
        intro: {
            fontFamily: '"Bungee Shade", cursive',
        },
        textsub: {
            fontFamily: '"Playfair Display", serif',
        },
        cordlyUrl: {
            fontFamily: '"Roboto Mono", monospace',
        },
    },
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    styles: {
        global: (props) => ({
            body: {
                color: mode('gray.700', 'whiteAlpha.900')(props),
                bg: mode('gray.50', 'gray.800')(props),
                fontSize: '1.2em',
            },
        }),
    },
})

export default theme
