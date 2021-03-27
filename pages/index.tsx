import { firestore } from "../lib/firebase";
import Musician from "../components/Musician";
import SvgListeningMusic from "../components/SvgListeningMusic";
import FaqAccordion from '../components/FaqAccordion'
import {
  Heading,
  Flex,
  Container,
  SimpleGrid,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";

export default function Home({ musicians }) {
  return (
    <Container
      h='100vh'
      maxW="container.xl"
    >
      <SimpleGrid columns={[1, 2]} h='100%'>
        <Flex
          flexDirection={"column"}
          alignItems={"start"}
          justify='center'
        >
          <Heading
            mb={4}
            textAlign={"left"}
            as="h2"
            size="4xl"
          >
            Cordly is all in one home for musicians
            </Heading>

          <Heading
            textAlign={"left"}
            fontSize='larger  '
            maxW={"container.md"}
            fontWeight='thin'
          >
            Let your fans know all about you in one single page, where talent agencies can trust to look you up.
            </Heading>
          <Button mt='8' size='lg' variant='solid' colorScheme='green'>Sign In</Button>
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
