import { Box, Link, Text } from "@chakra-ui/react";
function Footer() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Text fontSize="sm" color="gray.500" mb="10px" mt="16">
        created by{" "}
        <Link
          fontWeight="semibold"
          href="https://github.com/lil-bee"
          target="_blank"
        >
          lilbee
        </Link>{" "}
        - devChallenges.io
      </Text>
    </Box>
  );
}

export default Footer;
