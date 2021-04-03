import { firestore } from "../lib/firebase";
import SvgListeningMusic from "../components/SvgListeningMusic";
import PhonePrevHome from "../components/PhonePrevHome";
import SvgHeart from "../components/SvgHeart";
import SvgShape1 from "../components/SvgShape1";
import SvgLying from "../components/SvgLying";
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
  Button,
  Avatar,
  Box,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

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

const responsivePhonePrev = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Home({ musicians }) {
  return (
    <Container h="100vh" maxW="container.xl">
      <SimpleGrid columns={[1, 2]}>
        <Flex
          flexDirection={"column"}
          alignItems={["center", "start"]}
          justifyContent="center"
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

        <Carousel
          ssr={true}
          infinite={true}
          showDots={false}
          swipeable={true}
          autoPlay={true}
          // customTransition="all 1"
          // transitionDuration={3000}
          autoPlaySpeed={4000}
          partialVisbile
          removeArrowOnDeviceType={['superLargeDesktop', 'desktop', "tablet", "mobile"]}
          responsive={responsivePhonePrev}>


          {Array.from(Array(2).keys()).map(() => (
            <Flex flexDirection='column' justify='center' alignItems='center'>

              <PhonePrevHome />
            </Flex>
          ))}

        </Carousel>
      </SimpleGrid>

      <Flex
        flexDirection={["column-reverse", "row"]}
        justifyContent="center"
        alignItems="center"
        my={[12, 32]}
      >
        <SvgListeningMusic style={{ width: '50%' }} />
        <FaqAccordion />
      </Flex>

      <SimpleGrid columns={[1]}>
        <Flex flexDir="column" my={10} alignContent="center" justify="center">
          <Heading textAlign="center">Pro Community</Heading>
          <Text textAlign="center" maxW={"md"} m="auto">
            From fatntastic composer to a extrodinary piano player. The vraiety
            of profiles are vast.
          </Text>
        </Flex>

        <Carousel
          ssr={false}
          infinite={true}
          showDots={false}
          autoPlay
          autoPlaySpeed={9000}
          partialVisbile
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {Array.from(Array(10).keys()).map(() => (
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

              </Flex>

              <Flex
                flexDir="row"
                justifyContent='space-between'
                mt={2}
                w="xs"
              >
                <Flex flexDir='column'>
                  <Tag size="lg" colorScheme="green" borderRadius="full">
                    <Avatar ml={-1} mr={2} size="xs" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                    <TagLabel>@jack</TagLabel>
                  </Tag>

                  <Text fontWeight='bold' mt={6}>Pianist</Text>
                </Flex>
                <Text fontWeight="black">Jack Johnson</Text>

              </Flex>
            </>
          ))}
        </Carousel>
      </SimpleGrid>

      <Flex mb={10} mt={28} flexDir="column" alignItems='center' alignContent="center" justify="center">
        <Heading textAlign="center">Join Our Platform</Heading>
        <Text textAlign="center" maxW={"md"} m="auto">
          From fatntastic composer to a extrodinary piano player.
          </Text>
        <Button mt={5} variant="outline" w={'xs'} colorScheme="green" size="lg">Join Now</Button>
        <SvgLying width='30%' />
      </Flex>

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
