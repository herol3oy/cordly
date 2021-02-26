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
    Text,
    Box,
    Flex,
    Heading,
    Avatar,
    Badge,
    Stack,
    HStack,
    TagLabel,
    Tag,
    TagCloseButton,
    useColorModeValue,
} from '@chakra-ui/react'

export default function User({ data }) {

    return (
        <Flex as="section" minH="100vh" direction="column" alignItems="center">
            <Tabs
                paddingTop="12"
                isFitted
                align="center"
                variant="line"
                colorScheme="green"
            >
                <TabList>
                    <Tab>Links</Tab>
                    <Tab>Bio</Tab>
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
            <Text mt="auto" textAlign="center">
                CORDLY
            </Text>
        </Flex>
    )
}

const ProfileBio = ({ data }) => {
    const {
        profileImg,
        photoUrl,
        email,
        skills,
        location,
        stagename } = data

    return (
        <>
            <ProfileAvatar email={email} profileImg={profileImg} photoURL={photoUrl} />
            <Text
                textTransform={'uppercase'}
                color={'blue.400'}
                fontWeight={600}
                fontSize={'sm'}
                bg={useColorModeValue('blue.50', 'blue.900')}
                p={2}
                alignSelf={'flex-start'}
                rounded={'md'}
            >
                📍{location}
            </Text>
            {stagename}
            <HStack spacing={4}>

                {
                    skills.map((i, idx) => (
                        <Tag
                            key={idx}
                            size={'lg'}
                            borderRadius="full"
                            variant="solid"
                            colorScheme="purple"
                        >
                            <TagLabel>{i}</TagLabel>
                        </Tag>
                    ))
                }
            </HStack>

        </>
    )
}

const ProfileLinks = ({ data }) => {

    const { profileImg, photoUrl, email, urls } = data

    const links = urls?.map((i, idx) => (
        <Box
            key={idx}
            display={{ base: 'flex', md: 'flex' }}
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
            minW="sm"
            borderRadius="md"
            fontSize="sm"
            outline="0"
            transition="all 0.3s"
            _hover={{
                bg: 'green.100',
                borderColor: 'green.100',
            }}
            _active={{
                borderColor: 'gray.200',
            }}
            _focus={{
                boxShadow: 'outline',
            }}
        >
            <Box
                m={'auto'}
                as="strong"
                lineHeight="inherit"
                fontWeight="semibold"
            >
                {Object.keys(i)[0]}
            </Box>
        </Box>
    ))

    return (
        <Flex align="center" alignItems="stretch" direction="column">
            <ProfileAvatar email={email} profileImg={profileImg} photoURL={photoUrl} />
            <VStack
                direction={['column', 'row']}
                spacing={4}
                align="stretch"
                mt={3}
            >
                {links}
            </VStack>
        </Flex>
    )
}

const ProfileAvatar = ({ profileImg, photoURL, email }) => {

    return (
        <Box mb={6}>
            <Avatar
                src={profileImg || photoURL}
                alt="Profile picture"
                size="xl"
                margin="auto"
                mb={4}
            />
            <Heading as="h6" size="sm">
                @{email.split('@')?.[0]}
            </Heading>
        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    let data

    const query = await firestore.collection('users').get()

    query.docs.map(doc => {
        if ((doc.data().username || doc.data().uid) === params.slug) {
            data = doc.data()
        }
    })

    return {
        props: { data }
    }
}
