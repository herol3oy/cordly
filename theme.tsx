import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    styles: {
        global: (props) => ({
            body: {
                color: mode('gray.700', 'whiteAlpha.900')(props),
                bg: mode('gray.50', 'gray.900')(props),
                fontSize: '1.2em',
            },
        }),
    },
})

export default theme
