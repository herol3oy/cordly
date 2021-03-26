import { firestore, auth } from "../lib/firebase";
import Musician from "../components/Musician";
import PhonePreview from '../components/PhonePreview'
import {
  Heading,
  Flex,
  Container,
  IconProps,
  Icon,
  Box,
  useBreakpointValue,
  SimpleGrid,
  Text,
  Image,
} from "@chakra-ui/react";

export default function Home({ musicians }) {
  return (
    <Container h='100vh' bg='gray.900' maxW="container.xl">
      <SimpleGrid columns={2}>
        <Flex
          // justify={"center"}
          flexDirection={"column"}
        // alignItems={"center"}
        >
          <Heading
            mt={12}
            mb={4}
            textAlign={"left"}
            as="h2"
            size="2xl"
          // fontSize={["2xl", "2xl", "4xl", "4xl"]}
          >
            Musician Community Minimalized
            </Heading>
          <Heading
            // mt={6}
            // textStyle={"textsub"}
            textAlign={"left"}
            // m={"auto"}
            fontSize='larger  '
            maxW={"container.md"}
            fontWeight='thin'
          >
            We are taking a short break while we move physical locations and
            get ready to launch the next
            </Heading>
        </Flex>
        <Image h='70%' src={'/preview.png'} />
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
