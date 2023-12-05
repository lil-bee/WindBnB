import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    red: {
      500: "#EB5757",
    },
    gray: {
      900: "#333",
      800: "#4F4F4F",
      700: "#828282",
    },
  },
  fonts: {
    heading: '"Plus Jakarta Sans", sans-serif',
    body: '"Plus Jakarta Sans", sans-serif',
  },
});

export default theme;
