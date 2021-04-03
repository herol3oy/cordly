import { firestore } from "../lib/firebase";
import Musician from "../components/Musician";
import SvgListeningMusic from "../components/SvgListeningMusic";
import FaqAccordion from '../components/FaqAccordion'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  Heading,
  Flex,
  Container,
  SimpleGrid,
  Text,
  Image,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { Head } from "next/document";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    paritialVisibilityGutter: 60
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 10

  }
};

export default function Home({ musicians }) {
  return (
    <Container
      h='100vh'
      maxW="container.xl"
    >
      <SimpleGrid columns={[1, 2]} h='100%'>
        <Flex
          flexDirection={"column"}
          alignItems={["center", 'start  ']}
          justify='center'
          my={10}
        >
          <Heading
            mb={4}
            textAlign={['center', 'left']}
            as="h2"
            size="3xl"
          >
            All in one home for musicians
            </Heading>

          <Heading
            textAlign={['center', 'left']}
            fontSize='larger  '
            maxW={"container.md"}
            fontWeight='thin'
          >
            Let your fans know all about you in one single page
            
            </Heading>
          <Button mt='8' size='lg' variant='solid' colorScheme='green'>Create account for free</Button>
        </Flex>

        <Flex justify='center' flexDir='column' alignItems='center' justifyContent='center'>
          <Image w='50%' src={'/preview.png'} />
          <Flex alignItems='center' mt={4} borderRadius={50} backgroundColor='gray.700' px={8} py={4}>
            <Text textColor='gray.100' fontWeight="bold" fontSize={'x-large'}>
              cord.ly/herol3oy
              </Text>
          </Flex>
        </Flex>
      </SimpleGrid>

      <SimpleGrid columns={[1, 2]} alignItems='center'>
        <SvgListeningMusic />
        <FaqAccordion />
      </SimpleGrid>

      <SimpleGrid
        columns={[1]} 
      >
        <Flex
          flexDir='column'
          m={10}
          alignContent='center'
          justify='center'
        >
          <Heading textAlign='center'>
            Pro Community
          </Heading>
          <Text textAlign='center' maxW={'md'} m='auto'>
            From fatntastic composer to a extrodinary piano player.
            The vraiety of profiles are vast.
        </Text>
        </Flex>
        
      <Carousel
        ssr={false}
        infinite={true}
        // centerMode={true}
        partialVisbile
        responsive={responsive}>
        {
          Array.from(Array(10).keys()).map((item) => (
            <Flex
              rounded='lg'
              alignItems='flex-end'
              w='xs'
              minH='150px'
              p={'4'}
              backgroundRepeat={"no-repeat"}
              backgroundSize={"cover"}
              backgroundImage={`url('https://is.gd/oRxkiI')`}>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Flex flexDirection='column'>
                <Text fontWeight='black'>Jack Johnson</Text>
                <Text>@jack</Text>
              </Flex>
            </Flex>
          ))

        }

      </Carousel>

</SimpleGrid>


      <Musician data={musicians} />

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
