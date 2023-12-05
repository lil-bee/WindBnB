import stays from '../stays.json'
import { Box, Link, Badge, Text, Image, SimpleGrid, HStack, Heading, Container } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import Header from './components/header'
import { useState } from 'react'

type FormState = {
  location?: string;
  guestAdult?: number;
  guestChild?: number;
};

type Stay = {
  city: string;
  country: string;
  superHost: boolean;
  title: string;
  rating: number;
  maxGuests: number;
  type: string;
  beds: number | null;
  photo: string;
};

function App() {
  console.log(stays)
  const [form, setForm] = useState({
    location: "",
    adults: 0,
    children: 0
  })
  const [filteredStays, setFilteredStays] = useState<Stay[]>(stays);
  const handleFormChange = (newFormState: FormState) => {
    setForm({
      ...form,
      location: newFormState.location || '',
      adults: newFormState.guestAdult !== undefined ? Number(newFormState.guestAdult) : 0,
      children: newFormState.guestChild !== undefined ? Number(newFormState.guestChild) : 0,
    });
    // Panggil fungsi untuk memfilter stays berdasarkan form baru
    filterStays(newFormState);
  };
  const filterStays = (filter: FormState) => {
    // Filter stays berdasarkan nilai form
    const filtered = stays.filter((stay) => {
      const locationMatch = stay.city.toLowerCase().includes(filter.location?.toLowerCase() || '');
      const totalGuestsMatch = stay.maxGuests >= (filter.guestAdult || 0) + (filter.guestChild || 0);

      return locationMatch && totalGuestsMatch
    });

    // Update state filteredStays dengan hasil filter
    setFilteredStays(filtered);
  };
  console.log(filteredStays)

  return (
    <>
      <Container px={{ base: "12px", md: "50px", lg: "100px" }} maxW="container.xl">
        <Header onChange={handleFormChange} />
        <Box mb="32px" display="flex" alignItems="center" justifyContent="space-between">
          <Heading fontSize="24px">Stays in Finland</Heading>
          <Text>{filteredStays.length} stays</Text>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <SimpleGrid spacing={8} columns={{ sm: 1, md: 2, lg: 3 }}>

            {filteredStays ? filteredStays.map((x, i) => (
              <Box key={i} maxW={{ base: "350px", md: "395px" }} borderRadius='lg' overflow='hidden'>
                <Image w={{ base: "350px", md: "395px" }} h={{ base: "238px", md: "265px" }} objectFit="cover" borderRadius="24px" src={x.photo} />

                <Box py="12px">
                  <Box display='flex' justifyContent="space-between" alignItems='center'>
                    <Box display='flex'>
                      {x.superHost && (
                        <Badge borderRadius="full" py="3px" px="6px" variant='outline' mr="10px">
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
                      <Box>
                        {x.rating}
                      </Box>
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
            )) : (
              <Box>
                <Heading>Oops, Data Not Found</Heading>
              </Box>
            )}
          </SimpleGrid>

        </Box >
        <Box display="flex" justifyContent="center" alignItems="center" position="relative">
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
      </Container >
    </>
  )
}

export default App
