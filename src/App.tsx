import stays from '../stays.json'
import { Box, Badge, Text, Image, SimpleGrid, HStack, Heading, Container } from '@chakra-ui/react'
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
  console.log(form)

  return (
    <>
      <Container px={{ sm: "12px", md: "50px", lg: "100px" }} maxW="container.xl" p={0}>

        <Header onChange={handleFormChange} />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Heading>Stays in Finland</Heading>
          <Text>{stays.length} + stays</Text>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <SimpleGrid spacing={8} columns={{ sm: 1, md: 2, lg: 3 }}>

            {filteredStays && filteredStays.map((x, i) => (
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
            ))}
          </SimpleGrid>

        </Box>
      </Container >
    </>
  )
}

export default App
