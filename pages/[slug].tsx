import { useState, useEffect } from "react";
import { firestore, increment } from "../lib/firebase";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { GetServerSideProps } from "next";
import { CheckCircleIcon } from "@chakra-ui/icons";
import getYouTubeID from "get-youtube-id";
import {
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  VStack,
  Text,
  Box,
  Flex,
  Heading,
  Stack,
  HStack,
  Wrap,
  WrapItem,
  TagLabel,
  Tag,
  useColorModeValue,
  Button,
  Link,
  Avatar,
  Badge,
} from "@chakra-ui/react";

const ReactPlayer = dynamic(() => import("react-player/lazy"));

export default function User({ data }) {
  useEffect(() => {
    firestore
      .collection("users")
      .doc(data.uid)
      .update({ pageVisit: increment(1) });
  }, []);

  return (
    <Flex
      as={"section"}
      minH={"100vh"}
      direction={"column"}
      alignItems={"center"}
      alignSelf="center"
    >
      <Flex
        backgroundImage={`url("${data.coverImg}")`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        h={["30vh", "60vh", "30vh", "25vh"]}
        w={["100vw", "100vw", "100vw", "lg"]}
        pos="absolute"
        zIndex={-1}
        _after={{
          display: "inline-block",
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to top, #1a202c 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      <ProfileAvatar data={data} />

      <Tabs
        defaultIndex={0}
        isFitted
        align="center"
        variant="line"
        colorScheme="green"
        w={["xs", "md", "lg", "lg"]}
      >
        <TabList>
          <Tab>LINKS</Tab>
          <Tab>BIO</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProfileLinks data={data} />
          </TabPanel>
          <TabPanel>
            <ProfileBio data={data} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Text
        fontSize={"xs"}
        color={"green.300"}
        textStyle={"logo"}
        mt="auto"
        textAlign="center"
      >
        CORDLY
      </Text>
    </Flex>
  );
}

const ProfileBio = ({ data }) => {
  let location = "";
  let skills = "";
  let styles = "";
  let influences = "";
  let education = "";
  let collaboration = "";

  location = data?.bio?.location;
  skills = data?.bio?.skills;
  styles = data?.bio?.styles;
  influences = data?.bio?.influences;
  education = data?.bio?.education;
  collaboration = data?.bio?.collaboration;

  return (
    <Stack>
      <Text
        color={"purple.400"}
        fontWeight={600}
        fontSize={"sm"}
        bg={useColorModeValue("purple.50", "purple.900")}
        p={2}
        alignSelf={"center"}
        rounded={"md"}
      >
        📍 {location}
      </Text>

      <Wrap justify={"center"}>
        <WrapItem>
          <Text
            color={"gray.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("gray.50", "gray.900")}
            p={2}
            alignSelf={"center"}
            rounded={"md"}
          >
            🎓 {education === "academic" ? "Academic" : "Self-studied"}
          </Text>
        </WrapItem>

        {collaboration && (
          <WrapItem>
            <Text
              color={"gray.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("gray.50", "gray.900")}
              p={2}
              alignSelf={"center"}
              rounded={"md"}
            >
              🟢 Collaboration
            </Text>
          </WrapItem>
        )}
      </Wrap>

      <Wrap justify={"center"}>
        {skills
          ?.split(",")
          .slice(0, 5)
          .map((i, idx) => (
            <WrapItem key={idx}>
              <Text
                key={idx}
                color={"gray.400"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("gray.50", "gray.900")}
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
        {styles
          ?.split(",")
          .slice(0, 3)
          .map((i, idx) => (
            <WrapItem key={idx}>
              <Text
                key={idx}
                color={"gray.400"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("gray.50", "gray.900")}
                p={3}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                💅 {i}
              </Text>
            </WrapItem>
          ))}
      </Wrap>

      <Wrap justify={"center"}>
        {influences
          ?.split(",")
          .slice(0, 5)
          .map((i, idx) => (
            <WrapItem key={idx}>
              <Text
                key={idx}
                color={"gray.400"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("gray.50", "gray.900")}
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
  );
};

const ProfileLinks = ({ data }) => {
  const [row, setRow] = useState(undefined);

  const { urls } = data;

  const links = urls?.map((i, idx) => {
    const title = Object.keys(i)[0].toString();
    const url = Object.values(i)[0].toString();

    const isYoutube = getYouTubeID(url);

    const clickHandle = (i) => (row === i ? setRow(undefined) : setRow(i));

    return (
      <Box key={idx} onClick={() => clickHandle(i)}>
        <Button
          w={"100%"}
          size="lg"
          // py={8}
          color={"gray.400"}
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <NextLink href={url} passHref>
            <Link isExternal>{title}</Link>
          </NextLink>
        </Button>
        {isYoutube && (
          <ReactPlayer
            url={url}
            style={{ display: row === i ? "block" : "none" }}
            width={"100%"}
          />
        )}
      </Box>
    );
  });

  return (
    <Flex align="center" alignItems="stretch" direction="column">
      <VStack spacing={3} align="stretch">
        {links}
      </VStack>
    </Flex>
  );
};

const ProfileAvatar = ({ data }) => {
  const { profileImg, email, photoUrl, username, name, bio } = data;

  return (
    <Flex direction={"column"} justify={"center"} alignItems="center">
      <Avatar mt={36} size="xl" name={name} src={profileImg || photoUrl} />

      <Flex
        mt={2}
        mb={3}
        justifyContent="center"
        alignItems="center"
        flexDir="row"
      >
        <Heading as={"h3"} size={"md"}>
          {bio?.stagename}
        </Heading>
        <Badge variant="solid" colorScheme="green" ml={1}>
          PRO
        </Badge>
      </Flex>

      <Heading
        textStyle={"cordlyUrl"}
        fontWeight={"light"}
        letterSpacing={2}
        textAlign={"center"}
        as={"h6"}
        size={"sm"}
      >
        @{username || email.split("@")?.[0]}
      </Heading>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let data;

  const query = await firestore.collection("users").get();

  query.docs.map((doc) => {
    if ((doc.data().username || doc.data().uid.slice(0, 5)) === params.slug) {
      data = doc.data();
    }
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};
