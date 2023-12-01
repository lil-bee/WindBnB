import stays from '../stays.json'
import { Box, Badge, Image, SimpleGrid, HStack, Heading } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

function App() {
  console.log(stays)
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Heading>Stays in Finland</Heading>

      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <SimpleGrid p={{ sm: "12px", md: "50px", lg: "100px" }} spacing={8} columns={{ sm: 1, md: 2, lg: 3 }}>

          {stays && stays.map((x, i) => (
            <Box key={i} maxW='sm' borderRadius='lg' overflow='hidden'>
              <Image w={{ sm: "350px", md: "395px" }} h={{ sm: "238px", md: "265px" }} objectFit="cover" borderRadius="24px" src={x.photo} />

              <Box py="12px">
                <Box display='flex' justifyContent="space-between" alignItems='center'>
                  <Box display='flex'>
                    {x.superHost && (
                      <Badge borderRadius='full' px='2' mr="10px">
                        Super Host
                      </Badge>
                    )}
                    <Box
                      color='gray.500'
                      fontWeight='semibold'
                      letterSpacing='wide'
                      fontSize='sm'
                    >
                      {x.type} {x.beds &&
                        " . " + x.beds + " beds"
                      }
                    </Box>
                  </Box>
                  <HStack>
                    <StarIcon color="red.500" />
                    <div>
                      {x.rating}
                    </div>
                  </HStack>
                </Box>

                <Box
                  mt="6px"
                  fontWeight='semibold'
                  as='h4'
                  lineHeight='tight'
                  noOfLines={1}
                >
                  {x.title}
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

      </Box>
    </>
  )
}

export default App
