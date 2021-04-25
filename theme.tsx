import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  textStyles: {
    logo: {
      fontFamily: '"Baloo Da 2", cursive',
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
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        color: mode("gray.700", "whiteAlpha.900")(props),
        bg: mode("green.50", "green.800")(props),
        fontSize: "1.2em",
      },
    }),
  },
});

export default theme;
