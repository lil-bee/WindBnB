import { Box, Badge, Image, HStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

type CardProps = {
  photo?: string;
  superHost?: boolean;
  type?: string;
  beds?: number | null;
  rating?: number;
  title?: string;
};

function Card({
  photo,
  superHost = false,
  type,
  beds,
  rating,
  title,
}: CardProps) {
  return (
    <Box
      maxW={{ base: "350px", md: "395px" }}
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        w={{ base: "350px", md: "395px" }}
        h={{ base: "238px", md: "265px" }}
        objectFit="cover"
        borderRadius="24px"
        src={photo}
      />

      <Box py="12px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            {superHost && (
              <Badge
                borderRadius="full"
                py="3px"
                px="6px"
                variant="outline"
                mr="10px"
              >
                Super Host
              </Badge>
            )}
            <Box
              color="gray.700"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="sm"
            >
              {type} {beds && " . " + beds + " beds"}
            </Box>
          </Box>
          <HStack>
            <StarIcon color="red.500" />
            <Box color="gray.900">{rating}</Box>
          </HStack>
        </Box>

        <Box
          mt="6px"
          fontWeight="semibold"
          as="h4"
          color="gray.900"
          lineHeight="tight"
          noOfLines={1}
        >
          {title}
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
