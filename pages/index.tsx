import NextLink from "next/link";
import { firestore } from "../lib/firebase";
import Musician from "../components/Musician";
import SvgListeningMusic from "../components/SvgListeningMusic";
import SvgYoga from "../components/SvgYoga";
import SvgHeart from "../components/SvgHeart";
import SvgShape1 from "../components/SvgShape1";
import Footer from "../components/Footer";
import FaqAccordion from "../components/FaqAccordion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Heading,
  Flex,
  Container,
  SimpleGrid,
  Text,
  Image,
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
} from "@chakra-ui/react";

const urls = [
  { Youtube: "https://youtube.com" },
  { Website: "https://google.com" },
  { Spotify: "https://spotify.com" },
  { dizzer: "https://dizzer.com" },
  { Instagram: "https://instagram.com" },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    paritialVisibilityGutter: 60,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 15,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 10,
  },
};

export default function Home({ musicians }) {
  return (
    <Container h="100vh" maxW="container.xl">
      <SimpleGrid columns={[1, 2]}>
        <Flex
          flexDirection={"column"}
          alignItems={["center", "start"]}
          justify="center"
        // my={10}
        >
          <SvgShape1 style={{ position: 'absolute', zIndex: -1 }} />
          <SvgHeart width='200px' style={{ marginBottom: '25rem', marginLeft: '-2rem', position: 'absolute', zIndex: -1 }} />
          <Heading mb={4} textAlign={["center", "left"]} as="h2" size="3xl">
            All in one home for musicians
          </Heading>

          <Heading
            textAlign={["center", "left"]}
            fontSize="larger  "
            maxW={"container.md"}
            fontWeight="thin"
          >
            Let your fans know all about you in one single page
          </Heading>
          <Button mt="8" size="lg" variant="solid" colorScheme="green">
            Create account for free
          </Button>
        </Flex>

        <Flex
          justify="center"
          flexDir="column"
          alignItems="center"
        >
          <Box
            borderColor={"gray.300"}
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
            justifyContent='center'
            borderRadius={50}
            backgroundColor="gray.700"
            px={8}
            py={4}
          >
            <Text
              d={'flex'}
              alignItems='center'
              justifyContent='center'
              bg='green.400'
              w={10}
              h={10}
              borderRadius={64}
              p={2}
              fontWeight={'bold'}
            >C</Text>
            <Flex>
              <Text ml={2} textColor="green.300" fontWeight='light' fontSize={"xx-large"}>
                cord.ly/
              </Text>
              <Text textColor="white" fontWeight="light" fontSize={"xx-large"}>herol3oy</Text>
            </Flex>
          </Flex>
        </Flex>
      </SimpleGrid>

      <Flex
        flexDirection={["column-reverse", "row"]}
        justifyContent="center"
        alignItems="center"
        my={[12, 32]}
      >
        <SvgListeningMusic width={'500px'} />
        <FaqAccordion />
      </Flex>

      <SimpleGrid columns={[1]}>
        <Flex flexDir="column" m={10} alignContent="center" justify="center">
          <Heading textAlign="center">Pro Community</Heading>
          <Text textAlign="center" maxW={"md"} m="auto">
            From fatntastic composer to a extrodinary piano player. The vraiety
            of profiles are vast.
          </Text>
        </Flex>

        <Carousel
          ssr={false}
          infinite={true}
          partialVisbile
          responsive={responsive}
        >
          {Array.from(Array(10).keys()).map((item) => (
            <>
              <Flex
                rounded="lg"
                alignItems="flex-end"
                w="xs"
                minH="150px"
                p={"4"}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
                backgroundImage={`url('https://is.gd/oRxkiI')`}
              >
                <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />

              </Flex>
              <Flex flexDirection="column">
                <Text fontWeight="black">Jack Johnson</Text>
                <Text>@jack</Text>
              </Flex>
            </>
          ))}
        </Carousel>
      </SimpleGrid>

      <Footer />

      {/* <Musician data={musicians} /> */}
    </Container>
  );
}

export async function getServerSideProps() {
  const query = firestore.collection("users");

  const musicians = (await query.get()).docs.map((doc) => doc.data());

  return {
    props: { musicians },
  };
}
