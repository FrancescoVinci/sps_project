"use client"

import { SearchIcon, StarIcon } from "@chakra-ui/icons"
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Center,
    Container,
    Flex,
    IconButton,
    Image,
    Input,
    Progress,
    Stack,
    Text
} from "@chakra-ui/react"
import { GiDramaMasks } from "react-icons/gi";
import { TbChairDirector } from "react-icons/tb";
import { FaPenNib } from "react-icons/fa";
import { TbNorthStar } from "react-icons/tb";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react"

export default function Home() {

    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [error, setError] = useState({ error: false, message: "" });
    const [data, setData] = useState<any>({});

    const sendRequest = () => {

        if (title.trim() !== "") {
            setShow(false);
            setError({ message: "", error: false });
            setLoading(true);
            fetch(`/api/movie?title=${title}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setShow(false);
                        setLoading(false);
                        setError({ error: true, message: data.message });
                        setData({});
                        console.log(data.message);
                    } else {
                        setLoading(false);
                        setError({ message: "", error: false });
                        setShow(true);
                        setData(data.data);
                        console.log(data);
                    }
                });
        }

    }

    return (
        <>
            <Box bg={"gray.900"} px={4} color={"white"}>
                <Flex h={"7vh"} alignItems={"center"} justifyContent={"center"} gap={"10px"}>
                    <Box>
                        <Image height={"60px"} src={"/logo.svg"} />
                    </Box>
                    <Text fontSize={"2xl"}>Dataset</Text>
                </Flex>
            </Box>
            {
                !show ?
                    <Flex color={"white"} minH={"93vh"} bg={"gray.700"} alignItems={"center"} justifyContent={"center"} direction={"column"}>
                        <Text fontSize={"5xl"}>Welcome to the IMDB Dataset</Text>
                        <Text>Search for a movie</Text>

                        <Container py={{ md: "5" }}>
                            <Stack direction={"row"} gap={1}>
                                <Input
                                    colorScheme={"blackAlpha"}
                                    placeholder={"The Great Beauty, Cinema Paradiso..."}
                                    value={title}
                                    onChange={(e) => setTitle(e.currentTarget.value)}
                                />
                                <IconButton
                                    colorScheme={"blackAlpha"}
                                    aria-label={"Search database"}
                                    icon={<SearchIcon />}
                                    onClick={() => sendRequest()}
                                />

                            </Stack>

                            {
                                loading ?
                                    <Stack spacing={5} py={{ md: "5" }}>
                                        <Progress size="xs" colorScheme="yellow" isIndeterminate bg={"gray.700"} borderRadius={"xl"} />
                                    </Stack>
                                    : <></>
                            }

                            {
                                error.error ?
                                    <Stack spacing={5} py={{ md: "5" }}>
                                        <Alert status="error" variant={"solid"} borderRadius={"xl"}>
                                            <AlertIcon />
                                            {error.message}
                                        </Alert>
                                    </Stack>
                                    : <></>
                            }
                        </Container>
                    </Flex>
                    :
                    <>
                        <Flex color={"white"} minH={"93vh"} bg={"gray.700"} alignItems={"center"} justifyContent={"center"} direction={"column"}>
                            <Center py={{ md: "8" }}>
                                <Button leftIcon={<BiArrowBack />} colorScheme={"blackAlpha"} variant="solid" onClick={() => setShow(false)}>
                                    Search
                                </Button>

                            </Center>
                            <Container>

                                <Stack direction={"row"} align={"baseline"} justifyContent={"space-between"}>
                                    <Stack direction={"column"} spacing={"0.1"}>
                                        <Text fontSize={"3xl"}>
                                            {data.primarytitle}
                                        </Text>
                                        <Text>
                                            {data.start_year ? data.start_year : "?"} • {data.runtime_minutes ? data.runtime_minutes : "?"} min
                                        </Text>
                                    </Stack>

                                    <Stack direction={"column"} spacing={"0.1"} alignItems={"center"}>
                                        <Flex align={"baseline"} gap={2}>
                                            <StarIcon color={"yellow.400"} boxSize={5} />
                                            <Text fontSize={"xl"}> {data.title_ratings?.average_rating ? data.title_ratings.average_rating : "?"}/10</Text>
                                        </Flex>
                                        <Text>
                                            {data.title_ratings?.num_votes}
                                        </Text>
                                    </Stack>
                                </Stack>

                                <Stack py={{ md: "9" }} direction={"column"}>
                                    <Stack direction={"row"}>
                                        <GiDramaMasks />
                                        <Text>
                                            <Text as={"b"}>Genere(s)</Text>:{" "}
                                            <Text as={"i"}>{data.genres}</Text>
                                        </Text>
                                    </Stack>

                                    <Stack direction={"row"}>
                                        <TbChairDirector />
                                        <Text>
                                            <Text as={"b"}>Director(s)</Text>:{" "}
                                            <Text as={"i"}>{data.title_crew?.directors?.map((elem: any, index: number, array: any) => {
                                                if (array.length - 1 === index) {
                                                    return elem.primary_name;
                                                } else {
                                                    elem.primary_name + ", ";
                                                }
                                            })}
                                            </Text>
                                        </Text>
                                    </Stack>

                                    <Stack direction={"row"}>
                                        <Box>
                                            <FaPenNib />
                                        </Box>
                                        <Text>
                                            <Text as={"b"}>Writer(s)</Text>:{" "}
                                            <Text as={"i"}>{data.title_crew?.writers?.map((elem: any, index: number, array: any) => {
                                                if (array.length - 1 === index) {
                                                    return elem.primary_name;
                                                } else {
                                                    return elem.primary_name + ", ";
                                                }
                                            })}
                                            </Text>
                                        </Text>
                                    </Stack>

                                    <Stack direction={"row"}>
                                        <Box>
                                            <TbNorthStar />
                                        </Box>
                                        <Text>
                                            <Text as={"b"}>Star(s)</Text>:{" "}
                                            <Text as={"i"}>{data.title_principals.map((elem: any, index: number, array: any) => {
                                                if (array.length - 1 === index) {
                                                    return elem.name_basics.primary_name;
                                                } else {
                                                    return elem.name_basics.primary_name + ", ";
                                                }
                                            })}
                                            </Text>
                                        </Text>
                                    </Stack>

                                </Stack>
                            </Container>
                        </Flex>
                    </>
            }

            <Flex color={"white"} bg={"gray.700"} alignItems={"center"} justifyContent={"center"} direction={"column"} style={{marginTop: "-60px"}}>
                <Text>Made with ❤️ by Francesco & Davide</Text>
            </Flex >
        </>
    )
}
