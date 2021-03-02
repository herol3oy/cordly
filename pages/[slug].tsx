import NextLink from 'next/link'
import { GetServerSideProps } from 'next'
import { firestore } from '../lib/firebase'
import { CheckCircleIcon } from '@chakra-ui/icons'
import AvatarSVG from '../components/AvatarSVG'
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
    Avatar,
    HStack,
    TagLabel,
    Tag,
    useColorModeValue,
    Button,
    Link,
} from '@chakra-ui/react'

export default function User({ data }) {
    return (
        <Flex as="section" minH="100vh" direction="column" alignItems="center">

            <ProfileAvatar data={data} />

            <Tabs
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
    const { stagename, location, skills } = data

    return (
        <>
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
                {skills?.map((i, idx) => (
                    <Tag
                        key={idx}
                        size={'lg'}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="purple"
                    >
                        <TagLabel>{i}</TagLabel>
                    </Tag>
                ))}
            </HStack>
        </>
    )
}

const ProfileLinks = ({ data }) => {
    const { profileImg, photoUrl, email, urls } = data

    const links = urls?.map((i, idx) => (

        <Button key={idx} minW={['90vw', 'md', 'md', 'lg']}>
            <NextLink href={Object.values(i)[0].toString()} passHref>
                <Link isExternal>
                    {Object.keys(i)[0].toString()}
                </Link>
            </NextLink>
        </Button>


    ))

    return (
        <Flex align="center" alignItems="stretch" direction="column">
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

const ProfileAvatar = ({ data }) => {
    const { profileImg, email, photoUrl, username } = data

    return (
        <Box mt={10} mb={5}>
            {/* <Avatar
                src={profileImg || photoUrl}
                alt="Profile picture"
                size="xl"
                margin="auto"
                mb={4}
            /> */}
            <AvatarSVG imageUrl={profileImg || photoUrl} />
            <Flex mt={3} justifyContent={'center'} alignItems='center'>
                <Heading  textAlign='center'  as="h6" size="sm">
                    @{username || email.split('@')?.[0]}
                </Heading>
                <CheckCircleIcon ml={'2'} color={'green.300'} />
            </Flex>

        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    let data

    const query = await firestore.collection('users').get()

    query.docs.map((doc) => {
        if ((doc.data().username || doc.data().uid) === params.slug) {
            data = doc.data()
        }
    })

    return {
        props: { data },
    }
}
