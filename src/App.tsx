import stays from "../stays.json";
import { Box, Text, SimpleGrid, Heading, Container } from "@chakra-ui/react";
import Header from "./components/header";
import Card from "./components/card";
import Footer from "./components/footer";
import { useState } from "react";

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
  const [form, setForm] = useState({
    location: "",
    adults: 0,
    children: 0,
  });
  const [filteredStays, setFilteredStays] = useState<Stay[]>(stays);

  const handleFormChange = (newFormState: FormState) => {
    setForm({
      ...form,
      location: newFormState.location || "",
      adults:
        newFormState.guestAdult !== undefined
          ? Number(newFormState.guestAdult)
          : 0,
      children:
        newFormState.guestChild !== undefined
          ? Number(newFormState.guestChild)
          : 0,
    });
    // Panggil fungsi untuk memfilter stays berdasarkan form baru
    filterStays(newFormState);
  };
  const filterStays = (filter: FormState) => {
    // Filter stays berdasarkan nilai form
    const filtered = stays.filter((stay) => {
      const locationMatch = stay.city
        .toLowerCase()
        .includes(filter.location?.toLowerCase() || "");
      const totalGuestsMatch =
        stay.maxGuests >= (filter.guestAdult || 0) + (filter.guestChild || 0);

      return locationMatch && totalGuestsMatch;
    });

    // Update state filteredStays dengan hasil filter
    setFilteredStays(filtered);
  };

  return (
    <>
      <Container
        px={{ base: "12px", md: "50px", lg: "100px" }}
        maxW="container.xl"
      >
        <Header onChange={handleFormChange} />
        <Box
          mb="32px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading fontSize="24px">Stays in Finland</Heading>
          <Text>{filteredStays.length} stays</Text>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <SimpleGrid spacing={8} columns={{ sm: 1, md: 2, lg: 3 }}>
            {filteredStays ? (
              filteredStays.map((x, i) => (
                <Card
                  key={i}
                  rating={x.rating}
                  beds={x.beds}
                  title={x.title}
                  photo={x.photo}
                  superHost={x.superHost}
                  type={x.type}
                />
              ))
            ) : (
              <Box>
                <Heading>Oops, Data Not Found</Heading>
              </Box>
            )}
          </SimpleGrid>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

export default App;
