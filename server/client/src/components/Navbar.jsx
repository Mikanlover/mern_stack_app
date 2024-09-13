import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PiPlusSquareFill } from "react-icons/pi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { color } from "framer-motion";
import { useProductStore } from "../store/product";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Text
                    fontSize={{ base: "22", sm: "28"}}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <PiPlusSquareFill fontSize={25}/>
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <MdDarkMode fontSize={20}/> : <MdLightMode fontSize={20}/>}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;