import { extendTheme, withDefaultProps } from "@chakra-ui/react";

const stylesInput = {
  borderRadius: "116px",
  bgColor: "red",
  boxShadow: "0px 1px 6px 0px rgba(0, 0, 0, 0.10)",
  focusBorderColor: "white",
};

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
