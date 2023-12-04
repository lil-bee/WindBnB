import {
    Flex, HStack, Image, Input, Box, InputGroup, InputRightAddon, InputLeftAddon, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Button, Text
} from "@chakra-ui/react"
import logo from "../../logo.png"
import stays from "../../stays.json"
import { useState } from "react"

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

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim().toLowerCase();
        setForm({
            ...form,
            [e.target.name]: value
        })
    }
    function handleIncrement(field: keyof typeof form) {
        const value = Number(form[field])
        if (value < 10) {
            setForm({
                ...form,
                [field]: value + 1
            })
        }
    }
    function handleDecrement(field: keyof typeof form) {
        const value = Number(form[field])
        if (value != 0) {
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
                align="center"
                justify="space-between"
                border="1px"
                direction={{ base: 'column', md: 'row' }}
            >
                <Box>
                    <Image src={logo} />
                </Box>
                <Box>
                    <InputGroup onClick={onOpen} boxShadow="0px 1px 6px 0px rgba(0, 0, 0, 0.10)">
                        <InputLeftAddon border="none 1 none none" bgColor="white">
                            Helsiniki, Finland
                        </InputLeftAddon>
                        <Input border="none" />
                        <InputRightAddon border="none" backgroundColor="white"></InputRightAddon>
                    </InputGroup>
                </Box>
            </Flex>
            <Drawer size="xl" placement="top" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
                    <DrawerBody border="2px" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                        <Box>

                            <InputGroup maxW="780px" boxShadow="0px 1px 6px 0px rgba(0, 0, 0, 0.10)">
                                <InputLeftAddon border="none 1 none none" bgColor="white">
                                    <Input name="location" onChange={handleChange} value={form.location} focusBorderColor="white" border="none" />
                                </InputLeftAddon>
                                <Input borderTop="none" borderBottom="none" />
                                <InputRightAddon border="none" backgroundColor="white">
                                    <Button color="bg.500" onClick={handleSubmit}>Search</Button>
                                </InputRightAddon>
                            </InputGroup>
                            <HStack display="flex" >
                                <Box>
                                    {city.filter(c => c.includes(form.location))
                                        .map((x, i) => (
                                            <Text key={i}>{x.charAt(0).toUpperCase() + x.slice(1)}, Finland</Text>
                                        ))}
                                </Box>
                                <Box>

                                    <HStack>
                                        <Button onClick={() => handleDecrement('guestAdult')}>-</Button>
                                        <Input width="50px" border="none" value={form.guestAdult} />
                                        <Button onClick={() => handleIncrement('guestAdult')}>+</Button>
                                    </HStack>
                                    <HStack>
                                        <Button onClick={() => handleDecrement('guestChild')}>-</Button>
                                        <Input width="50px" border="none" value={form.guestChild} />
                                        <Button onClick={() => handleIncrement('guestChild')}>+</Button>
                                    </HStack>
                                </Box>
                            </HStack>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>

    )
}

export default Header