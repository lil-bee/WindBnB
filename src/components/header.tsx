import {
    Flex, HStack, Image, Input, Box, InputGroup, InputRightAddon, InputLeftAddon, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Button, Text, VStack, Heading
} from "@chakra-ui/react"
import logo from "../../logo.png"
import stays from "../../stays.json"
import { useState } from "react"
import { SearchIcon, TriangleDownIcon } from "@chakra-ui/icons";

type FormState = {
    location?: string;
    guestAdult?: number;
    guestChild?: number;
};

function Header({ onChange }: { onChange: (newFormState: FormState) => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [form, setForm] = useState<FormState>({
        location: "",
        guestAdult: 0,
        guestChild: 0
    })
    let city = [...new Set(stays.map(x => x.city.toLowerCase()))];

    let totalGuest = (form.guestAdult || 0) + (form.guestChild || 0)
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim().toLowerCase();
        setForm({
            ...form,
            [e.target.name]: value
        })
    }
    function handleIncrement(field: keyof typeof form) {
        const value = Number(form[field])
        if (totalGuest < 10 && value < 10) {
            setForm({
                ...form,
                [field]: value + 1
            })
        }
    }
    function handleDecrement(field: keyof typeof form) {
        const value = Number(form[field])
        if (totalGuest != 0 && value != 0) {
            setForm({
                ...form,
                [field]: value - 1
            })
        }
    }


    const handleSubmit = () => {
        onChange(form);
        onClose();
    };

    return (
        <>
            <Flex
                align={{ base: 'start', md: 'center' }}
                gap="30px"
                justify="space-between"
                mb="67px"
                mt="32px"
                direction={{ base: 'column', md: 'row' }}
            >
                <Box>
                    <Image src={logo} />
                </Box>
                <Box alignSelf="center">
                    <InputGroup borderRadius="16px" onClick={onOpen} boxShadow="0px 1px 6px 0px rgba(0, 0, 0, 0.10)">
                        <InputLeftAddon borderRadius="16px" border="none 1 none none" bgColor="white">
                            <Input focusBorderColor="white" border="none" placeholder="Add Location" value={form.location} />
                        </InputLeftAddon>
                        <Input placeholder="Add Guests" alignItems="center" maxWidth={totalGuest ? "75px" : ""} borderY="none" value={totalGuest ? totalGuest : ""} />
                        <InputRightAddon borderRadius="16px" border="none" backgroundColor="white">
                            <SearchIcon color="red.500" />
                        </InputRightAddon>
                    </InputGroup>
                </Box>
            </Flex>
            <Drawer size="xl" placement="top" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
                    <DrawerBody justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                        <Box>

                            <InputGroup maxW="780px" borderRadius="16px" boxShadow="0px 1px 6px 0px rgba(0, 0, 0, 0.10)">
                                <InputLeftAddon borderRadius="16px" border="none 1 none none" bgColor="white">

                                    <Input placeholder="Add Location" name="location" onChange={handleChange} value={form.location} focusBorderColor="white" border="none" />
                                </InputLeftAddon>
                                <Input placeholder="Add guests" value={(form.guestAdult || 0) + (form.guestChild || 0)} type="number" borderTop="none" borderBottom="none" />
                                <InputRightAddon borderRadius="16px" border="none" backgroundColor="white">
                                    <Button borderRadius="16px" leftIcon={<SearchIcon />} bgColor="red.500" color="Background" onClick={handleSubmit}>Search</Button>
                                </InputRightAddon>
                            </InputGroup>
                            <Box display="flex" flexDirection={{ base: "column", md: "row" }} gap={{ base: "30px", md: "110px" }}  >
                                <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start">

                                    {city.filter(c => c.includes(form.location || ''))
                                        .map((x, i) => (
                                            <Box display="flex" alignItems="center" my="18px" gap="5px">

                                                <TriangleDownIcon color="gray.500" /> <Text key={i}>{x.charAt(0).toUpperCase() + x.slice(1)}, Finland</Text>
                                            </Box>
                                        ))}
                                </Box>
                                <Box  >
                                    <VStack my="28px" align="start">
                                        <Heading fontSize="14px">Adults</Heading>
                                        <Text fontSize="14px" color="gray.500">Ages 13 or above</Text>
                                        <HStack>
                                            <Button size="xs" onClick={() => handleDecrement('guestAdult')}>-</Button>
                                            <Input width="29px" size="xs" border="none" value={form.guestAdult} />
                                            <Button size="xs" onClick={() => handleIncrement('guestAdult')}>+</Button>
                                        </HStack>
                                    </VStack>
                                    <VStack my="28px" align="start">
                                        <Heading fontSize="14px">Children</Heading>
                                        <Text fontSize="14px" color="gray.500">Ages 2 - 12</Text>
                                        <HStack>
                                            <Button size="xs" onClick={() => handleDecrement('guestChild')}>-</Button>
                                            <Input width="29px" size="xs" border="none" value={form.guestChild} />
                                            <Button size="xs" onClick={() => handleIncrement('guestChild')}>+</Button>
                                        </HStack>
                                    </VStack>
                                </Box>
                            </Box>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>

    )
}

export default Header