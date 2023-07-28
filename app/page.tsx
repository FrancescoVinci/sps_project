"use client"

import { SearchIcon } from "@chakra-ui/icons"
import {
    Box,
    Center,
    Container,
    Flex,
    IconButton,
    Image,
    Input,
    Stack,
    Text
} from "@chakra-ui/react"

interface Props {
    children: React.ReactNode
}

export default function Nav() {

    return (
        <>
            <Box bg="gray.900" px={4} color="white">
                <Flex h={"7vh"} alignItems={"center"} justifyContent={"center"} gap={"10px"}>
                    <Box>
                        <Image height={"60px"} src="/logo.svg" />
                    </Box>
                    <Text fontSize={"2xl"}>Dataset</Text>
                </Flex>
            </Box>
            <Flex color={"white"} minH={"93vh"} bg={"gray.700"} alignItems={"center"} justifyContent={"center"} direction={"column"}>
                <Text fontSize="5xl">Welcome to the IMDB Dataset</Text>
                <Text>Search for a movie</Text>

                <Container py={{ md: "5" }}>
                    <Stack direction={"row"} gap={1}>
                        <Input colorScheme={"blackAlpha"} placeholder="The Great Beauty, Cinema Paradiso..." />
                        <IconButton colorScheme={"blackAlpha"} aria-label="Search database" icon={<SearchIcon />} />
                    </Stack>
                </Container>
            </Flex>
        </>
    )
}
