import Head from 'next/head'
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
  Badge,
  Tooltip,
  Icon,
  createIcon,
} from "@chakra-ui/react";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    paritialVisibilityGutter: 20,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 35,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 50,
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
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SimpleGrid columns={[1, 2]}>
        <Flex
          flexDirection={"column"}
          alignItems={["center", "start"]}
          justifyContent="center"
        // my={10}
        >
          {/* <SvgShape1 style={{ position: 'absolute', zIndex: -1 }} /> */}
          <Flex
            visibility={['hidden', 'visible']}
            position='absolute'
            mb={96}
            ml={-10}
            zIndex={-1}
            w={48}
          >
            <SvgHeart />
          </Flex>
          <Heading mt={[8, 0]} mb={4} textAlign={["center", "left"]} as="h2" size="3xl">
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
            Sign up for free
          </Button>
        </Flex>


        <Flex position='relative' flexDirection='column' justify='center' alignItems='center'>
          <Box visibility={['hidden', 'visible']}>
            <Icon
              as={Arrow}
              w={90}
              h={150}
              position={'absolute'}
              left={120}
              top={45}
              transform={'scaleX(-1)'}
              zIndex={1}
            />
            <Text
              fontSize={'3xl'}
              fontFamily={'Caveat'}
              position={'absolute'}
              left={49}
              top={16}
              transform={'rotate(-10deg)'}>
              Cover photo
              </Text>
          </Box>
          <PhonePrevHome />
          <Box visibility={['hidden', 'visible']}>
            <Icon
              as={Arrow}
              w={90}
              h={150}
              position={'absolute'}
              right={121}
              top={250}
            />
            <Text
              lineHeight={1}
              align='center'
              fontSize={'3xl'}
              fontFamily={'Caveat'}
              position={'absolute'}
              right={45}
              top={240}
              transform={'rotate(10deg)'}>
              Your career <br />info
              </Text>
          </Box>
          <Box visibility={['hidden', 'visible']}>
            <Icon
              as={Arrow}
              w={90}
              h={1100}
              position={'absolute'}
              left={120}
              top={45}
              transform={'scaleX(-1) rotate(10deg)'}

              zIndex={1}
            />
            <Text
              align='center'
              lineHeight={1}
              fontSize={'3xl'}
              fontFamily={'Caveat'}
              position={'absolute'}
              left={35}
              top={520}
              transform={'rotate(-15deg)'}>
              Your social <br />links
              </Text>
          </Box>
        </Flex>

      </SimpleGrid>

      <SimpleGrid columns={[1, 4]} my={[42, 36]} spacing={10}>

        <Flex flexDir='column'>

          <Heading as="h3" size="md" textAlign='center'>🔗</Heading>
          <Heading as="h2" size="lg" textAlign='center'>Links</Heading>
          <Text textAlign='center'>
            Present all your social links within a well design page
          </Text>
        </Flex>

        <Flex flexDir='column'>

          <Heading as="h3" size="md" textAlign='center'>✍️</Heading>
          <Heading as="h2" size="lg" textAlign='center'>Bio</Heading>
          <Text textAlign='center'>
            Less is more. All things your fan need to know about you
          </Text>
        </Flex>

        <Flex flexDir='column'>
          <Tag alignSelf='center' size={'sm'} variant="solid" colorScheme="green">
            PRO
            </Tag>
          <Heading as="h3" size="lg" textAlign='center'>
            Badge
          </Heading>
          <Text textAlign='center'>
            Less is more. All things your fan need to know about you
          </Text>
        </Flex>

        <Flex flexDir='column'>
          <Heading as="h3" size="md" textAlign='center'>👁️</Heading>

          <Heading as="h3" size="lg" textAlign='center'>Visits</Heading>
          <Text textAlign='center'>
            Less is more. All things your fan need to know about you
          </Text>
        </Flex>

      </SimpleGrid>

      <Flex
        flexDirection={["column-reverse", "row"]}
        justifyContent='space-between'
        alignItems="center"
        my={[12, 32]}
      >
        <Flex w={[96, 'xl']} mt={[10, 0]}>
          <SvgListeningMusic />
        </Flex>
        <FaqAccordion />
      </Flex>

      <SimpleGrid columns={[1, 2]}>
        <Flex flexDir="column" my={10}  >
          <Heading >Pro Community</Heading>
          <Text maxW={"md"}>
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
          {Array.from(Array(10).keys()).map((i) => (
            <Box key={i}>
              <Flex
                rounded="lg"
                alignItems="flex-end"
                maxW="250px"
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
                maxW="250px"
              >
                <Flex flexDir='column'>
                  <Tag size="lg" colorScheme="green" borderRadius="full">
                    <Avatar mr={1} size="xs" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                    <TagLabel>@jack</TagLabel>
                  </Tag>

                  <Text fontWeight='bold' mt={6}>Pianist 🎹</Text>
                </Flex>
                <Text >Jack Johnson</Text>

              </Flex>
            </Box>
          ))}
        </Carousel>
      </SimpleGrid>

      <Flex mb={10} mt={28} flexDir="column" alignItems='center' alignContent="center" justify="center">
        <Heading textAlign="center">Join Our Platform</Heading>
        <Text textAlign="center" maxW={"md"} m="auto">
          From fatntastic composer to a extrodinary piano player.
          </Text>
        <Button mt={5} variant="outline" w={'xs'} colorScheme="green" size="lg">Join Now</Button>
        <Flex w={[72, 'xs']}>
          <SvgLying />

        </Flex>
      </Flex>

      <Footer />

      {/* <Musician data={musicians} /> */}
    </Container >
  );
}

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

export async function getServerSideProps() {
  const query = firestore.collection("users");

  const musicians = (await query.get()).docs.map((doc) => doc.data());

  return {
    props: { musicians },
  };
}
