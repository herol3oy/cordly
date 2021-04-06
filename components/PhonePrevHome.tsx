import { useEffect, useState } from 'react'
import NextLink from "next/link";
import {
    Heading,
    Flex,
    Text,
    Button,
    Avatar,
    Box,
    Badge,
    TabList,
    Tabs,
    TabPanels,
    TabPanel,
    Tab,
    Stack,
    Link,
    Wrap,
    WrapItem,
    Tag,
    TagLabel,
} from "@chakra-ui/react";

const urls = [
    { Youtube: "https://youtube.com" },
    { Website: "https://google.com" },
    { Spotify: "https://spotify.com" },
    { dizzer: "https://dizzer.com" },
    { Instagram: "https://instagram.com" },
];

export default function PhonePrevHome() {
    const [tabIndex, setTabIndex] = useState(1)

    useEffect(() => {
        setTimeout(() => {
            setTabIndex(0)
        }, 3000);
    }, [setTimeout]);


    return (
        <>
            <Box
                borderColor={"black"}
                width={["90vw", 'sm']}
                borderWidth={[12, 15]}
                borderRadius={65}
                maxH={["600px", "580px", "580px", "700px "]}
                minH={"700px"}
                overflow="hidden"
                textAlign="center"
                // my={10}
                pos={"relative"}
                transform={'scale(0.8)'}
            >
                <Flex
                    background={"gray"}
                    backgroundImage={`url("https://is.gd/y55ADb")`}
                    backgroundRepeat={"no-repeat"}
                    backgroundSize={"cover"}
                    backgroundPosition={'center'}
                    height={"150px"}
                    w={"sm"}
                    pos="absolute"
                    _after={{
                        display: "inline-block",
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(to top, #fff 0%, rgba(255, 255, 255, 0) 100%)`,
                    }}
                />

                <Avatar
                    zIndex="3"
                    mt={28}
                    size="lg"
                    name="profile picture"
                    src={"https://is.gd/ELrhDq"}
                />
                <Heading as={"h3"} size={"md"} mt={2}>
                    Morrie
            </Heading>

                <Flex mt={2} mb={5} justifyContent="center" alignItems="center">
                    <Text fontWeight={"light"} textAlign="center">
                        @morriemusician
              </Text>

                    <Badge variant="solid" colorScheme="green" ml={2}>
                        PRO
              </Badge>
                </Flex>

                <Tabs
                    zIndex="2"
                    pos="absolute"
                    w="100%"
                    isFitted
                    align="center"
                    variant="line"
                    colorScheme="green"
                    index={tabIndex}
                >
                    <TabList>
                        <Tab>
                            <Box>🔗</Box>
                            <Text ml={3}>Links</Text>
                        </Tab>

                        <Tab>
                            <Box>✍️</Box>
                            <Text ml={3}>Bio</Text>
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Stack>
                                {urls?.map((i, idx) => (
                                    <Button size="lg" key={idx} w={"100%"}>
                                        <NextLink
                                            href={Object.values(i)[0].toString()}
                                            passHref
                                        >
                                            <Link isExternal>{Object.keys(i)[0].toString()}</Link>
                                        </NextLink>
                                    </Button>
                                ))}
                            </Stack>
                        </TabPanel>

                        <TabPanel>
                            <Stack>
                                <Text
                                    color={"purple.400"}
                                    fontWeight={600}
                                    fontSize={"sm"}
                                    // bg={useColorModeValue('purple.50', 'purple.900')}
                                    bg={"purple.900"}
                                    p={2}
                                    alignSelf={"center"}
                                    rounded={"md"}
                                >
                                    📍 Barcelona
                    </Text>

                                <Wrap justify={"center"}>
                                    <WrapItem>
                                        <Text
                                            color={"gray.400"}
                                            fontWeight={600}
                                            fontSize={"sm"}
                                            bg={"gray.900"}
                                            p={2}
                                            alignSelf={"center"}
                                            rounded={"md"}
                                        >
                                            🎓 Self-studied
                        </Text>
                                    </WrapItem>

                                    <WrapItem>
                                        <Text
                                            color={"gray.400"}
                                            fontWeight={600}
                                            fontSize={"sm"}
                                            bg={"gray.900"}
                                            p={2}
                                            alignSelf={"center"}
                                            rounded={"md"}
                                        >
                                            🟢 Collaboration
                        </Text>
                                    </WrapItem>

                                    <WrapItem>
                                        <Text
                                            color={"gray.400"}
                                            fontWeight={600}
                                            fontSize={"sm"}
                                            bg={"gray.900"}
                                            p={2}
                                            alignSelf={"center"}
                                            rounded={"md"}
                                        >
                                            🟣 Teaching
                        </Text>
                                    </WrapItem>
                                </Wrap>

                                <Wrap justify={"center"}>
                                    {"Piano"
                                        ?.split(",")
                                        .slice(0, 5)
                                        .map((i, idx) => (
                                            <WrapItem key={idx}>
                                                <Text
                                                    key={idx}
                                                    color={"gray.400"}
                                                    fontWeight={600}
                                                    fontSize={"sm"}
                                                    bg={"gray.900"}
                                                    p={3}
                                                    alignSelf={"flex-start"}
                                                    rounded={"md"}
                                                >
                                                    💯 {i}
                                                </Text>
                                            </WrapItem>
                                        ))}
                                </Wrap>

                                <Wrap justify={"center"}>
                                    {"Rock"
                                        ?.split(",")
                                        .slice(0, 3)
                                        .map((i, idx) => (
                                            <WrapItem key={idx}>
                                                <Text
                                                    key={idx}
                                                    color={"gray.400"}
                                                    fontWeight={600}
                                                    fontSize={"sm"}
                                                    bg={"gray.900"}
                                                    p={3}
                                                    alignSelf={"flex-start"}
                                                    rounded={"md"}
                                                >
                                                    🎵 {i}
                                                </Text>
                                            </WrapItem>
                                        ))}
                                </Wrap>

                                <Wrap justify={"center"}>
                                    {"Metallica"
                                        ?.split(",")
                                        .slice(0, 5)
                                        .map((i, idx) => (
                                            <WrapItem key={idx}>
                                                <Text
                                                    key={idx}
                                                    color={"gray.400"}
                                                    fontWeight={600}
                                                    fontSize={"sm"}
                                                    bg={"gray.900"}
                                                    p={3}
                                                    alignSelf={"center"}
                                                    rounded={"md"}
                                                >
                                                    🔥 {i}
                                                </Text>
                                            </WrapItem>
                                        ))}
                                </Wrap>
                            </Stack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            <Flex
                alignItems='center'
                borderRadius={50}
                bg="green.100"
                px={8}
                py={4}
                transform={'scale(0.7)'}
                mt={['-10', '-18']}
            >
                <Text
                    d={'flex'}
                    alignItems='center'
                    justifyContent='center'
                    bg='green.400'
                    w={10}
                    h={10}
                    borderRadius={64}
                    // p={2}
                    fontWeight={'black'}
                    color={'white'}
                >C</Text>
                <Flex>
                    <Text ml={2} textColor="green.300" fontWeight='bold' fontSize={"xx-large"}>
                        cord.ly/
              </Text>
                    <Text textColor="black" fontWeight="light" fontSize={"xx-large"}>demah</Text>
                </Flex>
            </Flex>
        </>
    )
}
