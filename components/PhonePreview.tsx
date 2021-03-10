import { useState, useEffect, useContext } from 'react'
import { firestore } from '../lib/firebase'
import { UserContext } from '../lib/context'
import NextLink from 'next/link'
import { LinkIcon } from '@chakra-ui/icons'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import QRCode from 'qrcode'
import {
    Box,
    Flex,
    Text,
    Avatar,
    Button,
    Stack,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Link,
    Wrap,
    WrapItem,
    useColorModeValue,
    useClipboard,
    Image,
    Badge,
    Heading,
} from '@chakra-ui/react'

export default function PhonePreview({ urls, userNameValue, profileImg }) {
    const [imageUrl, setImageUrl] = useState('')

    const { user } = useContext(UserContext)

    const userProfileUrl = `https://cord.ly/${userNameValue || user.uid.slice(0, 5)}`

    const { hasCopied, onCopy } = useClipboard(userProfileUrl)

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(userProfileUrl)
            setImageUrl(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Flex
            as="section"
            flexDirection="column"
            alignItems={'center'}
            justifyContent={'flex-start'}
        >

            <Box
                borderColor={'gray.300'}
                width={['90vw', 'sm']}
                borderWidth={[12, 20]}
                borderRadius={65}
                maxH={['600px', '580px', '580px', '700px ']}
                minH={'700px'}
                overflow="hidden"
                textAlign="center"
                my={10}
                pos={'relative'}
            >

                <Flex
                    backgroundImage={'url("https://is.gd/jkE1Df")'}
                    backgroundRepeat={'no-repeat'}
                    backgroundPosition={'top'}
                    backgroundSize={'cover'}
                    height={'150px'}
                    w={'sm'}
                    pos='absolute'
                    _after={{
                        display: 'inline-block',
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to top, #1a202c 0%, rgba(255, 255, 255, 0) 100%)'

                    }}
                />

                <Avatar
                    mt={28}
                    size="lg"
                    name="profile picture"
                    src={profileImg || user.photoURL}
                />
                <Heading as={'h3'} size={'md'} mt={2}>{userNameValue || user.uid.slice(0, 5)}</Heading>

                <Flex mt={2} mb={5} justifyContent='center' alignItems='center'>
                    <Text fontWeight={'light'} textAlign="center">
                        @{userNameValue || user.uid.slice(0, 5)}
                    </Text>

                    <Badge variant="solid" colorScheme="green" ml={2}>PRO</Badge>
                </Flex>

                <Tabs
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
                            <LinksPreviewPanel
                                urls={urls}
                            />
                        </TabPanel>

                        <TabPanel>
                            <BioPreviewPanel user={user} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

            <Stack
                rounded={'xl'}
                px={4}
                py={3}
                direction={'row'}
                alignItems={'center'}
                mb={2}
                spacing={2}
                bg="gray.700"
                color={'green.400'}
                align={'center'}
            >
                <LinkIcon />

                <Link textAlign="left" href={`/${userNameValue || user.uid.slice(0, 5)}`} isExternal>
                    <Text fontSize={'xl'} fontWeight={'bold'}>
                        {userProfileUrl}
                    </Text>
                </Link>
                {/* <ExternalLinkIcon /> */}
                <Button onClick={onCopy} ml={2}>
                    {hasCopied ? "Copied" : "Copy"}
                </Button>
            </Stack>

            <Button onClick={() => generateQrCode()}>Generate</Button>

            {imageUrl && <Image src={imageUrl} />}
        </Flex>
    )
}

const LinksPreviewPanel = ({ urls }) => {
    return (
        <Stack>
            {urls?.map((i, idx) => (
                <Button key={idx} w={'100%'}>
                    <NextLink href={Object.values(i)[0].toString()} passHref>
                        <Link isExternal>
                            {Object.keys(i)[0].toString()}
                        </Link>
                    </NextLink>
                </Button>
            ))}
        </Stack>
    )
}

const BioPreviewPanel = ({ user }) => {

    const [bio, bioSet] = useState({
        stagename: '',
        location: '',
        skills: '',
        styles: '',
        influences: '',
        education: '',
        collaboration: false,
    })

    const query = firestore.collection('users')
    useEffect(() => {
        // const getAllUrls =  () => {
        query.where('uid', '==', user.uid).onSnapshot((snapshot) => {
            let changes = snapshot.docChanges()
            changes.forEach((i) => bioSet(i.doc.data().bio))
        })
        // }
        // getAllUrls()

        //bio, user.uid
    }, [])

    return (
        <Stack>
            <Text
                color={'purple.400'}
                fontWeight={600}
                fontSize={'sm'}
                // bg={useColorModeValue('purple.50', 'purple.900')}
                bg={'purple.900'}
                p={2}
                alignSelf={'center'}
                rounded={'md'}
            >
                📍 {bio?.location}
            </Text>

            <Wrap justify={'center'}>
                <WrapItem>
                    <Text
                        color={'gray.400'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={'gray.900'}
                        p={2}
                        alignSelf={'center'}
                        rounded={'md'}
                    >
                        🎓 {bio?.education === 'academic' ? 'Academic' : 'Self-studied'}
                    </Text>
                </WrapItem>

                {bio?.collaboration && (
                    <WrapItem>
                        <Text
                            color={'gray.400'}
                            fontWeight={600}
                            fontSize={'sm'}
                            bg={'gray.900'}

                            p={2}
                            alignSelf={'center'}
                            rounded={'md'}
                        >
                            🟢 Collaboration
                        </Text>
                    </WrapItem>
                )}

            </Wrap>

            <Wrap justify={'center'}>
                {
                    bio?.skills
                        ?.split(',')
                        .slice(0, 5)
                        .map((i, idx) => (
                            <WrapItem key={idx}>
                                <Text
                                    key={idx}
                                    color={'gray.400'}
                                    fontWeight={600}
                                    fontSize={'sm'}
                                    bg={'gray.900'}

                                    p={3}
                                    alignSelf={'flex-start'}
                                    rounded={'md'}
                                >
                                    💯 {i}
                                </Text>
                            </WrapItem>
                        ))
                }
            </Wrap>

            <Wrap justify={'center'}>
                {
                    bio?.styles
                        ?.split(',')
                        .slice(0, 3)
                        .map((i, idx) => (
                            <WrapItem key={idx}>
                                <Text
                                    key={idx}
                                    color={'gray.400'}
                                    fontWeight={600}
                                    fontSize={'sm'}
                                    bg={'gray.900'}

                                    p={3}
                                    alignSelf={'flex-start'}
                                    rounded={'md'}
                                >
                                    💅 {i}
                                </Text>
                            </WrapItem>
                        ))
                }
            </Wrap>

            <Wrap justify={'center'}>
                {
                    bio?.influences
                        ?.split(',')
                        .slice(0, 5)
                        .map((i, idx) => (
                            <WrapItem key={idx}>
                                <Text
                                    key={idx}
                                    color={'gray.400'}
                                    fontWeight={600}
                                    fontSize={'sm'}
                                    bg={'gray.900'}

                                    p={3}
                                    alignSelf={'center'}
                                    rounded={'md'}
                                >
                                    🔥 {i}
                                </Text>
                            </WrapItem>
                        ))
                }
            </Wrap>
        </Stack>
    )


}