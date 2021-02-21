import { GetServerSideProps } from 'next'
import { firestore } from '../lib/firebase'
import {
    Tab,
    Tabs,
    TabPanel,
    TabPanels,
    TabList,
    Image,
    VStack,
    Box,
    Flex,
    Heading
} from "@chakra-ui/react"

export default function User({ data }) {

    return (
        <>
            <Tabs variant="soft-rounded" colorScheme="green">
                <TabList>
                    <Tab>Links</Tab>
                    <Tab>Bio</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ProfileLinks data={data} />
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

const ProfileLinks = ({ data }) => {
    const {
        photoUrl,
        email,
        urls,
    } = data[0]

    const links = urls?.map((i, idx) => (

        <Box
            key={idx}
            display={{ base: "flex", md: "flex" }}
            alignItems="center"
            as="a"
            aria-label={`Corldly ${email} social links`}
            href={Object.values(i)[0].toString()}
            target="_blank"
            rel="noopener noreferrer"
            bg="green.300"
            color="white"
            p={3}
            borderWidth="1px"
            borderColor="gray.200"
            px="1em"
            minH="36px"
            minW='sm'
            borderRadius="md"
            fontSize="sm"
            outline="0"
            transition="all 0.3s"
            _hover={{
                bg: "green.100",
                borderColor: "green.100",
            }}
            _active={{
                borderColor: "gray.200",
            }}
            _focus={{
                boxShadow: "outline",
            }}
        >
            <Box m={'auto'} as="strong" lineHeight="inherit" fontWeight="semibold">
                {Object.keys(i)[0]}
            </Box>
        </Box>
    ))

    return (
        <Flex align='center' direction='column'>
            <Box mb={6}>
                <Image
                    src={photoUrl}
                    borderRadius="full"
                    boxSize="100px"
                    objectFit="cover"
                    alt="Profile picture"
                    mb={2}
                />
                <Heading as="h6" size="sm">@{email.split('@')?.[0]}</Heading>
            </Box>
            <VStack
                direction={["column", "row"]}
                spacing={4}
                align="stretch"
            >
                {links}
            </VStack>

        </Flex>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const ref = firestore.collection('users').where("uid", "==", params.slug)
    const data = (await ref.get()).docs.map((doc) => doc.data())
    return {
        props: { data }
    };
}